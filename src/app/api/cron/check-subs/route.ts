import { NextResponse } from 'next/server'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_PREMIUM_ROLE_ID = process.env.DISCORD_PREMIUM_ROLE_ID!
const DISCORD_FREE_ROLE_ID = '1461003496336916631'
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!
const KR_TRADES_PLAN_ID = process.env.RAZORPAY_PLAN_ID!
const GRACE_PERIOD_DAYS = 7
const CRON_SECRET = process.env.CRON_SECRET || 'krtrades-cron-2026'

async function removeDiscordRole(userId: string, roleId: string) {
  await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${roleId}`,
    { method: 'DELETE', headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
  )
}

async function addDiscordRole(userId: string, roleId: string) {
  await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${roleId}`,
    { method: 'PUT', headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' } }
  )
}

async function sendDM(userId: string, message: string) {
  try {
    const dmRes = await fetch('https://discord.com/api/v10/users/@me/channels', {
      method: 'POST',
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient_id: userId }),
    })
    const dm = await dmRes.json()
    if (!dm.id) return
    await fetch(`https://discord.com/api/v10/channels/${dm.id}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    })
  } catch { /* silent */ }
}

async function findDiscordUserByUsername(username: string): Promise<string | null> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/search?query=${encodeURIComponent(username)}&limit=5`,
    { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
  )
  const members = await res.json()
  if (!Array.isArray(members) || members.length === 0) return null
  const exact = members.find((m: { user: { username: string } }) => m.user.username.toLowerCase() === username.toLowerCase())
  return exact ? exact.user.id : members[0]?.user?.id || null
}

export async function GET(req: Request) {
  // Verify cron secret
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')

    // Fetch all KR Trades subscriptions
    const res = await fetch(`https://api.razorpay.com/v1/subscriptions?count=100&plan_id=${KR_TRADES_PLAN_ID}`, {
      headers: { Authorization: `Basic ${auth}` },
    })
    const data = await res.json()
    const subs = data.items || []

    const now = Date.now() / 1000 // current unix timestamp
    const gracePeriodSeconds = GRACE_PERIOD_DAYS * 24 * 60 * 60
    let removed = 0
    let reminded = 0

    for (const sub of subs) {
      const notes = sub.notes || {}
      const discordUsername = notes.discord_username || notes.discord
      if (!discordUsername) continue

      const userId = await findDiscordUserByUsername(discordUsername)
      if (!userId) continue

      // Check cancelled/halted/paused subscriptions
      if (['cancelled', 'halted', 'paused'].includes(sub.status)) {
        const endedAt = sub.ended_at || sub.current_end || sub.created_at
        const daysSinceEnd = (now - endedAt) / (24 * 60 * 60)

        if (daysSinceEnd >= GRACE_PERIOD_DAYS) {
          // Grace period expired — remove Premium, add Free
          await removeDiscordRole(userId, DISCORD_PREMIUM_ROLE_ID)
          await sendDM(userId,
            `❌ **KR Trades Premium Access Removed**\n\n` +
            `Your 7-day grace period has ended and your Premium access has been removed.\n\n` +
            `You've been moved to Free Members. To rejoin:\n` +
            `🔗 https://koushikranjit.in/KRtrades/renew\n\n` +
            `We'd love to have you back! 🙏`
          )
          removed++
          console.log(`Removed Premium from ${discordUsername} (grace period expired, ${Math.floor(daysSinceEnd)} days)`)
        } else if (daysSinceEnd >= 5 && daysSinceEnd < 6) {
          // Day 5 reminder — 2 days left
          await sendDM(userId,
            `⏰ **Reminder: KR Trades Premium expires in 2 days**\n\n` +
            `Your subscription is inactive. Reactivate now to keep Premium access.\n\n` +
            `🔗 https://koushikranjit.in/KRtrades/renew\n` +
            `📧 Questions? teamkoushikranjit@gmail.com`
          )
          reminded++
        } else if (daysSinceEnd >= 3 && daysSinceEnd < 4) {
          // Day 3 reminder — 4 days left
          await sendDM(userId,
            `⚠️ **KR Trades Premium — 4 days remaining**\n\n` +
            `Your subscription hasn't been renewed. You have 4 days before your Premium access is removed.\n\n` +
            `🔗 Reactivate: https://koushikranjit.in/KRtrades/renew`
          )
          reminded++
        }
      }
    }

    return NextResponse.json({
      status: 'ok',
      checked: subs.length,
      removed,
      reminded,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}

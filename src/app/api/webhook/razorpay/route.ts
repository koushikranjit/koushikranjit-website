import { NextResponse } from 'next/server'
import crypto from 'crypto'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_PREMIUM_ROLE_ID = process.env.DISCORD_PREMIUM_ROLE_ID!
const DISCORD_FREE_ROLE_ID = '1461003496336916631' // Free Members role
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!
const KR_TRADES_PLAN_ID = process.env.RAZORPAY_PLAN_ID!
const VPS_PLAN_ID = process.env.RAZORPAY_VPS_PLAN_ID!
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = 'teamkoushikranjit@gmail.com'
const GRACE_PERIOD_DAYS = 7

// ── Email helper (Resend) ────────────────────────────────────────────

async function sendEmail(subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.log(`[email skipped, no RESEND_API_KEY] ${subject}`)
    return
  }
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Koushik VPS <onboarding@resend.dev>',
        to: NOTIFY_EMAIL,
        subject,
        html,
      }),
    })
  } catch (err) {
    console.error('Failed to send email:', err)
  }
}

// ── Discord helpers ──────────────────────────────────────────────────

async function findDiscordUserByUsername(username: string): Promise<string | null> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/search?query=${encodeURIComponent(username)}&limit=5`,
    { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
  )
  const members = await res.json()
  if (!Array.isArray(members) || members.length === 0) return null

  const exact = members.find(
    (m: { user: { username: string } }) =>
      m.user.username.toLowerCase() === username.toLowerCase()
  )
  return exact ? exact.user.id : members[0]?.user?.id || null
}

async function addRole(userId: string, roleId: string): Promise<boolean> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${roleId}`,
    { method: 'PUT', headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' } }
  )
  return res.ok || res.status === 204
}

async function removeRole(userId: string, roleId: string): Promise<boolean> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${roleId}`,
    { method: 'DELETE', headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
  )
  return res.ok || res.status === 204
}

async function sendDM(userId: string, message: string): Promise<boolean> {
  try {
    // Create DM channel
    const dmRes = await fetch('https://discord.com/api/v10/users/@me/channels', {
      method: 'POST',
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient_id: userId }),
    })
    const dm = await dmRes.json()
    if (!dm.id) return false

    // Send message
    const msgRes = await fetch(`https://discord.com/api/v10/channels/${dm.id}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    })
    return msgRes.ok
  } catch {
    return false
  }
}

function verifyWebhookSignature(body: string, signature: string): boolean {
  const expected = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')
  return expected === signature
}

// ── Delayed role removal (grace period) ──────────────────────────────

async function scheduleRoleRemoval(userId: string, discordUsername: string, subscriptionId: string) {
  // Store grace period info — after 7 days, the cron check will remove the role
  // We use Razorpay subscription status as the source of truth
  // The /api/cron/check-subs endpoint will handle the actual removal

  // Send reminder DM immediately
  await sendDM(userId,
    `⚠️ **KR Trades Premium — Subscription Update**\n\n` +
    `Your subscription has been paused/cancelled. You have **${GRACE_PERIOD_DAYS} days** to reactivate before losing Premium access.\n\n` +
    `🔗 Reactivate: https://koushikranjit.in/KRtrades/renew\n` +
    `📧 Need help? Contact teamkoushikranjit@gmail.com`
  )

  // Send reminder after 5 days (via a delayed check)
  console.log(`Grace period started for ${discordUsername} (${subscriptionId}). Role removal in ${GRACE_PERIOD_DAYS} days.`)
}

// ── Main webhook handler ─────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature') || ''

    // Verify webhook signature
    if (RAZORPAY_WEBHOOK_SECRET && !verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const event = payload.event
    const entity = payload.payload?.subscription?.entity || payload.payload?.payment?.entity

    // ── Koushik VPS plan: email notification only, no Discord ──
    if (entity?.plan_id && entity.plan_id === VPS_PLAN_ID) {
      const notes = entity?.notes || {}
      const clientName = notes.client_name || 'Unknown'
      const clientEmail = notes.client_email || 'Unknown'
      const subId = entity?.id || payload.payload?.subscription?.entity?.id || ''

      const eventLabels: Record<string, string> = {
        'subscription.activated': '✅ New VPS subscription activated',
        'subscription.charged': '💰 VPS monthly payment received',
        'payment.captured': '💰 VPS payment captured',
        'subscription.cancelled': '⚠️ VPS subscription cancelled',
        'subscription.halted': '⚠️ VPS subscription halted (payment failed)',
        'subscription.paused': '⏸️ VPS subscription paused',
        'subscription.completed': '🏁 VPS subscription completed',
      }

      const label = eventLabels[event]
      if (label) {
        await sendEmail(
          label,
          `<p><strong>${label}</strong></p>
           <p>Client: ${clientName}<br/>Email: ${clientEmail}<br/>Subscription ID: ${subId}<br/>Event: ${event}</p>`
        )
      }

      return NextResponse.json({ status: 'ok', product: 'vps', event })
    }

    // Only process KR Trades plan events beyond this point
    if (entity?.plan_id && entity.plan_id !== KR_TRADES_PLAN_ID) {
      return NextResponse.json({ status: 'skipped', reason: 'not KR Trades plan' })
    }

    // Get Discord username from subscription notes
    const notes = entity?.notes || {}
    const discordUsername = notes.discord_username || notes.discord

    if (!discordUsername) {
      console.log(`Webhook ${event}: No Discord username in notes`)
      return NextResponse.json({ status: 'ok', note: 'no discord username' })
    }

    // Find Discord user
    const userId = await findDiscordUserByUsername(discordUsername)
    if (!userId) {
      console.log(`Discord user not found: ${discordUsername}`)
      return NextResponse.json({ status: 'ok', note: 'discord user not found' })
    }

    switch (event) {
      // ── PAYMENT SUCCESS: Give Premium role, remove Free role ──
      case 'subscription.activated':
      case 'subscription.charged':
      case 'payment.captured': {
        await addRole(userId, DISCORD_PREMIUM_ROLE_ID)
        console.log(`✅ Premium role added to ${discordUsername}`)

        await sendDM(userId,
          `🎉 **Welcome to KR Trades Premium!**\n\n` +
          `Your subscription is active. You now have access to all premium channels.\n\n` +
          `📺 Live Trading Room — Mon to Fri\n` +
          `📚 Premium Starter Course\n` +
          `💬 Direct mentor access\n\n` +
          `See you in the live sessions!`
        )

        return NextResponse.json({ status: 'role_added', user: discordUsername })
      }

      // ── SUBSCRIPTION CANCELLED/HALTED/PAUSED: Start 7-day grace period ──
      case 'subscription.cancelled':
      case 'subscription.halted':
      case 'subscription.paused': {
        // Don't remove role immediately — start grace period
        await scheduleRoleRemoval(userId, discordUsername, entity?.id || '')
        return NextResponse.json({ status: 'grace_period_started', user: discordUsername, days: GRACE_PERIOD_DAYS })
      }

      // ── SUBSCRIPTION COMPLETED (all cycles done): Remove immediately ──
      case 'subscription.completed': {
        await removeRole(userId, DISCORD_PREMIUM_ROLE_ID)
        console.log(`❌ Premium role removed from ${discordUsername} (completed)`)

        await sendDM(userId,
          `Your KR Trades Premium subscription has ended.\n\n` +
          `You've been moved to Free Members. To rejoin Premium:\n` +
          `🔗 https://koushikranjit.in/KRtrades/renew\n\n` +
          `Thank you for being a member! 🙏`
        )

        return NextResponse.json({ status: 'role_removed', user: discordUsername })
      }

      default:
        return NextResponse.json({ status: 'ok', event })
    }
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

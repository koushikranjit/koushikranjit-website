import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const botToken = process.env.DISCORD_BOT_TOKEN
    const guildId = process.env.DISCORD_GUILD_ID
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const planId = process.env.RAZORPAY_PLAN_ID

    // Discord member count
    let discordMembers = 10
    if (botToken && guildId) {
      const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
        headers: { Authorization: `Bot ${botToken}` },
      })
      const data = await res.json()
      if (res.ok) discordMembers = data.approximate_member_count || 10
    }

    // KR Trades total purchases (Razorpay)
    let premiumCount = 0
    if (keyId && keySecret && planId) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
      const res = await fetch(`https://api.razorpay.com/v1/subscriptions?count=100&plan_id=${planId}`, {
        headers: { Authorization: `Basic ${auth}` },
      })
      const data = await res.json()
      if (res.ok) {
        premiumCount = (data.items || []).filter(
          (sub: { status: string }) => sub.status !== 'created'
        ).length
      }
    }

    return NextResponse.json(
      { premium: premiumCount, discord: discordMembers },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    )
  } catch {
    return NextResponse.json({ premium: 0, discord: 10 })
  }
}

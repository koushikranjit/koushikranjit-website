import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const botToken = process.env.DISCORD_BOT_TOKEN
    const guildId = process.env.DISCORD_GUILD_ID

    if (!botToken || !guildId) {
      return NextResponse.json({ count: 10 })
    }

    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: { Authorization: `Bot ${botToken}` },
      next: { revalidate: 60 },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ count: 10 })
    }

    const memberCount = data.approximate_member_count || 10

    return NextResponse.json(
      { count: memberCount },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    )
  } catch {
    return NextResponse.json({ count: 10 })
  }
}

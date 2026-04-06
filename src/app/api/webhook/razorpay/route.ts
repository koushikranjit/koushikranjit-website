import { NextResponse } from 'next/server'
import crypto from 'crypto'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_PREMIUM_ROLE_ID = process.env.DISCORD_PREMIUM_ROLE_ID!
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!
const KR_TRADES_PLAN_ID = process.env.RAZORPAY_PLAN_ID!

async function findDiscordUserByUsername(username: string): Promise<string | null> {
  // Search guild members by username
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/search?query=${encodeURIComponent(username)}&limit=5`,
    { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
  )
  const members = await res.json()
  if (!Array.isArray(members) || members.length === 0) return null

  // Try exact match first
  const exact = members.find(
    (m: { user: { username: string } }) =>
      m.user.username.toLowerCase() === username.toLowerCase()
  )
  return exact ? exact.user.id : members[0]?.user?.id || null
}

async function addRole(userId: string): Promise<boolean> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${DISCORD_PREMIUM_ROLE_ID}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return res.ok || res.status === 204
}

async function removeRole(userId: string): Promise<boolean> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${userId}/roles/${DISCORD_PREMIUM_ROLE_ID}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
    }
  )
  return res.ok || res.status === 204
}

function verifyWebhookSignature(body: string, signature: string): boolean {
  const expected = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')
  return expected === signature
}

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

    // Only process KR Trades plan events
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

    // Handle events
    switch (event) {
      case 'subscription.activated':
      case 'subscription.charged':
      case 'payment.captured': {
        const added = await addRole(userId)
        console.log(`Added Premium role to ${discordUsername}: ${added}`)
        return NextResponse.json({ status: 'role_added', user: discordUsername })
      }

      case 'subscription.cancelled':
      case 'subscription.expired':
      case 'subscription.halted':
      case 'subscription.paused': {
        const removed = await removeRole(userId)
        console.log(`Removed Premium role from ${discordUsername}: ${removed}`)
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

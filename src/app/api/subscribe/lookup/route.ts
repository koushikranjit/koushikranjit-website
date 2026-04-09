import { NextResponse } from 'next/server'
import crypto from 'crypto'

const KR_TRADES_PLAN_ID = process.env.RAZORPAY_PLAN_ID || 'plan_SZcXV7asNU7aFI'
const SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'krtrades2026'

function generateToken(email: string, subIds: string[]): string {
  const payload = JSON.stringify({ email: email.toLowerCase(), subIds, exp: Date.now() + 10 * 60 * 1000 })
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(payload).toString('base64') + '.' + hmac
}

export function verifyToken(token: string): { email: string; subIds: string[] } | null {
  try {
    const [payloadB64, sig] = token.split('.')
    if (!payloadB64 || !sig) return null
    const payload = Buffer.from(payloadB64, 'base64').toString()
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
    if (sig !== expected) return null
    const data = JSON.parse(payload)
    if (data.exp < Date.now()) return null
    return { email: data.email, subIds: data.subIds }
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const res = await fetch('https://api.razorpay.com/v1/subscriptions?count=100', {
      headers: { Authorization: `Basic ${auth}` },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 400 })
    }

    // Filter: only KR Trades plan + matching email + active status
    const matched = (data.items || [])
      .filter((sub: { customer_email?: string; status: string; plan_id: string }) =>
        sub.customer_email?.toLowerCase() === email.toLowerCase().trim() &&
        sub.plan_id === KR_TRADES_PLAN_ID &&
        ['active', 'authenticated', 'created', 'pending'].includes(sub.status)
      )
      .map((sub: { id: string; status: string; plan_id: string; created_at: number }) => ({
        id: sub.id,
        status: sub.status,
        plan: 'KR Trades Premium',
        created: new Date(sub.created_at * 1000).toLocaleDateString('en-IN'),
      }))

    if (matched.length === 0) {
      return NextResponse.json({ error: 'No active KR Trades subscriptions found for this email.' }, { status: 404 })
    }

    // Generate a signed token for cancellation (valid 10 minutes)
    const token = generateToken(email, matched.map((s: { id: string }) => s.id))

    return NextResponse.json({ subscriptions: matched, token })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

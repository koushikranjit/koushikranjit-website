import { NextResponse } from 'next/server'
import crypto from 'crypto'

const VPS_PLAN_ID = process.env.RAZORPAY_VPS_PLAN_ID || 'plan_TDW5fvYRpAgeWT'

function generateToken(email: string, subIds: string[]): string {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) throw new Error('RAZORPAY_WEBHOOK_SECRET is not set')
  const payload = JSON.stringify({ email: email.toLowerCase(), subIds, exp: Date.now() + 10 * 60 * 1000 })
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return Buffer.from(payload).toString('base64') + '.' + hmac
}

export function verifyToken(token: string): { email: string; subIds: string[] } | null {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!secret) return null
    const [payloadB64, sig] = token.split('.')
    if (!payloadB64 || !sig) return null
    const payload = Buffer.from(payloadB64, 'base64').toString()
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
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

    const res = await fetch(`https://api.razorpay.com/v1/subscriptions?count=100&plan_id=${VPS_PLAN_ID}`, {
      headers: { Authorization: `Basic ${auth}` },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 400 })
    }

    // Filter: matching email (from notes, since Razorpay customer_email may be unset for subscription-first checkout) + active status
    const matched = (data.items || [])
      .filter((sub: { notes?: { client_email?: string }; customer_email?: string; status: string }) => {
        const subEmail = (sub.notes?.client_email || sub.customer_email || '').toLowerCase().trim()
        return subEmail === email.toLowerCase().trim() &&
          ['active', 'authenticated', 'created', 'pending'].includes(sub.status)
      })
      .map((sub: { id: string; status: string; created_at: number; quantity?: number }) => ({
        id: sub.id,
        status: sub.status,
        plan: 'Koushik VPS',
        quantity: sub.quantity || 1,
        created: new Date(sub.created_at * 1000).toLocaleDateString('en-IN'),
      }))

    if (matched.length === 0) {
      return NextResponse.json({ error: 'No active VPS subscriptions found for this email.' }, { status: 404 })
    }

    const token = generateToken(email, matched.map((s: { id: string }) => s.id))

    return NextResponse.json({ subscriptions: matched, token })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

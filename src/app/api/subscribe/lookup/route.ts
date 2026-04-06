import { NextResponse } from 'next/server'

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

    // Search for subscriptions by fetching all and filtering by email
    const res = await fetch('https://api.razorpay.com/v1/subscriptions?count=100', {
      headers: { Authorization: `Basic ${auth}` },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 400 })
    }

    // Filter subscriptions that match the email
    const matched = (data.items || [])
      .filter((sub: { customer_email?: string; status: string }) =>
        sub.customer_email?.toLowerCase() === email.toLowerCase() &&
        ['active', 'authenticated', 'created', 'pending'].includes(sub.status)
      )
      .map((sub: { id: string; status: string; plan_id: string; created_at: number }) => ({
        id: sub.id,
        status: sub.status,
        plan: sub.plan_id,
        created: new Date(sub.created_at * 1000).toLocaleDateString('en-IN'),
      }))

    if (matched.length === 0) {
      return NextResponse.json({ error: 'No active subscriptions found for this email.' }, { status: 404 })
    }

    return NextResponse.json({ subscriptions: matched })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

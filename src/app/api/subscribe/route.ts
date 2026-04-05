import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const planId = process.env.RAZORPAY_PLAN_ID

    if (!keyId || !keySecret || !planId) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    const res = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
      body: JSON.stringify({
        plan_id: planId,
        total_count: 120,
        quantity: 1,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.description || 'Failed to create subscription' }, { status: 400 })
    }

    return NextResponse.json({ subscription_id: data.id })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

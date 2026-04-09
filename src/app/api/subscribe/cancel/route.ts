import { NextResponse } from 'next/server'
import { verifyToken } from '../lookup/route'

export async function POST(req: Request) {
  try {
    const { subscription_id, token } = await req.json()

    if (!subscription_id || !token) {
      return NextResponse.json({ error: 'Missing subscription ID or verification token' }, { status: 400 })
    }

    // Verify the signed token
    const verified = verifyToken(token)
    if (!verified) {
      return NextResponse.json({ error: 'Verification expired or invalid. Please search again.' }, { status: 403 })
    }

    // Check that the subscription ID is in the token's allowed list
    if (!verified.subIds.includes(subscription_id)) {
      return NextResponse.json({ error: 'You can only cancel your own subscription.' }, { status: 403 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    const res = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscription_id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
      body: JSON.stringify({ cancel_at_cycle_end: 1 }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.description || 'Failed to cancel subscription' }, { status: 400 })
    }

    return NextResponse.json({ status: 'cancelled', ends_at: data.current_end })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

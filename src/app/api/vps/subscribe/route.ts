import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const planId = process.env.RAZORPAY_VPS_PLAN_ID

    if (!keyId || !keySecret || !planId) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    let clientName = ''
    let clientEmail = ''
    let quantity = 1
    try {
      const body = await req.json()
      clientName = body.name || ''
      clientEmail = body.email || ''
      const parsedQuantity = parseInt(body.quantity, 10)
      if (Number.isFinite(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= 20) {
        quantity = parsedQuantity
      }
    } catch {
      // No body sent — that's fine
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
        quantity,
        notes: {
          client_name: clientName,
          client_email: clientEmail,
          product: 'Koushik VPS',
        },
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

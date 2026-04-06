import { NextResponse } from 'next/server'

export const revalidate = 60 // cache for 60 seconds

export async function GET() {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const planId = process.env.RAZORPAY_PLAN_ID

    if (!keyId || !keySecret || !planId) {
      return NextResponse.json({ count: 10 }) // fallback
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    // Fetch all subscriptions for KR Trades plan
    const res = await fetch(`https://api.razorpay.com/v1/subscriptions?count=100&plan_id=${planId}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 60 },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ count: 10 }) // fallback
    }

    // Count active + authenticated subscriptions (real paying members)
    const activeCount = (data.items || []).filter(
      (sub: { status: string }) => ['active', 'authenticated'].includes(sub.status)
    ).length

    // Add base count (existing members before Razorpay integration)
    const totalMembers = activeCount + 10

    return NextResponse.json(
      { count: totalMembers },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    )
  } catch {
    return NextResponse.json({ count: 10 })
  }
}

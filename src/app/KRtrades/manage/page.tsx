'use client'

import { useState } from 'react'

export default function ManageSubscription() {
  const [subId, setSubId] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subId.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_id: subId.trim() }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Your subscription has been cancelled. You will retain access until the end of your current billing period.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to cancel subscription. Please contact support.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again or contact support.')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white font-['Inter',sans-serif]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,232,123,0.06)_0%,transparent_50%)]" />
      </div>

      <nav className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="/KRtrades" className="text-xl font-bold tracking-tight">
            KR<span className="text-[#00e87b]">trades</span>
          </a>
          <a href="/KRtrades" className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">
            &larr; Back
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Manage Subscription</h1>
          <p className="text-neutral-400">Cancel your KR Trades subscription below.</p>
        </div>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl border border-[#00e87b]/20 bg-[#00e87b]/[0.03] text-center">
            <div className="w-16 h-16 rounded-full bg-[#00e87b]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#00e87b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-white font-medium text-lg">Subscription Cancelled</p>
            <p className="text-neutral-400 text-sm mt-2">{message}</p>
            <a href="/KRtrades" className="inline-block mt-6 px-6 py-3 rounded-xl border border-white/10 text-sm text-white hover:border-[#00e87b]/40 transition-all cursor-pointer">
              Back to KR Trades
            </a>
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <form onSubmit={handleCancel} className="space-y-6">
              <div>
                <label htmlFor="subId" className="block text-neutral-300 text-sm font-medium mb-2">
                  Subscription ID
                </label>
                <input
                  id="subId"
                  type="text"
                  placeholder="sub_XXXXXXXXXXXXXXX"
                  value={subId}
                  onChange={(e) => setSubId(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-12 px-4 text-sm outline-none focus:border-[#00e87b]/50 focus:ring-1 focus:ring-[#00e87b]/20 transition-colors"
                />
                <p className="text-neutral-600 text-xs mt-2">
                  Find your Subscription ID in the payment confirmation email from Razorpay.
                </p>
              </div>

              {status === 'error' && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-red-400 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !subId.trim()}
                className="w-full py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? 'Cancelling...' : 'Cancel Subscription'}
              </button>

              <p className="text-neutral-600 text-xs text-center">
                Need help? Contact{' '}
                <a href="https://discord.gg/jxuDkpUr5X" target="_blank" rel="noopener noreferrer" className="text-[#00e87b] hover:underline">
                  Discord Support
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}

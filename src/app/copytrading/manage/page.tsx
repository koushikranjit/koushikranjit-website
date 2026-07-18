'use client'

import { useState } from 'react'

export default function ManageEATradingSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'cancelled' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [subs, setSubs] = useState<{ id: string; status: string; plan: string; created: string }[]>([])
  const [token, setToken] = useState('')
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null)
  const [confirmEmail, setConfirmEmail] = useState('')

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setMessage('')
    setToken('')
    setConfirmCancel(null)

    try {
      const res = await fetch(`/api/copytrading/lookup?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()

      if (res.ok && data.subscriptions?.length > 0) {
        setSubs(data.subscriptions)
        setToken(data.token || '')
        setStatus('found')
      } else {
        setStatus('error')
        setMessage(data.error || 'No active EA Trading subscriptions found for this email.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const handleCancel = async (subId: string) => {
    if (!token) {
      setMessage('Session expired. Please search again.')
      return
    }

    setCancelling(subId)
    try {
      const res = await fetch('/api/copytrading/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_id: subId, token }),
      })
      const data = await res.json()

      if (res.ok) {
        setSubs(prev => prev.map(s => s.id === subId ? { ...s, status: 'cancelled' } : s))
        setMessage('Subscription cancelled. Message us so our team can disconnect your account from the EA.')
        setConfirmCancel(null)
        setConfirmEmail('')
      } else {
        setMessage(data.error || 'Failed to cancel. Please contact support.')
      }
    } catch {
      setMessage('Something went wrong.')
    } finally {
      setCancelling(null)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(5,150,105,0.06)_0%,transparent_50%)]" />
      </div>

      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="/copytrading" className="text-xl font-bold tracking-tight">
            EA Trading
          </a>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/copytrading" className="hover:text-white transition-colors cursor-pointer">&larr; Back</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Manage Subscription</h1>
          <p className="text-neutral-400">Enter your email to find and manage your EA Trading subscription.</p>
        </div>

        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-neutral-300 text-sm font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-12 px-4 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? 'Searching...' : 'Find My Subscription'}
            </button>
          </form>

          {status === 'found' && subs.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-white font-semibold">Your EA Trading Subscriptions</h3>
              {subs.map(sub => (
                <div key={sub.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{sub.plan}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : sub.status === 'cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-xs mb-3">
                    ₹9,500/month &middot; Created: {sub.created}
                  </div>

                  {sub.status === 'active' && confirmCancel !== sub.id && (
                    <button
                      onClick={() => { setConfirmCancel(sub.id); setConfirmEmail('') }}
                      className="w-full py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                      Cancel Subscription
                    </button>
                  )}

                  {sub.status === 'active' && confirmCancel === sub.id && (
                    <div className="mt-3 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                      <p className="text-red-400 text-sm font-medium mb-3">
                        To confirm cancellation, re-enter your email address:
                      </p>
                      <input
                        type="email"
                        placeholder="Re-enter your email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="w-full bg-black/50 border border-red-500/20 text-white placeholder:text-neutral-600 rounded-lg h-10 px-3 text-sm outline-none focus:border-red-500/50 mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setConfirmCancel(null); setConfirmEmail('') }}
                          className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 text-sm cursor-pointer hover:bg-white/10"
                        >
                          Keep Subscription
                        </button>
                        <button
                          onClick={() => {
                            if (confirmEmail.toLowerCase().trim() === email.toLowerCase().trim()) {
                              handleCancel(sub.id)
                            } else {
                              setMessage('Email does not match. Please re-enter correctly.')
                            }
                          }}
                          disabled={cancelling === sub.id || !confirmEmail}
                          className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-medium cursor-pointer hover:bg-red-700 disabled:opacity-50"
                        >
                          {cancelling === sub.id ? 'Cancelling...' : 'Confirm Cancel'}
                        </button>
                      </div>
                    </div>
                  )}

                  {sub.status === 'cancelled' && (
                    <div className="text-neutral-500 text-xs flex items-center gap-1.5">
                      <span className="text-red-400">●</span> Cancelled — access until end of billing period.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {message && (
            <div className={`mt-6 p-4 rounded-xl border text-sm ${status === 'error' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'}`}>
              {message}
            </div>
          )}
        </div>

        <p className="text-center text-neutral-600 text-xs mt-6">
          Need help? Contact <a href="tel:+919547774580" className="text-emerald-400 hover:underline">+91 95477 74580</a> or <a href="mailto:teamkoushikranjit@gmail.com" className="text-emerald-400 hover:underline">teamkoushikranjit@gmail.com</a>
        </p>
      </div>

      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <nav className="flex items-center gap-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/copytrading" className="hover:text-white transition-colors">EA Trading</a>
            <a href="/vps" className="hover:text-white transition-colors">VPS</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:+919547774580" className="hover:text-emerald-400 transition-colors">+91 95477 74580</a>
            <a href="mailto:teamkoushikranjit@gmail.com" className="hover:text-emerald-400 transition-colors">teamkoushikranjit@gmail.com</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

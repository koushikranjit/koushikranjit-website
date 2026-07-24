'use client'

import { useState } from 'react'

export default function ManageVPSSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'cancelled' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [subs, setSubs] = useState<{ id: string; status: string; plan: string; quantity: number; created: string }[]>([])
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
      const res = await fetch(`/api/vps/lookup?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()

      if (res.ok && data.subscriptions?.length > 0) {
        setSubs(data.subscriptions)
        setToken(data.token || '')
        setStatus('found')
      } else {
        setStatus('error')
        setMessage(data.error || 'No active VPS subscriptions found for this email.')
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
      const res = await fetch('/api/vps/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_id: subId, token }),
      })
      const data = await res.json()

      if (res.ok) {
        setSubs(prev => prev.map(s => s.id === subId ? { ...s, status: 'cancelled' } : s))
        setMessage('Subscription cancelled. You retain access until the end of your billing period.')
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
    <main className="relative min-h-screen bg-[#0f0f0f] text-white font-['Inter',sans-serif]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(5,150,105,0.06)_0%,transparent_50%)]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="/vps" className="text-xl font-bold tracking-tight">
            Koushik VPS
          </a>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/vps" className="hover:text-white transition-colors cursor-pointer">&larr; Back</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Manage Subscription</h1>
          <p className="text-neutral-400">Enter your email to find and manage your VPS subscription.</p>
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
              <h3 className="text-white font-semibold">Your VPS Subscriptions</h3>
              {subs.map(sub => (
                <div key={sub.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">Koushik VPS &times; {sub.quantity}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : sub.status === 'cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-xs mb-3">
                    ₹{(1200 * sub.quantity).toLocaleString('en-IN')}/month &middot; Created: {sub.created}
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

      <footer className="relative border-t border-white/[0.06] bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 mb-14 sm:mb-20">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-600 mb-3">Contact</p>
              <div className="space-y-2 text-sm">
                <a href="https://wa.me/919547774580" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors">+91 95477 74580</a>
                <a href="mailto:teamkoushikranjit@gmail.com" className="block text-gray-300 hover:text-emerald-400 transition-colors">teamkoushikranjit@gmail.com</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-600 mb-3">Links</p>
              <div className="space-y-2 text-sm">
                <a href="/" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Home</a>
                <a href="/KRtrades" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">KR Trades</a>
                <a href="/ea-trading" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">EA Trading</a>
                <a href="/vps" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">VPS</a>
                <a href="/riskandearning" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Risk Disclaimer</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-600 mb-3">Socials</p>
              <div className="flex items-center gap-2.5">
                <a href="https://share.google/hot7O7ZcHmkO79csu" target="_blank" rel="noopener noreferrer" aria-label="Google" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-colors"><svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></a>
                <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-colors"><svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg></a>
                <a href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-colors"><svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg></a>
                <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-colors"><svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://www.facebook.com/koushikranjitkr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-colors"><svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; 2026 <span className="text-gray-300 font-medium">Koushik Ranjit</span>. All rights reserved.</p>
            <a href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              Back to Top
              <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

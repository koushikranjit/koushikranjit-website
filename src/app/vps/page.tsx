'use client'

import { useState, useEffect } from 'react'

const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

export default function VPSCheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
  }, [])

  const handlePay = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setError('')
    setPaying(true)
    try {
      const res = await fetch('/api/vps/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), quantity }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to start checkout.')
        setPaying(false)
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay
      const rzp = new Razorpay({
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'Koushik VPS',
        description: 'VPS — Monthly Subscription',
        theme: { color: '#059669' },
        prefill: { name: name.trim(), email: email.trim() },
        handler: () => setDone(true),
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch {
      setError('Something went wrong. Please try again.')
      setPaying(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white flex flex-col">
      <header className="border-b border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-[15px] tracking-tight">
            Koushik<span className="text-emerald-400">Ranjit</span>
          </a>
          <nav className="flex items-center gap-4 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/vps/manage" className="hover:text-white transition-colors">Manage</a>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-400 text-2xl">✓</span>
            </div>
            <h1 className="text-lg font-semibold mb-2">Subscription active</h1>
            <p className="text-sm text-gray-400">Thanks — your monthly payment is set up. You&apos;ll be charged ₹{(1200 * quantity).toLocaleString('en-IN')} automatically every month.</p>
            <a href="/vps/manage" className="text-emerald-400 hover:underline text-sm mt-4 inline-block">Manage subscription</a>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-1">Koushik VPS</h1>
            <p className="text-sm text-gray-400 mb-6">Monthly subscription — auto-renews every month</p>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold">₹{(1200 * quantity).toLocaleString('en-IN')}</span>
              <span className="text-gray-400 text-sm">/ month</span>
            </div>
            <p className="text-gray-500 text-xs mb-6">₹1,200 per quantity</p>

            <div className="flex items-center justify-between mb-5 bg-white/[0.05] border border-white/[0.1] rounded-lg h-11 px-2">
              <span className="text-sm text-gray-400 pl-2">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(20, q + 1))}
                  disabled={quantity >= 20}
                  className="w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center disabled:opacity-40 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

            <button
              onClick={handlePay}
              disabled={paying}
              className="w-full h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] transition-colors disabled:opacity-60"
            >
              {paying ? 'Processing...' : 'Subscribe & Pay'}
            </button>
            <p className="text-center text-gray-500 text-xs mt-3">Secure payment via Razorpay · Cancel anytime</p>
            <p className="text-center text-xs mt-2">
              <a href="/vps/manage" className="text-emerald-400 hover:underline">Manage existing subscription</a>
            </p>
          </>
        )}
      </div>
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
    </div>
  )
}

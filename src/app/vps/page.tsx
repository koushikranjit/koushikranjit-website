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
            <p className="text-gray-400 text-xs mb-6">₹1,200 per quantity</p>

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
                className="w-full h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm placeholder:text-gray-400 focus:outline-none focus:border-emerald-500/60"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm placeholder:text-gray-400 focus:outline-none focus:border-emerald-500/60"
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
            <p className="text-center text-gray-400 text-xs mt-3">Secure payment via Razorpay · Cancel anytime</p>
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
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Contact</p>
              <div className="space-y-2 text-sm">
                <a href="https://wa.me/919547774580" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors">+91 95477 74580</a>
                <a href="mailto:teamkoushikranjit@gmail.com" className="block text-gray-300 hover:text-emerald-400 transition-colors">teamkoushikranjit@gmail.com</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Links</p>
              <div className="space-y-2 text-sm">
                <a href="/" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Home</a>
                <a href="/KRtrades" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">KR Trades</a>
                <a href="/ea-trading" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">EA Trading</a>
                <a href="/vps" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">VPS</a>
                <a href="/riskandearning" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Risk Disclaimer</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Socials</p>
              <div className="space-y-2 text-sm">
                <a href="https://share.google/hot7O7ZcHmkO79csu" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Google</a>
                <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">LinkedIn</a>
                <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">X (Twitter)</a>
                <a href="https://www.facebook.com/koushikranjitkr" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
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

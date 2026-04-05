'use client'

import { useState, useEffect, useRef } from 'react'

const TRADE_RESULTS = Array.from({ length: 9 }, (_, i) =>
  `https://github.com/koushikranjit/KR-Website/blob/37b9a4a/kr-trade-result-${i + 1}.png?raw=true`
)

const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

export default function KRTradesPage() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [paying, setPaying] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  const handleSubscribe = async () => {
    setPaying(true)
    try {
      const res = await fetch('/api/subscribe', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Failed to start payment'); setPaying(false); return }

      const options = {
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'KR Trades',
        description: 'Live Futures Trading Room — Monthly',
        theme: { color: '#00e87b' },
        handler: () => {
          window.location.href = 'https://discord.gg/jxuDkpUr5X'
        },
        modal: { ondismiss: () => setPaying(false) },
      }

      const rzp = new (window as Record<string, unknown>).Razorpay(options) as { open: () => void }
      rzp.open()
    } catch {
      alert('Payment failed. Please try again.')
      setPaying(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    // Load Razorpay script
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [lightbox])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-['Inter',sans-serif]">

      {/* ── Global background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,232,123,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,232,123,0.04)_0%,transparent_50%)]" />
      </div>

      {/* ═══════ STICKY NAV ═══════ */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="https://koushikranjit.in" className="text-xl font-bold tracking-tight">
            KR<span className="text-[#00e87b]">trades</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#results" className="hidden sm:inline text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Results</a>
            <a href="#pricing" className="hidden sm:inline text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Pricing</a>
            <a href="/KRtrades/manage" className="hidden sm:inline text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Manage</a>
            <button onClick={handleSubscribe} disabled={paying} className="px-5 py-2 rounded-full bg-[#00e87b] text-black font-semibold text-sm hover:bg-[#00ff88] transition-all cursor-pointer disabled:opacity-60">
              {paying ? 'Loading...' : 'Subscribe Now'}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00e87b]/30 bg-[#00e87b]/10 text-[#00e87b] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00e87b] animate-pulse" />
              Live Daily &mdash; Mon to Fri
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Live Futures
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00e87b] via-[#00ff88] to-[#00e87b]">Trading Room</span>
            </h1>

            <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Join real-time MNQ (NQ) futures trading with full transparency.
              No signals. No hype. Just disciplined trading, live on screen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button onClick={handleSubscribe} disabled={paying} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00e87b] text-black font-bold text-lg hover:bg-[#00ff88] hover:shadow-[0_0_40px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-60">
                {paying ? 'Processing...' : 'Join Now'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <a href="#results" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/80 font-medium hover:border-[#00e87b]/40 transition-all cursor-pointer">
                See Trade Results
              </a>
            </div>

            <p className="mt-4 text-neutral-600 text-sm">Monthly subscription. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section ref={statsRef} className="relative z-10 py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '5+', label: 'Years Trading' },
              { num: 'Daily', label: 'Live Sessions' },
              { num: 'NQ/MNQ', label: 'Futures Focus' },
              { num: '100%', label: 'Transparent P&L' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.15}s` }}>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#00e87b]">{stat.num}</div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT YOU GET ═══════ */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">What&apos;s Included</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything You Need to Trade Live</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Daily Live Trading Room', desc: 'Mon–Fri live sessions. Watch real entries, exits, and risk management in real-time on NQ/MNQ futures.' },
              { title: 'KR Trades Premium Course', desc: 'Complete starter course covering market structure, price action, risk management, and trading psychology. (Bengali)' },
              { title: 'Weekly Market Breakdown', desc: 'End-of-week analysis with key levels, market structure review, and preparation for the week ahead.' },
              { title: 'Trade Recaps & Transparency', desc: 'Every trade documented. Full P&L shared. No hiding losses. Learn from both wins and losses.' },
              { title: 'Risk & Mindset Guidance', desc: 'Position sizing, stop-loss discipline, and the mental frameworks needed to survive and thrive in futures.' },
              { title: 'Private Community Access', desc: 'Discord community of serious traders. Ask questions, share analysis, and grow together with accountability.' },
            ].map((item) => (
              <div key={item.title} className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#00e87b]/20 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#00e87b]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#00e87b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00e87b] transition-colors">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MINI COURSE CURRICULUM ═══════ */}
      <section className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Included Course</div>
            <h2 className="text-3xl sm:text-4xl font-bold">KR Trades Premium Starter Course</h2>
            <p className="text-neutral-500 mt-3 max-w-lg mx-auto">Understand how I trade before joining live sessions. 4 sections, 10 lectures, 42 min of focused content.</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { section: 'Introduction to Premium', lectures: '2 lectures · 9min 15s', items: ['How to Navigate Discord — 6min 43s', 'How Live Trading Works — 2min 32s'] },
              { section: 'Chart Setup', lectures: '3 lectures · 17min 16s', items: ['ICT Indicator & Settings — 9min 55s', 'Setting up FVGs, IFVG, HIGHS/LOWS — 4min 18s', 'Overnight Highs/Lows — 3min 2s'] },
              { section: 'IFVG MODEL', lectures: '4 lectures · 14min 41s', items: ['FVGs Explained — 4min 27s', 'IVFG Model — 3min 35s', 'IVFG Buyside Example — 3min 8s', 'Advanced IFVG Lesson — 3min 29s'] },
              { section: 'Final Thoughts', lectures: '1 lecture · 1min 25s', items: ['You are ready to trade! — 1min 25s'] },
            ].map((mod) => (
              <div key={mod.section} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <h3 className="text-white font-bold">{mod.section}</h3>
                  <span className="text-neutral-500 text-sm">{mod.lectures}</span>
                </div>
                <div className="divide-y divide-white/5">
                  {mod.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 px-5 py-3">
                      <svg className="w-4 h-4 text-[#00e87b] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
                      <span className="text-neutral-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRADE RESULTS — AUTO-SCROLLING MARQUEE ═══════ */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-results { animation: scroll-left 30s linear infinite; }
        .marquee-results:hover { animation-play-state: paused; }
      `}</style>
      <section id="results" className="relative z-10 py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
          <div className="text-center">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Proof</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Real Trade Results</h2>
            <p className="text-neutral-500 mt-3 max-w-md mx-auto">Actual trades from our live trading room. No cherry-picking. Full transparency.</p>
          </div>
        </div>
        <div className="overflow-hidden w-full">
          <div className="marquee-results flex gap-4 w-max">
            {[...TRADE_RESULTS, ...TRADE_RESULTS].map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i % TRADE_RESULTS.length)}
                className="group flex-shrink-0 w-[320px] sm:w-[380px] rounded-xl overflow-hidden border border-white/5 hover:border-[#00e87b]/30 transition-all duration-300 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`KR Trades Live Trade Result ${(i % TRADE_RESULTS.length) + 1} - Nasdaq Futures`}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }} className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          {lightbox < TRADE_RESULTS.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }} className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TRADE_RESULTS[lightbox]}
            alt={`Trade Result ${lightbox + 1}`}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 text-neutral-400 text-sm">{lightbox + 1} / {TRADE_RESULTS.length}</div>
        </div>
      )}

      {/* ═══════ WHO IS THIS FOR ═══════ */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">This Is For You If...</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'You want consistency, not signals hype',
              'You\'re growing a small account with discipline',
              'You want to see real trades, not just theory',
              'You value transparency and accountability',
              'You\'re serious about Nasdaq futures trading',
              'You want a mentor who shows real P&L',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <svg className="w-5 h-5 text-[#00e87b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, Transparent Pricing</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative p-8 sm:p-10 rounded-3xl border-2 border-[#00e87b]/30 bg-gradient-to-b from-[#00e87b]/[0.05] to-transparent">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-[#00e87b] text-black text-sm font-bold">
                Live Trading Room
              </div>

              <div className="text-center mb-8 mt-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-white">Monthly Subscription</span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">Cancel anytime &mdash; Price shown at checkout</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  'KR Trades Premium Starter Course (Bengali)',
                  'Daily Live Trading Room (Mon–Fri)',
                  'Weekly Market Breakdown + Q&A',
                  'Risk & Mindset Guidance',
                  'Trade Recaps with Full Transparency',
                  'Private Discord Community',
                  'Direct Support from Koushik',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-neutral-300 text-sm">
                    <svg className="w-5 h-5 text-[#00e87b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </div>
                ))}
              </div>

              <button onClick={handleSubscribe} disabled={paying} className="block w-full py-4 rounded-xl bg-[#00e87b] text-black font-bold text-lg text-center hover:bg-[#00ff88] hover:shadow-[0_0_40px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-60">
                {paying ? 'Processing...' : 'Subscribe Now'}
              </button>
              <p className="text-center text-neutral-600 text-xs mt-4">Secure payment via Razorpay · UPI · Cards · Netbanking</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">FAQs</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'What time are the live sessions?', a: 'Live sessions happen during US market hours, which is evening IST (around 7 PM – 1:30 AM). Perfect for Indian traders with day jobs.' },
              { q: 'What do I need to join?', a: 'A Discord account, internet connection, and willingness to learn. No prior trading experience required — the course covers everything from basics.' },
              { q: 'Is this signals or copy trading?', a: 'No. This is a live trading room where you watch and learn the decision-making process. You learn WHY trades are taken, not just WHAT to trade.' },
              { q: 'Can I cancel anytime?', a: 'Yes. It\'s a monthly subscription. Cancel anytime from your TagMango dashboard — no questions asked.' },
              { q: 'Will I get recordings if I miss a session?', a: 'Yes. All live sessions are recorded and available in the community for you to watch later.' },
              { q: 'Is the course in Hindi or English?', a: 'The premium starter course is in Bengali. Live sessions are conducted in a mix of Bengali and Hindi for maximum understanding.' },
            ].map((faq, i) => (
              <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-[#00e87b] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
                  <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            Trade Live.<br />
            <span className="text-[#00e87b]">Learn by Watching Real Trades.</span>
          </h2>
          <p className="text-neutral-400 mt-6 text-lg">
            No theory. No indicators dump. Just a trader, a screen, and full transparency.
          </p>
          <button onClick={handleSubscribe} disabled={paying} className="inline-flex items-center gap-2 mt-10 px-10 py-5 rounded-xl bg-[#00e87b] text-black font-bold text-lg hover:bg-[#00ff88] hover:shadow-[0_0_60px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-60">
            {paying ? 'Processing...' : 'Join KR Trades'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
          <p className="text-neutral-600 text-sm mt-4">Educational purpose only. Trading involves risk.</p>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">KR<span className="text-[#00e87b]">trades</span></span>
              <span className="text-neutral-600 text-sm">&copy; 2026 Koushik Ranjit</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">Instagram</a>
              <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">X</a>
              <a href="https://discord.gg/jxuDkpUr5X" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">Discord</a>
              <a href="https://koushikranjit.in" className="hover:text-[#00e87b] transition-colors cursor-pointer">Website</a>
              <a href="/KRtrades/manage" className="hover:text-[#00e87b] transition-colors cursor-pointer">Manage Subscription</a>
            </div>
          </div>
          <p className="text-center text-neutral-700 text-xs mt-6">
            Disclaimer: Trading futures involves substantial risk of loss. Past results do not guarantee future performance. This is for educational purposes only.
          </p>
        </div>
      </footer>
    </main>
  )
}

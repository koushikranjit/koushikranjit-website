'use client'

import { useState, useEffect, useRef } from 'react'

export default function KRTradesPage() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-['Inter',sans-serif]">

      {/* ── Global background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,232,123,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,232,123,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,232,123,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,232,123,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* ═══════ STICKY NAV ═══════ */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="https://koushikranjit.in" className="text-xl font-bold tracking-tight">
            KR<span className="text-[#00e87b]">trades</span>
          </a>
          <a href="#enroll" className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-[#00e87b] text-black font-semibold text-sm hover:bg-[#00ff88] transition-all cursor-pointer">
            Join Now
          </a>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00e87b]/30 bg-[#00e87b]/10 text-[#00e87b] text-sm font-medium mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#00e87b]" />
              Limited Seats &mdash; Batch Starting Soon
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="block text-white/90">Master</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00e87b] via-[#00ff88] to-[#00e87b]">
                Nasdaq Futures
              </span>
              <span className="block text-white/90">Live Trading</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-xl">
              Learn disciplined, rule-based day trading directly from a professional
              Nasdaq futures trader. Real charts. Real entries. Real risk management.
              No fluff.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a href="#enroll" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00e87b] text-black font-bold text-lg hover:bg-[#00ff88] hover:shadow-[0_0_40px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer">
                Start Learning
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#curriculum" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/80 font-medium hover:border-[#00e87b]/40 hover:text-white transition-all cursor-pointer">
                View Curriculum
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00e87b]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Live Market Sessions
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00e87b]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Private Discord Access
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00e87b]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Lifetime Recordings
              </span>
            </div>
          </div>
        </div>

        {/* Decorative chart element */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <polyline fill="none" stroke="#00e87b" strokeWidth="2" points="0,250 30,230 60,240 90,200 120,210 150,180 180,190 210,150 240,160 270,120 300,130 330,80 360,90 400,40" />
            <polyline fill="none" stroke="#00e87b" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" points="0,280 30,260 60,270 90,230 120,240 150,210 180,220 210,180 240,190 270,150 300,160 330,110 360,120 400,70" />
          </svg>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section ref={statsRef} className="relative z-10 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { num: '5+', label: 'Years Trading NQ' },
              { num: '1000+', label: 'Live Trades Executed' },
              { num: '100+', label: 'Students Trained' },
              { num: '6+', label: 'Media Features' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.15}s` }}>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00e87b]">{stat.num}</div>
                <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROBLEM → SOLUTION ═══════ */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="p-8 rounded-2xl border border-red-500/10 bg-red-500/[0.03]">
              <div className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">The Problem</div>
              <h3 className="text-2xl font-bold text-white mb-6">Why Most Traders Fail</h3>
              <ul className="space-y-4">
                {[
                  'No structured approach — random entries, random exits',
                  'Watching YouTube "gurus" with no real P&L',
                  'Over-leveraging without understanding risk',
                  'No mentor to guide through losing streaks',
                  'Trading based on emotions, not rules',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-400">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Solution */}
            <div className="p-8 rounded-2xl border border-[#00e87b]/10 bg-[#00e87b]/[0.03]">
              <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-4">The Solution</div>
              <h3 className="text-2xl font-bold text-white mb-6">What You&apos;ll Learn with KR Trades</h3>
              <ul className="space-y-4">
                {[
                  'Rule-based entry & exit framework — no guessing',
                  'Live market sessions with real-time analysis',
                  'Risk management that protects your capital',
                  'Market structure reading & price action mastery',
                  'Trading psychology & discipline building',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-400">
                    <svg className="w-5 h-5 text-[#00e87b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CURRICULUM ═══════ */}
      <section id="curriculum" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Curriculum</div>
            <h2 className="text-3xl sm:text-4xl font-bold">What&apos;s Inside the Program</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Market Structure', desc: 'Understand how institutional players move the market. Learn to read structure before placing a trade.' },
              { num: '02', title: 'Price Action & Order Flow', desc: 'Master candlestick patterns, supply & demand zones, and order flow reading for precise entries.' },
              { num: '03', title: 'Risk Management', desc: 'Position sizing, stop-loss placement, and risk-reward frameworks that protect your capital.' },
              { num: '04', title: 'Live Trading Sessions', desc: 'Watch real trades being executed live with real-time commentary and decision-making process.' },
              { num: '05', title: 'Trading Psychology', desc: 'Build the mental discipline needed to follow rules, handle losses, and stay consistent.' },
              { num: '06', title: 'Trade Journaling', desc: 'Learn to track, review, and improve using structured journaling and performance analytics.' },
            ].map((mod) => (
              <div key={mod.num} className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#00e87b]/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                <div className="text-4xl font-black text-[#00e87b]/10 mb-3">{mod.num}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00e87b] transition-colors">{mod.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHO IS THIS FOR ═══════ */}
      <section className="relative z-10 py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Who Is This For?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Complete Beginners', desc: 'New to trading and want to start with a proper foundation, not random tips.' },
              { title: 'Struggling Traders', desc: 'Been trading but losing money consistently. Need a structured, proven approach.' },
              { title: 'Strategy Seekers', desc: 'Looking for a clear, repeatable system for Nasdaq futures with real edge.' },
              { title: 'Prop Firm Aspirants', desc: 'Want to pass prop firm challenges with disciplined trading and risk control.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT MENTOR ═══════ */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-[350px] flex-shrink-0">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00e87b]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/koushikranjit/KR-Website/blob/847c7b2/koushik-host3.png?raw=true"
                  alt="Koushik Ranjit - Nasdaq Futures Day Trader"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Your Mentor</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Koushik Ranjit</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Koushik Ranjit is an Indian proprietary day trader specialising in Nasdaq futures,
                recognised for a disciplined, analytical, and structure-driven trading approach.
                With 5+ years of active trading experience, he has been featured in APN News,
                Vocal Media, Interviewer PR, Bhaskar Live, and more.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                He started from scratch — no trading background, no family in finance.
                Everything he teaches comes from years of screen time, losses learned from,
                and a system built through real market experience. Not theory. Not indicators.
                Pure price action and discipline.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Nasdaq Futures', 'Price Action', 'Risk Management', 'Prop Firm Funded'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-[#00e87b]/20 bg-[#00e87b]/5 text-[#00e87b] text-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PRICING / ENROLL ═══════ */}
      <section id="enroll" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="text-[#00e87b] text-sm font-semibold uppercase tracking-wider mb-3">Enroll Now</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Invest in Your Trading Future</h2>
            <p className="text-neutral-500 mt-3 max-w-md mx-auto">One-time payment. Lifetime access. No hidden fees.</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="relative p-8 sm:p-10 rounded-3xl border-2 border-[#00e87b]/30 bg-gradient-to-b from-[#00e87b]/[0.05] to-transparent">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-[#00e87b] text-black text-sm font-bold">
                Most Popular
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white">KR Trades Complete Program</h3>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold text-white">Coming Soon</span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">Price will be announced shortly</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  'Full Curriculum (6 Modules)',
                  'Live Trading Sessions (Weekly)',
                  'Private Discord Community',
                  'Recorded Sessions — Lifetime Access',
                  'Trade Journaling Templates',
                  'Direct Mentor Support',
                  'Prop Firm Challenge Guidance',
                  'Certificate of Completion',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-neutral-300">
                    <svg className="w-5 h-5 text-[#00e87b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feature}
                  </div>
                ))}
              </div>

              <a href="https://discord.gg/jxuDkpUr5X" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-[#00e87b] text-black font-bold text-lg text-center hover:bg-[#00ff88] hover:shadow-[0_0_40px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer">
                Join Waitlist
              </a>
              <p className="text-center text-neutral-600 text-xs mt-4">Join our Discord to get notified when enrollment opens</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="relative z-10 py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Do I need prior trading experience?', a: 'No. The program is designed for all levels — from complete beginners to traders who want to refine their approach. We start from the basics and build up.' },
              { q: 'What market do you trade?', a: 'We focus exclusively on Nasdaq (NQ) futures. This is one of the most liquid and volatile markets — perfect for day trading with a disciplined approach.' },
              { q: 'Are the sessions live or recorded?', a: 'Both. We have live weekly sessions where you watch real trades happen in real-time. All sessions are also recorded and available for lifetime access.' },
              { q: 'Will this help me pass prop firm challenges?', a: 'Yes. The risk management and trading system taught in this program is specifically designed to be prop-firm compatible. Many students have successfully funded their accounts.' },
              { q: 'What if I have a full-time job?', a: 'Nasdaq futures trading sessions align with US market hours (evening IST). All sessions are recorded, so you can watch at your convenience.' },
              { q: 'Is there a refund policy?', a: 'Due to the nature of digital content and live sessions, we do not offer refunds. However, we provide a detailed curriculum preview before enrollment so you know exactly what you are getting.' },
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
      <section className="relative z-10 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            Stop Guessing.<br />
            <span className="text-[#00e87b]">Start Trading with Rules.</span>
          </h2>
          <p className="text-neutral-400 mt-6 text-lg max-w-xl mx-auto">
            The market doesn&apos;t care about your feelings. It rewards discipline.
            Learn the system. Follow the rules. Build consistency.
          </p>
          <a href="#enroll" className="inline-flex items-center gap-2 mt-10 px-10 py-5 rounded-xl bg-[#00e87b] text-black font-bold text-lg hover:bg-[#00ff88] hover:shadow-[0_0_60px_rgba(0,232,123,0.3)] transition-all duration-300 cursor-pointer">
            Join KR Trades
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">KR<span className="text-[#00e87b]">trades</span></span>
              <span className="text-neutral-600 text-sm">&copy; 2026 Koushik Ranjit</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">Instagram</a>
              <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">X / Twitter</a>
              <a href="https://discord.gg/jxuDkpUr5X" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e87b] transition-colors cursor-pointer">Discord</a>
              <a href="https://koushikranjit.in" className="hover:text-[#00e87b] transition-colors cursor-pointer">Website</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

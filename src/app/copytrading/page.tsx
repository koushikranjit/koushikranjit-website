'use client'

import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '919547774580'
const MYFXBOOK = 'https://www.myfxbook.com/members/koushik_ranjit/koushik-ranjit/12009479'
const DISCORD = 'https://discord.gg/sffdu4wXx2'

// ── Icons (inline, zero dependency) ─────────────────────────────────────
const Icon = {
  userPlus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" /></svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  ),
}

const STEPS = [
  { n: '01', title: 'Subscribe', body: "Message me your details and pay $100/month to get set up as a subscriber on my copy trading signal.", icon: Icon.userPlus },
  { n: '02', title: 'Deposit with your broker', body: 'Fund your MT4/MT5 broker account — any broker that supports copy trading works.', icon: Icon.wallet },
  { n: '03', title: 'Connect your account', body: "Link your broker account to my signal. That's it — every trade I take copies to your account automatically from there.", icon: Icon.link },
]

const PILLARS = [
  { icon: Icon.shield, title: 'Discipline, not guesswork', body: 'Every trade follows the same rule-based approach I use on my own account — no impulsive entries, no revenge trades.' },
  { icon: Icon.sliders, title: 'You stay in control', body: 'Set your own lot multiplier and exposure limits in Social Trader Tools. Your risk settings, your account, your call.' },
  { icon: Icon.chart, title: 'Fully verifiable', body: "Nothing is hidden. Every trade I take is public and timestamped on Myfxbook — check it before you sign up, not after." },
]

const FEATURES = [
  { icon: Icon.refresh, title: 'Real-time trade copying', body: 'Trades mirror to your account the moment I place them — same instrument, proportional size.' },
  { icon: Icon.sliders, title: 'You control the risk', body: 'Set your own lot multiplier and max exposure. Nothing is forced on your account.' },
  { icon: Icon.link, title: 'Works with your broker', body: 'No need to switch brokers — connect any MT4/MT5 account that supports copy trading.' },
  { icon: Icon.chart, title: 'Verified live track record', body: 'Every trade is public on Myfxbook. Nothing hidden, nothing backtested.' },
  { icon: Icon.x, title: 'No EA, no bot', body: "This isn't an algorithm you buy and run blind. It's my live account, copied to yours in real time." },
  { icon: Icon.shield, title: 'Cancel anytime', body: 'Monthly, no lock-in. Disconnect your account whenever you want.' },
]

const FAQS = [
  { q: 'Do I get an EA or trading bot?', a: "No. There's no EA, bot, or algorithm for sale here. This is live copy trading — my actual trades are mirrored to your account in real time through Social Trader Tools." },
  { q: 'What do I need to get started?', a: 'A funded broker account (MT4/MT5) that allows copy trading. Subscribe, deposit with your broker, and connect your account — I\'ll walk you through it once you sign up.' },
  { q: 'Can I control how much risk I take?', a: 'Yes. Social Trader Tools lets you set a lot multiplier and risk limits on your side, independent of my account size.' },
  { q: 'Is this guaranteed to make money?', a: 'No. Trading carries real risk of loss, and copy trading is no exception — see the full risk disclaimer below before signing up.' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-center text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">{children}</div>
}

export default function CopyTradingPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [broker, setBroker] = useState('')

  useEffect(() => { setMounted(true) }, [])

  const openWhatsApp = () => {
    const lines = [
      "Hi Koushik, I'd like to start copy trading.",
      name.trim() ? `Name: ${name.trim()}` : null,
      email.trim() ? `Email: ${email.trim()}` : null,
      broker.trim() ? `Broker: ${broker.trim()}` : null,
    ].filter(Boolean)
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/[0.06] bg-black/60 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-[15px] tracking-tight">
            Koushik<span className="text-emerald-400">Ranjit</span>
          </a>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/vps" className="hover:text-white transition-colors">VPS</a>
            <a href={MYFXBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Live Results</a>
          </nav>
          <button
            onClick={openWhatsApp}
            className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px]" />
          <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-16 sm:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Copy Trading
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-5">
              Copy my trades.<br /> Profit with <span className="text-emerald-400">discipline.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8">
              Connect your broker account and mirror every trade I take in real time. No EA, no bot to buy — just my live account, copied to yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-6">
              <button
                onClick={openWhatsApp}
                className="w-full sm:w-auto h-12 px-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] transition-colors shadow-[0_0_24px_rgba(16,185,129,0.25)]"
              >
                Get Started
              </button>
              <a
                href={MYFXBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 px-8 rounded-lg border border-white/[0.12] hover:bg-white/[0.05] text-white font-semibold text-[15px] transition-colors flex items-center justify-center"
              >
                See Live Results
              </a>
            </div>
            <p className="text-gray-500 text-xs">$100/month · connect via Social Trader Tools · cancel anytime</p>

            <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-400">
              {['Real broker account, not a bot', 'Real-time trade execution', 'No lock-in — cancel anytime'].map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: live signal card */}
          <div className="relative">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold">Signal Status</span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">Active</span>
              </div>

              <div className="space-y-2.5 mb-5">
                {[
                  { label: 'Provider', value: 'Koushik Ranjit' },
                  { label: 'Markets', value: 'Nasdaq Futures · XAU/USD' },
                  { label: 'Execution', value: 'Real-time' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className="text-xs font-medium text-gray-200">{row.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={MYFXBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-emerald-600/10 border border-emerald-500/30 rounded-xl px-4 py-3.5 hover:bg-emerald-600/15 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                    <span className="w-4 h-4 block">{Icon.chart}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Verified on Myfxbook</p>
                    <p className="text-[11px] text-gray-500">Every trade, publicly timestamped</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* No EA callout */}
      <section className="max-w-3xl mx-auto px-4 pb-4">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex gap-4 items-start">
          <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">i</div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">We don&apos;t sell an EA or a bot.</span> This is live copy trading — trades are mirrored directly from my account to yours in real time via Social Trader Tools, not an automated algorithm running on your terminal.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <SectionLabel>Getting Started</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">How Copy Trading Works</h2>
        <p className="text-gray-400 text-center mb-12">Three steps. That&apos;s it.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {STEPS.map(step => (
            <div key={step.n} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <span className="w-5 h-5 block">{step.icon}</span>
              </div>
              <div className="text-emerald-400 font-mono text-xs mb-2">{step.n}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live performance */}
      <section className="relative py-20 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionLabel>Track Record</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            See My Live Trading Performance
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            No cherry-picked screenshots, no backtests. Every trade I take is public and independently verified — check the account before you connect yours to it.
          </p>
          <a
            href={MYFXBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-6 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-emerald-500/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="w-5 h-5 block">{Icon.chart}</span>
            </div>
            <div className="text-left">
              <p className="font-semibold">Koushik Ranjit — Verified Portfolio</p>
              <p className="text-xs text-gray-500">myfxbook.com · live &amp; independently tracked</p>
            </div>
            <span className="text-emerald-400 text-lg ml-2">→</span>
          </a>
        </div>
      </section>

      {/* Why it works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <SectionLabel>The Approach</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why This Works</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {PILLARS.map(p => (
            <div key={p.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <span className="w-4.5 h-4.5 block">{p.icon}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-emerald-600/15 to-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 sm:p-7 text-center">
          <h3 className="font-bold text-lg mb-1.5">No EA. No Guesswork.</h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            You&apos;re not buying a black-box algorithm — you&apos;re copying a real, disciplined trader whose entire track record is public.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <SectionLabel>Included</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Everything You Get</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <span className="w-4 h-4 block">{f.icon}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing + Signup */}
      <section className="max-w-3xl mx-auto px-4 py-20" id="signup">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Choose Your Plan</h2>
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] max-w-md mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-1 text-gray-300">Copy Trading Access</h3>
            <div className="flex items-baseline justify-center gap-1 mt-4">
              <span className="text-4xl font-bold">$100</span>
              <span className="text-gray-400 text-sm">/ month</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Subscribe, deposit with your broker, connect your account — done.</p>
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
            <input
              type="text"
              placeholder="Broker (optional)"
              value={broker}
              onChange={e => setBroker(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <button
            onClick={openWhatsApp}
            className="w-full h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] transition-colors shadow-[0_0_24px_rgba(16,185,129,0.2)]"
          >
            Message me on WhatsApp
          </button>
          <p className="text-center text-gray-500 text-xs mt-3">
            I&apos;ll reply personally to set up payment and walk you through connecting your account.
          </p>
          <p className="text-center text-xs mt-2">
            or reach out on <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Discord</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-8 w-full">
        <SectionLabel>Questions</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map(item => (
            <details key={item.q} className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 open:bg-white/[0.05]">
              <summary className="font-medium text-sm cursor-pointer list-none flex items-center justify-between gap-4">
                {item.q}
                <span className="text-emerald-400 shrink-0 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-sm text-gray-400 leading-relaxed mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Risk note */}
      <section className="max-w-3xl mx-auto px-4 pb-16 w-full">
        <p className="text-center text-xs text-gray-500 leading-relaxed">
          Copy trading involves substantial risk of loss and is not suitable for all investors. Past performance shown on Myfxbook is not indicative of future results.
          By signing up you agree to the <a href="/riskandearning" className="text-emerald-400 hover:underline">Risk &amp; Earning Disclaimer</a>.
        </p>
      </section>

      <div className="flex-1" />

      <footer className="border-t border-white/[0.06] bg-white/[0.02] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <nav className="flex items-center gap-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/vps" className="hover:text-white transition-colors">VPS</a>
            <a href="/riskandearning" className="hover:text-white transition-colors">Risk Disclaimer</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:+919547774580" className="hover:text-emerald-400 transition-colors">+91 95477 74580</a>
            <a href="mailto:teamkoushikranjit@gmail.com" className="hover:text-emerald-400 transition-colors">teamkoushikranjit@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

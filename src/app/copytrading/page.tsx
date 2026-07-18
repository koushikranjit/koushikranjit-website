'use client'

import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '919547774580'
const MYFXBOOK = 'https://www.myfxbook.com/members/koushik_ranjit/koushik-ranjit/12009479'
const DISCORD = 'https://discord.gg/sffdu4wXx2'

const STEPS = [
  {
    n: '01',
    title: 'Sign up',
    body: "Message me your details and I'll set you up as a subscriber on Social Trader Tools — the platform that handles the actual trade copying.",
  },
  {
    n: '02',
    title: 'Get hosting',
    body: 'Your broker terminal needs to stay online 24/7 for trades to copy in real time. Grab a VPS — takes two minutes.',
    cta: { label: 'Get VPS hosting →', href: '/vps' },
  },
  {
    n: '03',
    title: 'Connect your account',
    body: "Link your MT4/MT5 broker account to my signal via Social Trader Tools. From then on, every trade I take copies to your account automatically.",
  },
]

const FEATURES = [
  { title: 'Real-time trade copying', body: 'Trades mirror to your account the moment I place them — same instrument, proportional size.' },
  { title: 'You control the risk', body: 'Set your own lot multiplier and max exposure in Social Trader Tools. Nothing is forced on your account.' },
  { title: 'Works with your broker', body: 'No need to switch brokers — connect any MT4/MT5 account that supports copy trading.' },
  { title: 'Verified live track record', body: 'Every trade is public on Myfxbook. Nothing hidden, nothing backtested.' },
  { title: 'No EA, no bot', body: "This isn't an algorithm you buy and run blind. It's my live account, copied to yours in real time." },
  { title: 'Cancel anytime', body: 'Monthly, no lock-in. Disconnect your account whenever you want.' },
]

const FAQS = [
  {
    q: 'Do I get an EA or trading bot?',
    a: "No. There's no EA, bot, or algorithm for sale here. This is live copy trading — my actual trades are mirrored to your account in real time through Social Trader Tools.",
  },
  {
    q: 'What do I need to get started?',
    a: 'A funded broker account (MT4/MT5) that allows copy trading, and a VPS to keep the terminal running around the clock. I\'ll walk you through connecting once you sign up.',
  },
  {
    q: 'Why do I need a VPS?',
    a: "Copy trading only works while your terminal is running. A VPS keeps it online 24/7 even when your laptop is off — that's what makes the copying reliable.",
  },
  {
    q: 'Can I control how much risk I take?',
    a: "Yes. Social Trader Tools lets you set a lot multiplier and risk limits on your side, independent of my account size.",
  },
  {
    q: 'Is this guaranteed to make money?',
    a: 'No. Trading carries real risk of loss, and copy trading is no exception — see the full risk disclaimer below before signing up.',
  },
]

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
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/[0.06] bg-white/[0.02] sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-[15px] tracking-tight">
            Koushik<span className="text-emerald-400">Ranjit</span>
          </a>
          <nav className="flex items-center gap-4 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/KRtrades" className="hover:text-white transition-colors">KR Trades</a>
            <a href="/vps" className="hover:text-white transition-colors">VPS</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Copy Trading
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            Copy my trades.<br className="hidden sm:block" /> <span className="text-emerald-400">Automatically.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Connect your broker account and mirror every trade I take in real time. No EA, no bot to buy — just my live account, copied to yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto h-12 px-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] transition-colors"
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
          <p className="text-gray-500 text-xs mt-4">$100/month · connect via Social Trader Tools · cancel anytime</p>
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
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">How it works</h2>
        <p className="text-gray-400 text-center mb-10">Three steps. That&apos;s it.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {STEPS.map(step => (
            <div key={step.n} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="text-emerald-400 font-mono text-sm mb-3">{step.n}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{step.body}</p>
              {step.cta && (
                <a href={step.cta.href} className="text-emerald-400 text-sm font-medium hover:underline">
                  {step.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">What you get</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing + Signup */}
      <section className="max-w-3xl mx-auto px-4 py-16" id="signup">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-1">Start copy trading</h2>
            <div className="flex items-baseline justify-center gap-1 mt-4">
              <span className="text-4xl font-bold">$100</span>
              <span className="text-gray-400 text-sm">/ month</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Signal access via Social Trader Tools. VPS hosting billed separately.</p>
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
            className="w-full h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] transition-colors"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">FAQ</h2>
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

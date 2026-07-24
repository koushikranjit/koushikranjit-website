'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Config ─────────────────────────────────────────────────────────────────
const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'
const MONTHLY_INR = 9500
const MIN_DEPOSIT = 300
const MYFXBOOK = 'https://www.myfxbook.com/members/koushik_ranjit/koushik-ranjit/12009479'
const DISCORD = 'https://discord.gg/sffdu4wXx2'
const VANTAGE_URL = 'https://vigco.co/la-com-inv/TpCuu75a'
const VANTAGE_CODE = 'TpCuu75a'
const LIVE_STATS_DATE = 'Jul 18, 2026'

// Real MT4 mobile "History" screenshots — actual account snapshots, not mockups.
const TRADE_SCREENSHOTS = [
  { src: '/images/trade-history/snap-01.jpg', profit: '369.50' },
  { src: '/images/trade-history/snap-02.jpg', profit: '447.94' },
  { src: '/images/trade-history/snap-03.jpg', profit: '358.85' },
  { src: '/images/trade-history/snap-04.jpg', profit: '705.61' },
  { src: '/images/trade-history/snap-05.jpg', profit: '425.63' },
  { src: '/images/trade-history/snap-06.jpg', profit: '331.26' },
  { src: '/images/trade-history/snap-07.jpg', profit: '373.75' },
  { src: '/images/trade-history/snap-08.jpg', profit: '472.38' },
  { src: '/images/trade-history/snap-09.jpg', profit: '558.86' },
  { src: '/images/trade-history/snap-10.jpg', profit: '391.71' },
  { src: '/images/trade-history/snap-11.jpg', profit: '982.84' },
  { src: '/images/trade-history/snap-12.jpg', profit: '587.90' },
  { src: '/images/trade-history/snap-13.jpg', profit: '311.87' },
  { src: '/images/trade-history/snap-14.jpg', profit: '475.09' },
  { src: '/images/trade-history/snap-15.jpg', profit: '1,039.02' },
]

// Real, unedited snapshot of every account currently running the system on Myfxbook —
// wins and losses both included, exactly as shown on the live "Systems" table.
const SYSTEMS = [
  { name: 'Koushik Ranjit', gain: '+6864.13%', drawdown: '41.73%', profit: '$1039.02', deposits: '$100.06' },
  { name: 'Samah', gain: '+2361.84%', drawdown: '56.65%', profit: '$705.61', deposits: '$100.00' },
  { name: 'Koushik Ranjit 2', gain: '+961.69%', drawdown: '52.59%', profit: '$477.13', deposits: '$150.00' },
  { name: 'Koushik Ranjit 3', gain: '+1293.04%', drawdown: '51.52%', profit: '$599.70', deposits: '$150.00' },
  { name: 'Koushik Ranjit 5', gain: '+799.54%', drawdown: '35.39%', profit: '$564.53', deposits: '$200.00' },
  { name: 'Koushik Ranjit 6', gain: '+772.27%', drawdown: '9.71%', profit: '$395.35', deposits: '$117.00' },
  { name: 'Koushik Ranjit 7', gain: '+751.99%', drawdown: '10.55%', profit: '$474.38', deposits: '$100.00' },
  { name: 'Koushik Ranjit 8', gain: '+457.39%', drawdown: '10.21%', profit: '$377.05', deposits: '$100.00' },
  { name: 'Koushik Ranjit 9', gain: '+373.73%', drawdown: '10.11%', profit: '$333.56', deposits: '$100.00' },
  { name: 'Koushik Ranjit 10', gain: '+427.63%', drawdown: '13.29%', profit: '$427.63', deposits: '$100.00' },
  { name: 'Koushik Ranjit 11', gain: '+381.67%', drawdown: '27.27%', profit: '$271.16', deposits: '$190.88' },
  { name: 'Koushik Ranjit 12', gain: '+332.0%', drawdown: '26.76%', profit: '$274.14', deposits: '$134.87' },
  { name: 'Koushik Ranjit 13', gain: '+355.84%', drawdown: '29.94%', profit: '$224.15', deposits: '$226.87' },
  { name: 'Koushik Ranjit 14', gain: '+268.85%', drawdown: '30.09%', profit: '$202.12', deposits: '$153.00' },
  { name: 'Koushik Ranjit 15', gain: '+162.08%', drawdown: '29.40%', profit: '$164.19', deposits: '$158.00' },
]

const STEPS = [
  { n: 1, title: 'Subscribe', body: '$100/month via Razorpay. Cancel anytime.' },
  { n: 2, title: 'Create a Vantage account', body: 'Platform: MT4 · Account type: RAW ECN · Currency: USD. Deposit a minimum of $300.' },
  { n: 3, title: 'Create a ticket on Discord', body: "Once you've subscribed and deposited, open a ticket in our Discord — our team connects your account for you." },
]

const FAQS = [
  { q: 'What is an "EA"?', a: 'EA stands for Expert Advisor — a program that trades automatically inside MetaTrader. Think of it as a robot that follows a fixed set of rules and places trades for you, without you touching anything.' },
  { q: 'How do I connect my account?', a: 'After subscribing and depositing at least $300 with Vantage Markets, open a support ticket in our Discord server. Our team will connect your account to the EA from there.' },
  { q: 'Why only Vantage Markets?', a: "The system is built and tested to connect specifically with Vantage Markets accounts (MT4, RAW ECN, USD). Using any other broker isn't supported right now." },
  { q: 'Do I need to configure anything myself?', a: "No. Once your Discord ticket is submitted, our team handles connecting your account to the EA system." },
  { q: 'Is this guaranteed to make money?', a: 'No. Automated trading carries real risk of loss like any trading — see the full risk disclaimer below before signing up.' },
  { q: 'Can I cancel anytime?', a: "Yes. It's a monthly subscription with no lock-in — cancel anytime from the Manage page." },
]

// ─── Icons ──────────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20" className="shrink-0">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

// Glass card style helpers (same tokens as /KRtrades)
const GLASS = 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]'
const GLASS_SM = 'bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]'
const GLASS_HOVER = 'hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300'

// ─── TopNavHeader ───────────────────────────────────────────────────────────
function TopNavHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 h-14 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl" style={{ width: '100vw', maxWidth: '100vw' }}>
      <div className="max-w-[1300px] mx-auto h-full flex items-center px-4 lg:px-8">
        <a href="https://koushikranjit.in" className="w-10 h-10 flex items-center justify-center rounded-full text-white shrink-0" aria-label="Go back">
          <ChevronLeft />
        </a>
        <div className="flex items-center gap-2 min-w-0 ml-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-800 flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">KR</div>
          <span className="font-semibold text-[15px] truncate">KR Auto Trading</span>
        </div>
        <div className="ml-auto shrink-0">
          <a href="/ea-trading/manage" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
            Manage
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── HeroBanner ─────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <div className="w-full bg-black/40 overflow-hidden lg:rounded-xl" style={{ aspectRatio: '16/9', maxWidth: '100vw' }}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-900/40 to-black/60 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <span className="relative inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> No Trading Experience Needed
        </span>
        <span className="relative font-black text-2xl sm:text-4xl tracking-tight text-white">KR Auto Trading</span>
        <span className="relative text-emerald-400 font-semibold text-sm sm:text-base tracking-wide">Automated XAU/USD EA · 24/7</span>
      </div>
    </div>
  )
}

// ─── ProductInfo (mobile pricing) ──────────────────────────────────────────
function ProductInfo({ paying, onSubscribe, ctaRef }: { paying: boolean; onSubscribe: () => void; ctaRef: React.RefObject<HTMLButtonElement> }) {
  return (
    <section className="px-4 pt-4 pb-4" role="region" aria-label="Product information">
      <h1 className="text-[22px] font-bold leading-tight">Automated Trading. You Don&apos;t Lift A Finger.</h1>
      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
        You don&apos;t need to know how to trade. Sign up, fund a Vantage Markets account, and an automated system places every trade for you — 24 hours a day, even while you sleep.
      </p>

      <div className="flex items-baseline gap-1 mt-4">
        <span className="text-[28px] font-bold">$100</span>
        <span className="text-gray-400 text-[15px]">/ month</span>
      </div>
      <p className="text-gray-500 text-xs mt-0.5">billed as ₹{MONTHLY_INR.toLocaleString('en-IN')}/month via Razorpay · + ${MIN_DEPOSIT} min. deposit with Vantage</p>

      <a href="/ea-trading/manage" className="text-sm text-emerald-400 mt-2 inline-block">Manage subscription</a>

      <button
        ref={ctaRef}
        onClick={onSubscribe}
        disabled={paying}
        className="w-full h-[52px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-[17px] mt-4 shadow-[0_4px_24px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all active:scale-[0.98] disabled:opacity-60"
      >
        {paying ? 'Processing...' : 'Subscribe & Pay'}
      </button>
    </section>
  )
}

// ─── SocialProofBar ─────────────────────────────────────────────────────────
function SocialProofBar() {
  return (
    <section className="px-4 py-4 flex items-center gap-3 text-[13px] text-gray-400 border-t border-b border-white/[0.06]" role="region" aria-label="Verification links">
      <a href={MYFXBOOK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 shrink-0 text-white font-medium hover:text-emerald-400 transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified on Myfxbook
      </a>
      <div className="w-px h-4 bg-white/10 shrink-0" />
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-800 flex items-center justify-center text-[7px] font-extrabold text-white shrink-0">KR</div>
        <span className="truncate">By <span className="text-white">Koushik Ranjit</span></span>
      </div>
      <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 text-gray-400 hover:text-white transition-colors" aria-label="Discord">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
      </a>
    </section>
  )
}

// ─── PageDescription ────────────────────────────────────────────────────────
function PageDescription() {
  return (
    <section className="px-4 py-5" role="region" aria-label="Description">
      <h2 className="text-[22px] font-extrabold leading-[1.2]">What You Get</h2>
      <div className="mt-4 flex flex-col lg:grid lg:grid-cols-2 gap-2.5">
        {[
          'One simple system — nothing complicated to learn',
          'Trades Gold (XAU/USD) automatically, 24/7',
          `Just $100/month + a $${MIN_DEPOSIT} deposit with Vantage Markets`,
          'Our team connects your account via a Discord ticket',
          'Every trade is public and verified on Myfxbook',
          'Cancel anytime — no lock-in',
        ].map(f => (
          <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
            <CheckIcon />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── HowItWorks ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(VANTAGE_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section className="px-4 py-5" role="region" aria-label="How it works">
      <h2 className="text-lg font-bold mb-3">How It Works</h2>
      <div className={`rounded-2xl ${GLASS} divide-y divide-white/[0.06] overflow-hidden`}>
        {STEPS.map(step => (
          <div key={step.n} className="flex items-start gap-4 px-4 py-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
              {step.n}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[15px] mb-0.5">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid sm:grid-cols-3 gap-2.5">
        {[
          { label: 'Trading Platform', value: 'MetaTrader 4' },
          { label: 'Account Type', value: 'RAW ECN' },
          { label: 'Account Currency', value: 'USD' },
        ].map(row => (
          <div key={row.label} className={`rounded-xl ${GLASS_SM} px-4 py-3 text-center`}>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{row.label}</p>
            <p className="text-sm font-semibold text-emerald-400">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-2.5">
        <a
          href={VANTAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 text-center whitespace-nowrap px-3 py-2.5"
        >
          Register With Vantage <span aria-hidden="true">→</span>
        </a>
        <a
          href={DISCORD}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-[13px] sm:text-sm font-semibold transition-colors flex items-center justify-center text-center whitespace-nowrap px-3 py-2.5"
        >
          Open A Discord Ticket
        </a>
      </div>
      <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-500">
        <span>Vantage referral code: <span className="text-gray-300 font-medium">{VANTAGE_CODE}</span></span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] font-medium text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/></svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy
            </>
          )}
        </button>
      </div>
    </section>
  )
}

// ─── TradeHistoryMarquee ────────────────────────────────────────────────────
function TradeHistoryMarquee({ onImageClick }: { onImageClick: (i: number) => void }) {
  return (
    <section className="py-5 overflow-hidden" role="region" aria-label="Real trade history">
      <h2 className="text-lg font-bold px-4 mb-1">Real Trade History</h2>
      <p className="text-gray-500 text-xs px-4 mb-3">Not mockups — actual MetaTrader screenshots, unedited.</p>
      <div style={{ overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
        <div className="flex gap-2.5 px-4 animate-marquee-v hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {[...TRADE_SCREENSHOTS, ...TRADE_SCREENSHOTS].map((shot, i) => (
            <button
              key={i}
              onClick={() => onImageClick(i % TRADE_SCREENSHOTS.length)}
              className="shrink-0 w-[130px] rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2)] relative bg-black"
              style={{ aspectRatio: '9/16' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={`Trade history ${(i % TRADE_SCREENSHOTS.length) + 1}`} className="w-full h-full object-contain" loading="lazy" />
              <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-semibold text-emerald-400 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 text-center">
                ${shot.profit}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SystemsTable ───────────────────────────────────────────────────────────
function SystemsTable() {
  return (
    <section className="px-4 py-5" role="region" aria-label="Live performance across all accounts">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold">Live Performance</h2>
        <span className="text-[11px] text-gray-500">as of {LIVE_STATS_DATE}</span>
      </div>
      <p className="text-gray-500 text-xs mb-3">Every account currently running the system — wins and losses both, nothing hidden.</p>
      <div className={`rounded-2xl ${GLASS} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-white/[0.06]">
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-right font-medium px-3 py-3">Gain</th>
                <th className="text-right font-medium px-3 py-3">Drawdown</th>
                <th className="text-right font-medium px-3 py-3">Profit</th>
                <th className="text-right font-medium px-4 py-3">Deposit</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEMS.map(s => (
                <tr key={s.name} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-gray-200 whitespace-nowrap">{s.name}</td>
                  <td className={`px-3 py-2.5 text-right font-medium whitespace-nowrap ${s.gain.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>{s.gain}</td>
                  <td className="px-3 py-2.5 text-right text-gray-400 whitespace-nowrap">{s.drawdown}</td>
                  <td className="px-3 py-2.5 text-right text-emerald-400 whitespace-nowrap">{s.profit}</td>
                  <td className="px-4 py-2.5 text-right text-gray-400 whitespace-nowrap">{s.deposits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex items-center justify-between gap-3 border-t border-white/[0.06]">
          <p className="text-xs text-gray-500">Numbers change daily — treat as a reference, not a live feed.</p>
          <a href={MYFXBOOK} target="_blank" rel="noopener noreferrer" className="shrink-0 text-emerald-400 text-sm font-semibold hover:underline">View Live →</a>
        </div>
      </div>
    </section>
  )
}

// ─── FAQAccordion ───────────────────────────────────────────────────────────
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-4 py-5" role="region" aria-label="Frequently asked questions">
      <h2 className="text-lg font-bold mb-3">Frequently Asked Questions</h2>
      <div className={`rounded-2xl ${GLASS} divide-y divide-white/[0.06] overflow-hidden`}>
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-4 text-left min-h-[48px]"
              aria-expanded={openIndex === i}
            >
              <span className="text-[15px] font-medium pr-4 text-white">{faq.q}</span>
              <span className={`text-gray-400 text-xl shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── AboutCreator ───────────────────────────────────────────────────────────
function AboutCreator() {
  return (
    <section className="px-4 py-5" role="region" aria-label="About the creator">
      <h2 className="text-lg font-bold mb-3">About the creator</h2>
      <div className={`rounded-2xl ${GLASS} p-4`}>
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/koushikranjit/KR-Website/blob/847c7b2/koushik-host3.png?raw=true"
            alt="Koushik Ranjit"
            className="w-12 h-12 rounded-full object-cover object-top shrink-0"
          />
          <div className="min-w-0">
            <div className="font-bold">Koushik Ranjit</div>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              Indian proprietary day trader specialising in Nasdaq futures and XAU/USD. The same discipline behind KR Trades powers this automated system.
            </p>
            <div className="flex gap-3 mt-2 flex-wrap">
              <a href="/KRtrades" className="text-emerald-400 text-[13px]">KR Trades</a>
              <a href={MYFXBOOK} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-[13px]">Myfxbook</a>
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-[13px]">Discord</a>
              <a href="https://koushikranjit.in" className="text-emerald-400 text-[13px]">Website</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── StickyBottomCTA ────────────────────────────────────────────────────────
function StickyBottomCTA({ visible, paying, onSubscribe }: { visible: boolean; paying: boolean; onSubscribe: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 z-50 pb-[env(safe-area-inset-bottom)] bg-white/[0.03] backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
          style={{ width: '100vw', maxWidth: '100vw' }}
        >
          <div className="px-4 py-3">
            <button
              onClick={onSubscribe}
              disabled={paying}
              className="w-full h-[52px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-[17px] shadow-[0_4px_24px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {paying ? 'Processing...' : 'Subscribe & Pay'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── CheckoutModal ──────────────────────────────────────────────────────────
function CheckoutModal({
  open,
  onClose,
  name,
  setName,
  email,
  setEmail,
  paying,
  payError,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  paying: boolean
  payError: string
  onSubmit: () => void
}) {
  if (!open) return null

  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white/[0.05] backdrop-blur-2xl rounded-t-2xl sm:rounded-2xl p-5 w-full sm:max-w-[400px] border-t border-white/[0.1] sm:border sm:border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg font-bold mb-1">Subscribe</h3>
        <p className="text-gray-400 text-[13px] mb-4">$100/month, billed as ₹{MONTHLY_INR.toLocaleString('en-IN')} via Razorpay.</p>

        <div className="space-y-3 mb-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            className="w-full bg-[#111] border border-white/10 rounded-xl h-12 px-4 text-white text-[15px] outline-none focus:border-emerald-500 transition-colors"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
            className="w-full bg-[#111] border border-white/10 rounded-xl h-12 px-4 text-white text-[15px] outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {payError && <p className="text-red-400 text-xs mb-3">{payError}</p>}

        <div className="flex gap-2.5">
          <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-white/10 bg-transparent text-gray-400 text-sm">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={paying || !name.trim() || !email.trim()}
            className="flex-[2] h-11 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-50 transition-opacity"
          >
            {paying ? 'Processing...' : 'Continue to Payment'}
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-3">Secure payment via Razorpay · cancel anytime</p>
      </div>
    </div>
  )
}

// ─── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({ index, onClose, onChange }: { index: number | null; onClose: () => void; onChange: (n: number) => void }) {
  if (index === null) return null
  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center" aria-label="Close">✕</button>
      {index > 0 && (
        <button onClick={e => { e.stopPropagation(); onChange(index - 1) }} className="absolute left-3 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center" aria-label="Previous">‹</button>
      )}
      {index < TRADE_SCREENSHOTS.length - 1 && (
        <button onClick={e => { e.stopPropagation(); onChange(index + 1) }} className="absolute right-3 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center" aria-label="Next">›</button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TRADE_SCREENSHOTS[index].src} alt={`Trade history ${index + 1}`} className="max-w-full max-h-[85vh] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
      <div className="absolute bottom-5 text-gray-400 text-sm">{index + 1} / {TRADE_SCREENSHOTS.length}</div>
    </div>
  )
}

// ─── DesktopSidebar ─────────────────────────────────────────────────────────
function DesktopSidebar({ paying, onSubscribe }: { paying: boolean; onSubscribe: () => void }) {
  return (
    <aside className="hidden lg:block w-[380px] shrink-0 sticky top-20 self-start">
      <div className={`${GLASS} rounded-2xl p-6`}>
        <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-emerald-900/30 to-black/40 border border-white/[0.06]" style={{ aspectRatio: '3/1' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-black text-xl tracking-widest text-emerald-400">KR AUTO TRADING</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Automated XAU/USD EA
        </div>

        <h3 className="text-[22px] font-bold mb-2">KR Auto Trading</h3>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[28px] font-bold">$100</span>
          <span className="text-gray-400 text-[15px]">/ month</span>
        </div>
        <p className="text-gray-500 text-xs mb-1">billed as ₹{MONTHLY_INR.toLocaleString('en-IN')}/month · + ${MIN_DEPOSIT} min. deposit</p>

        <a href="/ea-trading/manage" className="text-sm text-emerald-400 inline-block mb-5">Manage subscription</a>

        <button
          onClick={onSubscribe}
          disabled={paying}
          className="w-full h-[52px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[17px] transition-colors disabled:opacity-60"
        >
          {paying ? 'Processing...' : 'Subscribe & Pay'}
        </button>
        <p className="text-center text-gray-500 text-xs mt-2">Secure payment via Razorpay</p>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        <div className="w-4 h-4 rounded bg-emerald-400 flex items-center justify-center text-[9px] font-black text-black">K</div>
        <span className="text-gray-500 text-[13px]">Powered by KR Auto Trading</span>
      </div>
    </aside>
  )
}

// ─── Main: CopyTradingPage ──────────────────────────────────────────────────
export default function CopyTradingPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [showStickyCta, setShowStickyCta] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inlineCtaRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!inlineCtaRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(inlineCtaRef.current)
    return () => observer.disconnect()
  }, [mounted])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
  }, [lightbox])

  const handlePay = async () => {
    if (!name.trim() || !email.trim()) {
      setPayError('Please enter your name and email.')
      return
    }
    setPayError('')
    setPaying(true)
    try {
      const res = await fetch('/api/ea-trading/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setPayError(data.error || 'Failed to start checkout.')
        setPaying(false)
        return
      }
      setShowCheckoutModal(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay
      const rzp = new Razorpay({
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'KR Auto Trading',
        description: 'Automated EA Trading — Monthly Subscription',
        theme: { color: '#059669' },
        prefill: { name: name.trim(), email: email.trim() },
        handler: () => { window.location.href = DISCORD },
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch {
      setPayError('Something went wrong. Please try again.')
      setPaying(false)
    }
  }

  const handleSubscribeClick = () => setShowCheckoutModal(true)

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes marquee-v{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .animate-marquee-v{animation:marquee-v 30s linear infinite}
        .copytrading-page *{box-sizing:border-box}
        @media(max-width:1023px){
          .copytrading-page *{max-width:100%}
          .copytrading-page img{max-width:100%;height:auto}
        }
      `}</style>

      <TopNavHeader />

      <div className="lg:hidden">
        <StickyBottomCTA visible={showStickyCta} paying={paying} onSubscribe={handleSubscribeClick} />
      </div>

      <CheckoutModal
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        paying={paying}
        payError={payError}
        onSubmit={handlePay}
      />

      <Lightbox index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />

      <div className="copytrading-page relative w-full bg-[#0f0f0f] min-h-screen text-white" style={{ maxWidth: '100vw', overflowClipMargin: 0, overflowX: 'clip' } as React.CSSProperties}>
        <div className="relative z-[2] max-w-[1200px] mx-auto pt-14 lg:pt-20 lg:px-8 lg:flex lg:items-start lg:gap-8 lg:pb-16 xl:max-w-[1300px]">

          <main className="flex-1 min-w-0 lg:max-w-none">
            <HeroBanner />

            <div className="lg:hidden">
              <ProductInfo paying={paying} onSubscribe={handleSubscribeClick} ctaRef={inlineCtaRef} />
            </div>
            <div className="hidden lg:block" ref={inlineCtaRef} />

            <SocialProofBar />

            <PageDescription />

            <HowItWorks />

            <TradeHistoryMarquee onImageClick={setLightbox} />

            <SystemsTable />

            <FAQAccordion />

            <AboutCreator />

            {/* Risk note */}
            <section className="px-4 pb-6">
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                Automated EA trading involves substantial risk of loss and is not suitable for all investors. Past performance shown on Myfxbook is not indicative of future results.
                By signing up you agree to the <a href="/riskandearning" className="text-emerald-400 hover:underline">Risk &amp; Earning Disclaimer</a>.
              </p>
            </section>

            <div className="h-24 lg:h-0" />
          </main>

          <DesktopSidebar paying={paying} onSubscribe={handleSubscribeClick} />
        </div>

        <footer className="relative z-[2] border-t border-white/[0.06] bg-black overflow-hidden">
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
    </>
  )
}

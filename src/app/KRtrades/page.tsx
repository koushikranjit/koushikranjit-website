'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ───────────────────────────────────────────────────────────────────
const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_094440_a3592600-bd1e-49e5-9bce-a73662061d83.mp4'

const SLIDER_IMAGES = [
  'https://github.com/koushikranjit/KR-Website/blob/adf9c0b/kr-preview-1.jpg?raw=true',
  'https://github.com/koushikranjit/KR-Website/blob/adf9c0b/kr-preview-2.jpg?raw=true',
  'https://github.com/koushikranjit/KR-Website/blob/adf9c0b/kr-preview-3.jpg?raw=true',
  'https://github.com/koushikranjit/KR-Website/blob/adf9c0b/kr-preview-4.jpg?raw=true',
]

const TRADE_RESULTS = Array.from({ length: 9 }, (_, i) =>
  `https://github.com/koushikranjit/KR-Website/blob/37b9a4a/kr-trade-result-${i + 1}.png?raw=true`
)

const REVIEWS = [
  { name: 'Soumyadeep Samanta', handle: '@soumyadeep', stars: 5, time: '3 months ago', text: 'He doesn\'t give only signal.. also give them proper guidance.. he is too good in his system. Highly recommend for anyone looking to learn trading seriously.' },
  { name: 'Sagar Bairagi', handle: '@sagar_b', stars: 5, time: '3 months ago', text: 'Very good experience in terms of accuracy of the signals. In my opinion you should try for it and then judge by yourself. My experience is very good till now.' },
  { name: 'God is', handle: '@god_is', stars: 4, time: '3 months ago', text: 'Using the signal room for 4 months with 10% fund balance growth at minimum risk. Returns exceed bank FD rates. Recommended for forex traders.' },
  { name: 'Soumit Acharjee', handle: '@soumit_a', stars: 5, time: '3 months ago', text: 'Signals are Accurate like an archer hitting a bullseye.' },
  { name: 'Sunil Ghosh', handle: '@sunil_g', stars: 5, time: '4 months ago', text: 'Profitable signal room. Complete money management system and every trade discussion option available. Tension free — grow your account.' },
  { name: 'Amitanjan Chakraborty', handle: '@amitanjan', stars: 5, time: '4 months ago', text: 'My knowledge — Best trader in India.' },
  { name: 'Mainak Paul', handle: '@mainak_p', stars: 5, time: '4 months ago', text: 'The signals are absolutely genuine and helpful for beginner traders, he always post the charts along with the signal so you can learn a lot from him. Thank you so much Koushik.' },
]

const FAQS = [
  { q: 'Do you offer live trading?', a: 'Yes! We have daily live trading sessions Monday to Friday during US market hours (evening IST). You watch real trades being executed with full commentary on entries, exits, and risk management.' },
  { q: 'Do you share entries and exits?', a: 'Yes. Every trade is documented with full transparency — entries, exits, stop losses, and P&L. You see everything in real-time during live sessions and in the trade recap channel.' },
  { q: 'What is your refund policy?', a: 'Due to the nature of digital content and live sessions, we do not offer refunds. However, you can cancel your subscription anytime and retain access until the end of your billing period.' },
  { q: 'Do I need prior trading experience?', a: 'No. The Premium Starter Course covers everything from basics. It\'s designed for complete beginners to intermediate traders who want a structured, disciplined approach.' },
  { q: 'What market do you trade?', a: 'We focus exclusively on Nasdaq (NQ/MNQ) futures. This is one of the most liquid and volatile markets — perfect for day trading with precision.' },
]

const RELATED = [
  { name: 'KR Trades Free Access', tagline: 'Learn To Trade Nasdaq Futures', price: 'Free', rating: 4.9 },
]

// ─── Icons ──────────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const StarIcon = ({ filled = true, size = 16 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={filled ? '#fbbf24' : '#374151'}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const StarsRow = ({ count = 5, size = 16 }: { count?: number; size?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < count} size={size} />
    ))}
  </div>
)

const PersonIcon = () => (
  <svg width="14" height="14" fill="#9ca3af" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

// Glass card style helpers
const GLASS = 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]'
const GLASS_SM = 'bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]'
const GLASS_HOVER = 'hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300'

// ─── 1. TopNavHeader ────────────────────────────────────────────────────────
function TopNavHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 h-14 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl" style={{ width: '100vw', maxWidth: '100vw' }}>
      <div className="max-w-[1300px] mx-auto h-full flex items-center px-4 lg:px-8">
        <a
          href="https://koushikranjit.in"
          className="w-10 h-10 flex items-center justify-center rounded-full text-white shrink-0"
          aria-label="Go back"
        >
          <ChevronLeft />
        </a>
        <div className="flex items-center gap-2 min-w-0 ml-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-800 flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">
            KR
          </div>
          <span className="font-semibold text-[15px] truncate">KR Trades</span>
        </div>
        <div className="ml-auto shrink-0">
          <a href="/KRtrades/manage" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
            Manage
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── 2. HeroCarousel (images only) ──────────────────────────────────────────
function HeroCarousel({ activeSlide, setActiveSlide }: { activeSlide: number; setActiveSlide: (n: number) => void }) {
  const prev = () => setActiveSlide(activeSlide === 0 ? SLIDER_IMAGES.length - 1 : activeSlide - 1)
  const next = () => setActiveSlide(activeSlide === SLIDER_IMAGES.length - 1 ? 0 : activeSlide + 1)

  return (
    <div className="w-full">
      <div className="relative w-full bg-black/40 overflow-hidden lg:rounded-xl" style={{ aspectRatio: '16/9', maxWidth: '100vw' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SLIDER_IMAGES[activeSlide]}
          alt={`KR Trades preview ${activeSlide + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Glass nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg z-10 active:scale-90 transition-transform"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg z-10 active:scale-90 transition-transform"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Glass counter badge */}
        <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-[11px] text-white/80 z-10">
          {activeSlide + 1} / {SLIDER_IMAGES.length}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-3">
        {SLIDER_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all duration-300 ${i === activeSlide ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/25'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── 3. ProductInfo ─────────────────────────────────────────────────────────
function ProductInfo({
  rating,
  reviewCount,
  paying,
  onSubscribe,
  ctaRef,
}: {
  rating: number
  reviewCount: number
  paying: boolean
  onSubscribe: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctaRef: any
}) {
  return (
    <section className="px-4 pt-1 pb-4" role="region" aria-label="Product information">
      {/* Stars */}
      <div className="flex items-center gap-2">
        <StarsRow count={5} size={18} />
        <span className="text-sm font-semibold">{rating}</span>
        <span className="text-sm text-gray-400">({reviewCount})</span>
      </div>

      {/* Title */}
      <h1 className="text-[22px] font-bold mt-2 leading-tight">KR Trades Premium</h1>

      {/* Price */}
      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-[28px] font-bold">₹1,025</span>
        <span className="text-gray-400 text-[15px]">/ month</span>
      </div>

      {/* Option link */}
      <a href="/KRtrades/manage" className="text-sm text-emerald-400 mt-1 inline-block">
        Manage subscription
      </a>

      {/* CTA Button */}
      <button
        ref={ctaRef}
        onClick={onSubscribe}
        disabled={paying}
        className="w-full h-[52px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-[17px] mt-4 shadow-[0_4px_24px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all active:scale-[0.98] disabled:opacity-60"
      >
        {paying ? 'Processing...' : 'Join now'}
      </button>
    </section>
  )
}

// ─── 4. SocialProofBar ──────────────────────────────────────────────────────
function SocialProofBar({ memberCount }: { memberCount: number }) {
  return (
    <section className="px-4 py-4 flex items-center gap-3 text-[13px] text-gray-400 border-t border-b border-white/[0.06]" role="region" aria-label="Social proof">
      <div className="flex items-center gap-1.5 shrink-0">
        <PersonIcon />
        <span className="text-white font-medium">{memberCount.toLocaleString()} members</span>
      </div>
      <div className="w-px h-4 bg-white/10 shrink-0" />
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-800 flex items-center justify-center text-[7px] font-extrabold text-white shrink-0">
          KR
        </div>
        <span className="truncate">
          By <span className="text-white">Koushik Ranjit</span>
        </span>
      </div>
      <div className="w-px h-4 bg-white/10 shrink-0" />
      <div className="flex items-center gap-2.5 shrink-0 ml-auto">
        <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
        </a>
        <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-gray-400 hover:text-white transition-colors">
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-gray-400 hover:text-white transition-colors">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
        </a>
      </div>
    </section>
  )
}

// ─── 5. PageDescription ─────────────────────────────────────────────────────
function PageDescription() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="px-4 py-5" role="region" aria-label="Description">
      <h2 className="text-[26px] font-extrabold leading-[1.2]">
        Live Futures Trading Room — Learn To Trade NQ With Discipline
      </h2>
      <div className="relative mt-2">
        <p className={`text-[15px] leading-relaxed text-gray-300 ${expanded ? '' : 'line-clamp-3'}`}>
          Join KR Trades and trade alongside a professional Nasdaq futures trader. Get daily live trading sessions, the Premium Starter Course (Bengali), real-time trade guidance, exclusive IFVG model strategies, weekly market breakdowns, and direct mentor access — all with full transparency. Includes risk management education, community support, and prop firm giveaways.
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-emerald-400 text-sm font-medium mt-1"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* What's included */}
      <div className="mt-5 flex flex-col lg:grid lg:grid-cols-2 gap-2.5">
        {['Daily Live Trading (Mon–Fri)', 'Premium Starter Course', 'Weekly Market Breakdown + Q&A', 'Risk & Mindset Guidance', 'Trade Recaps — Full P&L', 'Private Discord Community'].map(f => (
          <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
            <svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20" className="shrink-0">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Trade Results Marquee ──────────────────────────────────────────────────
function TradeResultsMarquee({ onImageClick }: { onImageClick: (i: number) => void }) {
  return (
    <section className="py-5 overflow-hidden" role="region" aria-label="Trade results">
      <h2 className="text-lg font-bold px-4 mb-3">Real Trade Results</h2>
      <div style={{ overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
        <div className="flex gap-2.5 animate-marquee hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {[...TRADE_RESULTS, ...TRADE_RESULTS].map((img, i) => (
            <button
              key={i}
              onClick={() => onImageClick(i % TRADE_RESULTS.length)}
              className="shrink-0 w-[200px] rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Trade result ${(i % TRADE_RESULTS.length) + 1}`} className="w-full aspect-video object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. FAQAccordion ────────────────────────────────────────────────────────
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
              <span className={`text-gray-400 text-xl shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}>
                +
              </span>
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

// ─── 7. ReviewsSection ──────────────────────────────────────────────────────
function ReviewsSection({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const bars = [
    { star: 5, pct: 97, count: Math.round(reviewCount * 0.97), color: 'bg-green-500' },
    { star: 4, pct: 2, count: Math.max(1, Math.round(reviewCount * 0.02)), color: 'bg-lime-500' },
    { star: 3, pct: 0.1, count: 0, color: 'bg-gray-500' },
    { star: 2, pct: 0.1, count: 0, color: 'bg-gray-500' },
    { star: 1, pct: 0.1, count: 0, color: 'bg-gray-500' },
  ]

  return (
    <section className="px-4 py-5" role="region" aria-label="Customer reviews">
      <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>

      {/* Score + bars */}
      <div className={`rounded-2xl ${GLASS} p-4 mb-4 lg:flex lg:gap-8 lg:items-center`}>
        <div className="text-center mb-4 lg:mb-0 lg:shrink-0 lg:min-w-[120px]">
          <div className="text-5xl font-extrabold">{rating}</div>
          <div className="mt-1.5 flex justify-center"><StarsRow count={5} size={18} /></div>
          <div className="text-gray-400 text-sm mt-1">{reviewCount} ratings</div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-1">
          {bars.map(b => (
            <div key={b.star} className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 w-3 text-right">{b.star}</span>
              <StarIcon size={12} />
              <div className="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${b.color}`} style={{ width: `${Math.max(b.pct, 1)}%` }} />
              </div>
              <span className="text-gray-400 w-12 text-right">{Math.round(b.pct)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top reviews */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[15px]">Top reviews</h3>
        <a href="https://www.trustpilot.com/review/koushikranjit.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-sm">
          See all reviews
        </a>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
        {REVIEWS.map((rev, i) => (
          <ReviewCard key={i} review={rev} index={i} />
        ))}
      </div>
    </section>
  )
}

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-2xl ${GLASS_SM} ${GLASS_HOVER} p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: `hsl(${index * 50 + 120}, 45%, 32%)` }}
        >
          {review.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm truncate">{review.name}</div>
          <div className="text-gray-500 text-xs">{review.handle}</div>
        </div>
        <span className="text-gray-500 text-xs shrink-0">{review.time}</span>
      </div>
      <div className="mb-2"><StarsRow count={review.stars} size={14} /></div>
      <p className={`text-[15px] leading-relaxed text-gray-300 ${expanded ? '' : 'line-clamp-4'}`}>
        {review.text}
      </p>
      {review.text.length > 120 && (
        <button onClick={() => setExpanded(!expanded)} className="text-emerald-400 text-sm mt-1">
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

// ─── 8. RelatedCarousel ─────────────────────────────────────────────────────
function RelatedCarousel({ rating, memberCount }: { rating: number; memberCount: number }) {
  return (
    <section className="py-5" role="region" aria-label="More from creator">
      <h2 className="text-lg font-bold px-4 mb-3">More from KR Trades</h2>
      <div className="flex gap-3 px-4 pb-2 scrollbar-hide" style={{ overflowX: 'auto', maxWidth: '100vw' }}>
        {RELATED.map((item, i) => (
          <a
            key={i}
            href="https://discord.gg/HySGNbJa3r"
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 w-[200px] rounded-2xl ${GLASS_SM} ${GLASS_HOVER} overflow-hidden block`}
          >
            <div className="aspect-video bg-gradient-to-br from-emerald-900/60 to-black flex items-center justify-center">
              <span className="font-extrabold text-emerald-400 text-sm tracking-wide">KR TRADES</span>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] font-extrabold text-black shrink-0">KR</div>
                <span className="font-semibold text-[13px] truncate">{item.name}</span>
              </div>
              <p className="text-gray-400 text-[11px] line-clamp-1 mb-1.5">{item.tagline}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold text-[13px]">{item.price}</span>
                <StarIcon size={12} />
                <span className="text-gray-400 text-xs">{item.rating}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── About Creator ──────────────────────────────────────────────────────────
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
              Indian proprietary day trader specialising in Nasdaq futures. 5+ years of active trading. Featured in APN News, Vocal Media & more.
            </p>
            <div className="flex gap-3 mt-2 flex-wrap">
              <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-[13px]">Instagram</a>
              <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-[13px]">Twitter/X</a>
              <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-[13px]">Discord</a>
              <a href="https://koushikranjit.in" className="text-emerald-400 text-[13px]">Website</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 9. StickyBottomCTA ─────────────────────────────────────────────────────
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
              {paying ? 'Processing...' : 'Join now'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Discord Modal ──────────────────────────────────────────────────────────
function DiscordModal({
  open,
  onClose,
  discordInput,
  setDiscordInput,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  discordInput: string
  setDiscordInput: (v: string) => void
  onSubmit: () => void
}) {
  if (!open) return null

  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white/[0.05] backdrop-blur-2xl rounded-t-2xl sm:rounded-2xl p-5 w-full sm:max-w-[400px] border-t border-white/[0.1] sm:border sm:border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg font-bold mb-1">Enter Your Discord Username</h3>
        <p className="text-gray-400 text-[13px] mb-3">Required to give you Premium access in our Discord server.</p>

        <a
          href="https://discord.gg/HySGNbJa3r"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#5865F2] text-white text-[13px] font-semibold mb-4"
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
          Join our server first
        </a>

        {/* Guide image */}
        <div className="rounded-lg overflow-hidden border border-white/10 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/koushikranjit/KR-Website/blob/3a9d265/discord-username-guide.png?raw=true"
            alt="How to find your Discord username"
            className="w-full"
          />
        </div>

        <p className="text-gray-500 text-xs mb-3">
          Open Discord → click your profile (bottom left) → copy your username (without #)
        </p>

        <input
          type="text"
          placeholder="e.g. koushik_ranjit"
          value={discordInput}
          onChange={e => setDiscordInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          autoFocus
          className="w-full bg-[#111] border border-white/10 rounded-xl h-12 px-4 text-white text-[15px] outline-none focus:border-emerald-500 transition-colors mb-3"
        />

        <div className="flex gap-2.5">
          <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-white/10 bg-transparent text-gray-400 text-sm">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!discordInput.trim()}
            className="flex-[2] h-11 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-50 transition-opacity"
          >
            Continue to Payment
          </button>
        </div>
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
      {index < TRADE_RESULTS.length - 1 && (
        <button onClick={e => { e.stopPropagation(); onChange(index + 1) }} className="absolute right-3 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center" aria-label="Next">›</button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TRADE_RESULTS[index]} alt={`Trade result ${index + 1}`} className="max-w-full max-h-[85vh] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
      <div className="absolute bottom-5 text-gray-400 text-sm">{index + 1} / {TRADE_RESULTS.length}</div>
    </div>
  )
}

// ─── Desktop Sidebar (hidden on mobile) ─────────────────────────────────────
function DesktopSidebar({
  rating,
  reviewCount,
  paying,
  onSubscribe,
}: {
  rating: number
  reviewCount: number
  paying: boolean
  onSubscribe: () => void
}) {
  return (
    <aside className="hidden lg:block w-[380px] shrink-0 sticky top-20 self-start">
      <div className={`${GLASS} rounded-2xl p-6`}>
        {/* Banner */}
        <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-emerald-900/30 to-black/40 border border-white/[0.06]" style={{ aspectRatio: '3/1' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-black text-2xl tracking-widest text-emerald-400">KR TRADES</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarsRow count={5} size={16} />
          <span className="text-sm">{rating}</span>
          <a href="https://www.trustpilot.com/review/koushikranjit.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400">
            ({reviewCount} reviews)
          </a>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-bold mb-2">KR Trades Premium</h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[28px] font-bold">₹1,025</span>
          <span className="text-gray-400 text-[15px]">/ month</span>
        </div>

        <a href="/KRtrades/manage" className="text-sm text-emerald-400 inline-block mb-5">Manage subscription</a>

        {/* CTA */}
        <button
          onClick={onSubscribe}
          disabled={paying}
          className="w-full h-[52px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[17px] transition-colors disabled:opacity-60"
        >
          {paying ? 'Processing...' : 'Join now'}
        </button>
        <p className="text-center text-gray-500 text-xs mt-2">Secure payment via Razorpay</p>
      </div>

      {/* Powered by */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <div className="w-4 h-4 rounded bg-emerald-400 flex items-center justify-center text-[9px] font-black text-black">K</div>
        <span className="text-gray-500 text-[13px]">Powered by KR Trades</span>
      </div>
    </aside>
  )
}

// ─── Main: ProductPage ──────────────────────────────────────────────────────
export default function KRTradesPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [paying, setPaying] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [discordCount, setDiscordCount] = useState(81)
  const [showDiscordModal, setShowDiscordModal] = useState(false)
  const [discordInput, setDiscordInput] = useState('')
  const [reviewData, setReviewData] = useState({ rating: 4.9, count: 20 })
  const [showStickyCta, setShowStickyCta] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inlineCtaRef = useRef<any>(null)

  // Mount + load Razorpay + fetch counts
  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
    fetch('/api/subscribe/count').then(r => r.json()).then(d => { setDiscordCount(d.discord || 81) }).catch(() => {})
    fetch('/api/reviews').then(r => r.json()).then(d => setReviewData({ rating: d.rating || 4.9, count: d.count || 20 })).catch(() => {})
  }, [])

  // IntersectionObserver for sticky CTA
  useEffect(() => {
    if (!inlineCtaRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(inlineCtaRef.current)
    return () => observer.disconnect()
  }, [mounted])

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
  }, [lightbox])

  const handleSubscribe = () => setShowDiscordModal(true)

  const handleDiscordSubmit = async () => {
    if (!discordInput.trim()) return
    setShowDiscordModal(false)
    setPaying(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discord_username: discordInput.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Failed'); setPaying(false); return }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay
      const rzp = new Razorpay({
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'KR Trades',
        description: 'Live Futures Trading Room — Monthly',
        theme: { color: '#059669' },
        prefill: { email: '', contact: '' },
        handler: () => { window.location.href = 'https://discord.gg/HySGNbJa3r' },
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch { alert('Payment failed.'); setPaying(false) }
  }

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .animate-marquee{animation:marquee 25s linear infinite}
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        .kr-trades-page *{box-sizing:border-box}
        @media(max-width:1023px){
          .kr-trades-page *{max-width:100%}
          .kr-trades-page img,.kr-trades-page video{max-width:100%;height:auto}
        }
      `}</style>

      {/* Fixed elements — OUTSIDE overflow:clip container */}
      {/* Background video — desktop only */}
      <video className="hidden lg:block fixed top-0 left-0 w-screen h-screen object-cover z-0 opacity-35 pointer-events-none" autoPlay muted loop playsInline>
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="hidden lg:block fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(15,15,15,0.3) 0%,rgba(15,15,15,0.7) 50%,rgba(15,15,15,0.95) 100%)' }} />

      <TopNavHeader />

      {/* Mobile-only sticky CTA */}
      <div className="lg:hidden">
        <StickyBottomCTA visible={showStickyCta} paying={paying} onSubscribe={handleSubscribe} />
      </div>

      <DiscordModal
        open={showDiscordModal}
        onClose={() => setShowDiscordModal(false)}
        discordInput={discordInput}
        setDiscordInput={setDiscordInput}
        onSubmit={handleDiscordSubmit}
      />

      <Lightbox index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />

      {/* Scrollable content — overflow:clip safe for sticky sidebar */}
      <div className="kr-trades-page relative w-full bg-[#0f0f0f] min-h-screen text-white" style={{ maxWidth: '100vw', overflowClipMargin: 0, overflowX: 'clip' } as React.CSSProperties}>

        {/* Desktop: two-column layout | Mobile: single column */}
        <div className="relative z-[2] max-w-[1200px] mx-auto pt-14 lg:pt-20 lg:px-8 lg:flex lg:items-start lg:gap-8 lg:pb-16 xl:max-w-[1300px]">

          {/* ═══ MAIN CONTENT ═══ */}
          <main className="flex-1 min-w-0 lg:max-w-none">
            <HeroCarousel activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

            {/* Mobile-only: pricing below hero */}
            <div className="lg:hidden">
              <ProductInfo
                rating={reviewData.rating}
                reviewCount={reviewData.count}
                paying={paying}
                onSubscribe={handleSubscribe}
                ctaRef={inlineCtaRef}
              />
            </div>

            {/* Desktop-only: invisible ref for intersection observer */}
            <div className="hidden lg:block" ref={inlineCtaRef} />

            <SocialProofBar memberCount={discordCount} />

            <PageDescription />

            <TradeResultsMarquee onImageClick={setLightbox} />

            <FAQAccordion />

            <ReviewsSection rating={reviewData.rating} reviewCount={reviewData.count} />

            <AboutCreator />

            <RelatedCarousel rating={reviewData.rating} memberCount={discordCount} />

            {/* Bottom spacer for mobile sticky CTA */}
            <div className="h-24 lg:h-0" />
          </main>

          {/* ═══ DESKTOP SIDEBAR ═══ */}
          <DesktopSidebar
            rating={reviewData.rating}
            reviewCount={reviewData.count}
            paying={paying}
            onSubscribe={handleSubscribe}
          />
        </div>
      </div>
    </>
  )
}

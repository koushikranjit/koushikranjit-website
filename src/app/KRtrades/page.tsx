'use client'

import { useState, useEffect } from 'react'

const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

const TRADE_RESULTS = Array.from({ length: 9 }, (_, i) =>
  `https://github.com/koushikranjit/KR-Website/blob/37b9a4a/kr-trade-result-${i + 1}.png?raw=true`
)

const REVIEWS = [
  { name: 'Rahul S', handle: '@rahul_trades', time: '2 days ago', text: 'Best live trading room I\'ve joined. Koushik\'s entries are always on point and the risk management teaching is next level.' },
  { name: 'Amit K', handle: '@amitkfx', time: '5 days ago', text: 'From being a losing trader for 3 years to finally seeing consistent green weeks. The IFVG model changed everything for me. Worth every rupee.' },
  { name: 'Souvik G', handle: '@souvik_nq', time: '1 week ago', text: 'KR the goat. Best NQ trading community in India.' },
  { name: 'Priya M', handle: '@priyamtrades', time: '2 weeks ago', text: 'The starter course is incredibly well structured. Bengali explanation made complex concepts so easy to understand. Live sessions are gold.' },
]

const FAQS = [
  { q: 'Do you offer live trading?', a: 'Yes! We have daily live trading sessions Monday to Friday during US market hours (evening IST). You watch real trades being executed with full commentary on entries, exits, and risk management.' },
  { q: 'Do you share entries and exits?', a: 'Yes. Every trade is documented with full transparency — entries, exits, stop losses, and P&L. You see everything in real-time during live sessions and in the trade recap channel.' },
  { q: 'What is your refund policy?', a: 'Due to the nature of digital content and live sessions, we do not offer refunds. However, you can cancel your subscription anytime and retain access until the end of your billing period.' },
  { q: 'Do I need prior trading experience?', a: 'No. The Premium Starter Course covers everything from basics. It\'s designed for complete beginners to intermediate traders who want a structured, disciplined approach.' },
  { q: 'What market do you trade?', a: 'We focus exclusively on Nasdaq (NQ/MNQ) futures. This is one of the most liquid and volatile markets — perfect for day trading with precision.' },
]


export default function KRTradesPage() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [paying, setPaying] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
    // Auto-advance slider
    const id = setInterval(() => setActiveSlide(p => (p + 1) % TRADE_RESULTS.length), 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [lightbox])

  const handleSubscribe = async () => {
    setPaying(true)
    try {
      const res = await fetch('/api/subscribe', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Failed'); setPaying(false); return }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay
      const rzp = new Razorpay({
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'KR Trades',
        description: 'Live Futures Trading Room — Monthly',
        theme: { color: '#3b5bdb' },
        handler: () => { window.location.href = 'https://discord.gg/jxuDkpUr5X' },
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch { alert('Payment failed.'); setPaying(false) }
  }

  if (!mounted) return null

  const Star = () => <span style={{ color: '#fbbf24' }}>★</span>
  const Stars5 = () => <span className="flex gap-0.5">{Array(5).fill(0).map((_, i) => <Star key={i} />)}</span>

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#0d0d0d;color:#fff;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased}
        .whop-page{max-width:1200px;margin:0 auto;padding:80px 24px 60px;display:flex;gap:32px}
        .whop-main{flex:1;min-width:0}
        .whop-sidebar{width:380px;flex-shrink:0;position:sticky;top:80px;align-self:flex-start}
        @media(max-width:900px){.whop-page{flex-direction:column;padding:72px 16px 40px}.whop-sidebar{width:100%;position:static}}
        .whop-card{background:#1a1a1a;border-radius:16px;padding:24px}
        .whop-card-sm{background:#1c1c1c;border-radius:12px;padding:20px}
        .accordion-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
        .accordion-body.open{max-height:200px}
        .slide-fade{transition:opacity .5s ease}
        .bar-fill{height:6px;border-radius:3px;transition:width .6s ease}
        .marquee-wrap{overflow:hidden;width:100%}
        .marquee-track{display:flex;gap:12px;animation:marquee 25s linear infinite;width:max-content}
        .marquee-track:hover{animation-play-state:paused}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      `}</style>

      {/* ═══ HEADER ═══ */}
      <header style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,background:'#141414',borderBottom:'1px solid #222',height:60,display:'flex',alignItems:'center',padding:'0 24px' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',width:'100%',display:'flex',alignItems:'center',gap:12 }}>
          <a href="https://koushikranjit.in" style={{ width:32,height:32,borderRadius:'50%',background:'#222',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none',fontSize:14 }}>←</a>
          <div style={{ width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#00e87b,#0a5c3a)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:11,color:'#fff',letterSpacing:'-0.5px' }}>KR</div>
          <span style={{ fontWeight:600,fontSize:18 }}>KR Trades</span>
          <div style={{ marginLeft:'auto',display:'flex',gap:12,alignItems:'center' }}>
            <a href="/KRtrades/manage" style={{ color:'#9ca3af',fontSize:13,textDecoration:'none' }}>Manage</a>
          </div>
        </div>
      </header>

      <div className="whop-page">

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="whop-main">

          {/* HERO SLIDER */}
          <div style={{ borderRadius:12,overflow:'hidden',background:'#111',position:'relative',aspectRatio:'16/9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TRADE_RESULTS[activeSlide]}
              alt={`KR Trades Result ${activeSlide + 1}`}
              style={{ width:'100%',height:'100%',objectFit:'cover' }}
              className="slide-fade"
            />
          </div>
          {/* Dots */}
          <div style={{ display:'flex',justifyContent:'center',gap:6,marginTop:12 }}>
            {TRADE_RESULTS.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} style={{ width:8,height:8,borderRadius:'50%',border: i === activeSlide ? 'none' : '1px solid #555',background: i === activeSlide ? '#fff' : 'transparent',cursor:'pointer',padding:0 }} />
            ))}
          </div>

          {/* META ROW */}
          <div style={{ display:'flex',alignItems:'center',gap:12,marginTop:20,fontSize:14,color:'#9ca3af' }}>
            <span style={{ display:'flex',alignItems:'center',gap:6 }}>
              <svg width="16" height="16" fill="#9ca3af" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span style={{ color:'#fff' }}>100+ members</span>
            </span>
            <div style={{ width:1,height:20,background:'#333' }} />
            <span style={{ display:'flex',alignItems:'center',gap:6 }}>
              <div style={{ width:20,height:20,borderRadius:'50%',background:'#00e87b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:'#000' }}>KR</div>
              <span style={{ color:'#fff' }}>By Koushik Ranjit</span>
            </span>
          </div>

          {/* HEADING */}
          <h1 style={{ fontSize:'clamp(28px,4vw,40px)',fontWeight:700,marginTop:24,lineHeight:1.2 }}>
            Live Futures Trading Room — Learn To Trade NQ With Discipline
          </h1>

          {/* DESCRIPTION */}
          <p style={{ fontSize:16,color:'#d0d0d0',lineHeight:1.7,marginTop:16 }}>
            Join KR Trades and trade alongside a professional Nasdaq futures trader. Get daily live trading sessions, the Premium Starter Course (Bengali), real-time trade guidance, exclusive IFVG model strategies, weekly market breakdowns, and direct mentor access — all with full transparency.
          </p>

          {/* WHAT'S INCLUDED */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10,marginTop:24 }}>
            {['Daily Live Trading (Mon–Fri)','Premium Starter Course','Weekly Market Breakdown + Q&A','Risk & Mindset Guidance','Trade Recaps — Full P&L','Private Discord Community'].map(f => (
              <div key={f} style={{ display:'flex',alignItems:'center',gap:8,fontSize:14,color:'#d0d0d0' }}>
                <svg width="16" height="16" fill="#00e87b" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {f}
              </div>
            ))}
          </div>

          {/* TRADE RESULTS MARQUEE */}
          <h2 style={{ fontSize:22,fontWeight:700,marginTop:48,marginBottom:16 }}>Real Trade Results</h2>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...TRADE_RESULTS, ...TRADE_RESULTS].map((img, i) => (
                <button key={i} onClick={() => setLightbox(i % TRADE_RESULTS.length)} style={{ flexShrink:0,width:300,borderRadius:12,overflow:'hidden',border:'1px solid #222',cursor:'pointer',background:'none',padding:0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Trade ${(i % TRADE_RESULTS.length) + 1}`} style={{ width:'100%',aspectRatio:'16/9',objectFit:'cover',display:'block' }} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <h2 style={{ fontSize:22,fontWeight:700,marginTop:48,marginBottom:16 }}>Frequently Asked Questions</h2>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="whop-card-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:15,fontWeight:500,padding:0,textAlign:'left' }}>
                  <span style={{ paddingRight:16 }}>{faq.q}</span>
                  <span style={{ fontSize:20,color:'#9ca3af',transition:'transform .2s',transform: openFaq === i ? 'rotate(45deg)' : 'none',flexShrink:0 }}>+</span>
                </button>
                <div className={`accordion-body ${openFaq === i ? 'open' : ''}`}>
                  <p style={{ paddingTop:12,fontSize:14,color:'#9ca3af',lineHeight:1.6 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* REVIEWS */}
          <h2 style={{ fontSize:22,fontWeight:700,marginTop:48,marginBottom:16 }}>Customer Reviews</h2>

          {/* Rating Summary */}
          <div className="whop-card" style={{ display:'flex',gap:32,flexWrap:'wrap',marginBottom:24 }}>
            <div style={{ textAlign:'center',minWidth:120 }}>
              <div style={{ fontSize:56,fontWeight:800,lineHeight:1 }}>5.0</div>
              <div style={{ margin:'8px 0' }}><Stars5 /></div>
              <div style={{ color:'#9ca3af',fontSize:14 }}>Based on reviews</div>
            </div>
            <div style={{ flex:1,minWidth:200,display:'flex',flexDirection:'column',gap:6,justifyContent:'center' }}>
              {[
                { star:5, pct:97, color:'#22c55e' },
                { star:4, pct:2, color:'#84cc16' },
                { star:3, pct:0.5, color:'#6b7280' },
                { star:2, pct:0.3, color:'#6b7280' },
                { star:1, pct:0.2, color:'#6b7280' },
              ].map(r => (
                <div key={r.star} style={{ display:'flex',alignItems:'center',gap:8,fontSize:13 }}>
                  <span style={{ width:12,color:'#9ca3af' }}>{r.star}</span>
                  <Star />
                  <div style={{ flex:1,height:6,background:'#374151',borderRadius:3,overflow:'hidden' }}>
                    <div className="bar-fill" style={{ width:`${r.pct}%`,background:r.color }} />
                  </div>
                  <span style={{ color:'#9ca3af',width:32,textAlign:'right' }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12 }}>
            {REVIEWS.map((rev, i) => (
              <div key={i} className="whop-card-sm">
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:8 }}>
                  <div style={{ width:40,height:40,borderRadius:'50%',background:`hsl(${i*80},50%,35%)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14 }}>{rev.name[0]}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600,fontSize:14 }}>{rev.name}</div>
                    <div style={{ color:'#6b7280',fontSize:12 }}>{rev.handle}</div>
                  </div>
                  <span style={{ color:'#6b7280',fontSize:12 }}>{rev.time}</span>
                </div>
                <div style={{ marginBottom:8 }}><Stars5 /></div>
                <p style={{ fontSize:14,color:'#d0d0d0',lineHeight:1.5 }}>{rev.text}</p>
              </div>
            ))}
          </div>

          {/* REPORT */}
          <div style={{ marginTop:40,textAlign:'center' }}>
            <a href="mailto:contact@koushikranjit.in" style={{ color:'#666',fontSize:13,textDecoration:'none' }}>Report this creator</a>
          </div>
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <div className="whop-sidebar">
          <div className="whop-card">
            {/* Banner */}
            <div style={{ borderRadius:10,overflow:'hidden',marginBottom:16,background:'linear-gradient(135deg,#0a2e1a,#050505)',aspectRatio:'3/1',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <span style={{ fontWeight:900,fontSize:24,letterSpacing:2,color:'#00e87b' }}>KR TRADES</span>
            </div>

            {/* Rating */}
            <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:12 }}>
              <Stars5 />
              <span style={{ fontSize:14,color:'#fff' }}>5.0</span>
              <span style={{ fontSize:13,color:'#9ca3af' }}>(reviews)</span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize:22,fontWeight:700,marginBottom:8 }}>KR Trades Premium</h3>

            {/* Price */}
            <div style={{ display:'flex',alignItems:'baseline',gap:4,marginBottom:4 }}>
              <span style={{ fontSize:28,fontWeight:700 }}>₹1,025</span>
              <span style={{ color:'#9ca3af',fontSize:15 }}>/ month</span>
            </div>

            <a href="/KRtrades/manage" style={{ color:'#3b82f6',fontSize:14,textDecoration:'none',display:'inline-block',marginBottom:20,cursor:'pointer' }}>Manage subscription</a>

            {/* CTA */}
            <button
              onClick={handleSubscribe}
              disabled={paying}
              style={{ width:'100%',height:52,background:'#3b5bdb',borderRadius:12,border:'none',color:'#fff',fontSize:17,fontWeight:600,cursor:'pointer',opacity: paying ? 0.6 : 1,transition:'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2f4fc4')}
              onMouseLeave={e => (e.currentTarget.style.background = '#3b5bdb')}
            >
              {paying ? 'Processing...' : 'Join now'}
            </button>

            <p style={{ textAlign:'center',color:'#6b7280',fontSize:12,marginTop:8 }}>Secure payment via Razorpay</p>
          </div>

          {/* Powered by */}
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:16 }}>
            <div style={{ width:16,height:16,borderRadius:3,background:'#00e87b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900,color:'#000' }}>K</div>
            <span style={{ color:'#6b7280',fontSize:13 }}>Powered by KR Trades</span>
          </div>
        </div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed',inset:0,zIndex:100,background:'rgba(0,0,0,.92)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16 }}>
          <button onClick={() => setLightbox(null)} style={{ position:'absolute',top:20,right:20,width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.1)',border:'none',color:'#fff',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
          {lightbox > 0 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1) }} style={{ position:'absolute',left:16,width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.1)',border:'none',color:'#fff',fontSize:20,cursor:'pointer' }}>‹</button>}
          {lightbox < TRADE_RESULTS.length - 1 && <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1) }} style={{ position:'absolute',right:16,width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.1)',border:'none',color:'#fff',fontSize:20,cursor:'pointer' }}>›</button>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TRADE_RESULTS[lightbox]} alt={`Result ${lightbox + 1}`} style={{ maxWidth:'100%',maxHeight:'85vh',borderRadius:12,objectFit:'contain' }} onClick={e => e.stopPropagation()} />
          <div style={{ position:'absolute',bottom:20,color:'#9ca3af',fontSize:14 }}>{lightbox + 1} / {TRADE_RESULTS.length}</div>
        </div>
      )}
    </>
  )
}

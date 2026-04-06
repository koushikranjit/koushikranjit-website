'use client'

import { useState, useEffect } from 'react'

const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

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
  { name: 'Soumyadeep Samanta', stars: 5, time: 'Mar 13, 2024', text: 'He doesn\'t give only signal.. also give them proper guidance.. he is too good in his system.' },
  { name: 'Sagar Bairagi', stars: 5, time: 'Mar 13, 2024', text: 'Very good experience in terms of accuracy of the signals. In my opinion you should try for it and then judge by yourself. My experience is very good till now.' },
  { name: 'God is', stars: 4, time: 'Mar 13, 2024', text: 'Using the signal room for 4 months with 10% fund balance growth at minimum risk. Returns exceed bank FD rates. Recommended for forex traders.' },
  { name: 'Soumit Acharjee', stars: 5, time: 'Mar 13, 2024', text: 'Signals are Accurate like an archer hitting a bullseye.' },
  { name: 'Sunil Ghosh', stars: 5, time: 'Mar 12, 2024', text: 'Profitable signal room. Complete money management system and every trade discussion option available. Tension free — grow your account.' },
  { name: 'Amitanjan Chakraborty', stars: 5, time: 'Mar 12, 2024', text: 'My knowledge — Best trader in India.' },
  { name: 'Mainak Paul', stars: 5, time: 'Mar 12, 2024', text: 'The signals are absolutely genuine and helpful for beginner traders, he always post the charts along with the signal so you can learn a lot from him. Thank you so much Koushik.' },
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
  const [premiumCount, setPremiumCount] = useState(0)
  const [discordCount, setDiscordCount] = useState(10)
  const [showDiscordModal, setShowDiscordModal] = useState(false)
  const [discordInput, setDiscordInput] = useState('')

  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
    // Fetch live member count
    fetch('/api/subscribe/count').then(r => r.json()).then(d => { setPremiumCount(d.premium || 0); setDiscordCount(d.discord || 10) }).catch(() => {})
  }, [])

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [lightbox])

  const handleSubscribe = () => {
    setShowDiscordModal(true)
  }

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
        theme: { color: '#3b5bdb' },
        prefill: { email: '', contact: '' },
        handler: () => { window.location.href = 'https://discord.gg/HySGNbJa3r' },
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
              src={SLIDER_IMAGES[activeSlide]}
              alt={`KR Trades ${activeSlide + 1}`}
              style={{ width:'100%',height:'100%',objectFit:'cover' }}
              className="slide-fade"
            />
            {/* Left Arrow */}
            <button
              onClick={() => setActiveSlide(activeSlide === 0 ? SLIDER_IMAGES.length - 1 : activeSlide - 1)}
              style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:36,height:36,borderRadius:'50%',background:'rgba(0,0,0,0.6)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)' }}
            >‹</button>
            {/* Right Arrow */}
            <button
              onClick={() => setActiveSlide(activeSlide === SLIDER_IMAGES.length - 1 ? 0 : activeSlide + 1)}
              style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',width:36,height:36,borderRadius:'50%',background:'rgba(0,0,0,0.6)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)' }}
            >›</button>
            {/* Counter */}
            <div style={{ position:'absolute',bottom:10,right:12,background:'rgba(0,0,0,0.6)',borderRadius:6,padding:'3px 8px',fontSize:12,color:'#ccc',backdropFilter:'blur(4px)' }}>
              {activeSlide + 1} / {SLIDER_IMAGES.length}
            </div>
          </div>
          {/* Dots */}
          <div style={{ display:'flex',justifyContent:'center',gap:6,marginTop:12 }}>
            {SLIDER_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} style={{ width:8,height:8,borderRadius:'50%',border: i === activeSlide ? 'none' : '1px solid #555',background: i === activeSlide ? '#fff' : 'transparent',cursor:'pointer',padding:0 }} />
            ))}
          </div>

          {/* META ROW */}
          <div style={{ display:'flex',alignItems:'center',gap:12,marginTop:20,fontSize:14,color:'#9ca3af',flexWrap:'wrap' }}>
            <span style={{ display:'flex',alignItems:'center',gap:6 }}>
              <svg width="16" height="16" fill="#9ca3af" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span style={{ color:'#fff' }}>{premiumCount} purchased</span>
            </span>
            <div style={{ width:1,height:20,background:'#333' }} />
            <span style={{ display:'flex',alignItems:'center',gap:6 }}>
              <div style={{ width:20,height:20,borderRadius:'50%',background:'#00e87b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:'#000' }}>KR</div>
              <span style={{ color:'#fff' }}>By Koushik Ranjit</span>
            </span>
            <div style={{ width:1,height:20,background:'#333' }} />
            {/* Social Links */}
            <div style={{ display:'flex',gap:10,alignItems:'center' }}>
              <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color:'#9ca3af',display:'flex' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
              </a>
              <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" title="X / Twitter" style={{ color:'#9ca3af',display:'flex' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" title="Discord" style={{ color:'#9ca3af',display:'flex' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              </a>
            </div>
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
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:48,marginBottom:16 }}>
            <h2 style={{ fontSize:22,fontWeight:700 }}>Customer Reviews</h2>
            <a href="https://www.trustpilot.com/review/koushikranjit.in" target="_blank" rel="noopener noreferrer" style={{ color:'#3b82f6',fontSize:14,textDecoration:'none' }}>See all on Trustpilot</a>
          </div>

          {/* Rating Summary */}
          <div className="whop-card" style={{ display:'flex',gap:32,flexWrap:'wrap',marginBottom:24 }}>
            <div style={{ textAlign:'center',minWidth:120 }}>
              <div style={{ fontSize:56,fontWeight:800,lineHeight:1 }}>4.9</div>
              <div style={{ margin:'8px 0' }}><Stars5 /></div>
              <div style={{ color:'#9ca3af',fontSize:14 }}>7 ratings on Trustpilot</div>
            </div>
            <div style={{ flex:1,minWidth:200,display:'flex',flexDirection:'column',gap:6,justifyContent:'center' }}>
              {[
                { star:5, pct:86, count:6, color:'#22c55e' },
                { star:4, pct:14, count:1, color:'#84cc16' },
                { star:3, pct:0, count:0, color:'#6b7280' },
                { star:2, pct:0, count:0, color:'#6b7280' },
                { star:1, pct:0, count:0, color:'#6b7280' },
              ].map(r => (
                <div key={r.star} style={{ display:'flex',alignItems:'center',gap:8,fontSize:13 }}>
                  <span style={{ width:12,color:'#9ca3af' }}>{r.star}</span>
                  <Star />
                  <div style={{ flex:1,height:6,background:'#374151',borderRadius:3,overflow:'hidden' }}>
                    <div className="bar-fill" style={{ width:`${Math.max(r.pct, 2)}%`,background:r.color }} />
                  </div>
                  <span style={{ color:'#9ca3af',width:50,textAlign:'right' }}>{r.pct}% ({r.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12 }}>
            {REVIEWS.map((rev, i) => (
              <div key={i} className="whop-card-sm">
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:8 }}>
                  <div style={{ width:40,height:40,borderRadius:'50%',background:`hsl(${i*50+120},45%,32%)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14 }}>{rev.name[0]}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600,fontSize:14 }}>{rev.name}</div>
                  </div>
                  <span style={{ color:'#6b7280',fontSize:12 }}>{rev.time}</span>
                </div>
                <div style={{ marginBottom:8,display:'flex',gap:2 }}>{Array(rev.stars).fill(0).map((_, j) => <Star key={j} />)}{Array(5 - rev.stars).fill(0).map((_, j) => <span key={j} style={{ color:'#374151' }}>★</span>)}</div>
                <p style={{ fontSize:14,color:'#d0d0d0',lineHeight:1.5 }}>{rev.text}</p>
              </div>
            ))}
          </div>

          {/* ABOUT CREATOR */}
          <h2 style={{ fontSize:22,fontWeight:700,marginTop:48,marginBottom:16 }}>About the creator</h2>
          <div className="whop-card" style={{ display:'flex',gap:16,alignItems:'center',flexWrap:'wrap' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://github.com/koushikranjit/KR-Website/blob/847c7b2/koushik-host3.png?raw=true" alt="Koushik Ranjit" style={{ width:64,height:64,borderRadius:'50%',objectFit:'cover',objectPosition:'top' }} />
            <div style={{ flex:1,minWidth:200 }}>
              <div style={{ fontWeight:700,fontSize:16 }}>Koushik Ranjit</div>
              <p style={{ color:'#9ca3af',fontSize:14,marginTop:4,lineHeight:1.5 }}>
                Indian proprietary day trader specialising in Nasdaq futures. 5+ years of active trading with a disciplined, rule-based approach. Featured in APN News, Vocal Media, Bhaskar Live & more.
              </p>
              <div style={{ display:'flex',gap:12,marginTop:10 }}>
                <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" style={{ color:'#3b82f6',fontSize:13,textDecoration:'none' }}>Instagram</a>
                <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" style={{ color:'#3b82f6',fontSize:13,textDecoration:'none' }}>Twitter/X</a>
                <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" style={{ color:'#3b82f6',fontSize:13,textDecoration:'none' }}>Discord</a>
                <a href="https://koushikranjit.in" style={{ color:'#3b82f6',fontSize:13,textDecoration:'none' }}>Website</a>
              </div>
            </div>
          </div>

          {/* MORE FROM KR TRADES */}
          <h2 style={{ fontSize:22,fontWeight:700,marginTop:48,marginBottom:16 }}>More from KR Trades</h2>
          <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" style={{ display:'block',maxWidth:280,textDecoration:'none',color:'#fff' }}>
            <div className="whop-card-sm" style={{ padding:0,overflow:'hidden' }}>
              <div style={{ background:'linear-gradient(135deg,#0a2e1a,#111)',aspectRatio:'16/9',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <span style={{ fontWeight:800,fontSize:18,color:'#00e87b',letterSpacing:1 }}>KR TRADES FREE</span>
              </div>
              <div style={{ padding:16 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                  <div style={{ width:20,height:20,borderRadius:'50%',background:'#00e87b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:'#000' }}>KR</div>
                  <span style={{ fontWeight:600,fontSize:14 }}>KR Trades Free Access</span>
                </div>
                <p style={{ color:'#9ca3af',fontSize:12,marginBottom:8 }}>Join the free Discord community for market discussions</p>
                <div style={{ display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' }}>
                  <span style={{ color:'#3b82f6',fontWeight:600,fontSize:14 }}>Free</span>
                  <span style={{ color:'#fbbf24' }}>★★★★★</span>
                  <span style={{ color:'#9ca3af',fontSize:13 }}>4.9</span>
                  <span style={{ color:'#555',fontSize:12 }}>·</span>
                  <span style={{ color:'#9ca3af',fontSize:12 }}>{discordCount} members</span>
                </div>
              </div>
            </div>
          </a>
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
              <span style={{ fontSize:14,color:'#fff' }}>4.9</span>
              <a href="https://www.trustpilot.com/review/koushikranjit.in" target="_blank" rel="noopener noreferrer" style={{ fontSize:13,color:'#9ca3af',textDecoration:'none' }}>(7 reviews)</a>
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

      {/* ═══ DISCORD USERNAME MODAL ═══ */}
      {showDiscordModal && (
        <div onClick={() => setShowDiscordModal(false)} style={{ position:'fixed',inset:0,zIndex:100,background:'rgba(0,0,0,.85)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#1a1a1a',borderRadius:16,padding:28,maxWidth:420,width:'100%',border:'1px solid #333' }}>
            <h3 style={{ fontSize:20,fontWeight:700,marginBottom:4 }}>Enter Your Discord Username</h3>
            <p style={{ color:'#9ca3af',fontSize:13,marginBottom:12 }}>Required to give you Premium access in our Discord server.</p>
            <a href="https://discord.gg/HySGNbJa3r" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,background:'#5865F2',color:'#fff',fontSize:13,fontWeight:600,textDecoration:'none',marginBottom:16 }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Make sure you join our server first
            </a>

            {/* Guide image */}
            <div style={{ borderRadius:10,overflow:'hidden',marginBottom:16,border:'1px solid #333' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github.com/koushikranjit/KR-Website/blob/3a9d265/discord-username-guide.png?raw=true"
                alt="How to find your Discord username"
                style={{ width:'100%',display:'block' }}
              />
            </div>

            <p style={{ color:'#6b7280',fontSize:12,marginBottom:12 }}>
              Open Discord → click your profile (bottom left) → copy your username (without #)
            </p>

            <input
              type="text"
              placeholder="e.g. koushik_ranjit"
              value={discordInput}
              onChange={e => setDiscordInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleDiscordSubmit()}
              autoFocus
              style={{ width:'100%',background:'#111',border:'1px solid #333',borderRadius:10,height:48,padding:'0 16px',color:'#fff',fontSize:15,outline:'none',marginBottom:12 }}
            />

            <div style={{ display:'flex',gap:10 }}>
              <button
                onClick={() => setShowDiscordModal(false)}
                style={{ flex:1,height:44,borderRadius:10,border:'1px solid #333',background:'transparent',color:'#9ca3af',fontSize:14,cursor:'pointer' }}
              >Cancel</button>
              <button
                onClick={handleDiscordSubmit}
                disabled={!discordInput.trim()}
                style={{ flex:2,height:44,borderRadius:10,border:'none',background:'#3b5bdb',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',opacity: discordInput.trim() ? 1 : 0.5 }}
              >Continue to Payment</button>
            </div>
          </div>
        </div>
      )}

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

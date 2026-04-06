'use client'

import { useState, useEffect } from 'react'

const RAZORPAY_KEY = 'rzp_live_SSL6Wg71WI8B11'

export default function RenewPage() {
  const [mounted, setMounted] = useState(false)
  const [paying, setPaying] = useState(false)
  const [discordInput, setDiscordInput] = useState('')
  const [step, setStep] = useState<'username' | 'paying'>('username')

  useEffect(() => {
    setMounted(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.head.appendChild(s)
  }, [])

  const handlePay = async () => {
    if (!discordInput.trim()) return
    setPaying(true)
    setStep('paying')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discord_username: discordInput.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Failed'); setPaying(false); setStep('username'); return }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay
      const rzp = new Razorpay({
        key: RAZORPAY_KEY,
        subscription_id: data.subscription_id,
        name: 'KR Trades',
        description: 'Premium Reactivation — Monthly',
        theme: { color: '#00e87b' },
        prefill: { email: '', contact: '' },
        handler: () => { window.location.href = 'https://discord.gg/HySGNbJa3r' },
        modal: { ondismiss: () => { setPaying(false); setStep('username') } },
      })
      rzp.open()
    } catch { alert('Payment failed.'); setPaying(false); setStep('username') }
  }

  if (!mounted) return null

  return (
    <main style={{ minHeight:'100vh',background:'#050505',color:'#fff',fontFamily:"'Inter',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',padding:24 }}>
      <div style={{ maxWidth:440,width:'100%',textAlign:'center' }}>

        {/* Logo */}
        <div style={{ fontSize:28,fontWeight:800,marginBottom:8 }}>
          KR<span style={{ color:'#00e87b' }}>trades</span>
        </div>

        <div style={{ background:'#1a1a1a',borderRadius:16,padding:32,border:'1px solid #222',marginTop:24 }}>

          {/* Emoji + heading */}
          <div style={{ fontSize:48,marginBottom:12 }}>👋</div>
          <h1 style={{ fontSize:24,fontWeight:700,marginBottom:8 }}>Welcome Back!</h1>
          <p style={{ color:'#9ca3af',fontSize:14,lineHeight:1.6,marginBottom:24 }}>
            Reactivate your KR Trades Premium subscription to regain access to live trading sessions, premium channels, and mentor support.
          </p>

          {/* What you get back */}
          <div style={{ textAlign:'left',marginBottom:24 }}>
            {['Daily Live Trading Room','Premium Discord Channels','Trade Recaps & Analysis','Direct Mentor Access'].map(f => (
              <div key={f} style={{ display:'flex',alignItems:'center',gap:8,fontSize:14,color:'#d0d0d0',marginBottom:8 }}>
                <span style={{ color:'#00e87b' }}>✓</span> {f}
              </div>
            ))}
          </div>

          {step === 'username' ? (
            <>
              <input
                type="text"
                placeholder="Your Discord username"
                value={discordInput}
                onChange={e => setDiscordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePay()}
                autoFocus
                style={{ width:'100%',background:'#111',border:'1px solid #333',borderRadius:10,height:48,padding:'0 16px',color:'#fff',fontSize:15,outline:'none',marginBottom:12 }}
              />
              <button
                onClick={handlePay}
                disabled={!discordInput.trim()}
                style={{ width:'100%',height:52,borderRadius:12,border:'none',background:'#00e87b',color:'#000',fontSize:17,fontWeight:700,cursor:'pointer',opacity: discordInput.trim() ? 1 : 0.5 }}
              >
                Reactivate Now
              </button>
            </>
          ) : (
            <div style={{ padding:20 }}>
              <div style={{ width:32,height:32,border:'3px solid #333',borderTopColor:'#00e87b',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px' }} />
              <p style={{ color:'#9ca3af',fontSize:14 }}>Opening payment...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}

          <p style={{ color:'#555',fontSize:12,marginTop:12 }}>Secure payment via Razorpay</p>
        </div>

        <a href="/KRtrades" style={{ color:'#9ca3af',fontSize:13,textDecoration:'none',display:'inline-block',marginTop:16 }}>
          ← View full page
        </a>
      </div>
    </main>
  )
}

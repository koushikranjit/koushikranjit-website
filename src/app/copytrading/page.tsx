export const metadata = {
  title: 'XAUUSD Copy Trading — KR Trades',
  description: 'Copy Koushik Ranjit\'s live XAUUSD trades automatically. Create a Vantage account, deposit $100, and start copying. Verified on Myfxbook.',
};

import Script from 'next/script';
import CopyRefCode from './CopyRefCode';

const VANTAGE_ACCT = 'https://vigco.co/la-com-inv/TpCuu75a';
const VANTAGE_COPY = 'https://vantageapp.onelink.me/qaPD?af_xp=referral&pid=IBSHARE&deep_link_value=mt4id-140247%7Cplatform-copytrading&deep_link_sub1=spid-1164895&af_dp=com.vttech.VantageFX%3A%2F%2F&af_force_deeplink=true';
const MYFXBOOK    = 'https://www.myfxbook.com/members/koushik_ranjit/koushik-ranjit/12009479';
const TELEGRAM    = 'https://t.me/mrkoushikranjit';
const TG_CHANNEL  = 'https://t.me/koushikranjit';
const DISCORD     = 'https://discord.gg/sffdu4wXx2';
const WHATSAPP    = 'https://wa.me/+919547774580';

export default function CopytradingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .p * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .p {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Orbs ── */
        .p-bg {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0; overflow: hidden;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
        }
        .orb-1 { width:500px;height:500px; background:radial-gradient(circle,rgba(5,150,105,.08),transparent 70%); top:-150px;right:-150px; }
        .orb-2 { width:400px;height:400px; background:radial-gradient(circle,rgba(202,138,4,.06),transparent 70%); bottom:15%;left:-150px; }
        .orb-3 { width:300px;height:300px; background:radial-gradient(circle,rgba(5,150,105,.05),transparent 70%); bottom:-80px;right:5%; }

        .p-z { position:relative; z-index:1; }

        /* ── Nav ── */
        .nav {
          position:sticky; top:0; z-index:50;
          background:rgba(0,0,0,.85);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(255,255,255,.05);
          padding:14px 20px;
          display:flex; align-items:center; justify-content:space-between;
        }
        .nav-logo { font-size:18px;font-weight:800;letter-spacing:-.04em;color:#F1F5F9;text-decoration:none; }
        .nav-logo span { color:#10B981;text-shadow:0 0 12px rgba(16,185,129,.4); }
        .nav-badge {
          font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
          color:#CA8A04;background:rgba(202,138,4,.1);border:1px solid rgba(202,138,4,.25);
          padding:4px 12px;border-radius:20px;
        }

        /* ── Wrap ── */
        .w { width:100%;max-width:520px;margin:0 auto;padding:0 20px; }

        /* ── Section spacing ── */
        .sec { padding:56px 0; }
        .hr { border:none;border-top:1px solid rgba(255,255,255,.04); }

        /* ── Labels ── */
        .tag {
          font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;
          color:#10B981;text-align:center;margin-bottom:8px;
        }
        .h2 {
          font-size:clamp(22px,5.5vw,30px);font-weight:800;letter-spacing:-.03em;
          text-align:center;margin-bottom:28px;color:#fff;line-height:1.2;
        }

        /* ── Glass card ── */
        .glass {
          background:rgba(255,255,255,.025);
          border:1px solid rgba(255,255,255,.07);
          border-radius:16px;
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 20px 60px rgba(0,0,0,.4);
        }

        /* ── Hero ── */
        .hero { padding:68px 0 52px;text-align:center; }

        .live-pill {
          display:inline-flex;align-items:center;gap:8px;
          font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
          color:#10B981;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);
          padding:6px 16px;border-radius:20px;margin-bottom:26px;
        }
        .live-dot {
          width:7px;height:7px;border-radius:50%;background:#10B981;
          box-shadow:0 0 8px #10B981;animation:blink 1.8s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.2;transform:scale(.8)} }

        .hero-h1 {
          font-size:clamp(36px,9vw,54px);font-weight:900;letter-spacing:-.05em;
          line-height:1.05;color:#fff;margin-bottom:14px;
        }
        .gold-text {
          background:linear-gradient(135deg,#CA8A04,#FCD34D,#CA8A04);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          display:block;
        }
        .hero-sub { font-size:16px;color:#64748B;margin-bottom:14px;line-height:1.65;max-width:400px;margin-left:auto;margin-right:auto; }

        .hero-announce {
          background:rgba(16,185,129,.05);
          border:1px solid rgba(16,185,129,.12);
          border-radius:12px;padding:16px 18px;
          font-size:14px;color:#94A3B8;line-height:1.7;
          text-align:left;margin-bottom:32px;
        }
        .hero-announce strong { color:#E2E8F0;font-weight:700; }

        /* ── Buttons ── */
        .btn {
          display:inline-flex;align-items:center;justify-content:center;gap:9px;
          font-family:'DM Sans',inherit;font-weight:700;font-size:16px;
          border:none;border-radius:13px;cursor:pointer;text-decoration:none;
          transition:transform .2s ease,box-shadow .2s ease;
          -webkit-tap-highlight-color:transparent;
          width:100%;padding:17px 24px;box-sizing:border-box;
        }
        .btn-green {
          background:linear-gradient(135deg,#059669,#10B981);color:#fff;
          box-shadow:0 4px 28px rgba(5,150,105,.3),inset 0 1px 0 rgba(255,255,255,.15);
        }
        .btn-green:hover { transform:translateY(-2px);box-shadow:0 12px 40px rgba(5,150,105,.45),inset 0 1px 0 rgba(255,255,255,.15); }
        .btn-gold {
          background:linear-gradient(135deg,#92400E,#CA8A04,#FCD34D);background-size:200% auto;
          color:#0A0500;font-weight:800;
          box-shadow:0 4px 28px rgba(202,138,4,.25),inset 0 1px 0 rgba(255,255,255,.2);
        }
        .btn-gold:hover { transform:translateY(-2px);box-shadow:0 12px 40px rgba(202,138,4,.4); }
        .btn-ghost {
          background:rgba(255,255,255,.03);color:#94A3B8;
          border:1px solid rgba(255,255,255,.09);
        }
        .btn-ghost:hover { background:rgba(255,255,255,.06);color:#CBD5E1; }
        .btn:active { transform:none; }
        .btn:focus-visible { outline:2px solid #10B981;outline-offset:3px; }
        .btn svg { width:20px;height:20px; }
        .btn-stack { display:flex;flex-direction:column;gap:12px; }

        /* ── Steps ── */
        .steps { display:flex;flex-direction:column; }
        .step { display:flex;gap:18px;align-items:flex-start;position:relative; }
        .step:not(:last-child)::after {
          content:'';position:absolute;left:21px;top:50px;
          height:calc(100% - 10px);width:1px;
          background:linear-gradient(180deg,rgba(202,138,4,.25),transparent);
        }
        .step + .step { margin-top:32px; }

        .step-num {
          flex-shrink:0;width:44px;height:44px;border-radius:50%;
          background:rgba(202,138,4,.08);border:2px solid rgba(202,138,4,.25);
          display:flex;align-items:center;justify-content:center;
          font-size:16px;font-weight:900;color:#CA8A04;
          box-shadow:0 0 20px rgba(202,138,4,.1);text-shadow:0 0 10px rgba(202,138,4,.4);
        }
        .step-body { padding-top:10px;flex:1; }
        .step-title { font-size:17px;font-weight:800;color:#fff;margin-bottom:5px;letter-spacing:-.02em; }
        .step-desc { font-size:14px;color:#64748B;line-height:1.65; }

        .step-link {
          display:inline-flex;align-items:center;gap:6px;margin-top:12px;
          font-size:13px;font-weight:700;letter-spacing:-.01em;
          color:#10B981;background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.18);
          padding:9px 16px;border-radius:10px;text-decoration:none;cursor:pointer;
          transition:background .18s,border-color .18s,box-shadow .18s;
        }
        .step-link:hover { background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4);box-shadow:0 0 16px rgba(16,185,129,.12); }

        /* Settings inside step */
        .settings-grid {
          display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;
        }
        .setting {
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
          border-radius:10px;padding:11px 13px;
        }
        .setting-key { font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px; }
        .setting-val { font-size:13px;font-weight:700;color:#E2E8F0; }

        /* ── Setup cards ── */
        .plans { display:flex;flex-direction:column;gap:10px; }
        .setup-card {
          border-radius:16px;padding:24px;
          background:rgba(202,138,4,.04);
          border:1px solid rgba(202,138,4,.14);
          position:relative;overflow:hidden;
        }
        .setup-card::before {
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(202,138,4,.4),transparent);
        }
        .setup-card.green-card {
          background:rgba(16,185,129,.04);
          border-color:rgba(16,185,129,.14);
        }
        .setup-card.green-card::before {
          background:linear-gradient(90deg,transparent,rgba(16,185,129,.4),transparent);
        }
        .plan-badge {
          display:inline-flex;align-items:center;gap:6px;
          font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;
          padding:3px 10px;border-radius:20px;margin-bottom:14px;
        }
        .plan-badge.gold { color:#CA8A04;background:rgba(202,138,4,.1);border:1px solid rgba(202,138,4,.25); }
        .plan-badge.green { color:#10B981;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25); }
        .setup-head {
          display:flex;align-items:center;gap:10px;margin-bottom:18px;
        }
        .setup-ico {
          width:36px;height:36px;border-radius:9px;
          background:rgba(202,138,4,.1);border:1px solid rgba(202,138,4,.2);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
        .setup-ico.green-ico { background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.2); }
        .setup-title { font-size:15px;font-weight:800;color:#fff;letter-spacing:-.02em; }
        .setup-sub { font-size:12px;color:#64748B;margin-top:1px; }
        .setup-rows { display:flex;flex-direction:column;gap:0; }
        .setup-row {
          display:flex;align-items:center;justify-content:space-between;
          padding:11px 0;border-bottom:1px solid rgba(255,255,255,.04);gap:12px;
        }
        .setup-row:last-child { border-bottom:none;padding-bottom:0; }
        .setup-label { font-size:13px;color:#64748B;font-weight:500; }
        .setup-value {
          font-size:13px;font-weight:700;color:#FCD34D;
          background:rgba(202,138,4,.08);border:1px solid rgba(202,138,4,.18);
          padding:3px 10px;border-radius:6px;white-space:nowrap;
        }
        .setup-value.green { color:#10B981;background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.18); }
        .setup-value.off { color:#475569;background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.06); }

        /* ── Results cards ── */
        .result-cards { display:flex;flex-direction:column;gap:10px; }

        /* ── Widget label / caption ── */
        .widget-label {
          display:flex;align-items:center;gap:7px;margin-bottom:8px;
          font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#64748B;
        }
        .widget-caption {
          margin-top:10px;font-size:12px;color:#475569;line-height:1.6;text-align:center;
        }
        .widget-stat {
          display:inline-flex;align-items:center;gap:5px;
          font-size:13px;font-weight:700;color:#FCD34D;
          background:rgba(202,138,4,.07);border:1px solid rgba(202,138,4,.15);
          padding:6px 14px;border-radius:8px;margin-top:8px;
        }

        /* ── FAQ accordion ── */
        .faq-list { display:flex;flex-direction:column;gap:8px; }
        .faq-item {
          background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
          border-radius:13px;overflow:hidden;
        }
        .faq-item summary {
          list-style:none;display:flex;align-items:center;justify-content:space-between;
          gap:12px;padding:16px 18px;cursor:pointer;
          font-size:14px;font-weight:700;color:#E2E8F0;letter-spacing:-.01em;
          -webkit-tap-highlight-color:transparent;
          transition:color .18s;
        }
        .faq-item summary::-webkit-details-marker { display:none; }
        .faq-item summary:hover { color:#fff; }
        .faq-chevron {
          flex-shrink:0;width:18px;height:18px;color:#475569;
          transition:transform .25s ease;
        }
        .faq-item[open] summary { color:#fff;border-bottom:1px solid rgba(255,255,255,.05); }
        .faq-item[open] .faq-chevron { transform:rotate(180deg);color:#10B981; }
        .faq-answer {
          padding:14px 18px;font-size:13px;color:#94A3B8;line-height:1.7;
        }

        /* ── MQL5 iframely embed ── */
        .mql5-embed { border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.07);margin-bottom:10px; }
        .iframely-embed { display:block; }
        .iframely-responsive { position:relative;overflow:hidden; }
        .iframely-responsive a { display:block;height:100%; }
        .iframely-responsive iframe { position:absolute;top:0;left:0;width:100%;height:100%;border:0; }

        /* ── Referral code copy ── */
        .ref-box {
          display:flex;align-items:center;justify-content:space-between;gap:10px;
          background:rgba(202,138,4,.06);border:1px solid rgba(202,138,4,.2);
          border-radius:12px;padding:13px 16px;margin-top:14px;
        }
        .ref-left { display:flex;align-items:center;gap:10px; }
        .ref-label { font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#64748B;margin-bottom:2px; }
        .ref-code { font-size:17px;font-weight:800;letter-spacing:.06em;color:#FCD34D; }
        .copy-btn {
          display:flex;align-items:center;gap:6px;
          font-size:12px;font-weight:700;
          color:#CA8A04;background:rgba(202,138,4,.1);border:1px solid rgba(202,138,4,.25);
          padding:8px 14px;border-radius:8px;cursor:pointer;
          transition:background .18s,border-color .18s,color .18s;
          white-space:nowrap;font-family:inherit;
          -webkit-tap-highlight-color:transparent;
        }
        .copy-btn:hover { background:rgba(202,138,4,.18);border-color:rgba(202,138,4,.5); }
        .copy-btn.copied { color:#10B981;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.3); }

        /* ── Requirements card ── */
        .req-list { display:flex;flex-direction:column;gap:0; }
        .req-item {
          display:flex;align-items:center;justify-content:space-between;
          padding:13px 0;border-bottom:1px solid rgba(255,255,255,.04);gap:12px;
        }
        .req-item:last-child { border-bottom:none;padding-bottom:0; }
        .req-label { display:flex;align-items:center;gap:10px;font-size:14px;color:#94A3B8; }
        .req-dot { width:5px;height:5px;border-radius:50%;background:#10B981;box-shadow:0 0 6px rgba(16,185,129,.5);flex-shrink:0; }
        .req-val { font-size:14px;font-weight:700;color:#E2E8F0; }

        /* ── Myfxbook verified ── */
        .myfx {
          display:flex;align-items:center;justify-content:space-between;gap:12px;
          padding:18px 20px;text-decoration:none;cursor:pointer;border-radius:14px;
          transition:border-color .2s,box-shadow .2s,background .2s;
        }
        .myfx:hover { border-color:rgba(16,185,129,.3)!important;box-shadow:0 0 30px rgba(16,185,129,.08); }
        .myfx-left { display:flex;align-items:center;gap:14px; }
        .myfx-ico { width:42px;height:42px;border-radius:10px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .myfx-name { font-size:14px;font-weight:700;color:#E2E8F0;letter-spacing:-.01em; }
        .myfx-sub { font-size:11px;color:#475569;margin-top:2px; }
        .verified { display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#10B981;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);padding:4px 12px;border-radius:20px;white-space:nowrap; }

        /* ── Support row ── */
        .support-row { display:flex;flex-direction:column;gap:10px; }
        .support-btn {
          display:flex;align-items:center;gap:14px;
          padding:16px 18px;border-radius:13px;text-decoration:none;cursor:pointer;
          transition:border-color .18s,background .18s;
        }
        .support-btn:hover { border-color:rgba(255,255,255,.12)!important; }
        .support-ico { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .support-ico.tg { background:rgba(38,120,232,.12);border:1px solid rgba(38,120,232,.2); }
        .support-ico.dc { background:rgba(88,101,242,.12);border:1px solid rgba(88,101,242,.2); }
        .support-name { font-size:14px;font-weight:700;color:#E2E8F0; }
        .support-handle { font-size:12px;color:#475569;margin-top:1px; }
        .support-arrow { margin-left:auto;color:#334155; }

        /* ── Final CTA box ── */
        .cta-box {
          border-radius:20px;padding:44px 20px;text-align:center;
          background:rgba(255,255,255,.02);border:1px solid rgba(202,138,4,.14);
          position:relative;overflow:hidden;
        }
        .cta-box::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(202,138,4,.45),transparent); }
        .cta-box::after { content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(202,138,4,.05),transparent 70%);pointer-events:none; }
        .cta-h2 { font-size:30px;font-weight:900;letter-spacing:-.04em;color:#fff;margin-bottom:8px;position:relative;z-index:1; }
        .cta-p { font-size:15px;color:#64748B;margin-bottom:28px;line-height:1.6;position:relative;z-index:1; }

        /* ── Scroll reveal ── */
        .rv { opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease; }
        .rv.vis { opacity:1;transform:translateY(0); }
        .d1{transition-delay:.1s} .d2{transition-delay:.18s} .d3{transition-delay:.26s} .d4{transition-delay:.34s}

        /* ── WhatsApp FAB ── */
        .wa-fab {
          position:fixed;bottom:24px;right:20px;z-index:100;
          width:56px;height:56px;border-radius:50%;
          background:linear-gradient(135deg,#128C7E,#25D366);
          box-shadow:0 6px 28px rgba(37,211,102,.4);
          display:flex;align-items:center;justify-content:center;
          text-decoration:none;cursor:pointer;
          transition:transform .2s,box-shadow .2s;
          animation:wa-pop .4s cubic-bezier(.34,1.56,.64,1) .8s both;
        }
        .wa-fab:hover { transform:scale(1.08);box-shadow:0 10px 36px rgba(37,211,102,.5); }
        @keyframes wa-pop { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }

        /* ── Disclaimer ── */
        .disc { padding:24px 0 52px;text-align:center; }
        .disc p { font-size:11px;color:#334155;line-height:1.8;max-width:440px;margin:0 auto; }

        @media(prefers-reduced-motion:reduce){
          .live-dot{animation:none;opacity:1}
          .btn-green:hover,.btn-gold:hover{transform:none}
          .rv{opacity:1;transform:none;transition:none}
          .wa-fab{animation:none}
        }
      `}</style>

      <div className="p">

        {/* Orbs */}
        <div className="p-bg" aria-hidden="true">
          <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
        </div>

        <div className="p-z">

          {/* ── NAV ── */}
          <header className="nav">
            <a href="/" className="nav-logo" aria-label="KR Trades">KR <span>Trades</span></a>
            <span className="nav-badge">XAUUSD Live</span>
          </header>

          {/* ── HERO ── */}
          <section className="hero">
            <div className="w">
              <div className="live-pill">
                <span className="live-dot" aria-hidden="true"/>
                Copy Trading is Live
              </div>

              <h1 className="hero-h1">
                XAU/USD
                <span className="gold-text">Copy Trading</span>
              </h1>

              {/* Live portfolio embed — right under the title */}
              <div style={{marginTop:'24px',marginBottom:'4px'}}>
                <div className="widget-label" style={{justifyContent:'center'}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  Portfolio Performance · Myfxbook
                </div>
              </div>
              <div className="mql5-embed">
                <iframe
                  src="https://widgets.myfxbook.com/portfolio-widget?id=12017597&theme=dark&locale=en"
                  width="100%"
                  height="420"
                  frameBorder={0}
                  style={{border:'none',display:'block',borderRadius:'12px'}}
                  title="Myfxbook Portfolio Performance"
                  loading="lazy"
                  scrolling="no"
                />
              </div>
              <div className="widget-caption">
                Verified portfolio performance — actual copy trading is done via Vantage below.
              </div>

              <div className="hero-announce" role="note">
                <strong>I&apos;ve officially launched my copy trading strategy.</strong> You can now automatically copy all my trades — no manual work needed. Create your account, deposit funds, and connect — even while you sleep, your account takes trades automatically.
              </div>

              <div className="btn-stack">
                <a href={VANTAGE_COPY} className="btn btn-gold" target="_blank" rel="noopener noreferrer" aria-label="Start copying trades now">
                  <RocketIcon/> Start Copying Now
                </a>
                <a href={VANTAGE_ACCT} className="btn btn-green" target="_blank" rel="noopener noreferrer" aria-label="Create Vantage account">
                  <PlusIcon/> Create Vantage Account
                </a>
              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── HOW TO COPY ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">How to copy</p>
              <h2 className="h2 rv d1">3 Steps to Get Started</h2>

              <ol className="steps" aria-label="Steps to start copy trading">

                {/* Step 1 */}
                <li className="step rv d1">
                  <div className="step-num" aria-hidden="true">1</div>
                  <div className="step-body">
                    <p className="step-title">Create a Vantage Account</p>
                    <p className="step-desc">Click the link and select these exact settings when creating your account:</p>

                    <div className="settings-grid" role="list" aria-label="Account settings">
                      {[
                        ['Platform',      'Copy Trading'],
                        ['Account Type',  'ECN'],
                        ['Leverage',      '1:500'],
                        ['Currency',      'USD'],
                      ].map(([k, v]) => (
                        <div className="setting" key={k} role="listitem">
                          <div className="setting-key">{k}</div>
                          <div className="setting-val">{v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Referral code */}
                    <CopyRefCode code="TpCuu75a" />

                    <a href={VANTAGE_ACCT} className="step-link" target="_blank" rel="noopener noreferrer" aria-label="Open Vantage account">
                      Open Account <ArrowIcon/>
                    </a>
                  </div>
                </li>

                {/* Step 2 */}
                <li className="step rv d2">
                  <div className="step-num" aria-hidden="true">2</div>
                  <div className="step-body">
                    <p className="step-title">Complete KYC</p>
                    <p className="step-desc">Verify your identity inside the Vantage app. Takes 5–10 minutes. You&apos;ll need a <strong style={{color:'#E2E8F0'}}>government-issued ID</strong> (passport or driving licence) and a <strong style={{color:'#E2E8F0'}}>selfie</strong>. This is a standard regulated broker requirement — your documents are encrypted and secure. Required before depositing.</p>
                  </div>
                </li>

                {/* Step 3 */}
                <li className="step rv d3">
                  <div className="step-num" aria-hidden="true">3</div>
                  <div className="step-body">
                    <p className="step-title">Deposit Minimum $100</p>
                    <p className="step-desc">Fund your account. Bigger the deposit, higher the potential returns. $100 minimum to copy.</p>
                  </div>
                </li>

              </ol>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── REQUIREMENTS ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">Requirements</p>
              <h2 className="h2 rv d1">What You Need</h2>

              <div className="glass" role="list" aria-label="Requirements" style={{padding:'8px 20px'}}>
                <div className="req-list">
                  {[
                    ['Minimum Deposit',   '$100 (more = higher returns)'],
                    ['Account Type',      'ECN Account'],
                    ['Leverage',          '1:500 (recommended)'],
                    ['Broker',            'Vantage Markets'],
                    ['Platform',          'Copy Trading'],
                  ].map(([label, val]) => (
                    <div className="req-item rv" key={label} role="listitem">
                      <span className="req-label">
                        <span className="req-dot" aria-hidden="true"/>
                        {label}
                      </span>
                      <span className="req-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── SETUP SETTINGS ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">Important</p>
              <h2 className="h2 rv d1">Copy Setup Settings</h2>

              <div className="plans">

                {/* Plan A — Small Capital */}
                <div className="setup-card green-card rv d1" role="region" aria-label="Small capital settings $100 to $500">
                  <div className="plan-badge green">$100 – $500 · Small Capital</div>
                  <div className="setup-head">
                    <div className="setup-ico green-ico" aria-hidden="true">
                      <SettingsIcon color="#10B981"/>
                    </div>
                    <div>
                      <p className="setup-title">Fixed Lot Plan</p>
                      <p className="setup-sub">Controlled risk — great for beginners</p>
                    </div>
                  </div>
                  <div className="setup-rows" role="list">
                    {([
                      ['Copy Mode',       'Fixed Lot',    'green'],
                      ['Min. Balance',    '$100',         'green'],
                      ['Lot per Order',   '0.01',         'green'],
                      ['Stop Loss',       '95%',          'green'],
                      ['Take Profit',     'OFF',          'off'  ],
                      ['Lot Round-Up',    'OFF',          'off'  ],
                    ] as [string,string,string][]).map(([label, val, cls]) => (
                      <div className="setup-row" key={label} role="listitem">
                        <span className="setup-label">{label}</span>
                        <span className={`setup-value ${cls}`}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan B — Large Capital */}
                <div className="setup-card" role="region" aria-label="Large capital settings $1000 plus">
                  <div className="plan-badge gold">$1,000+ · Standard Plan</div>
                  <div className="setup-head">
                    <div className="setup-ico" aria-hidden="true">
                      <SettingsIcon color="#CA8A04"/>
                    </div>
                    <div>
                      <p className="setup-title">Equivalent Used Margin Plan</p>
                      <p className="setup-sub">Proportional sizing — scales with your capital</p>
                    </div>
                  </div>
                  <div className="setup-rows" role="list">
                    {([
                      ['Copy Mode',        'Equivalent Used Margin', ''     ],
                      ['Used Margin',      '1.0x',                  ''     ],
                      ['Copy Open Trades', 'ON',                     'green'],
                      ['Lot Round-Up',     'ON',                     'green'],
                    ] as [string,string,string][]).map(([label, val, cls]) => (
                      <div className="setup-row" key={label} role="listitem">
                        <span className="setup-label">{label}</span>
                        <span className={`setup-value${cls ? ` ${cls}` : ''}`}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div style={{marginTop:'16px'}}>
                <a href={VANTAGE_COPY} className="btn btn-gold" target="_blank" rel="noopener noreferrer" aria-label="Start copy trading on Vantage">
                  <RocketIcon/> Start Copying Here
                </a>
              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── FOLLOW DAILY UPDATES ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">Stay Updated</p>
              <h2 className="h2 rv d1">Follow Daily Updates</h2>

              <div className="result-cards">

                {/* Daily results Telegram channel */}
                <a
                  href={TG_CHANNEL}
                  className="glass myfx rv d3"
                  style={{border:'1px solid rgba(38,120,232,.18)',background:'rgba(38,120,232,.04)'}}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow daily results on Telegram channel"
                >
                  <div className="myfx-left">
                    <div className="myfx-ico" style={{background:'rgba(38,120,232,.12)',border:'1px solid rgba(38,120,232,.25)'}} aria-hidden="true">
                      <TgIcon size={20} color="#60A5FA"/>
                    </div>
                    <div>
                      <p className="myfx-name">Daily Results Update</p>
                      <p className="myfx-sub">@koushikranjit — every trade posted daily</p>
                    </div>
                  </div>
                  <span className="verified" style={{color:'#60A5FA',background:'rgba(38,120,232,.08)',borderColor:'rgba(38,120,232,.25)'}}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2l1.5 3h3l-2.5 2 1 3L6 8.5 3 10l1-3L1.5 5h3z"/></svg>
                    Follow
                  </span>
                </a>

                {/* Myfxbook */}
                <a
                  href={MYFXBOOK}
                  className="glass myfx rv d4"
                  style={{border:'1px solid rgba(255,255,255,.07)'}}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View verified live trading results on Myfxbook"
                >
                  <div className="myfx-left">
                    <div className="myfx-ico" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="myfx-name">Verified on Myfxbook</p>
                      <p className="myfx-sub">koushik-ranjit / #12009479 — Updated live</p>
                    </div>
                  </div>
                  <span className="verified">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="2 6 5 9 10 3"/></svg>
                    Verified
                  </span>
                </a>

              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── SUPPORT ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">Need help?</p>
              <h2 className="h2 rv d1">Get Setup Support</h2>

              <div className="support-row rv d2">
                <a
                  href={TELEGRAM}
                  className="glass support-btn"
                  style={{border:'1px solid rgba(255,255,255,.07)'}}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message on Telegram"
                >
                  <div className="support-ico tg" aria-hidden="true">
                    <TgIcon size={20} color="#3B82F6"/>
                  </div>
                  <div>
                    <p className="support-name">Message on Telegram</p>
                    <p className="support-handle">@mrkoushikranjit</p>
                  </div>
                  <span className="support-arrow" aria-hidden="true"><ArrowIcon/></span>
                </a>

                <a
                  href={DISCORD}
                  className="glass support-btn"
                  style={{border:'1px solid rgba(255,255,255,.07)'}}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Discord community"
                >
                  <div className="support-ico dc" aria-hidden="true">
                    <DiscordIcon/>
                  </div>
                  <div>
                    <p className="support-name">Join Discord Community</p>
                    <p className="support-handle">discord.gg/sffdu4wXx2</p>
                  </div>
                  <span className="support-arrow" aria-hidden="true"><ArrowIcon/></span>
                </a>
              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── FAQ ── */}
          <section className="sec">
            <div className="w">
              <p className="tag rv">FAQ</p>
              <h2 className="h2 rv d1">Common Questions</h2>

              <div className="faq-list rv d2">

                <details className="faq-item">
                  <summary>
                    Is this free to join?
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <p className="faq-answer">Yes — copying my trades on Vantage is completely free. There are no monthly fees, no subscription, and no charges from me. You only need to fund your own trading account on Vantage with a minimum of $100.</p>
                </details>

                <details className="faq-item">
                  <summary>
                    What is the minimum deposit?
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <p className="faq-answer">The minimum is $100. However, a higher balance gives proportionally larger position sizes and higher potential returns. Most followers start with $200–$500 for more comfortable sizing.</p>
                </details>

                <details className="faq-item">
                  <summary>
                    Can I stop copying at any time?
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <p className="faq-answer">Yes, completely. You can pause or stop copying at any time from within the Vantage app with one tap. Your funds always remain in your own account — I never have access to them.</p>
                </details>

                <details className="faq-item">
                  <summary>
                    Do I need any trading experience?
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <p className="faq-answer">No experience needed. Once you set up your account and connect the copy trading, everything is automatic. My trades copy to your account in real time — you don't need to do anything manually.</p>
                </details>

                <details className="faq-item">
                  <summary>
                    What happens on a losing trade?
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <p className="faq-answer">Losses are a normal part of trading — no strategy wins 100% of the time. When I take a losing trade, the same proportional loss is reflected in your account. This is why the strategy uses a stop loss (95%) to cap risk per trade. Only invest capital you can afford to lose.</p>
                </details>

              </div>
            </div>
          </section>

          <hr className="hr"/>

          {/* ── FINAL CTA ── */}
          <section className="sec">
            <div className="w">
              <div className="cta-box rv">
                <h2 className="cta-h2">Ready to Copy?</h2>
                <p className="cta-p">Create your Vantage account, deposit $100, apply the settings above — and you&apos;re live.</p>
                <div className="btn-stack">
                  <a href={VANTAGE_COPY} className="btn btn-gold" target="_blank" rel="noopener noreferrer" aria-label="Start copy trading">
                    <RocketIcon/> Start Copying Now
                  </a>
                  <a href={VANTAGE_ACCT} className="btn btn-green" target="_blank" rel="noopener noreferrer" aria-label="Create Vantage account">
                    <PlusIcon/> Create Vantage Account
                  </a>
                  <a href={TELEGRAM} className="btn btn-ghost" target="_blank" rel="noopener noreferrer" aria-label="Get setup help on Telegram">
                    Need help with setup? Message me
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <footer>
            <div className="w">
              <hr className="hr"/>
              <div className="disc" role="contentinfo">
                <p>
                  Forex trading involves risk. Past performance does not guarantee future profits.
                  Only invest capital you can afford to lose. This is not financial advice.
                  By using this page, you agree to our{' '}
                  <a href="/riskandearning" style={{color:'#64748B',textDecoration:'underline'}}>Risk &amp; Earning Disclaimer</a>.
                </p>
              </div>
            </div>
          </footer>

        </div>

        {/* ── WhatsApp FAB ── */}
        <a
          href={WHATSAPP}
          className="wa-fab"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon/>
        </a>

      </div>

      {/* Scroll reveal — afterInteractive ensures it runs after React hydration */}
      <Script id="scroll-reveal" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`
        (function(){
          var els=document.querySelectorAll('.rv');
          if(!els.length)return;
          var io=new IntersectionObserver(function(entries){
            entries.forEach(function(e){
              if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}
            });
          },{threshold:0,rootMargin:'0px 0px -40px 0px'});
          els.forEach(function(el){io.observe(el);});
        })();
      `}}/>
    </>
  );
}

/* ── Icons ── */
function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  );
}

function SettingsIcon({ color = '#CA8A04' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function TgIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#7289DA" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.024.015.046.03.06a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

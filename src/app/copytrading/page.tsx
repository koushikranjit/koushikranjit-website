export const metadata = {
  title: 'KR Trades — XAUUSD Copy Trading',
  description: 'Copy professional XAUUSD trades. Verified PnL on Myfxbook. Start with $100 on Vantage.',
};

const TELEGRAM      = 'https://t.me/HySGNbJa3r';
const VANTAGE_ACCT  = 'https://vigco.co/la-com-inv/TpCuu75a';
const VANTAGE_COPY  = 'https://vantageapp.onelink.me/qaPD?af_xp=referral&pid=IBSHARE&deep_link_value=mt4id-140247%7Cplatform-copytrading&deep_link_sub1=spid-1164895&af_dp=com.vttech.VantageFX%3A%2F%2F&af_force_deeplink=true';
const MYFXBOOK      = 'https://www.myfxbook.com/portfolio/koushik-ranjit/12009479';

export default function CopytradingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        /* ── Reset & base ── */
        .ct * { box-sizing: border-box; margin: 0; padding: 0; }

        .ct {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #F1F5F9;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        html { scroll-behavior: smooth; }

        .ct-wrap {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Background orbs ── */
        .ct-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .ct-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
        }

        .ct-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #059669, transparent 70%);
          top: -100px; right: -100px;
        }

        .ct-orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #CA8A04, transparent 70%);
          bottom: 20%; left: -120px;
        }

        .ct-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #059669, transparent 70%);
          bottom: -80px; right: 10%;
          opacity: 0.08;
        }

        /* ── Content layer above orbs ── */
        .ct-content { position: relative; z-index: 1; }

        /* ── Nav ── */
        .ct-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(5,150,105,0.15);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ct-logo {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #F1F5F9;
          text-decoration: none;
        }
        .ct-logo-g {
          color: #10B981;
          text-shadow: 0 0 12px rgba(16,185,129,0.5);
        }

        .ct-nav-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #CA8A04;
          background: rgba(202,138,4,0.1);
          border: 1px solid rgba(202,138,4,0.3);
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* ── Hero ── */
        .ct-hero {
          padding: 72px 0 56px;
          text-align: center;
        }

        .ct-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #10B981;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 28px;
        }

        .ct-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: ct-pulse 1.8s infinite;
        }

        @keyframes ct-pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50%      { opacity:0.3; transform: scale(0.8); }
        }

        .ct-h1 {
          font-size: clamp(38px, 10vw, 58px);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1.05;
          margin-bottom: 16px;
          color: #FFFFFF;
        }

        .ct-h1-gold {
          background: linear-gradient(135deg, #CA8A04, #FCD34D, #CA8A04);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .ct-hero-sub {
          font-size: 17px;
          color: #64748B;
          margin-bottom: 32px;
          line-height: 1.6;
          max-width: 340px;
          margin-left: auto;
          margin-right: auto;
        }

        .ct-bullets {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
          text-align: left;
        }

        .ct-bullets li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #CBD5E1;
        }

        .ct-chk {
          flex-shrink: 0;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(16,185,129,0.12);
          border: 1.5px solid rgba(16,185,129,0.35);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 8px rgba(16,185,129,0.15);
        }

        /* ── Buttons ── */
        .ct-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'DM Sans', inherit;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          -webkit-tap-highlight-color: transparent;
          width: 100%;
          padding: 18px 28px;
          box-sizing: border-box;
        }

        .ct-btn-primary {
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #059669 100%);
          background-size: 200% auto;
          color: #fff;
          box-shadow: 0 4px 30px rgba(5,150,105,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          letter-spacing: -0.01em;
        }

        .ct-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(5,150,105,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
          background-position: right center;
        }

        .ct-btn-primary:active { transform: translateY(0); }

        .ct-btn-gold {
          background: linear-gradient(135deg, #92400E, #CA8A04, #FCD34D, #CA8A04);
          background-size: 300% auto;
          color: #0A0500;
          font-weight: 800;
          box-shadow: 0 4px 30px rgba(202,138,4,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .ct-btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(202,138,4,0.45), inset 0 1px 0 rgba(255,255,255,0.2);
          background-position: right center;
        }

        .ct-btn-glass {
          background: rgba(255,255,255,0.04);
          color: #10B981;
          border: 1px solid rgba(16,185,129,0.25);
          backdrop-filter: blur(10px);
        }

        .ct-btn-glass:hover {
          background: rgba(16,185,129,0.08);
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 20px rgba(16,185,129,0.1);
        }

        .ct-btn:focus-visible {
          outline: 2px solid #10B981;
          outline-offset: 3px;
        }

        /* ── Section ── */
        .ct-sec {
          padding: 60px 0;
          position: relative;
        }

        .ct-hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .ct-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #10B981;
          text-align: center;
          margin-bottom: 10px;
        }

        .ct-title {
          font-size: clamp(24px, 6vw, 32px);
          font-weight: 800;
          letter-spacing: -0.03em;
          text-align: center;
          margin-bottom: 32px;
          color: #FFFFFF;
          line-height: 1.2;
        }

        /* ── Glass card base ── */
        .ct-glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.4);
        }

        /* ── Stats ── */
        .ct-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }

        .ct-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px 14px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ct-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(202,138,4,0.4), transparent);
        }

        .ct-stat:hover {
          border-color: rgba(202,138,4,0.2);
          box-shadow: 0 0 24px rgba(202,138,4,0.08);
        }

        .ct-stat-val {
          display: block;
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #CA8A04, #FCD34D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ct-stat-lbl {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: #475569;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Myfxbook card ── */
        .ct-myfx {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 20px;
          text-decoration: none;
          cursor: pointer;
          border-radius: 14px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .ct-myfx:hover {
          border-color: rgba(16,185,129,0.3) !important;
          box-shadow: 0 0 30px rgba(16,185,129,0.08);
          background: rgba(16,185,129,0.04) !important;
        }

        .ct-myfx-left { display: flex; align-items: center; gap: 14px; }

        .ct-myfx-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ct-myfx-name {
          font-size: 14px;
          font-weight: 700;
          color: #E2E8F0;
          letter-spacing: -0.01em;
        }

        .ct-myfx-sub {
          font-size: 11px;
          color: #475569;
          margin-top: 2px;
        }

        .ct-verified-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #10B981;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 4px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        /* ── Steps ── */
        .ct-steps { display: flex; flex-direction: column; }
        .ct-step { display: flex; gap: 18px; align-items: flex-start; position: relative; }

        .ct-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 21px; top: 48px;
          height: calc(100% + 4px);
          width: 1px;
          background: linear-gradient(180deg, rgba(202,138,4,0.3), transparent);
        }

        .ct-step + .ct-step { margin-top: 32px; }

        .ct-step-num {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(202,138,4,0.08);
          border: 2px solid rgba(202,138,4,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          font-weight: 900;
          color: #CA8A04;
          box-shadow: 0 0 20px rgba(202,138,4,0.12);
          text-shadow: 0 0 10px rgba(202,138,4,0.4);
        }

        .ct-step-body { padding-top: 10px; }

        .ct-step-title {
          font-size: 17px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .ct-step-desc {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
        }

        .ct-step-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #10B981;
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.18);
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, box-shadow 0.18s;
        }

        .ct-step-btn:hover {
          background: rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.4);
          box-shadow: 0 0 16px rgba(16,185,129,0.12);
        }

        /* ── Final CTA box ── */
        .ct-cta-box {
          border-radius: 20px;
          padding: 44px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(202,138,4,0.15);
        }

        .ct-cta-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(202,138,4,0.5), transparent);
        }

        .ct-cta-box::after {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(202,138,4,0.06), transparent 70%);
          pointer-events: none;
        }

        .ct-cta-h2 {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 10px;
          color: #FFFFFF;
          position: relative;
          z-index: 1;
        }

        .ct-cta-p {
          font-size: 15px;
          color: #64748B;
          margin-bottom: 30px;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .ct-btn-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        /* ── Scroll reveal ── */
        .ct-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .ct-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ct-reveal-d1 { transition-delay: 0.1s; }
        .ct-reveal-d2 { transition-delay: 0.2s; }
        .ct-reveal-d3 { transition-delay: 0.3s; }

        /* ── Disclaimer ── */
        .ct-disc {
          padding: 24px 0 52px;
          text-align: center;
        }
        .ct-disc p {
          font-size: 11px;
          color: #1E293B;
          line-height: 1.8;
          max-width: 400px;
          margin: 0 auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-dot { animation: none; opacity: 1; }
          .ct-btn-primary:hover,
          .ct-btn-gold:hover { transform: none; }
          .ct-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <div className="ct">
        {/* Background orbs */}
        <div className="ct-bg" aria-hidden="true">
          <div className="ct-orb ct-orb-1" />
          <div className="ct-orb ct-orb-2" />
          <div className="ct-orb ct-orb-3" />
        </div>

        <div className="ct-content">

          {/* ── NAV ── */}
          <header className="ct-nav">
            <a href="/copytrading" className="ct-logo" aria-label="KR Trades">
              KR <span className="ct-logo-g">Trades</span>
            </a>
            <span className="ct-nav-badge">XAUUSD</span>
          </header>

          {/* ── HERO ── */}
          <section className="ct-hero">
            <div className="ct-wrap">
              <div className="ct-live" aria-label="Signals currently active">
                <span className="ct-dot" aria-hidden="true" />
                Signals Active
              </div>

              <h1 className="ct-h1">
                Copy Gold Trades
                <span className="ct-h1-gold">That Actually Win</span>
              </h1>

              <p className="ct-hero-sub">
                Verified XAUUSD performance. One-time setup. Runs on autopilot.
              </p>

              <ul className="ct-bullets" aria-label="Key benefits">
                {[
                  'Verified PnL — not fake screenshots',
                  'Start with just $100',
                  'One-time setup — fully automatic',
                ].map((text) => (
                  <li key={text}>
                    <span className="ct-chk" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <a
                href={TELEGRAM}
                className="ct-btn ct-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join KR Trades on Telegram"
              >
                <TgIcon />
                Join Telegram — Free
              </a>
            </div>
          </section>

          <hr className="ct-hr" />

          {/* ── PROOF ── */}
          <section className="ct-sec">
            <div className="ct-wrap">
              <p className="ct-tag ct-reveal">Verified Performance</p>
              <h2 className="ct-title ct-reveal ct-reveal-d1">Real PnL. Public Record.</h2>

              <div className="ct-stats ct-reveal ct-reveal-d2" role="list" aria-label="Performance stats">
                {[
                  { val: '+24%',   lbl: 'Avg Monthly' },
                  { val: '<8%',    lbl: 'Max Drawdown' },
                  { val: '68%',    lbl: 'Win Rate' },
                  { val: 'XAUUSD', lbl: 'Focus Pair' },
                ].map(({ val, lbl }) => (
                  <div className="ct-stat" key={lbl} role="listitem">
                    <span className="ct-stat-val">{val}</span>
                    <span className="ct-stat-lbl">{lbl}</span>
                  </div>
                ))}
              </div>

              <a
                href={MYFXBOOK}
                className="ct-glass ct-myfx ct-reveal ct-reveal-d3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View verified trading record on Myfxbook"
              >
                <div className="ct-myfx-left">
                  <div className="ct-myfx-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="ct-myfx-name">View on Myfxbook</p>
                    <p className="ct-myfx-sub">koushik-ranjit / #12009479</p>
                  </div>
                </div>
                <span className="ct-verified-badge">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                  Verified
                </span>
              </a>
            </div>
          </section>

          <hr className="ct-hr" />

          {/* ── HOW IT WORKS ── */}
          <section className="ct-sec">
            <div className="ct-wrap">
              <p className="ct-tag ct-reveal">Get Started</p>
              <h2 className="ct-title ct-reveal ct-reveal-d1">3 Steps. That&apos;s All.</h2>

              <ol className="ct-steps" aria-label="Steps to start copy trading">
                <li className="ct-step ct-reveal ct-reveal-d1">
                  <div className="ct-step-num" aria-hidden="true">1</div>
                  <div className="ct-step-body">
                    <p className="ct-step-title">Create a Vantage Account</p>
                    <p className="ct-step-desc">Free to open. Takes 5 minutes. Regulated broker.</p>
                    <a
                      href={VANTAGE_ACCT}
                      className="ct-step-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Vantage account"
                    >
                      Open Account
                      <ArrowIcon />
                    </a>
                  </div>
                </li>

                <li className="ct-step ct-reveal ct-reveal-d2">
                  <div className="ct-step-num" aria-hidden="true">2</div>
                  <div className="ct-step-body">
                    <p className="ct-step-title">Deposit Minimum $100</p>
                    <p className="ct-step-desc">Fund your account. $100 minimum to copy live XAUUSD trades.</p>
                  </div>
                </li>

                <li className="ct-step ct-reveal ct-reveal-d3">
                  <div className="ct-step-num" aria-hidden="true">3</div>
                  <div className="ct-step-body">
                    <p className="ct-step-title">Set Up Copy Trading</p>
                    <p className="ct-step-desc">One tap inside the Vantage app — trades copy automatically after that.</p>
                    <a
                      href={VANTAGE_COPY}
                      className="ct-step-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Start copy trading on Vantage"
                    >
                      Start Copying Now
                      <ArrowIcon />
                    </a>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <hr className="ct-hr" />

          {/* ── FINAL CTA ── */}
          <section className="ct-sec">
            <div className="ct-wrap">
              <div className="ct-cta-box ct-reveal">
                <h2 className="ct-cta-h2">Ready to Start?</h2>
                <p className="ct-cta-p">Join free on Telegram. Get the setup guide and go live in minutes.</p>
                <div className="ct-btn-stack">
                  <a
                    href={TELEGRAM}
                    className="ct-btn ct-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join KR Trades Telegram"
                  >
                    <TgIcon />
                    Join Telegram — Free
                  </a>
                  <a
                    href={VANTAGE_COPY}
                    className="ct-btn ct-btn-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Start copy trading on Vantage"
                  >
                    Start Copying Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <footer>
            <div className="ct-wrap">
              <hr className="ct-hr" />
              <div className="ct-disc" role="contentinfo">
                <p>
                  Trading involves significant risk. Past performance is not indicative of future results.
                  Only invest capital you can afford to lose. This is not financial advice.
                  KR Trades is an educational signal service. Affiliate links used for Vantage.
                </p>
              </div>
            </div>
          </footer>

        </div>{/* ct-content */}
      </div>{/* ct */}

      {/* Scroll reveal observer */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var els = document.querySelectorAll('.ct-reveal');
          if (!els.length) return;
          var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
              }
            });
          }, { threshold: 0.12 });
          els.forEach(function(el) { io.observe(el); });
        })();
      `}} />
    </>
  );
}

function TgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  );
}

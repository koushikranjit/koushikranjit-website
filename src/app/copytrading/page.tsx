export const metadata = {
  title: 'KR Trades — XAUUSD Copy Trading',
  description: 'Copy professional XAUUSD trades. Verified PnL on Myfxbook. Start with $100 on Vantage.',
};

const TELEGRAM = 'https://t.me/HySGNbJa3r';
const VANTAGE_ACCOUNT = 'https://vigco.co/la-com-inv/TpCuu75a';
const VANTAGE_COPY = 'https://vantageapp.onelink.me/qaPD?af_xp=referral&pid=IBSHARE&deep_link_value=mt4id-140247%7Cplatform-copytrading&deep_link_sub1=spid-1164895&af_dp=com.vttech.VantageFX%3A%2F%2F&af_force_deeplink=true';
const MYFXBOOK = 'https://www.myfxbook.com/portfolio/koushik-ranjit/12009479';

export default function CopytradingPage() {
  return (
    <>
      <style>{`
        .ct-wrap {
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ct-body {
          background: #080D18;
          color: #F1F5F9;
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        /* Nav */
        .ct-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(8,13,24,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(5,150,105,0.12);
          padding: 13px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ct-logo {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #F1F5F9;
          text-decoration: none;
        }
        .ct-logo span { color: #10B981; }

        .ct-nav-pill {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #10B981;
          background: rgba(5,150,105,0.1);
          border: 1px solid rgba(5,150,105,0.25);
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* Hero */
        .ct-hero {
          padding: 60px 0 48px;
          text-align: center;
        }

        .ct-live {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          color: #10B981;
          background: rgba(5,150,105,0.08);
          border: 1px solid rgba(5,150,105,0.22);
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .ct-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10B981;
          animation: ct-blink 1.8s infinite;
        }

        @keyframes ct-blink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }

        .ct-h1 {
          font-size: clamp(34px, 9vw, 50px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.08;
          margin-bottom: 12px;
          color: #F1F5F9;
        }
        .ct-h1 .g { color: #10B981; }

        .ct-sub {
          font-size: 16px;
          color: #94A3B8;
          margin-bottom: 28px;
        }

        .ct-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 32px;
          text-align: left;
          padding: 0;
        }

        .ct-bullets li {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 15px;
          font-weight: 500;
          color: #CBD5E1;
        }

        .ct-chk {
          flex-shrink: 0;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(5,150,105,0.15);
          border: 1.5px solid rgba(5,150,105,0.4);
          display: flex; align-items: center; justify-content: center;
        }

        /* Buttons */
        .ct-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-family: inherit;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          -webkit-tap-highlight-color: transparent;
          width: 100%;
          padding: 17px 24px;
          box-sizing: border-box;
        }

        .ct-btn-green {
          background: linear-gradient(135deg, #059669, #10B981);
          color: #fff;
          box-shadow: 0 4px 24px rgba(5,150,105,0.25);
        }
        .ct-btn-green:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(5,150,105,0.4);
        }

        .ct-btn-outline {
          background: transparent;
          color: #10B981;
          border: 1.5px solid rgba(5,150,105,0.35);
        }
        .ct-btn-outline:hover {
          background: rgba(5,150,105,0.07);
          border-color: #10B981;
        }

        /* Divider + section */
        .ct-hr { border: none; border-top: 1px solid rgba(255,255,255,0.05); }
        .ct-sec { padding: 52px 0; }

        .ct-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #10B981;
          text-align: center;
          margin-bottom: 8px;
        }

        .ct-title {
          font-size: clamp(22px, 5vw, 28px);
          font-weight: 800;
          letter-spacing: -0.02em;
          text-align: center;
          margin-bottom: 28px;
          color: #F1F5F9;
        }

        /* Stats */
        .ct-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }

        .ct-stat {
          background: #111C30;
          border: 1px solid rgba(5,150,105,0.18);
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }

        .ct-stat-val {
          display: block;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #10B981;
        }

        .ct-stat-lbl {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: #64748B;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Myfxbook card */
        .ct-myfx {
          background: #111C30;
          border: 1px solid rgba(5,150,105,0.18);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
        }
        .ct-myfx:hover {
          border-color: #10B981;
          background: rgba(16,185,129,0.05);
        }

        .ct-myfx-left { display: flex; align-items: center; gap: 12px; }

        .ct-myfx-ico {
          width: 38px; height: 38px;
          border-radius: 9px;
          background: rgba(5,150,105,0.12);
          border: 1px solid rgba(5,150,105,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ct-myfx-name {
          font-size: 13px;
          font-weight: 600;
          color: #F1F5F9;
        }
        .ct-myfx-sub {
          font-size: 11px;
          color: #64748B;
          margin-top: 1px;
        }

        .ct-verified {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #10B981;
          background: rgba(5,150,105,0.1);
          border: 1px solid rgba(5,150,105,0.25);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        /* Steps */
        .ct-steps { display: flex; flex-direction: column; }

        .ct-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          position: relative;
        }

        .ct-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px;
          top: 44px;
          height: calc(100% + 4px);
          width: 2px;
          background: linear-gradient(180deg, rgba(5,150,105,0.3), transparent);
        }

        .ct-step + .ct-step { margin-top: 28px; }

        .ct-step-n {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(5,150,105,0.1);
          border: 2px solid rgba(5,150,105,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          font-weight: 800;
          color: #10B981;
        }

        .ct-step-body { padding-top: 8px; }
        .ct-step-title { font-size: 16px; font-weight: 700; margin-bottom: 3px; color: #F1F5F9; }
        .ct-step-desc { font-size: 14px; color: #94A3B8; }

        .ct-step-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #10B981;
          background: rgba(5,150,105,0.08);
          border: 1px solid rgba(5,150,105,0.2);
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .ct-step-link:hover {
          background: rgba(5,150,105,0.15);
          border-color: #10B981;
        }

        /* Final CTA */
        .ct-cta-box {
          background: linear-gradient(135deg, rgba(5,150,105,0.07), rgba(16,185,129,0.02));
          border: 1px solid rgba(5,150,105,0.2);
          border-radius: 20px;
          padding: 40px 20px;
          text-align: center;
        }

        .ct-cta-box h2 {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          color: #F1F5F9;
        }

        .ct-cta-box p { font-size: 15px; color: #94A3B8; margin-bottom: 28px; }

        .ct-btn-stack { display: flex; flex-direction: column; gap: 12px; }

        /* Disclaimer */
        .ct-disc { padding: 24px 0 44px; text-align: center; }
        .ct-disc p {
          font-size: 11px;
          color: #374151;
          line-height: 1.8;
          max-width: 420px;
          margin: 0 auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-dot { animation: none; opacity: 1; }
          .ct-btn-green:hover { transform: none; }
        }
      `}</style>

      <div className="ct-body">

        {/* Nav */}
        <header className="ct-nav">
          <a href="/copytrading" className="ct-logo">KR <span>Trades</span></a>
          <span className="ct-nav-pill">XAUUSD</span>
        </header>

        {/* Hero */}
        <section className="ct-hero">
          <div className="ct-wrap">
            <div className="ct-live">
              <span className="ct-dot" aria-hidden="true" />
              Live signals active
            </div>

            <h1 className="ct-h1">
              Copy Gold Trades<br />
              <span className="g">That Actually Win</span>
            </h1>

            <p className="ct-sub">Verified XAUUSD performance. Start copying in minutes.</p>

            <ul className="ct-bullets" aria-label="Key benefits">
              {[
                'Verified PnL — not fake screenshots',
                'Start with just $100',
                'One-time setup — fully automatic after that',
              ].map((text) => (
                <li key={text}>
                  <span className="ct-chk" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <a href={TELEGRAM} className="ct-btn ct-btn-green" target="_blank" rel="noopener noreferrer" aria-label="Join KR Trades on Telegram">
              <TgIcon />
              Join Telegram — Free
            </a>
          </div>
        </section>

        <hr className="ct-hr" />

        {/* Proof */}
        <section className="ct-sec">
          <div className="ct-wrap">
            <p className="ct-tag">Verified Performance</p>
            <h2 className="ct-title">Real PnL. Public Record.</h2>

            <div className="ct-stats" role="list" aria-label="Performance stats">
              {[
                { val: '+24%', lbl: 'Avg Monthly' },
                { val: '<8%',  lbl: 'Max Drawdown' },
                { val: '68%',  lbl: 'Win Rate' },
                { val: 'XAUUSD', lbl: 'Focus Pair' },
              ].map(({ val, lbl }) => (
                <div className="ct-stat" key={lbl} role="listitem">
                  <span className="ct-stat-val">{val}</span>
                  <span className="ct-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>

            <a href={MYFXBOOK} className="ct-myfx" target="_blank" rel="noopener noreferrer" aria-label="View verified trading record on Myfxbook">
              <div className="ct-myfx-left">
                <div className="ct-myfx-ico" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="ct-myfx-name">View on Myfxbook</p>
                  <p className="ct-myfx-sub">koushik-ranjit / #12009479</p>
                </div>
              </div>
              <span className="ct-verified">Verified</span>
            </a>
          </div>
        </section>

        <hr className="ct-hr" />

        {/* Steps */}
        <section className="ct-sec">
          <div className="ct-wrap">
            <p className="ct-tag">Get started</p>
            <h2 className="ct-title">3 Steps. That&apos;s All.</h2>

            <ol className="ct-steps" aria-label="Steps to start copy trading">
              <li className="ct-step">
                <div className="ct-step-n" aria-hidden="true">1</div>
                <div className="ct-step-body">
                  <p className="ct-step-title">Create a Vantage Account</p>
                  <p className="ct-step-desc">Free to open. Takes 5 minutes.</p>
                  <a href={VANTAGE_ACCOUNT} className="ct-step-link" target="_blank" rel="noopener noreferrer" aria-label="Open Vantage account">
                    Open Vantage Account
                    <ArrowIcon />
                  </a>
                </div>
              </li>

              <li className="ct-step">
                <div className="ct-step-n" aria-hidden="true">2</div>
                <div className="ct-step-body">
                  <p className="ct-step-title">Deposit Minimum $100</p>
                  <p className="ct-step-desc">Fund your account to start copying live trades.</p>
                </div>
              </li>

              <li className="ct-step">
                <div className="ct-step-n" aria-hidden="true">3</div>
                <div className="ct-step-body">
                  <p className="ct-step-title">Set Up Copy Trading</p>
                  <p className="ct-step-desc">One tap in the Vantage app — runs automatically after that.</p>
                  <a href={VANTAGE_COPY} className="ct-step-link" target="_blank" rel="noopener noreferrer" aria-label="Start copy trading on Vantage">
                    Start Copying Now
                    <ArrowIcon />
                  </a>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <hr className="ct-hr" />

        {/* Final CTA */}
        <section className="ct-sec">
          <div className="ct-wrap">
            <div className="ct-cta-box">
              <h2>Ready to Start?</h2>
              <p>Join free on Telegram and get the full copy trading setup guide.</p>
              <div className="ct-btn-stack">
                <a href={TELEGRAM} className="ct-btn ct-btn-green" target="_blank" rel="noopener noreferrer" aria-label="Join KR Trades Telegram">
                  <TgIcon />
                  Join Telegram — Free
                </a>
                <a href={VANTAGE_COPY} className="ct-btn ct-btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Start copy trading on Vantage">
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
                KR Trades is an educational signal service. Affiliate link used for Vantage.
              </p>
            </div>
          </div>
        </footer>

      </div>
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

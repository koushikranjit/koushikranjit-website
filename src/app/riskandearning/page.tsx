export const metadata = {
  title: 'Risk & Earning Disclaimer — KR Trades',
  description: 'Important risk and earning disclaimer for KR Trades XAUUSD copy trading service. Please read before using our service.',
};

const sections = [
  {
    id: 'general',
    title: 'General Risk Warning',
    content: [
      'KR Trades is provided to you for educational and informational purposes only. KR Trades is not a financial services entity, investment advisor, or broker. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other form of advice.',
      'Trading financial instruments, including XAUUSD (Gold), carries a high level of risk and may not be suitable for all investors. You should never invest more money than you can afford to lose. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.',
      'The possibility exists that you could sustain a loss of some or all of your initial investment. You should be aware of all the risks associated with trading and seek advice from an independent qualified financial advisor if you have any doubts.',
    ],
  },
  {
    id: 'forex',
    title: 'XAUUSD & Forex-Specific Risks',
    content: [
      'Trading XAUUSD (Gold against the US Dollar) and other forex instruments involves substantial risk due to the volatile nature of currency and commodity markets. Prices can change rapidly in response to news events, economic data, geopolitical developments, and other factors.',
      'Leverage is commonly used in forex and commodity trading. While leverage can amplify your profits, it may equally work against you. Leverage means that a small market movement will have a proportionally larger impact on the funds you have deposited or will need to deposit. This may work against you as well as for you. You may sustain a total loss of initial margin funds and any additional funds deposited with your broker.',
      'Data and signals provided by KR Trades may be sourced from third-party data providers or derived from market analysis. Pricing discrepancies may exist between KR Trades analysis and actual broker execution prices. KR Trades accepts no liability for any such discrepancies.',
      'Past trading results shown on our Myfxbook profile or any other platform are not necessarily indicative of future performance. All live results shown are from a specific account and do not represent average or typical results.',
    ],
  },
  {
    id: 'hypothetical',
    title: 'Hypothetical Performance Disclaimer',
    badge: 'CFTC Rule 4.41(b)(1) / NFA Rule 2-29',
    content: [
      'HYPOTHETICAL PERFORMANCE RESULTS HAVE MANY INHERENT LIMITATIONS, SOME OF WHICH ARE DESCRIBED BELOW. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES SIMILAR TO THOSE SHOWN. IN FACT, THERE ARE FREQUENTLY SHARP DIFFERENCES BETWEEN HYPOTHETICAL PERFORMANCE RESULTS AND THE ACTUAL RESULTS SUBSEQUENTLY ACHIEVED BY ANY PARTICULAR TRADING PROGRAM.',
      'ONE OF THE LIMITATIONS OF HYPOTHETICAL PERFORMANCE RESULTS IS THAT THEY ARE GENERALLY PREPARED WITH THE BENEFIT OF HINDSIGHT. IN ADDITION, HYPOTHETICAL TRADING DOES NOT INVOLVE FINANCIAL RISK, AND NO HYPOTHETICAL TRADING RECORD CAN COMPLETELY ACCOUNT FOR THE IMPACT OF FINANCIAL RISK IN ACTUAL TRADING.',
      'THE ABILITY TO WITHSTAND LOSSES OR TO ADHERE TO A PARTICULAR TRADING PROGRAM IN SPITE OF TRADING LOSSES ARE MATERIAL POINTS WHICH CAN ALSO ADVERSELY AFFECT ACTUAL TRADING RESULTS. THERE ARE NUMEROUS OTHER FACTORS RELATED TO THE MARKETS IN GENERAL OR TO THE IMPLEMENTATION OF ANY SPECIFIC TRADING PROGRAM WHICH CANNOT BE FULLY ACCOUNTED FOR IN THE PREPARATION OF HYPOTHETICAL PERFORMANCE RESULTS AND ALL OF WHICH CAN ADVERSELY AFFECT ACTUAL TRADING RESULTS.',
    ],
    isLegal: true,
  },
  {
    id: 'copytrading',
    title: 'Automated EA Trading Risks',
    content: [
      'This service provides a fully automated Expert Advisor (EA) that trades on your connected account. While the EA follows a fixed, rule-based strategy, past performance of the EA or any account running it is not guaranteed to continue, and it may not be suitable for your financial situation.',
      'Execution prices, spreads, and slippage on your account may differ from the results shown on our verified track record due to broker conditions, liquidity, and connection timing. Your results may differ from the accounts shown on our Systems table or Myfxbook profile.',
      'KR Auto Trading is affiliated with Vantage Markets through a referral relationship — we may receive a commission when you open an account using our referral link or code. This does not affect the cost to you. You are responsible for reviewing and accepting Vantage Markets\' own terms, including their policies on automated/EA trading, before depositing funds.',
      'The $100/month subscription fee covers our system and VPS hosting costs — it is not a broker fee. The $300 minimum deposit is a separate requirement set by us, not the broker. Our team connects your account to the EA after you subscribe and deposit; you remain responsible for monitoring your account. We recommend never depositing more than you can afford to lose.',
    ],
  },
  {
    id: 'earnings',
    title: 'Earning Potential Disclaimer',
    content: [
      'Any mention of potential returns, monthly targets, or performance statistics (including the "15–30% monthly target" referenced in our marketing materials) are targets and historical figures, not guarantees. Individual results will vary significantly based on account size, broker, execution, market conditions, and other factors.',
      'The performance statistics shown on our Myfxbook profile (koushik-ranjit / #12009479) represent live trading results from a specific account under specific market conditions. These results are provided for transparency and do not guarantee that you will achieve similar returns by copy trading.',
      'You may make more, less, or lose money entirely when copy trading. KR Trades makes no income claims or earnings guarantees of any kind. Testimonials or results shared in our community channels represent individual experiences and are not typical.',
    ],
  },
  {
    id: 'thirdparty',
    title: 'Third-Party & Technology Risks',
    content: [
      'KR Trades may provide links to third-party websites, brokers, or platforms (including Vantage Markets). These links are provided for convenience only. KR Trades has no control over the content or policies of these third-party sites and accepts no responsibility for them.',
      'Internet-based trading systems and signal delivery via Telegram are subject to technological failures, internet outages, and delays. KR Trades cannot be held responsible for any losses arising from technical failures, delayed signals, or connectivity issues on the part of any platform or service.',
      'The use of affiliate links on our platforms means KR Trades may receive a commission when you open an account with a recommended broker. This does not affect the cost to you. We only recommend regulated brokers we believe to be reputable.',
    ],
  },
  {
    id: 'accuracy',
    title: 'Accuracy & Liability Limitation',
    content: [
      'While KR Trades makes every effort to ensure the accuracy of the information provided, we cannot guarantee that all signals, analysis, or educational content is free from errors. Markets change rapidly and information that was accurate at the time of publication may no longer be current.',
      'KR Trades, its founders, moderators, and affiliates shall not be liable for any losses, damages, or costs, including but not limited to loss of profits, loss of business, or loss of data arising from your use of this service or reliance on any information provided.',
      'By using KR Trades services, including our Telegram channel, website, and any copy trading signals, you acknowledge that you have read and understood this Risk and Earning Disclaimer and agree to its terms.',
    ],
  },
];

export default function RiskAndEarningPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .rk *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .rk {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* Background */
        .rk-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .rk-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .rk-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(5,150,105,0.06), transparent 70%);
          top: -150px; right: -150px;
        }
        .rk-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(202,138,4,0.05), transparent 70%);
          bottom: 10%; left: -150px;
        }

        .rk-content { position: relative; z-index: 1; }

        /* Nav */
        .rk-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .rk-logo {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #F1F5F9;
          text-decoration: none;
        }
        .rk-logo-g {
          color: #10B981;
          text-shadow: 0 0 12px rgba(16,185,129,0.4);
        }

        .rk-nav-link {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s;
        }
        .rk-nav-link:hover { color: #10B981; }

        /* Hero header */
        .rk-header {
          padding: 64px 24px 48px;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .rk-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #CA8A04;
          background: rgba(202,138,4,0.08);
          border: 1px solid rgba(202,138,4,0.2);
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .rk-h1 {
          font-size: clamp(28px, 6vw, 44px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        .rk-h1-sub {
          font-size: 16px;
          color: #475569;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 32px;
        }

        /* Warning banner */
        .rk-warning {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: 14px;
          padding: 20px;
          margin: 0 auto 48px;
          max-width: 640px;
          text-align: left;
        }

        .rk-warning-icon {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }

        .rk-warning-title {
          font-size: 13px;
          font-weight: 700;
          color: #FCA5A5;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .rk-warning-text {
          font-size: 13px;
          color: #94A3B8;
          line-height: 1.6;
        }

        /* TOC */
        .rk-toc {
          max-width: 760px;
          margin: 0 auto 48px;
          padding: 0 24px;
        }

        .rk-toc-inner {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 24px;
        }

        .rk-toc-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #475569;
          margin-bottom: 16px;
        }

        .rk-toc-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .rk-toc-item a {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.18s;
        }

        .rk-toc-item:last-child a { border-bottom: none; }

        .rk-toc-item a:hover { color: #10B981; }

        .rk-toc-num {
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          min-width: 20px;
        }

        /* Main body */
        .rk-body {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Section card */
        .rk-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .rk-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent);
        }

        .rk-card.legal {
          background: rgba(239,68,68,0.03);
          border-color: rgba(239,68,68,0.1);
        }

        .rk-card.legal::before {
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent);
        }

        .rk-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .rk-card-title {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }

        .rk-card-badge {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #EF4444;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          margin-top: 3px;
        }

        .rk-paras {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .rk-para {
          font-size: 14px;
          color: #64748B;
          line-height: 1.75;
        }

        .rk-para.legal-text {
          font-size: 13px;
          color: #475569;
          font-weight: 500;
          line-height: 1.8;
        }

        /* Key points highlight */
        .rk-points {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rk-point {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #64748B;
          line-height: 1.5;
        }

        .rk-point-dot {
          flex-shrink: 0;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #10B981;
          margin-top: 6px;
          box-shadow: 0 0 6px rgba(16,185,129,0.4);
        }

        /* Agreement box */
        .rk-agree {
          background: rgba(16,185,129,0.04);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 14px;
          padding: 28px;
          text-align: center;
        }

        .rk-agree-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }

        .rk-agree-title {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .rk-agree-text {
          font-size: 13px;
          color: #475569;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* CTA row */
        .rk-cta-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .rk-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', inherit;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          padding: 12px 24px;
          transition: transform 0.18s, box-shadow 0.18s;
          -webkit-tap-highlight-color: transparent;
        }

        .rk-btn-green {
          background: linear-gradient(135deg, #059669, #10B981);
          color: #fff;
          box-shadow: 0 4px 20px rgba(5,150,105,0.3);
        }
        .rk-btn-green:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(5,150,105,0.4);
        }

        .rk-btn-ghost {
          background: rgba(255,255,255,0.03);
          color: #64748B;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .rk-btn-ghost:hover {
          color: #94A3B8;
          border-color: rgba(255,255,255,0.14);
        }

        /* Updated at */
        .rk-updated {
          text-align: center;
          font-size: 11px;
          color: #1E293B;
          padding: 0 24px 40px;
        }

        @media (max-width: 600px) {
          .rk-header { padding: 48px 20px 36px; }
          .rk-card { padding: 24px 20px; }
          .rk-toc-inner { padding: 20px; }
          .rk-card-title { font-size: 16px; }
        }
      `}</style>

      <div className="rk">
        <div className="rk-bg" aria-hidden="true">
          <div className="rk-orb rk-orb-1" />
          <div className="rk-orb rk-orb-2" />
        </div>

        <div className="rk-content">

          {/* Nav */}
          <header className="rk-nav">
            <a href="/" className="rk-logo" aria-label="KR Trades Home">
              KR <span className="rk-logo-g">Trades</span>
            </a>
            <a href="/" className="rk-nav-link" aria-label="Back to Home">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Home
            </a>
          </header>

          {/* Page Header */}
          <div className="rk-header">
            <div className="rk-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              </svg>
              Important — Please Read
            </div>

            <h1 className="rk-h1">Risk &amp; Earning Disclaimer</h1>

            <p className="rk-h1-sub">
              Before using KR Trades services, please read and understand the following risk disclosures.
              Trading involves significant risk and is not suitable for all investors.
            </p>

            {/* Warning banner */}
            <div className="rk-warning" role="alert" aria-label="High risk warning">
              <div className="rk-warning-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="rk-warning-title">High Risk Investment</p>
                <p className="rk-warning-text">
                  Trading XAUUSD and other financial instruments carries a high level of risk and may result in the loss of your entire investment. Never trade with money you cannot afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <nav className="rk-toc" aria-label="Page contents">
            <div className="rk-toc-inner">
              <p className="rk-toc-title">Contents</p>
              <ol className="rk-toc-list">
                {sections.map((s, i) => (
                  <li className="rk-toc-item" key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="rk-toc-num">0{i + 1}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Sections */}
          <main className="rk-body">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className={`rk-card${s.isLegal ? ' legal' : ''}`}
                role="region"
                aria-labelledby={`title-${s.id}`}
              >
                <div className="rk-card-head">
                  <h2 className="rk-card-title" id={`title-${s.id}`}>{s.title}</h2>
                  {s.badge && <span className="rk-card-badge">{s.badge}</span>}
                </div>

                <div className="rk-paras">
                  {s.content.map((para, i) => (
                    <p
                      key={i}
                      className={`rk-para${s.isLegal ? ' legal-text' : ''}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {s.id === 'general' && (
                  <div className="rk-points" aria-label="Key risk points">
                    {[
                      'Only invest capital you can afford to lose entirely',
                      'Past performance does not guarantee future results',
                      'Seek independent financial advice if in doubt',
                      'Understand your risk tolerance before trading',
                    ].map((pt) => (
                      <div className="rk-point" key={pt}>
                        <span className="rk-point-dot" aria-hidden="true" />
                        {pt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Agreement */}
            <div className="rk-agree" role="note" aria-label="Terms agreement">
              <div className="rk-agree-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="rk-agree-title">Acknowledgement of Risk</p>
              <p className="rk-agree-text">
                By using KR Trades services — including our Telegram channel, website, and copy trading signals — you confirm that you have read, understood, and agreed to this Risk &amp; Earning Disclaimer.
              </p>
              <div className="rk-cta-row">
                <a href="/" className="rk-btn rk-btn-green" aria-label="Return to home">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  Return Home
                </a>
              </div>
            </div>

            <p className="rk-updated" role="contentinfo">
              Last updated: April 2026 · KR Trades · For questions contact <a href="tel:+919547774580" style={{color:'inherit',textDecoration:'underline'}}>+91 95477 74580</a> or <a href="mailto:teamkoushikranjit@gmail.com" style={{color:'inherit',textDecoration:'underline'}}>teamkoushikranjit@gmail.com</a>
            </p>
          </main>

          <footer className="relative border-t border-white/[0.06] bg-black overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">
              <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 mb-14 sm:mb-20">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Contact</p>
                  <div className="space-y-2 text-sm">
                    <a href="https://wa.me/919547774580" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors">+91 95477 74580</a>
                    <a href="mailto:teamkoushikranjit@gmail.com" className="block text-gray-300 hover:text-emerald-400 transition-colors">teamkoushikranjit@gmail.com</a>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Links</p>
                  <div className="space-y-2 text-sm">
                    <a href="/" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Home</a>
                    <a href="/blog" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Blog</a>
                    <a href="/riskandearning" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Risk Disclaimer</a>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Socials</p>
                  <div className="space-y-2 text-sm">
                    <a href="https://share.google/hot7O7ZcHmkO79csu" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Google</a>
                    <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Instagram</a>
                    <a href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">LinkedIn</a>
                    <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">X (Twitter)</a>
                    <a href="https://www.facebook.com/koushikranjitkr" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Facebook</a>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                <p>&copy; 2026 <span className="text-gray-300 font-medium">Koushik Ranjit</span>. All rights reserved.</p>
                <a href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  Back to Top
                  <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">↑</span>
                </a>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}

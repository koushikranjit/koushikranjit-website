export const metadata = {
  title: 'Power of 3 (AMD) Explained — Trading Notes | Koushik Ranjit',
  description: 'Accumulation, Manipulation, Distribution — a simple framework for visualizing how price behaves across a session. The sell model, the buy model, and how I read the sessions.',
};

const toc = [
  { id: 'overview', title: 'What Is Power of 3 (AMD)' },
  { id: 'sellchart', title: 'Chart Example — Sell Model' },
  { id: 'sellhow', title: 'How the Sell Model Plays Out' },
  { id: 'buychart', title: 'Chart Example — Buy Model' },
  { id: 'buyhow', title: 'How the Buy Model Plays Out' },
  { id: 'sessions', title: 'Reading the Sessions' },
  { id: 'approach', title: 'My Approach' },
  { id: 'disclaimer', title: 'Risk Disclosure & Disclaimer' },
];

const sessions = [
  { name: 'Accumulation', time: '6:00 PM – 5:00 AM EST' },
  { name: 'Manipulation', time: '2:00 AM – 10:30 AM EST' },
  { name: 'Distribution', time: '2:00 AM – 10:30 AM EST' },
];

const charts = [
  {
    id: 'sellchart',
    src: '/images/blog/power-of-3/chart-sell-model.png',
    alt: 'S&P 500 E-mini futures 30-minute chart showing an accumulation range, a manipulation move up to take out buyside liquidity, and a distribution move down toward sellside liquidity',
    caption: 'S&P 500 E-mini Futures, 30m. A clear accumulation phase, followed by a manipulation move up to take out buyside liquidity (BSL) — setting up the market maker sell model. Price then distributes down toward sellside liquidity (SSL).',
  },
  {
    id: 'buychart',
    src: '/images/blog/power-of-3/chart-buy-model.png',
    alt: 'S&P 500 E-mini futures chart showing accumulation, a manipulation move down to take out sellside liquidity, and a distribution move up toward buyside liquidity',
    caption: 'Price accumulates, then makes a sudden manipulation move down to take out sellside liquidity (SSL) — reversing back up into the buy model and distributing higher toward buyside liquidity (BSL). In strong uptrends, this is the classic "buy the dip" setup.',
  },
];

export default function PowerOf3Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .po3 *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .po3 {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: clip;
          position: relative;
        }

        .po3-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .po3-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .po3-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .po3-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .po3-content { position: relative; z-index: 1; }

        .po3-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .po3-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .po3-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .po3-nav-link:hover { color: #10B981; }

        .po3-header { padding: 56px 24px 40px; max-width: 860px; margin: 0 auto; text-align: center; }

        .po3-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }

        .po3-h1 { font-size: clamp(28px, 5vw, 54px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 16px; }
        .po3-sub { font-size: clamp(16px, 1.4vw, 18px); color: #64748B; line-height: 1.7; max-width: 660px; margin: 0 auto 22px; }

        .po3-meta { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; font-size: 12px; color: #475569; margin-bottom: 28px; }
        .po3-meta span { display: flex; align-items: center; gap: 6px; }
        .po3-tag { color: #10B981; font-weight: 700; }

        .po3-dl { max-width: 780px; margin: 0 auto; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .po3-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', inherit; font-weight: 700; font-size: 15px;
          border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
          padding: 13px 24px; transition: transform 0.18s, box-shadow 0.18s;
        }
        .po3-btn-green { background: linear-gradient(135deg, #059669, #10B981); color: #fff; box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
        .po3-btn-green:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.4); }
        .po3-btn-discord { background: rgba(88,101,242,0.12); color: #A5AEFF; border: 1px solid rgba(88,101,242,0.3); }
        .po3-btn-discord:hover { background: rgba(88,101,242,0.18); color: #C7CDFF; }

        .po3-toc { max-width: 860px; margin: 44px auto 0; padding: 0 24px; }
        .po3-toc-inner { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px; }
        .po3-toc-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; margin-bottom: 18px; }
        .po3-toc-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .po3-toc-item a {
          display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 500; color: #64748B;
          text-decoration: none; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: color 0.18s;
        }
        .po3-toc-item:last-child a { border-bottom: none; }
        .po3-toc-item a:hover { color: #10B981; }
        .po3-toc-num { font-size: 12px; font-weight: 700; color: #334155; min-width: 22px; }

        .po3-body { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

        .po3-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 36px 40px; position: relative; overflow: hidden;
        }
        .po3-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }
        .po3-card.legal { background: rgba(239,68,68,0.03); border-color: rgba(239,68,68,0.1); }
        .po3-card.legal::before { background: linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent); }

        .po3-card-num { font-size: 12px; font-weight: 700; color: #10B981; letter-spacing: 0.08em; margin-bottom: 8px; }
        .po3-card-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 20px; }

        .po3-para { font-size: 15.5px; color: #94A3B8; line-height: 1.75; margin-bottom: 12px; }
        .po3-para:last-child { margin-bottom: 0; }

        .po3-callout {
          margin-top: 16px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.18);
          border-radius: 12px; padding: 18px 20px; font-size: 14.5px; color: #A7F3D0; font-weight: 600; line-height: 1.6;
        }

        .po3-charts { display: flex; flex-direction: column; gap: 20px; }
        .po3-chart img { width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); display: block; }
        .po3-chart-cap { font-size: 12px; color: #475569; line-height: 1.6; margin-top: 8px; }

        .po3-sessions { display: flex; flex-direction: column; gap: 0; margin-top: 4px; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }
        .po3-session-row { display: flex; justify-content: space-between; padding: 12px 18px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .po3-session-row:last-child { border-bottom: none; }
        .po3-session-name { color: #F1F5F9; font-weight: 600; }
        .po3-session-time { color: #64748B; font-variant-numeric: tabular-nums; }

        .po3-legal-text { font-size: 14px; color: #64748B; font-weight: 500; line-height: 1.8; margin-bottom: 12px; }
        .po3-legal-text:last-child { margin-bottom: 0; }
        .po3-legal-sub { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #FCA5A5; margin: 16px 0 6px; }
        .po3-legal-sub:first-child { margin-top: 0; }

        .po3-cta {
          background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.12); border-radius: 14px;
          padding: 36px; text-align: center;
        }
        .po3-cta-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .po3-cta-text { font-size: 14.5px; color: #64748B; line-height: 1.7; max-width: 520px; margin: 0 auto 20px; }

        .po3-updated { text-align: center; font-size: 11px; color: #1E293B; padding: 0 24px 40px; }

        @media (max-width: 600px) {
          .po3-header { padding: 44px 20px 32px; }
          .po3-card { padding: 22px 18px; }
          .po3-toc-inner { padding: 20px; }
          .po3-card-title { font-size: 17px; }
          .po3-session-row { padding: 10px 14px; font-size: 13px; }
        }
      `}</style>

      <div className="po3">
        <div className="po3-bg" aria-hidden="true">
          <div className="po3-orb po3-orb-1" />
          <div className="po3-orb po3-orb-2" />
        </div>

        <div className="po3-content">
          <header className="po3-nav">
            <a href="/" className="po3-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/blog" className="po3-nav-link" aria-label="Back to Blog">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Blog
            </a>
          </header>

          <div className="po3-header">
            <div className="po3-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v10M9 3v18m0 0h10a2 2 0 0 0 2-2V9"/>
              </svg>
              Lesson 6 · Trading Concepts
            </div>

            <h1 className="po3-h1">Power of 3 (AMD)</h1>
            <p className="po3-sub">
              Accumulation, Manipulation, Distribution — a simple framework for visualizing how price behaves
              across a session, by pairing overnight ranges with points of liquidity.
            </p>

            <div className="po3-meta">
              <span className="po3-tag">Market Maker Models</span>
              <span>Liquidity</span>
              <span>Session Timing</span>
            </div>

            <div className="po3-dl">
              <a href="/downloads/power-of-3.pdf" className="po3-btn po3-btn-green" download aria-label="Download this lesson as a PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download as PDF
              </a>
              <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="po3-btn po3-btn-discord" aria-label="Join the Discord community">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                </svg>
                Join Discord
              </a>
            </div>
          </div>

          <nav className="po3-toc" aria-label="Article contents">
            <div className="po3-toc-inner">
              <p className="po3-toc-title">Contents</p>
              <ol className="po3-toc-list">
                {toc.map((s, i) => (
                  <li className="po3-toc-item" key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="po3-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <main className="po3-body">
            <article id="overview" className="po3-card">
              <p className="po3-card-num">01</p>
              <h2 className="po3-card-title">What Is Power of 3 (AMD)</h2>
              <p className="po3-para">
                The Power of 3 — Accumulation, Manipulation, Distribution (AMD) — is a simple framework for
                visualizing how price moves across a session. It works by pairing the different overnight trading
                ranges with points of liquidity, rather than trying to forecast anything. All it needs is
                confirmation of market structure, and a market structure shift once price has taken out liquidity.
              </p>
              <p className="po3-para">
                This framework is built around index futures ($ES, $NQ, $YM), though the concept applies to any
                instrument. If you knew why price behaves the way it does, you&rsquo;d be able to identify where
                it&rsquo;s likely to go next — that&rsquo;s really all AMD is trying to answer.
              </p>
            </article>

            <article id="sellchart" className="po3-card">
              <p className="po3-card-num">02</p>
              <h2 className="po3-card-title">Chart Example — Sell Model</h2>
              <p className="po3-para">
                Here&rsquo;s a general idea of what a bearish PO3 looks like. Price reprices higher first — toward
                a higher-timeframe point of interest — before setting up a market maker model that favors the sell
                side. This can indicate the start of a reversal.
              </p>
              <div className="po3-charts">
                <figure className="po3-chart">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={charts[0].src} alt={charts[0].alt} loading="lazy" />
                  <figcaption className="po3-chart-cap">{charts[0].caption}</figcaption>
                </figure>
              </div>
            </article>

            <article id="sellhow" className="po3-card">
              <p className="po3-card-num">03</p>
              <h2 className="po3-card-title">How the Sell Model Plays Out</h2>
              <p className="po3-para">
                In both variations of the sell model, price manipulates higher first — seeking a premium of a
                prior range, or reaching for external liquidity above a recent high. Once that liquidity is taken,
                the market maker sell model sets up to the downside.
              </p>
              <p className="po3-para">
                Look for a clear accumulation range first — a period where price consolidates in a tight zone.
                From there, the manipulation leg pushes up through that range&rsquo;s high to sweep buyside
                liquidity (BSL). Once that sweep fails to hold and structure shifts back down, that&rsquo;s the
                signal the distribution phase is underway, headed toward sellside liquidity (SSL).
              </p>
              <div className="po3-callout">
                The manipulation leg isn&rsquo;t the trade — it&rsquo;s the setup. The entry comes after liquidity
                has been taken and structure shifts in the direction you expect distribution to go.
              </div>
            </article>

            <article id="buychart" className="po3-card">
              <p className="po3-card-num">04</p>
              <h2 className="po3-card-title">Chart Example — Buy Model</h2>
              <p className="po3-para">
                The buy model is the mirror image. Price reprices lower first — toward a higher-timeframe point of
                interest — before setting up a market maker model that favors the buy side. In an uptrend, price
                seeks internal liquidity at a discount before continuing higher.
              </p>
              <div className="po3-charts">
                <figure className="po3-chart">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={charts[1].src} alt={charts[1].alt} loading="lazy" />
                  <figcaption className="po3-chart-cap">{charts[1].caption}</figcaption>
                </figure>
              </div>
            </article>

            <article id="buyhow" className="po3-card">
              <p className="po3-card-num">05</p>
              <h2 className="po3-card-title">How the Buy Model Plays Out</h2>
              <p className="po3-para">
                Same logic, opposite direction. Price accumulates in a range, then manipulates down through the
                range&rsquo;s low to take out sellside liquidity (SSL). That sweep reverses back up and sets up the
                buy model, with distribution carrying price higher toward buyside liquidity (BSL).
              </p>
              <p className="po3-para">
                In strong uptrends, this is exactly where &ldquo;buy the dip&rdquo; comes from — the dip is the
                manipulation leg, and the reversal back up is the distribution phase most people are trying to
                catch without realizing there&rsquo;s a structure behind it.
              </p>
            </article>

            <article id="sessions" className="po3-card">
              <p className="po3-card-num">06</p>
              <h2 className="po3-card-title">Reading the Sessions</h2>
              <p className="po3-para">
                Accumulation ranges show up overnight and should be obvious and clear once you know where to look.
                Manipulation and distribution tend to occur in the same window the next morning:
              </p>
              <div className="po3-sessions">
                {sessions.map((s) => (
                  <div className="po3-session-row" key={s.name}>
                    <span className="po3-session-name">{s.name}</span>
                    <span className="po3-session-time">{s.time}</span>
                  </div>
                ))}
              </div>
              <p className="po3-para" style={{marginTop: '16px'}}>
                Entry comes once liquidity has been taken and there&rsquo;s a market structure shift in the
                direction you expect distribution to go — not before.
              </p>
            </article>

            <article id="approach" className="po3-card">
              <p className="po3-card-num">07</p>
              <h2 className="po3-card-title">My Approach</h2>
              <p className="po3-para">
                I use AMD as a first pass on any session before layering in structure, liquidity, and the other
                concepts I&rsquo;ve written about — it&rsquo;s the framework I check first to know which side of
                the market I should even be looking to trade. Once I have that context, everything else (order
                blocks, FVGs, premium/discount) is about refining the entry inside that bigger picture.
              </p>
            </article>

            <article id="disclaimer" className="po3-card legal">
              <p className="po3-card-num" style={{color: '#EF4444'}}>08</p>
              <h2 className="po3-card-title">Risk Disclosure &amp; Disclaimer</h2>

              <p className="po3-legal-sub">Educational Content</p>
              <p className="po3-legal-text">
                This lesson describes a trading concept and how it is analysed. It is provided for informational
                and educational purposes only — it is not a signal service, a specific rule-based system, or an
                investment recommendation of any kind.
              </p>

              <p className="po3-legal-sub">Not Financial Advice</p>
              <p className="po3-legal-text">
                Nothing in this document constitutes financial, investment, legal, or tax advice. Any decision to
                apply these concepts to real or simulated trading is made entirely at the reader&rsquo;s own
                discretion and risk.
              </p>

              <p className="po3-legal-sub">Trading Risk</p>
              <p className="po3-legal-text">
                Trading futures, foreign exchange, and other leveraged products carries a high level of risk and
                may not be suitable for all investors. It is possible to lose some, or all, of an initial
                investment — do not trade with money you cannot afford to lose. Chart examples shown are for
                illustration only and do not guarantee similar outcomes in live markets.
              </p>

              <p className="po3-legal-sub">No Performance Guarantee</p>
              <p className="po3-legal-text">
                Past chart examples are not indicative of future results. No representation is being made that
                applying this concept will, or is likely to, achieve profits or avoid losses.
              </p>

              <p className="po3-legal-sub">Your Own Responsibility</p>
              <p className="po3-legal-text">
                Anyone reviewing or applying this concept should independently evaluate it, test it thoroughly
                (e.g. on a demo account), and consult a licensed financial professional before risking real
                capital.
              </p>
            </article>

            <div className="po3-cta">
              <p className="po3-cta-title">Want to go deeper on this?</p>
              <p className="po3-cta-text">
                Grab the lesson as a PDF, or come ask questions and see live chart breakdowns in the Discord
                community.
              </p>
              <div className="po3-dl">
                <a href="/downloads/power-of-3.pdf" className="po3-btn po3-btn-green" download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download as PDF
                </a>
                <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="po3-btn po3-btn-discord">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                  </svg>
                  Join Discord
                </a>
              </div>
            </div>

            <p className="po3-updated">
              Power of 3 (AMD) — Lesson 6, internal reference document, not for redistribution as investment advice.
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
                    <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Discord</a>
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

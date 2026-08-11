export const metadata = {
  title: 'Fair Value Gap (FVG) Explained — Trading Notes | Koushik Ranjit',
  description: 'What a Fair Value Gap is, how it forms from displacement, why it works as a confluence zone with order blocks, EMAs, support/resistance, and order flow, with real chart examples.',
};

const toc = [
  { id: 'overview', title: 'What Is a Fair Value Gap' },
  { id: 'chart1', title: 'Chart Example — MSS & FVG' },
  { id: 'how', title: 'How FVGs Work' },
  { id: 'confluence', title: 'FVG + Order Block Confluence' },
  { id: 'why', title: 'Why FVGs Work' },
  { id: 'approach', title: 'My Approach' },
  { id: 'bigpicture', title: 'The Big Picture' },
  { id: 'disclaimer', title: 'Risk Disclosure & Disclaimer' },
];

const traderTypes = [
  {
    title: 'EMA Traders',
    text: 'EMA traders use their specific EMA system to add into a trend. Chances are, this is exactly where the FVG overlaps.',
  },
  {
    title: 'Support & Resistance Traders',
    text: 'S/R traders add near support — this is where the FVG and order block structure usually sets up the entry.',
  },
  {
    title: 'Supply & Demand Traders',
    text: 'Supply and demand traders like to add in their zones. This is where order blocks and FVGs provide entries.',
  },
  {
    title: 'Order Flow Traders',
    text: 'Order flow traders look for bullish or bearish flow at specific areas to confirm the trend — this is where FVGs are most likely to be.',
  },
  {
    title: 'Heatmap / Order-Size Tools',
    text: 'Tools like heatmaps that illustrate order sizes at specific levels also tend to overlap with FVGs and order blocks.',
  },
];

const charts = [
  {
    id: 'chart1',
    src: '/images/blog/fair-value-gap/chart-mss-fvg.png',
    alt: 'S&P 500 E-mini futures 1-hour chart showing a market structure shift (mss) into a Fair Value Gap zone (FVG+), with price later reaching the target',
    caption: 'S&P 500 E-mini Futures, 1H. After the market structure shift (mss), displacement leaves behind an imbalance — the shaded FVG+ zone. Price later returns to trade through it on the way to the target.',
  },
  {
    id: 'chart2',
    src: '/images/blog/fair-value-gap/chart-order-block-fvg.png',
    alt: 'Same S&P 500 E-mini futures chart with the Order Block marked alongside the Fair Value Gap zone',
    caption: 'The same move with the Order Block marked. The FVG and order block sit in the same zone — this overlap is the confluence that turns the area into a long opportunity, with the recent swing high as the target.',
  },
];

export default function FairValueGapPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .fvg *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .fvg {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: clip;
          position: relative;
        }

        .fvg-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .fvg-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .fvg-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .fvg-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .fvg-content { position: relative; z-index: 1; }

        .fvg-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .fvg-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .fvg-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .fvg-nav-link:hover { color: #10B981; }

        .fvg-header { padding: 56px 24px 40px; max-width: 860px; margin: 0 auto; text-align: center; }

        .fvg-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }

        .fvg-h1 { font-size: clamp(28px, 5vw, 54px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 16px; }
        .fvg-sub { font-size: clamp(16px, 1.4vw, 18px); color: #64748B; line-height: 1.7; max-width: 660px; margin: 0 auto 22px; }

        .fvg-meta { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; font-size: 12px; color: #475569; margin-bottom: 28px; }
        .fvg-meta span { display: flex; align-items: center; gap: 6px; }
        .fvg-tag { color: #10B981; font-weight: 700; }

        .fvg-dl { max-width: 780px; margin: 0 auto; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .fvg-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', inherit; font-weight: 700; font-size: 15px;
          border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
          padding: 13px 24px; transition: transform 0.18s, box-shadow 0.18s;
        }
        .fvg-btn-green { background: linear-gradient(135deg, #059669, #10B981); color: #fff; box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
        .fvg-btn-green:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.4); }
        .fvg-btn-ghost { background: rgba(255,255,255,0.03); color: #94A3B8; border: 1px solid rgba(255,255,255,0.08); }
        .fvg-btn-ghost:hover { color: #CBD5E1; border-color: rgba(255,255,255,0.16); }
        .fvg-btn-discord { background: rgba(88,101,242,0.12); color: #A5AEFF; border: 1px solid rgba(88,101,242,0.3); }
        .fvg-btn-discord:hover { background: rgba(88,101,242,0.18); color: #C7CDFF; }

        .fvg-toc { max-width: 860px; margin: 44px auto 0; padding: 0 24px; }
        .fvg-toc-inner { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px; }
        .fvg-toc-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; margin-bottom: 18px; }
        .fvg-toc-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .fvg-toc-item a {
          display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 500; color: #64748B;
          text-decoration: none; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: color 0.18s;
        }
        .fvg-toc-item:last-child a { border-bottom: none; }
        .fvg-toc-item a:hover { color: #10B981; }
        .fvg-toc-num { font-size: 12px; font-weight: 700; color: #334155; min-width: 22px; }

        .fvg-body { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

        .fvg-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 36px 40px; position: relative; overflow: hidden;
        }
        .fvg-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }
        .fvg-card.legal { background: rgba(239,68,68,0.03); border-color: rgba(239,68,68,0.1); }
        .fvg-card.legal::before { background: linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent); }

        .fvg-card-num { font-size: 12px; font-weight: 700; color: #10B981; letter-spacing: 0.08em; margin-bottom: 8px; }
        .fvg-card-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 20px; }

        .fvg-para { font-size: 15.5px; color: #94A3B8; line-height: 1.75; margin-bottom: 12px; }
        .fvg-para:last-child { margin-bottom: 0; }

        .fvg-callout {
          margin-top: 16px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.18);
          border-radius: 12px; padding: 18px 20px; font-size: 14.5px; color: #A7F3D0; font-weight: 600; line-height: 1.6;
        }

        .fvg-charts { display: flex; flex-direction: column; gap: 20px; }
        .fvg-chart img { width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); display: block; }
        .fvg-chart-cap { font-size: 12px; color: #475569; line-height: 1.6; margin-top: 8px; }

        .fvg-traders { display: flex; flex-direction: column; gap: 20px; }
        .fvg-trader-title { font-size: 15.5px; font-weight: 700; color: #F1F5F9; margin-bottom: 6px; }
        .fvg-trader-text { font-size: 14.5px; color: #64748B; line-height: 1.7; }

        .fvg-legal-text { font-size: 14px; color: #64748B; font-weight: 500; line-height: 1.8; margin-bottom: 12px; }
        .fvg-legal-text:last-child { margin-bottom: 0; }
        .fvg-legal-sub { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #FCA5A5; margin: 16px 0 6px; }
        .fvg-legal-sub:first-child { margin-top: 0; }

        .fvg-cta {
          background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.12); border-radius: 14px;
          padding: 36px; text-align: center;
        }
        .fvg-cta-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .fvg-cta-text { font-size: 14.5px; color: #64748B; line-height: 1.7; max-width: 520px; margin: 0 auto 20px; }

        .fvg-updated { text-align: center; font-size: 11px; color: #1E293B; padding: 0 24px 40px; }

        @media (max-width: 600px) {
          .fvg-header { padding: 44px 20px 32px; }
          .fvg-card { padding: 22px 18px; }
          .fvg-toc-inner { padding: 20px; }
          .fvg-card-title { font-size: 17px; }
        }
      `}</style>

      <div className="fvg">
        <div className="fvg-bg" aria-hidden="true">
          <div className="fvg-orb fvg-orb-1" />
          <div className="fvg-orb fvg-orb-2" />
        </div>

        <div className="fvg-content">
          <header className="fvg-nav">
            <a href="/" className="fvg-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/blog" className="fvg-nav-link" aria-label="Back to Blog">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Blog
            </a>
          </header>

          <div className="fvg-header">
            <div className="fvg-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v10M9 3v18m0 0h10a2 2 0 0 0 2-2V9"/>
              </svg>
              Lesson 4 · Trading Concepts
            </div>

            <h1 className="fvg-h1">Fair Value Gap (FVG)</h1>
            <p className="fvg-sub">
              Displacement creates imbalances — these are Fair Value Gaps. What they are, how they form,
              and why they work as a confluence zone across almost every style of trading.
            </p>

            <div className="fvg-meta">
              <span className="fvg-tag">Market Structure</span>
              <span>Order Blocks</span>
              <span>Liquidity</span>
            </div>

            <div className="fvg-dl">
              <a href="/downloads/fair-value-gap.pdf" className="fvg-btn fvg-btn-green" download aria-label="Download this lesson as a PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download as PDF
              </a>
              <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="fvg-btn fvg-btn-discord" aria-label="Join the Discord community">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                </svg>
                Join Discord
              </a>
            </div>
          </div>

          <nav className="fvg-toc" aria-label="Article contents">
            <div className="fvg-toc-inner">
              <p className="fvg-toc-title">Contents</p>
              <ol className="fvg-toc-list">
                {toc.map((s, i) => (
                  <li className="fvg-toc-item" key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="fvg-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <main className="fvg-body">
            <article id="overview" className="fvg-card">
              <p className="fvg-card-num">01</p>
              <h2 className="fvg-card-title">What Is a Fair Value Gap</h2>
              <p className="fvg-para">
                Displacement creates imbalances. These are referred to as FVGs. They are areas of interest to add
                to a position when market structure and trend are supporting the idea. An FVG is usually coupled
                with an order block (or several).
              </p>
              <p className="fvg-para">
                In the example below, here is an FVG created after taking out a major yearly SSL (sell-side
                liquidity). Once we have displacement, the next thing to look for on the chart is an order block.
              </p>
            </article>

            <article id="chart1" className="fvg-card">
              <p className="fvg-card-num">02</p>
              <h2 className="fvg-card-title">Chart Example — MSS &amp; FVG</h2>
              <div className="fvg-charts">
                <figure className="fvg-chart">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={charts[0].src} alt={charts[0].alt} loading="lazy" />
                  <figcaption className="fvg-chart-cap">{charts[0].caption}</figcaption>
                </figure>
              </div>
            </article>

            <article id="how" className="fvg-card">
              <p className="fvg-card-num">03</p>
              <h2 className="fvg-card-title">How FVGs Work</h2>
              <p className="fvg-para">
                Recall that an order block is an area where you want to buy or sell. In this scenario, the market
                structure shift (MSS) is to the upside — so this order block and FVG are showing us where we can
                go long. Targets for the long are the recent swing highs.
              </p>
              <p className="fvg-para">
                An imbalance is an area where we have an incomplete auction of buyers and sellers. There are orders
                left waiting to be filled within it. So the FVG is an area of liquidity for buyers and sellers to
                transact and complete their orders.
              </p>
              <p className="fvg-para">
                Direction comes from the analysis of liquidity and MSS — the FVG is just an area where we know price
                can eventually retrace back into.
              </p>
              <div className="fvg-callout">
                An FVG being present does NOT by itself mean you should be buying or selling. The narrative of what
                price wants to do is what determines the execution — buy or sell.
              </div>
            </article>

            <article id="confluence" className="fvg-card">
              <p className="fvg-card-num">04</p>
              <h2 className="fvg-card-title">FVG + Order Block Confluence</h2>
              <p className="fvg-para">
                In this example, the narrative shifts from shorting the highs to now awaiting an opportunity to go
                long — the order block and the FVG sit in the same zone, and that overlap is the confluence.
              </p>
              <div className="fvg-charts">
                <figure className="fvg-chart">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={charts[1].src} alt={charts[1].alt} loading="lazy" />
                  <figcaption className="fvg-chart-cap">{charts[1].caption}</figcaption>
                </figure>
              </div>
            </article>

            <article id="why" className="fvg-card">
              <p className="fvg-card-num">05</p>
              <h2 className="fvg-card-title">Why FVGs Work</h2>
              <p className="fvg-para" style={{marginBottom: '18px'}}>
                FVGs are described as an imbalance where orders have been left behind, pending. If the narrative
                for price is higher, we look for signs of confluence to add long in an FVG — and vice versa for
                shorts. That confluence shows up across almost every style of trading:
              </p>
              <div className="fvg-traders">
                {traderTypes.map((t) => (
                  <div key={t.title}>
                    <p className="fvg-trader-title">{t.title}</p>
                    <p className="fvg-trader-text">{t.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="approach" className="fvg-card">
              <p className="fvg-card-num">06</p>
              <h2 className="fvg-card-title">My Approach</h2>
              <p className="fvg-para">
                I personally like to use volume price analysis with an ICT foundation to add my positions inside
                FVGs and near order blocks. Direction is derived from liquidity analysis across multiple assets —
                this is a more advanced layer on top of the core concept above.
              </p>
            </article>

            <article id="bigpicture" className="fvg-card">
              <p className="fvg-card-num">07</p>
              <h2 className="fvg-card-title">The Big Picture</h2>
              <p className="fvg-para">
                At the end of the day, the market is there to provide liquidity. Our only job is to understand
                where price is trying to go, and how we can enter the trend at a discount.
              </p>
            </article>

            <article id="disclaimer" className="fvg-card legal">
              <p className="fvg-card-num" style={{color: '#EF4444'}}>08</p>
              <h2 className="fvg-card-title">Risk Disclosure &amp; Disclaimer</h2>

              <p className="fvg-legal-sub">Educational Content</p>
              <p className="fvg-legal-text">
                This lesson describes a trading concept and how it is analysed. It is provided for informational
                and educational purposes only — it is not a signal service, a specific rule-based system, or an
                investment recommendation of any kind.
              </p>

              <p className="fvg-legal-sub">Not Financial Advice</p>
              <p className="fvg-legal-text">
                Nothing in this document constitutes financial, investment, legal, or tax advice. Any decision to
                apply these concepts to real or simulated trading is made entirely at the reader&rsquo;s own
                discretion and risk.
              </p>

              <p className="fvg-legal-sub">Trading Risk</p>
              <p className="fvg-legal-text">
                Trading futures, foreign exchange, and other leveraged products carries a high level of risk and
                may not be suitable for all investors. It is possible to lose some, or all, of an initial
                investment — do not trade with money you cannot afford to lose. Chart examples shown are for
                illustration only and do not guarantee similar outcomes in live markets.
              </p>

              <p className="fvg-legal-sub">No Performance Guarantee</p>
              <p className="fvg-legal-text">
                Past chart examples are not indicative of future results. No representation is being made that
                applying this concept will, or is likely to, achieve profits or avoid losses.
              </p>

              <p className="fvg-legal-sub">Your Own Responsibility</p>
              <p className="fvg-legal-text">
                Anyone reviewing or applying this concept should independently evaluate it, test it thoroughly
                (e.g. on a demo account), and consult a licensed financial professional before risking real
                capital.
              </p>
            </article>

            <div className="fvg-cta">
              <p className="fvg-cta-title">Want to go deeper on this?</p>
              <p className="fvg-cta-text">
                Grab the lesson as a PDF, or come ask questions and see live chart breakdowns in the Discord
                community.
              </p>
              <div className="fvg-dl">
                <a href="/downloads/fair-value-gap.pdf" className="fvg-btn fvg-btn-green" download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download as PDF
                </a>
                <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="fvg-btn fvg-btn-discord">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                  </svg>
                  Join Discord
                </a>
              </div>
            </div>

            <p className="fvg-updated">
              Fair Value Gap (FVG) — Lesson 4, internal reference document, not for redistribution as investment advice.
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

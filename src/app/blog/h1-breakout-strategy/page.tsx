export const metadata = {
  title: 'H1 Breakout Strategy — XAUUSD Trading Rules | Koushik Ranjit',
  description: 'The full H1 breakout trading strategy for XAUUSD (Gold): setup identification, entry rules, breakeven and trailing-stop management, scaled take-profits, execution filters, and a manual checklist.',
};

const toc = [
  { id: 'overview', title: 'Strategy Overview' },
  { id: 'setup', title: 'Setup Identification' },
  { id: 'entry', title: 'Entry Rules — Stop Order' },
  { id: 'breakeven', title: 'Breakeven (BE) Rule' },
  { id: 'trailing', title: 'Trailing Stop Rule' },
  { id: 'takeprofit', title: 'Take-Profit Structure' },
  { id: 'sequence', title: 'Full Trade Management Sequence' },
  { id: 'charts', title: 'Chart Examples' },
  { id: 'filters', title: 'Additional Filters & Execution Controls' },
  { id: 'checklist', title: 'Manual Execution Checklist' },
  { id: 'disclaimer', title: 'Risk Disclosure & Disclaimer' },
];

const sequence = [
  'Stop order triggers on confirmed H1 breakout of the range.',
  'Initial Stop Loss sits on the opposite side of the range.',
  'Price moves 15 pips in favour → Stop Loss moved to Breakeven (BE).',
  'Every further 15-pip move in favour → Stop Loss trails by 15 pips.',
  'TP1 hit at 100 pips → close first portion.',
  'TP2 hit at 150 pips → close second portion.',
  'TP3 hit at 200 pips → close remaining position / final runner.',
];

const filters = [
  {
    title: 'Multi-Timeframe Confirmation',
    text: 'Before taking an H1 breakout, check alignment on a higher timeframe (e.g. H4) and a lower timeframe (e.g. M15). Only take the breakout if the higher timeframe trend/structure does not directly oppose the breakout direction, and the lower timeframe shows the move starting with genuine momentum rather than a single erratic spike.',
  },
  {
    title: 'Trailing Take-Profit',
    text: 'In addition to the trailing Stop Loss, a trailing Take-Profit can be used on the final runner portion of the position after TP2. Instead of a fixed TP3 exit, the take-profit level trails behind price by a set distance, allowing strong continuation moves to run further while still locking in the improvement in profit as price advances.',
  },
  {
    title: 'Spread Filter',
    text: 'Skip placing the breakout stop order if the current spread is wider than a defined maximum. Wide spreads around illiquid hours or news spikes distort the true breakout level and increase effective risk on entry.',
  },
  {
    title: 'News-Event Filter',
    text: 'Avoid opening new positions in the minutes immediately before and after high-impact scheduled news releases (e.g. NFP, CPI, FOMC). Optionally close open pending orders ahead of the release and resume normal trading a set number of minutes afterward, once volatility has settled.',
  },
  {
    title: 'Weekend / Session-Close Rule',
    text: 'If it is not desirable to hold a position over the weekend, stop opening new pending orders after a defined cut-off hour on Friday, and consider closing or tightening any open trades before the weekly close to avoid weekend gap risk.',
  },
  {
    title: 'Drawdown-Based Position Sizing',
    text: 'Position size (lot size) can be scaled to account balance/equity and a maximum acceptable drawdown, rather than using a single fixed lot size on every trade. This keeps risk per trade proportional as the account grows or shrinks, and can include a daily maximum-drawdown cutoff that pauses new trades for the rest of the day once reached.',
  },
];

const beforeEntry = [
  'H1 range is clearly marked, with support and resistance lines drawn on the chart.',
  "Range size checked — not so tight it's noise, not so wide the stop distance kills risk:reward.",
  'Higher timeframe (H4) and lower timeframe (M15) checked for alignment, if using the multi-timeframe filter.',
  'Current spread checked against the maximum allowed before placing a pending order.',
  'No high-impact news event (NFP, CPI, FOMC) due inside the news-filter window.',
  'Friday/weekend cut-off checked if the position should not be held over the weekend.',
  'Buy Stop / Sell Stop order placed a few pips beyond the breakout level, in the correct direction.',
  'Initial Stop Loss placed on the opposite side of the range.',
  'TP1 / TP2 / TP3 levels set at 100 / 150 / 200 pips from entry.',
  'Position size checked against account balance/equity and max allowed drawdown.',
];

const afterEntry = [
  'Confirm the pending order filled and that SL/TP are set correctly on the live trade.',
  "Watch for +15 pips in favour — move Stop Loss to breakeven as soon as it's reached.",
  'Continue trailing the Stop Loss by 15 pips for every further 15-pip advance.',
  'Close the first portion of the position when TP1 (100 pips) is hit.',
  'Close the second portion when TP2 (150 pips) is hit.',
  'Manage or close the final runner at TP3 (200 pips), or trail it per the filters section if using the trailing take-profit.',
  'Log the trade — entry, exit, result, and any rule deviation — for later review.',
];

const charts = [
  {
    src: '/images/blog/h1-breakout-strategy/chart-consolidation-breakout.png',
    alt: 'XAUUSD H1 chart showing a consolidation range followed by a breakout leg, with entry and stop-management zone marked',
    caption: 'Consolidation range (purple box) on XAUUSD, followed by a breakout leg. The green/red shaded box marks the entry and stop-management zone used once price breaks out.',
  },
  {
    src: '/images/blog/h1-breakout-strategy/chart-h1-breakout-zone.png',
    alt: 'XAUUSD H1 chart showing breakout above the resistance line with the breakeven trigger zone shaded',
    caption: 'H1 chart: breakout above the green resistance line, with the shaded zone showing the initial move used to trigger the BE step before the position works through the higher timeframe range.',
  },
  {
    src: '/images/blog/h1-breakout-strategy/chart-1m-zoom.png',
    alt: '1-minute zoom of the breakout leg showing the trailing stop continuation zone and retracement risk zone',
    caption: '1-minute zoom of the same breakout leg — green zone shows the favourable continuation used to trail the stop; red zone shows the retracement risk the BE/trailing rule protects against.',
  },
  {
    src: '/images/blog/h1-breakout-strategy/chart-5m-breakdown.png',
    alt: '5-minute chart of a breakdown from a level showing the breakeven impulse zone and trailing continuation zone',
    caption: '5-minute example of a breakdown from a level: red zone marks the initial impulse used to move the stop to breakeven; green zone marks continuation that would be captured by the 15-pip trail.',
  },
  {
    src: '/images/blog/h1-breakout-strategy/chart-5m-breakout.png',
    alt: '5-minute chart of a breakout above a prior consolidation high showing the entry and management zone',
    caption: 'A 5-minute breakout above a prior consolidation high — the shaded box marks the entry/management zone where the BE and trailing rules are first applied after the stop order fills.',
  },
];

export default function H1BreakoutStrategyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .h1b * { box-sizing: border-box; margin: 0; padding: 0; }

        .h1b {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .h1b-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .h1b-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .h1b-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .h1b-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .h1b-content { position: relative; z-index: 1; }

        .h1b-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .h1b-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .h1b-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .h1b-nav-link:hover { color: #10B981; }

        .h1b-header { padding: 56px 24px 40px; max-width: 860px; margin: 0 auto; text-align: center; }

        .h1b-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }

        .h1b-h1 { font-size: clamp(28px, 5vw, 54px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 16px; }
        .h1b-sub { font-size: clamp(16px, 1.4vw, 18px); color: #64748B; line-height: 1.7; max-width: 660px; margin: 0 auto 22px; }

        .h1b-meta { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; font-size: 12px; color: #475569; margin-bottom: 8px; }
        .h1b-meta span { display: flex; align-items: center; gap: 6px; }
        .h1b-tag { color: #10B981; font-weight: 700; }

        .h1b-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 780px; margin: 32px auto 0; }
        .h1b-stat { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px 18px; text-align: left; }
        .h1b-stat-label { font-size: 12px; color: #475569; margin-bottom: 10px; }
        .h1b-stat-num { font-size: 30px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.03em; }
        .h1b-stat-num.green { color: #10B981; }
        .h1b-stat-sub { font-size: 12px; color: #475569; margin-top: 7px; }
        .h1b-stat-caption { font-size: 12px; color: #334155; text-align: center; max-width: 780px; margin: 14px auto 0; }

        .h1b-dl { max-width: 780px; margin: 28px auto 0; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .h1b-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', inherit; font-weight: 700; font-size: 15px;
          border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
          padding: 13px 24px; transition: transform 0.18s, box-shadow 0.18s;
        }
        .h1b-btn-green { background: linear-gradient(135deg, #059669, #10B981); color: #fff; box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
        .h1b-btn-green:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.4); }
        .h1b-btn-ghost { background: rgba(255,255,255,0.03); color: #94A3B8; border: 1px solid rgba(255,255,255,0.08); }
        .h1b-btn-ghost:hover { color: #CBD5E1; border-color: rgba(255,255,255,0.16); }

        .h1b-toc { max-width: 860px; margin: 44px auto 0; padding: 0 24px; }
        .h1b-toc-inner { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px; }
        .h1b-toc-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; margin-bottom: 18px; }
        .h1b-toc-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .h1b-toc-item a {
          display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 500; color: #64748B;
          text-decoration: none; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: color 0.18s;
        }
        .h1b-toc-item:last-child a { border-bottom: none; }
        .h1b-toc-item a:hover { color: #10B981; }
        .h1b-toc-num { font-size: 12px; font-weight: 700; color: #334155; min-width: 22px; }

        .h1b-body { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

        .h1b-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 36px 40px; position: relative; overflow: hidden;
        }
        .h1b-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }
        .h1b-card.legal { background: rgba(239,68,68,0.03); border-color: rgba(239,68,68,0.1); }
        .h1b-card.legal::before { background: linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent); }

        .h1b-card-num { font-size: 12px; font-weight: 700; color: #10B981; letter-spacing: 0.08em; margin-bottom: 8px; }
        .h1b-card-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 20px; }

        .h1b-para { font-size: 15.5px; color: #94A3B8; line-height: 1.75; margin-bottom: 12px; }
        .h1b-para:last-child { margin-bottom: 0; }

        .h1b-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }
        .h1b-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 15.5px; color: #94A3B8; line-height: 1.65; }
        .h1b-dot { flex-shrink: 0; width: 5px; height: 5px; border-radius: 50%; background: #10B981; margin-top: 9px; box-shadow: 0 0 6px rgba(16,185,129,0.4); }

        .h1b-callout {
          margin-top: 16px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.18);
          border-radius: 12px; padding: 18px 20px; font-size: 14.5px; color: #A7F3D0; font-weight: 600; line-height: 1.6;
        }

        .h1b-steps { list-style: none; counter-reset: step; display: flex; flex-direction: column; gap: 16px; }
        .h1b-steps li { counter-increment: step; display: flex; align-items: flex-start; gap: 14px; font-size: 15.5px; color: #94A3B8; line-height: 1.65; }
        .h1b-steps li::before {
          content: counter(step); flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px;
          background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10B981;
          font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center;
        }

        .h1b-table { width: 100%; border-collapse: collapse; margin-top: 4px; }
        .h1b-table th, .h1b-table td { text-align: left; padding: 14px 12px; font-size: 14.5px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .h1b-table th { color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; }
        .h1b-table td { color: #CBD5E1; }
        .h1b-table td.dist { color: #10B981; font-weight: 700; }
        .h1b-table tr:last-child td { border-bottom: none; }
        .h1b-table-note { font-size: 13px; color: #475569; margin-top: 12px; line-height: 1.6; }

        .h1b-charts { display: flex; flex-direction: column; gap: 20px; }
        .h1b-chart img { width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); display: block; }
        .h1b-chart-cap { font-size: 12px; color: #475569; line-height: 1.6; margin-top: 8px; }

        .h1b-filters { display: flex; flex-direction: column; gap: 20px; }
        .h1b-filter-title { font-size: 15.5px; font-weight: 700; color: #F1F5F9; margin-bottom: 6px; }
        .h1b-filter-text { font-size: 14.5px; color: #64748B; line-height: 1.7; }

        .h1b-checklist-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #10B981; margin: 24px 0 14px; }
        .h1b-checklist-title:first-child { margin-top: 0; }
        .h1b-check { list-style: none; display: flex; flex-direction: column; gap: 11px; }
        .h1b-check li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: #94A3B8; line-height: 1.6; }
        .h1b-check-box {
          flex-shrink: 0; width: 16px; height: 16px; margin-top: 2px; border-radius: 4px;
          border: 1px solid rgba(16,185,129,0.4); background: rgba(16,185,129,0.06);
        }

        .h1b-legal-text { font-size: 14px; color: #64748B; font-weight: 500; line-height: 1.8; margin-bottom: 12px; }
        .h1b-legal-text:last-child { margin-bottom: 0; }
        .h1b-legal-sub { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #FCA5A5; margin: 16px 0 6px; }
        .h1b-legal-sub:first-child { margin-top: 0; }

        .h1b-cta {
          background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.12); border-radius: 14px;
          padding: 36px; text-align: center;
        }
        .h1b-cta-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .h1b-cta-text { font-size: 14.5px; color: #64748B; line-height: 1.7; max-width: 520px; margin: 0 auto 20px; }

        .h1b-updated { text-align: center; font-size: 11px; color: #1E293B; padding: 0 24px 40px; }

        @media (max-width: 600px) {
          .h1b-header { padding: 44px 20px 32px; }
          .h1b-card { padding: 22px 18px; }
          .h1b-toc-inner { padding: 20px; }
          .h1b-card-title { font-size: 17px; }
          .h1b-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="h1b">
        <div className="h1b-bg" aria-hidden="true">
          <div className="h1b-orb h1b-orb-1" />
          <div className="h1b-orb h1b-orb-2" />
        </div>

        <div className="h1b-content">
          <header className="h1b-nav">
            <a href="/" className="h1b-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/blog" className="h1b-nav-link" aria-label="Back to Blog">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Blog
            </a>
          </header>

          <div className="h1b-header">
            <div className="h1b-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>
              </svg>
              Trading Strategy
            </div>

            <h1 className="h1b-h1">H1 Breakout Strategy</h1>
            <p className="h1b-sub">
              Rules, trade management, and chart examples for trading directional breakouts on XAUUSD (Gold) —
              a stop-order entry, a non-negotiable breakeven step, a 15-pip trailing stop, and a scaled three-target exit.
            </p>

            <div className="h1b-meta">
              <span className="h1b-tag">XAUUSD · Gold</span>
              <span>H1 Timeframe</span>
              <span>Discretionary, Rule-Based</span>
            </div>

            <div className="h1b-stats" role="group" aria-label="Live account performance snapshot">
              <div className="h1b-stat">
                <p className="h1b-stat-label">Trade Win %</p>
                <p className="h1b-stat-num green">70.96%</p>
                <p className="h1b-stat-sub">2,762 total trades</p>
              </div>
              <div className="h1b-stat">
                <p className="h1b-stat-label">Profit Factor</p>
                <p className="h1b-stat-num">1.25</p>
                <p className="h1b-stat-sub">gross profit / gross loss</p>
              </div>
              <div className="h1b-stat">
                <p className="h1b-stat-label">Current Day Streak</p>
                <p className="h1b-stat-num green">4 days</p>
                <p className="h1b-stat-sub">3 day worst · 12 day best</p>
              </div>
            </div>
            <p className="h1b-stat-caption">Performance snapshot — live trading account data. Past performance does not guarantee future results; see the disclaimer below.</p>

            <div className="h1b-dl">
              <a href="/downloads/h1-breakout-strategy.pdf" className="h1b-btn h1b-btn-green" download aria-label="Download this strategy as a PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download as PDF
              </a>
              <a href="/KRtrades" className="h1b-btn h1b-btn-ghost">Join KR Trades</a>
            </div>
          </div>

          <nav className="h1b-toc" aria-label="Article contents">
            <div className="h1b-toc-inner">
              <p className="h1b-toc-title">Contents</p>
              <ol className="h1b-toc-list">
                {toc.map((s, i) => (
                  <li className="h1b-toc-item" key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="h1b-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <main className="h1b-body">
            <article id="overview" className="h1b-card">
              <p className="h1b-card-num">01</p>
              <h2 className="h1b-card-title">Strategy Overview</h2>
              <p className="h1b-para">
                The H1 Breakout strategy trades directional moves that begin after price breaks out of a period of
                consolidation (a range) identified on the 1-hour chart. A pending stop order is placed beyond the
                range boundary so the trade is only triggered once the breakout is confirmed by price itself.
              </p>
              <p className="h1b-para">
                Once triggered, the trade is actively managed using a breakeven step and a fixed-pip trailing stop,
                with profit taken in three stages.
              </p>
            </article>

            <article id="setup" className="h1b-card">
              <p className="h1b-card-num">02</p>
              <h2 className="h1b-card-title">Setup Identification</h2>
              <ul className="h1b-list">
                <li><span className="h1b-dot" aria-hidden="true" />Mark a clear consolidation / range on the H1 chart — a zone where price has been moving sideways between a defined support and resistance.</li>
                <li><span className="h1b-dot" aria-hidden="true" />Range should be neither too tight (noise / low reward) nor too wide (poor risk:reward).</li>
                <li><span className="h1b-dot" aria-hidden="true" />Note the upper boundary (resistance) and lower boundary (support) of the range with horizontal lines.</li>
                <li><span className="h1b-dot" aria-hidden="true" />Prefer ranges that form after a strong prior move or during a low-volatility session (e.g. Asian session) ahead of a higher-volatility session (London / New York).</li>
              </ul>
            </article>

            <article id="entry" className="h1b-card">
              <p className="h1b-card-num">03</p>
              <h2 className="h1b-card-title">Entry Rules — Stop Order</h2>
              <ul className="h1b-list">
                <li><span className="h1b-dot" aria-hidden="true" />Long setup: place a Buy Stop order a few pips above the range resistance / breakout level.</li>
                <li><span className="h1b-dot" aria-hidden="true" />Short setup: place a Sell Stop order a few pips below the range support / breakout level.</li>
                <li><span className="h1b-dot" aria-hidden="true" />The stop order only fills if price genuinely breaks and trades through the level — this avoids guessing the breakout in advance.</li>
                <li><span className="h1b-dot" aria-hidden="true" />Initial Stop Loss is placed on the opposite side of the range (back inside/through the consolidation), sized to the structure of the setup.</li>
              </ul>
            </article>

            <article id="breakeven" className="h1b-card">
              <p className="h1b-card-num">04</p>
              <h2 className="h1b-card-title">Breakeven (BE) Rule — Most Important Step</h2>
              <p className="h1b-para">
                Once the trade moves 15 pips in favour of the position, the Stop Loss is moved to breakeven (entry
                price). This is the single most important management rule in this system: it removes downside risk
                on the trade as early as possible, so that from this point onward the trade can only finish at
                breakeven or in profit.
              </p>
              <div className="h1b-callout">BE is set at +15 pips — non-negotiable, applied on every trade.</div>
            </article>

            <article id="trailing" className="h1b-card">
              <p className="h1b-card-num">05</p>
              <h2 className="h1b-card-title">Trailing Stop Rule</h2>
              <p className="h1b-para">
                After breakeven is set, the Stop Loss continues to trail the market by 15 pips: for every further
                15-pip advance in the trade&rsquo;s favour, the stop is stepped forward by 15 pips. This locks in
                progressively more profit while still giving the trade room to run toward the take-profit targets.
              </p>
            </article>

            <article id="takeprofit" className="h1b-card">
              <p className="h1b-card-num">06</p>
              <h2 className="h1b-card-title">Take-Profit Structure (Scaled Exit)</h2>
              <div style={{overflowX: 'auto'}}>
                <table className="h1b-table">
                  <thead>
                    <tr><th>Target</th><th>Distance</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>TP1</td><td className="dist">100 pips</td><td>Close first portion of the position</td></tr>
                    <tr><td>TP2</td><td className="dist">150 pips</td><td>Close second portion of the position</td></tr>
                    <tr><td>TP3</td><td className="dist">200 pips</td><td>Close remaining position / let final runner ride</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="h1b-table-note">
                Exact split size per target (e.g. thirds) is left to position-sizing preference; the pip distances
                above (100 / 150 / 200) are fixed for this system, as specified in the trading approach.
              </p>
            </article>

            <article id="sequence" className="h1b-card">
              <p className="h1b-card-num">07</p>
              <h2 className="h1b-card-title">Full Trade Management Sequence</h2>
              <ol className="h1b-steps">
                {sequence.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </article>

            <article id="charts" className="h1b-card">
              <p className="h1b-card-num">08</p>
              <h2 className="h1b-card-title">Chart Examples</h2>
              <p className="h1b-para">
                The examples below (XAUUSD) illustrate the breakout leg, the BE/trailing management zone (shaded
                green), and the give-back zone the BE rule is designed to protect against (shaded red).
              </p>
              <div className="h1b-charts" style={{marginTop: '16px'}}>
                {charts.map((c) => (
                  <figure className="h1b-chart" key={c.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.src} alt={c.alt} loading="lazy" />
                    <figcaption className="h1b-chart-cap">{c.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </article>

            <article id="filters" className="h1b-card">
              <p className="h1b-card-num">09</p>
              <h2 className="h1b-card-title">Additional Filters &amp; Execution Controls</h2>
              <p className="h1b-para" style={{marginBottom: '18px'}}>
                The following are optional layers added on top of the core breakout, BE, and trailing-stop rules
                above. They are execution filters, not new entry signals — their purpose is to avoid low-quality
                conditions and to protect profit that has already been made on a trade.
              </p>
              <div className="h1b-filters">
                {filters.map((f) => (
                  <div key={f.title}>
                    <p className="h1b-filter-title">{f.title}</p>
                    <p className="h1b-filter-text">{f.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="checklist" className="h1b-card">
              <p className="h1b-card-num">10</p>
              <h2 className="h1b-card-title">Manual Execution Checklist</h2>
              <p className="h1b-para" style={{marginBottom: '4px'}}>
                This is a manual, discretionary strategy — there is no automated system placing or managing these
                trades. The checklist below is what to run through by hand before placing the stop order, and again
                after the trade is live.
              </p>

              <p className="h1b-checklist-title">Before Entry</p>
              <ul className="h1b-check">
                {beforeEntry.map((item) => (
                  <li key={item}><span className="h1b-check-box" aria-hidden="true" />{item}</li>
                ))}
              </ul>

              <p className="h1b-checklist-title">After Entry</p>
              <ul className="h1b-check">
                {afterEntry.map((item) => (
                  <li key={item}><span className="h1b-check-box" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </article>

            <article id="disclaimer" className="h1b-card legal">
              <p className="h1b-card-num" style={{color: '#EF4444'}}>11</p>
              <h2 className="h1b-card-title">Risk Disclosure &amp; Disclaimer</h2>

              <p className="h1b-legal-sub">Personal Trading Approach</p>
              <p className="h1b-legal-text">
                This document describes a personal trading approach and rule set. It is a record of how trades are
                planned and managed under this system — it is not a signal service, managed account offering, or
                investment recommendation of any kind.
              </p>

              <p className="h1b-legal-sub">Not Financial Advice</p>
              <p className="h1b-legal-text">
                Nothing in this document constitutes financial, investment, legal, or tax advice. It is provided for
                informational and educational purposes only. Any decision to apply these rules to real or simulated
                trading is made entirely at the reader&rsquo;s own discretion and risk.
              </p>

              <p className="h1b-legal-sub">Trading Risk</p>
              <p className="h1b-legal-text">
                Trading foreign exchange, commodities (including gold/XAUUSD), and other leveraged products carries
                a high level of risk and may not be suitable for all investors. It is possible to lose some, or all,
                of an initial investment — do not trade with money you cannot afford to lose. Breakeven and
                trailing-stop rules reduce, but do not eliminate, risk. Slippage, gaps, and volatile news events can
                cause fills away from the intended stop level. Pending/stop orders are not guaranteed to fill at the
                specified price, particularly during fast-moving or illiquid market conditions.
              </p>

              <p className="h1b-legal-sub">No Performance Guarantee</p>
              <p className="h1b-legal-text">
                Past performance of this or any strategy is not indicative of future results. No representation is
                being made that any account will, or is likely to, achieve profits or losses similar to those shown
                or discussed. The performance snapshot on this page reflects results from the author&rsquo;s own live
                trading account; it has not been independently audited or verified by a third party, and results from
                any single account or time period are not a guarantee of future performance.
              </p>

              <p className="h1b-legal-sub">Client Managed Accounts</p>
              <p className="h1b-legal-text">
                Where this approach is applied to client accounts under a profit-share arrangement, clients should
                understand and accept these risks in advance. Profit share is calculated only on realised gains;
                losses remain the client&rsquo;s own risk exposure. This document does not create any guarantee of
                profit or protection against loss.
              </p>

              <p className="h1b-legal-sub">Your Own Responsibility</p>
              <p className="h1b-legal-text">
                This is the author&rsquo;s own trading approach, refined through personal experience. Anyone reviewing
                or applying it should independently evaluate the rules, test them thoroughly (e.g. on a demo
                account), and consult a licensed financial professional before risking real capital.
              </p>
            </article>

            <div className="h1b-cta">
              <p className="h1b-cta-title">Want the full write-up offline?</p>
              <p className="h1b-cta-text">
                Download the complete H1 Breakout Strategy — same rules, chart examples, and disclaimer — as a PDF.
              </p>
              <a href="/downloads/h1-breakout-strategy.pdf" className="h1b-btn h1b-btn-green" download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download as PDF
              </a>
            </div>

            <p className="h1b-updated">
              H1 Breakout Strategy — internal reference document, not for redistribution as investment advice.
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
                    <a href="/KRtrades" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">KR Trades</a>
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

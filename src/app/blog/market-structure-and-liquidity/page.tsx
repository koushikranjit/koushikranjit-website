export const metadata = {
  title: 'Market Structure & Liquidity — How I Read Price | Koushik Ranjit',
  description: 'My own framework for reading market structure: manipulation vs displacement, external vs internal liquidity, premium/discount, order blocks, daily bias, and how I size risk around drawdown.',
};

const toc = [
  { id: 'structure', title: 'Reading Highs and Lows Correctly' },
  { id: 'manipulation', title: 'Manipulation vs Displacement' },
  { id: 'liquidity', title: 'External vs Internal Liquidity' },
  { id: 'premium', title: 'Premium & Discount' },
  { id: 'blocks', title: 'Order Blocks & Breaker Blocks' },
  { id: 'bias', title: 'Daily Bias & the Weekly Cycle' },
  { id: 'risk', title: 'Sizing Risk Around Drawdown' },
  { id: 'disclaimer', title: 'Risk Disclosure & Disclaimer' },
];

const sessions = [
  { name: 'Asia', time: '18:00 – 00:00' },
  { name: 'London', time: '00:00 – 06:00' },
  { name: 'New York AM', time: '06:00 – 12:00' },
  { name: 'New York PM', time: '12:00 – 18:00' },
];

export default function MarketStructureLiquidityPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .msl *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .msl {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: clip;
          position: relative;
        }

        .msl-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .msl-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .msl-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .msl-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .msl-content { position: relative; z-index: 1; }

        .msl-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .msl-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .msl-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .msl-nav-link:hover { color: #10B981; }

        .msl-header { padding: 56px 24px 40px; max-width: 860px; margin: 0 auto; text-align: center; }

        .msl-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }

        .msl-h1 { font-size: clamp(28px, 5vw, 54px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 16px; }
        .msl-sub { font-size: clamp(16px, 1.4vw, 18px); color: #64748B; line-height: 1.7; max-width: 660px; margin: 0 auto 22px; }

        .msl-meta { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; font-size: 12px; color: #475569; margin-bottom: 28px; }
        .msl-meta span { display: flex; align-items: center; gap: 6px; }
        .msl-tag { color: #10B981; font-weight: 700; }

        .msl-dl { max-width: 780px; margin: 0 auto; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .msl-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', inherit; font-weight: 700; font-size: 15px;
          border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
          padding: 13px 24px; transition: transform 0.18s, box-shadow 0.18s;
        }
        .msl-btn-green { background: linear-gradient(135deg, #059669, #10B981); color: #fff; box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
        .msl-btn-green:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.4); }
        .msl-btn-discord { background: rgba(88,101,242,0.12); color: #A5AEFF; border: 1px solid rgba(88,101,242,0.3); }
        .msl-btn-discord:hover { background: rgba(88,101,242,0.18); color: #C7CDFF; }

        .msl-toc { max-width: 860px; margin: 44px auto 0; padding: 0 24px; }
        .msl-toc-inner { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px; }
        .msl-toc-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; margin-bottom: 18px; }
        .msl-toc-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .msl-toc-item a {
          display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 500; color: #64748B;
          text-decoration: none; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: color 0.18s;
        }
        .msl-toc-item:last-child a { border-bottom: none; }
        .msl-toc-item a:hover { color: #10B981; }
        .msl-toc-num { font-size: 12px; font-weight: 700; color: #334155; min-width: 22px; }

        .msl-body { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

        .msl-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 36px 40px; position: relative; overflow: hidden;
        }
        .msl-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }
        .msl-card.legal { background: rgba(239,68,68,0.03); border-color: rgba(239,68,68,0.1); }
        .msl-card.legal::before { background: linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent); }

        .msl-card-num { font-size: 12px; font-weight: 700; color: #10B981; letter-spacing: 0.08em; margin-bottom: 8px; }
        .msl-card-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 20px; }

        .msl-para { font-size: 15.5px; color: #94A3B8; line-height: 1.75; margin-bottom: 12px; }
        .msl-para:last-child { margin-bottom: 0; }

        .msl-callout {
          margin-top: 16px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.18);
          border-radius: 12px; padding: 18px 20px; font-size: 14.5px; color: #A7F3D0; font-weight: 600; line-height: 1.6;
        }

        .msl-note {
          margin-top: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px; font-size: 13px; color: #64748B; font-style: italic; line-height: 1.65;
        }

        .msl-sessions { display: flex; flex-direction: column; gap: 0; margin-top: 4px; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }
        .msl-session-row { display: flex; justify-content: space-between; padding: 12px 18px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .msl-session-row:last-child { border-bottom: none; }
        .msl-session-name { color: #F1F5F9; font-weight: 600; }
        .msl-session-time { color: #64748B; font-variant-numeric: tabular-nums; }

        .msl-legal-text { font-size: 14px; color: #64748B; font-weight: 500; line-height: 1.8; margin-bottom: 12px; }
        .msl-legal-text:last-child { margin-bottom: 0; }
        .msl-legal-sub { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #FCA5A5; margin: 16px 0 6px; }
        .msl-legal-sub:first-child { margin-top: 0; }

        .msl-cta {
          background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.12); border-radius: 14px;
          padding: 36px; text-align: center;
        }
        .msl-cta-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .msl-cta-text { font-size: 14.5px; color: #64748B; line-height: 1.7; max-width: 520px; margin: 0 auto 20px; }

        .msl-updated { text-align: center; font-size: 11px; color: #1E293B; padding: 0 24px 40px; }

        @media (max-width: 600px) {
          .msl-header { padding: 44px 20px 32px; }
          .msl-card { padding: 22px 18px; }
          .msl-toc-inner { padding: 20px; }
          .msl-card-title { font-size: 17px; }
          .msl-session-row { padding: 10px 14px; font-size: 13px; }
        }
      `}</style>

      <div className="msl">
        <div className="msl-bg" aria-hidden="true">
          <div className="msl-orb msl-orb-1" />
          <div className="msl-orb msl-orb-2" />
        </div>

        <div className="msl-content">
          <header className="msl-nav">
            <a href="/" className="msl-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/blog" className="msl-nav-link" aria-label="Back to Blog">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Blog
            </a>
          </header>

          <div className="msl-header">
            <div className="msl-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v10M9 3v18m0 0h10a2 2 0 0 0 2-2V9"/>
              </svg>
              Lesson 5 · Trading Concepts
            </div>

            <h1 className="msl-h1">Market Structure &amp; Liquidity</h1>
            <p className="msl-sub">
              My own framework for reading price — how I tell a real move from a fake one, where liquidity actually
              sits, and how I size risk once I&rsquo;m in a trade.
            </p>

            <div className="msl-meta">
              <span className="msl-tag">Market Structure</span>
              <span>Liquidity</span>
              <span>Risk Management</span>
            </div>

            <div className="msl-dl">
              <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="msl-btn msl-btn-discord" aria-label="Join the Discord community">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                </svg>
                Join Discord
              </a>
            </div>
          </div>

          <nav className="msl-toc" aria-label="Article contents">
            <div className="msl-toc-inner">
              <p className="msl-toc-title">Contents</p>
              <ol className="msl-toc-list">
                {toc.map((s, i) => (
                  <li className="msl-toc-item" key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="msl-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <main className="msl-body">
            <article id="structure" className="msl-card">
              <p className="msl-card-num">01</p>
              <h2 className="msl-card-title">Reading Highs and Lows Correctly</h2>
              <p className="msl-para">
                Market structure is nothing more than highs and lows. That sounds simple, but almost everyone gets
                it wrong — not because the concept is hard, but because they mark the wrong swing points. A high or
                low only matters if it actually changed something: broke a previous level, or set up the next leg.
                Every candle technically has a &ldquo;high&rdquo; and a &ldquo;low,&rdquo; but only a handful on any
                chart are structurally significant.
              </p>
              <p className="msl-para">
                Structure is the foundation everything else in this post sits on top of. If you can&rsquo;t reliably
                mark the right swing points, none of the concepts below — liquidity, order blocks, bias — will line
                up the way they&rsquo;re supposed to.
              </p>
            </article>

            <article id="manipulation" className="msl-card">
              <p className="msl-card-num">02</p>
              <h2 className="msl-card-title">Manipulation vs Displacement</h2>
              <p className="msl-para">
                Once structure is marked, every move that tests it falls into one of two buckets. A move that pokes
                past a high or low and then quickly fails is manipulation — price was drawn there to trigger stops
                and fill orders, not to actually continue. A move that pushes through structure with real speed and
                conviction, leaving imbalance behind it, is displacement — that&rsquo;s a signal of genuine
                continuation.
              </p>
              <p className="msl-para">
                In short: manipulation tends to reverse, displacement tends to continue. Learning to tell the two
                apart in real time — before the candle closes, not after — is most of what separates a confident
                read from a guess.
              </p>
              <div className="msl-callout">
                Rule of thumb I use: if price barely clears a level and stalls, I treat it as a sweep. If it clears
                a level and keeps moving with one-sided candles, I treat it as the real move.
              </div>
            </article>

            <article id="liquidity" className="msl-card">
              <p className="msl-card-num">03</p>
              <h2 className="msl-card-title">External vs Internal Liquidity</h2>
              <p className="msl-para">
                Liquidity is just resting orders — stop losses and pending entries sitting above highs and below
                lows. I split it into two categories. External liquidity sits at the obvious highs and lows on the
                chart, the levels everyone can see. Internal liquidity sits inside the range, usually inside the
                imbalances left behind by displacement (see the FVG post for that concept in detail).
              </p>
              <p className="msl-para">
                Price is always doing one of two things: reaching for external liquidity, or filling in internal
                liquidity on its way there. Once you start viewing every chart through that lens, most of the
                &ldquo;random&rdquo; wicks and pullbacks start to make a lot more sense.
              </p>
            </article>

            <article id="premium" className="msl-card">
              <p className="msl-card-num">04</p>
              <h2 className="msl-card-title">Premium &amp; Discount</h2>
              <p className="msl-para">
                Every price swing has a midpoint. Above that midpoint is premium — expensive relative to the recent
                range. Below it is discount — cheap relative to the recent range. If I think trading is a business,
                I want to be buying my &ldquo;product&rdquo; at a discount and selling it at a premium, the same
                way any business owner would think about inventory.
              </p>
              <p className="msl-para">
                This is why a lot of reversals happen roughly around the midpoint of the previous leg — it&rsquo;s
                not magic, it&rsquo;s just where the last batch of buyers or sellers stopped being willing to pay
                up (or sell down) any further.
              </p>
            </article>

            <article id="blocks" className="msl-card">
              <p className="msl-card-num">05</p>
              <h2 className="msl-card-title">Order Blocks &amp; Breaker Blocks</h2>
              <p className="msl-para">
                An order block is the last candle (or small cluster of candles) printed just before a strong,
                displaced move away from it. In an uptrend, that&rsquo;s usually the last down-close candle before
                price expands higher — it tends to act as support if price comes back to test it. In a downtrend,
                it&rsquo;s the mirror image.
              </p>
              <p className="msl-para">
                A breaker block is what&rsquo;s left behind after an order block fails — the level flips from
                support to resistance (or vice versa) once price closes back through it. I pay closer attention to
                breaker blocks around the times of day I already expect a liquidity sweep, since that&rsquo;s when
                they tend to produce the cleanest entries.
              </p>
            </article>

            <article id="bias" className="msl-card">
              <p className="msl-card-num">06</p>
              <h2 className="msl-card-title">Daily Bias &amp; the Weekly Cycle</h2>
              <p className="msl-para">
                Daily bias is simply which side I expect today&rsquo;s candle to close on — are buyers or sellers
                in control. Once that&rsquo;s decided, the job during the session is just waiting for a
                lower-timeframe setup that agrees with it, instead of reacting to every wiggle on a 1-minute chart.
              </p>
              <p className="msl-para">
                I build that bias around the four major trading sessions:
              </p>
              <div className="msl-sessions">
                {sessions.map((s) => (
                  <div className="msl-session-row" key={s.name}>
                    <span className="msl-session-name">{s.name}</span>
                    <span className="msl-session-time">{s.time}</span>
                  </div>
                ))}
              </div>
              <p className="msl-para" style={{marginTop: '16px'}}>
                Zoomed out further, I also keep a loose weekly rhythm in mind — early week often behaves more like
                accumulation and testing, the middle of the week is where the bigger manipulation moves tend to
                show up, and the back half of the week is usually where the real distribution or trend continuation
                plays out. It&rsquo;s a tendency, not a rule — I use it to set expectations, not to force trades.
              </p>
              <div className="msl-note">
                Note: session times, market structure, and liquidity are widely used concepts across price-action
                and order-flow trading — the specific terminology here (order blocks, breaker blocks,
                premium/discount, internal vs external liquidity) is most closely associated with the ICT (Inner
                Circle Trader) methodology. This section is my own summary of how I apply these ideas, not a
                reproduction of any course material.
              </div>
            </article>

            <article id="risk" className="msl-card">
              <p className="msl-card-num">07</p>
              <h2 className="msl-card-title">Sizing Risk Around Drawdown</h2>
              <p className="msl-para">
                Structure and liquidity only tell me where to look — they don&rsquo;t protect the account. The part
                that actually keeps me in the game long enough for the edge to play out is how I size risk relative
                to recent performance, not just per trade.
              </p>
              <p className="msl-para">
                In practice: I hold size steady once a trade is at breakeven, I&rsquo;m comfortable sizing up after
                a stretch of green trades, and I deliberately cut size back after a couple of losses in a row rather
                than trying to &ldquo;win it back&rdquo; at the same size. If I&rsquo;m down two trades, or I hit
                one meaningful loss, that&rsquo;s my cue to step away rather than force a third or fourth entry —
                most of my worst days came from ignoring that rule, not from a bad setup.
              </p>
              <div className="msl-callout">
                A good setup with the wrong size is still a bad trade. Structure gets you the direction; risk
                sizing is what actually determines whether you&rsquo;re still trading next month.
              </div>
            </article>

            <article id="disclaimer" className="msl-card legal">
              <p className="msl-card-num" style={{color: '#EF4444'}}>08</p>
              <h2 className="msl-card-title">Risk Disclosure &amp; Disclaimer</h2>

              <p className="msl-legal-sub">Educational Content</p>
              <p className="msl-legal-text">
                This lesson describes a personal trading framework and how I apply it. It is provided for
                informational and educational purposes only — it is not a signal service, a specific rule-based
                system, or an investment recommendation of any kind.
              </p>

              <p className="msl-legal-sub">Not Financial Advice</p>
              <p className="msl-legal-text">
                Nothing in this document constitutes financial, investment, legal, or tax advice. Any decision to
                apply these concepts to real or simulated trading is made entirely at the reader&rsquo;s own
                discretion and risk.
              </p>

              <p className="msl-legal-sub">Trading Risk</p>
              <p className="msl-legal-text">
                Trading futures, foreign exchange, and other leveraged products carries a high level of risk and
                may not be suitable for all investors. It is possible to lose some, or all, of an initial
                investment — do not trade with money you cannot afford to lose.
              </p>

              <p className="msl-legal-sub">No Performance Guarantee</p>
              <p className="msl-legal-text">
                Past behavior of any concept described here is not indicative of future results. No representation
                is being made that applying this framework will, or is likely to, achieve profits or avoid losses.
              </p>

              <p className="msl-legal-sub">Your Own Responsibility</p>
              <p className="msl-legal-text">
                Anyone reviewing or applying this framework should independently evaluate it, test it thoroughly
                (e.g. on a demo account), and consult a licensed financial professional before risking real
                capital.
              </p>
            </article>

            <div className="msl-cta">
              <p className="msl-cta-title">Want to go deeper on this?</p>
              <p className="msl-cta-text">
                Come ask questions and see live chart breakdowns of structure, liquidity, and risk sizing in the
                Discord community.
              </p>
              <div className="msl-dl">
                <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="msl-btn msl-btn-discord">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                  </svg>
                  Join Discord
                </a>
              </div>
            </div>

            <p className="msl-updated">
              Market Structure &amp; Liquidity — Lesson 5, internal reference document, not for redistribution as investment advice.
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

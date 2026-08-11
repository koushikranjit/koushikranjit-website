export const metadata = {
  title: 'Blog — Koushik Ranjit',
  description: 'Trading strategy write-ups and notes from Koushik Ranjit — Nasdaq futures and XAUUSD day trader.',
};

const posts = [
  {
    slug: 'h1-breakout-strategy',
    tag: 'Trading Strategy',
    title: 'H1 Breakout Strategy — XAUUSD Rules & Trade Management',
    excerpt: 'The full breakout system for Gold: setup identification, a stop-order entry, a non-negotiable +15 pip breakeven rule, a 15-pip trailing stop, and a scaled three-target exit — plus chart examples and a manual execution checklist.',
    meta: 'XAUUSD · H1',
    date: 'August 2026',
    readTime: '9 min read',
    stats: [
      { label: 'Win Rate', value: '70.96%' },
      { label: 'Profit Factor', value: '1.25' },
      { label: 'Trades Logged', value: '2,762' },
    ],
  },
];

const [featured, ...rest] = posts;

export default function BlogIndexPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .bl *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .bl {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: clip;
          position: relative;
        }

        .bl-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .bl-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .bl-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .bl-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .bl-content { position: relative; z-index: 1; }

        .bl-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .bl-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .bl-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .bl-nav-link:hover { color: #10B981; }

        .bl-header { padding: 64px 24px 44px; max-width: 860px; margin: 0 auto; text-align: center; }
        .bl-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }
        .bl-h1 { font-size: clamp(30px, 5.5vw, 58px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 16px; }
        .bl-sub { font-size: clamp(16px, 1.4vw, 18px); color: #64748B; line-height: 1.7; max-width: 620px; margin: 0 auto; }

        .bl-body { max-width: 980px; margin: 0 auto; padding: 8px 24px 110px; display: flex; flex-direction: column; gap: 22px; }

        /* Featured post */
        .bl-feature {
          display: block; text-decoration: none; color: inherit;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 22px;
          position: relative; overflow: hidden; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .bl-feature::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent);
        }
        .bl-feature:hover {
          border-color: rgba(16,185,129,0.3); transform: translateY(-3px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.08);
        }
        .bl-feature-grid { display: grid; grid-template-columns: 1fr 280px; }

        .bl-feature-main { padding: 40px 40px 36px; min-width: 0; }
        .bl-feature-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #10B981;
          margin-bottom: 16px;
        }
        .bl-feature-tag svg { width: 12px; height: 12px; }
        .bl-feature-title { font-size: clamp(22px, 2.6vw, 30px); font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.3; margin-bottom: 14px; }
        .bl-feature-excerpt { font-size: 15px; color: #94A3B8; line-height: 1.75; margin-bottom: 24px; max-width: 60ch; }

        .bl-stat-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        .bl-stat-chip {
          display: flex; flex-direction: column; gap: 2px;
          background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.15);
          border-radius: 10px; padding: 8px 14px;
        }
        .bl-stat-chip-value { font-size: 15px; font-weight: 800; color: #10B981; letter-spacing: -0.01em; }
        .bl-stat-chip-label { font-size: 10px; color: #64748B; text-transform: uppercase; letter-spacing: 0.06em; }

        .bl-feature-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }

        .bl-byline { display: flex; align-items: center; gap: 10px; }
        .bl-avatar {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #059669, #10B981); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; letter-spacing: -0.02em;
        }
        .bl-byline-text { display: flex; flex-direction: column; line-height: 1.3; }
        .bl-byline-name { font-size: 13px; font-weight: 700; color: #E2E8F0; }
        .bl-byline-meta { font-size: 12px; color: #475569; }

        .bl-read-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 700; color: #000;
          background: linear-gradient(135deg, #10B981, #34D399);
          padding: 11px 20px; border-radius: 10px;
          box-shadow: 0 4px 20px rgba(16,185,129,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bl-feature:hover .bl-read-cta { transform: translateX(2px); box-shadow: 0 6px 24px rgba(16,185,129,0.35); }
        .bl-read-cta svg { width: 14px; height: 14px; }

        /* Decorative chart panel */
        .bl-feature-visual {
          position: relative; background: linear-gradient(160deg, rgba(16,185,129,0.08), rgba(16,185,129,0.01));
          border-left: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .bl-feature-visual svg { width: 100%; height: auto; opacity: 0.9; }

        /* Coming soon note */
        .bl-more {
          display: flex; align-items: center; gap: 14px;
          border: 1px dashed rgba(255,255,255,0.1); border-radius: 16px;
          padding: 20px 24px; color: #475569; font-size: 13.5px;
        }
        .bl-more svg { width: 18px; height: 18px; color: #334155; flex-shrink: 0; }

        /* Secondary grid (future posts) */
        .bl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .bl-card {
          display: block; text-decoration: none; color: inherit;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 28px; position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.2s;
        }
        .bl-card:hover { border-color: rgba(16,185,129,0.25); transform: translateY(-2px); }
        .bl-card-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #10B981; margin-bottom: 10px; }
        .bl-card-title { font-size: 18px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; margin-bottom: 10px; line-height: 1.35; }
        .bl-card-excerpt { font-size: 14px; color: #64748B; line-height: 1.65; margin-bottom: 16px; }
        .bl-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #475569; }
        .bl-card-read { color: #10B981; font-weight: 700; display: flex; align-items: center; gap: 4px; }

        @media (max-width: 860px) {
          .bl-feature-grid { grid-template-columns: 1fr; }
          .bl-feature-visual { display: none; }
          .bl-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .bl-header { padding: 48px 20px 32px; }
          .bl-feature-main { padding: 26px 22px 24px; }
          .bl-feature-footer { align-items: flex-start; }
          .bl-read-cta { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="bl">
        <div className="bl-bg" aria-hidden="true">
          <div className="bl-orb bl-orb-1" />
          <div className="bl-orb bl-orb-2" />
        </div>

        <div className="bl-content">
          <header className="bl-nav">
            <a href="/" className="bl-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/" className="bl-nav-link" aria-label="Back to Home">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Home
            </a>
          </header>

          <div className="bl-header">
            <div className="bl-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Blog
            </div>
            <h1 className="bl-h1">Trading Notes &amp; Strategy</h1>
            <p className="bl-sub">Rule sets, trade management breakdowns, and write-ups from Koushik Ranjit&rsquo;s own trading.</p>
          </div>

          <main className="bl-body">
            {!featured ? (
              <div className="bl-more" role="status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                No posts yet — check back soon.
              </div>
            ) : (
              <>
                <a href={`/blog/${featured.slug}`} className="bl-feature" aria-label={`Read: ${featured.title}`}>
                  <div className="bl-feature-grid">
                    <div className="bl-feature-main">
                      <span className="bl-feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>
                        </svg>
                        {featured.tag}
                      </span>
                      <h2 className="bl-feature-title">{featured.title}</h2>
                      <p className="bl-feature-excerpt">{featured.excerpt}</p>

                      <div className="bl-stat-row" aria-label="Strategy performance snapshot">
                        {featured.stats.map((s) => (
                          <div className="bl-stat-chip" key={s.label}>
                            <span className="bl-stat-chip-value">{s.value}</span>
                            <span className="bl-stat-chip-label">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bl-feature-footer">
                        <div className="bl-byline">
                          <span className="bl-avatar" aria-hidden="true">KR</span>
                          <div className="bl-byline-text">
                            <span className="bl-byline-name">Koushik Ranjit</span>
                            <span className="bl-byline-meta">{featured.date} · {featured.readTime} · {featured.meta}</span>
                          </div>
                        </div>
                        <span className="bl-read-cta">
                          Read the full breakdown
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M6 4l4 4-4 4"/>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="bl-feature-visual" aria-hidden="true">
                      <svg viewBox="0 0 200 220" fill="none">
                        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                        <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                        <line x1="0" y1="140" x2="200" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                        <line x1="0" y1="190" x2="200" y2="190" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                        <g stroke="#10B981" strokeWidth="2" opacity="0.55">
                          <line x1="20" y1="150" x2="20" y2="175"/>
                          <line x1="40" y1="145" x2="40" y2="168"/>
                          <line x1="60" y1="140" x2="60" y2="160"/>
                          <line x1="80" y1="130" x2="80" y2="150"/>
                        </g>
                        <g fill="#10B981">
                          <rect x="16" y="155" width="8" height="14" rx="1.5" opacity="0.55"/>
                          <rect x="36" y="150" width="8" height="12" rx="1.5" opacity="0.6"/>
                          <rect x="56" y="142" width="8" height="14" rx="1.5" opacity="0.7"/>
                          <rect x="76" y="132" width="8" height="14" rx="1.5" opacity="0.8"/>
                        </g>
                        <path d="M20 160 L40 155 L60 148 L80 138 L100 120 L120 95 L140 75 L160 55 L180 35" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="180" cy="35" r="4" fill="#10B981"/>
                        <circle cx="180" cy="35" r="8" fill="#10B981" opacity="0.2"/>
                      </svg>
                    </div>
                  </div>
                </a>

                {rest.length > 0 && (
                  <div className="bl-grid">
                    {rest.map((p) => (
                      <a href={`/blog/${p.slug}`} className="bl-card" key={p.slug}>
                        <p className="bl-card-tag">{p.tag}</p>
                        <h2 className="bl-card-title">{p.title}</h2>
                        <p className="bl-card-excerpt">{p.excerpt}</p>
                        <div className="bl-card-meta">
                          <span>{p.meta}</span>
                          <span className="bl-card-read">
                            Read article
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M6 4l4 4-4 4"/>
                            </svg>
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                <div className="bl-more">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  More trading write-ups in progress — check back soon.
                </div>
              </>
            )}
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

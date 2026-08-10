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
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .bl * { box-sizing: border-box; margin: 0; padding: 0; }

        .bl {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
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

        .bl-header { padding: 56px 24px 40px; max-width: 780px; margin: 0 auto; text-align: center; }
        .bl-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
          color: #10B981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
          padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
        }
        .bl-h1 { font-size: clamp(28px, 6vw, 46px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 14px; }
        .bl-sub { font-size: 16px; color: #64748B; line-height: 1.7; max-width: 560px; margin: 0 auto; }

        .bl-body { max-width: 780px; margin: 0 auto; padding: 24px 24px 100px; display: flex; flex-direction: column; gap: 18px; }

        .bl-card {
          display: block; text-decoration: none; color: inherit;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 28px; position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.2s;
        }
        .bl-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }
        .bl-card:hover { border-color: rgba(16,185,129,0.25); transform: translateY(-2px); }

        .bl-card-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #10B981; margin-bottom: 10px; }
        .bl-card-title { font-size: 19px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; margin-bottom: 10px; line-height: 1.35; }
        .bl-card-excerpt { font-size: 13.5px; color: #64748B; line-height: 1.7; margin-bottom: 16px; }
        .bl-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #475569; }
        .bl-card-read { color: #10B981; font-weight: 700; display: flex; align-items: center; gap: 4px; }

        .bl-empty { text-align: center; padding: 60px 24px; color: #475569; font-size: 14px; }

        @media (max-width: 600px) {
          .bl-header { padding: 44px 20px 32px; }
          .bl-card { padding: 22px 20px; }
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
            {posts.length === 0 ? (
              <p className="bl-empty">No posts yet — check back soon.</p>
            ) : (
              posts.map((p) => (
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
              ))
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

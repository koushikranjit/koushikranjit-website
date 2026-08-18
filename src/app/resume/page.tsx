export const metadata = {
  title: 'Résumé — Koushik Ranjit',
  description: 'Koushik Ranjit — Client Support & Discord Moderator, Prop Firm Operations & Account Investigation. MT5 Manager, Axcera, cTrader, TradeLocker.',
};

const skills = [
  'Client Support', 'Prop Firm Operations',
  'Account Investigation', 'Trading Operations',
  'MT5 Manager', 'Axcera',
  'MetaTrader', 'cTrader',
  'TradeLocker', 'Trading Rule Analysis',
  'DD & Rule Breach Analysis', 'KYC & Account Verification',
  'Payout Operations', 'Risk & Compliance Coordination',
  'Platform Troubleshooting',
];

const experience = [
  {
    role: 'Discord Moderator',
    company: 'Titan Capital Markets',
    period: 'Remote · Dec 2024 – Current',
    bullets: [
      'Manage day-to-day trader support across Discord and ticketing platforms, responding to account, trading-rule, platform, verification, payout, and general trader inquiries.',
      'Investigate trader account and trading-related concerns using Axcera and MT5 Manager, reviewing relevant account information and trading history to determine the cause of reported issues.',
      'Analyze account activity and rule-related concerns, including DD breaches, and provide clear, accurate explanations and appropriate resolutions or next steps to traders.',
      'Handle complex account cases by investigating backend information and escalating cases to Risk, Compliance, or Operations when further review is required.',
      'Support traders across MT5, TradeLocker, and cTrader, including platform-related troubleshooting and account assistance.',
      'Assist with account verification, account management, payout requests, and trading-rule guidance.',
      'Document support cases and identify recurring issues to improve case resolution and operational workflows.',
      'Moderate the Discord community and maintain professional, helpful communication with traders.',
    ],
  },
  {
    role: 'Customer Support Representative',
    company: 'AlphaCapitalGroup',
    period: 'Remote · Apr 2024 – Oct 2024',
    bullets: [
      'Managed client support across Discord and ticketing platforms, resolving 300+ client support tickets per month while maintaining 99% compliance accuracy and fast response times.',
      'Assisted with backend operations, trader verification, payout requests, account-related concerns, and platform support across MT5 and cTrader.',
      'Investigated and resolved trader enquiries related to accounts, trading rules, platform functionality, and general support issues.',
      'Collaborated with Risk, Compliance, and Operations teams to ensure policy compliance and efficient case resolution.',
      'Identified recurring client issues and contributed to process improvements that supported faster and more consistent resolutions.',
      'Provided clear, professional, and client-focused support across a high volume of trader enquiries.',
    ],
  },
];

const certifications = [
  'Customer Service Leadership — LinkedIn Learning',
  'Customer Service: Problem-Solving and Troubleshooting — LinkedIn Learning',
  'Managing a Customer Contact Center — LinkedIn Learning',
  'Empathy for Customer Service Professionals — LinkedIn Learning',
  'Project Management Foundations — NASBA',
];

const languages = [
  { name: 'Bengali', level: 'Native' },
  { name: 'English', level: 'Proficient' },
  { name: 'Hindi', level: 'Proficient' },
];

export default function ResumePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');

        .rsm *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .rsm {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #000000;
          color: #CBD5E1;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: clip;
          position: relative;
        }

        .rsm-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .rsm-orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .rsm-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%); top: -150px; right: -150px; }
        .rsm-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); bottom: 10%; left: -150px; }

        .rsm-content { position: relative; z-index: 1; }

        .rsm-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .rsm-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: #F1F5F9; text-decoration: none; }
        .rsm-nav-link {
          font-size: 13px; font-weight: 600; color: #64748B; text-decoration: none;
          display: flex; align-items: center; gap: 5px; transition: color 0.2s;
        }
        .rsm-nav-link:hover { color: #10B981; }

        .rsm-header { padding: 56px 24px 40px; max-width: 860px; margin: 0 auto; text-align: center; }

        .rsm-avatar {
          width: 76px; height: 76px; border-radius: 50%; margin: 0 auto 20px;
          background: linear-gradient(135deg, #059669, #10B981); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; font-weight: 800; letter-spacing: -0.02em;
          box-shadow: 0 8px 30px rgba(5,150,105,0.35);
        }

        .rsm-h1 { font-size: clamp(28px, 5vw, 46px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; color: #FFFFFF; margin-bottom: 12px; }
        .rsm-sub { font-size: clamp(14px, 1.3vw, 16px); color: #64748B; line-height: 1.7; max-width: 640px; margin: 0 auto 22px; }

        .rsm-contact { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; font-size: 13px; color: #94A3B8; margin-bottom: 28px; }
        .rsm-contact a { color: #94A3B8; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.18s; }
        .rsm-contact a:hover { color: #10B981; }
        .rsm-contact span { display: flex; align-items: center; gap: 6px; }

        .rsm-dl { max-width: 780px; margin: 0 auto; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .rsm-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', inherit; font-weight: 700; font-size: 15px;
          border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
          padding: 13px 24px; transition: transform 0.18s, box-shadow 0.18s;
        }
        .rsm-btn-green { background: linear-gradient(135deg, #059669, #10B981); color: #fff; box-shadow: 0 4px 20px rgba(5,150,105,0.3); }
        .rsm-btn-green:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.4); }
        .rsm-btn-ghost { background: rgba(255,255,255,0.03); color: #94A3B8; border: 1px solid rgba(255,255,255,0.08); }
        .rsm-btn-ghost:hover { color: #CBD5E1; border-color: rgba(255,255,255,0.16); }

        .rsm-body { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

        .rsm-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
          padding: 36px 40px; position: relative; overflow: hidden;
        }
        .rsm-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
        }

        .rsm-card-eyebrow { font-size: 12px; font-weight: 700; color: #10B981; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
        .rsm-card-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: #FFFFFF; margin-bottom: 20px; }

        .rsm-para { font-size: 15.5px; color: #94A3B8; line-height: 1.75; margin-bottom: 12px; }
        .rsm-para:last-child { margin-bottom: 0; }

        .rsm-skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .rsm-skill {
          font-size: 13px; font-weight: 600; color: #A7F3D0;
          background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.2);
          border-radius: 20px; padding: 8px 16px;
        }

        .rsm-job { display: flex; flex-direction: column; gap: 12px; }
        .rsm-job + .rsm-job { margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.06); }
        .rsm-job-head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .rsm-job-role { font-size: 17px; font-weight: 800; color: #F1F5F9; letter-spacing: -0.01em; }
        .rsm-job-company { font-size: 14.5px; color: #10B981; font-weight: 700; }
        .rsm-job-period { font-size: 12.5px; color: #64748B; font-weight: 600; white-space: nowrap; }
        .rsm-job-bullets { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-top: 4px; }
        .rsm-job-bullets li { font-size: 14.5px; color: #94A3B8; line-height: 1.7; padding-left: 18px; position: relative; }
        .rsm-job-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 5px; height: 5px; border-radius: 50%; background: #10B981; }

        .rsm-edu-title { font-size: 16px; font-weight: 800; color: #F1F5F9; margin-bottom: 4px; }
        .rsm-edu-meta { font-size: 13px; color: #64748B; margin-bottom: 10px; }
        .rsm-edu-degree { font-size: 14.5px; color: #10B981; font-weight: 700; margin-bottom: 10px; }

        .rsm-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }

        .rsm-lang-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
        .rsm-lang-row:last-child { border-bottom: none; }
        .rsm-lang-name { color: #F1F5F9; font-weight: 600; }
        .rsm-lang-level { color: #64748B; }

        .rsm-cert-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .rsm-cert-list li { font-size: 14px; color: #94A3B8; line-height: 1.6; padding-left: 18px; position: relative; }
        .rsm-cert-list li::before { content: ''; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #10B981; }

        .rsm-cta {
          background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.12); border-radius: 14px;
          padding: 36px; text-align: center;
        }
        .rsm-cta-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .rsm-cta-text { font-size: 14.5px; color: #64748B; line-height: 1.7; max-width: 520px; margin: 0 auto 20px; }

        @media (max-width: 700px) {
          .rsm-grid2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .rsm-header { padding: 44px 20px 32px; }
          .rsm-card { padding: 22px 18px; }
          .rsm-card-title { font-size: 17px; }
          .rsm-job-head { flex-direction: column; align-items: flex-start; gap: 2px; }
        }
      `}</style>

      <div className="rsm">
        <div className="rsm-bg" aria-hidden="true">
          <div className="rsm-orb rsm-orb-1" />
          <div className="rsm-orb rsm-orb-2" />
        </div>

        <div className="rsm-content">
          <header className="rsm-nav">
            <a href="/" className="rsm-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
            <a href="/" className="rsm-nav-link" aria-label="Back to Home">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 4l-4 4 4 4"/>
              </svg>
              Home
            </a>
          </header>

          <div className="rsm-header">
            <div className="rsm-avatar">KR</div>
            <h1 className="rsm-h1">Koushik Ranjit</h1>
            <p className="rsm-sub">
              Client Support &amp; Discord Moderator · Prop Firm Operations &amp; Account Investigation ·
              MT5 Manager &amp; Axcera · cTrader &amp; TradeLocker
            </p>

            <div className="rsm-contact">
              <a href="tel:+919564659426">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 95646 59426
              </a>
              <a href="mailto:koushikranjit8@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                koushikranjit8@gmail.com
              </a>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Kolkata, India
              </span>
              <a href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                LinkedIn
              </a>
            </div>

            <div className="rsm-dl">
              <a href="/downloads/koushik-ranjit-resume.pdf" className="rsm-btn rsm-btn-green" download aria-label="Download résumé as a PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Résumé (PDF)
              </a>
              <a href="mailto:koushikranjit8@gmail.com" className="rsm-btn rsm-btn-ghost">
                Get in Touch
              </a>
            </div>
          </div>

          <main className="rsm-body">
            <article className="rsm-card">
              <p className="rsm-card-eyebrow">Summary</p>
              <p className="rsm-para">
                I&rsquo;m a Client Support &amp; Discord Moderator with hands-on experience in proprietary trading
                environments, specializing in trader support, account investigation, and operational support.
              </p>
              <p className="rsm-para">
                My role combines client-facing support with backend account investigation. I manage trader
                enquiries across Discord and support ticketing channels, assist with account-related concerns, and
                provide accurate, professional, and solution-focused support.
              </p>
              <p className="rsm-para">
                I have hands-on experience using Axcera and MT5 Manager to investigate and resolve a wide range of
                trader account and trading-related concerns. I analyze account information, trading activity,
                rule-related issues, and relevant account history to understand the underlying situation, determine
                what happened, and provide clear explanations and appropriate resolutions to traders.
              </p>
              <p className="rsm-para">
                My operational experience includes account verification, payout-related support, trading-rule
                guidance, platform assistance, troubleshooting, and account-related case resolution across MT5,
                cTrader, and TradeLocker. I also work with Risk, Compliance, and Operations teams when cases require
                further review or escalation.
              </p>
              <p className="rsm-para">
                As an active CFD and futures trader, I have practical knowledge of trading environments and
                understand the challenges traders face. This allows me to communicate with traders from an informed
                perspective and provide support that goes beyond standard scripted responses.
              </p>
              <p className="rsm-para">
                I&rsquo;m particularly interested in opportunities within prop firms and forex brokers across Client
                Support, Trading Operations, Account Operations, and risk-related support functions.
              </p>
            </article>

            <article className="rsm-card">
              <p className="rsm-card-eyebrow">Skills</p>
              <div className="rsm-skills">
                {skills.map((s) => (
                  <span className="rsm-skill" key={s}>{s}</span>
                ))}
              </div>
            </article>

            <article className="rsm-card">
              <p className="rsm-card-eyebrow">Experience</p>
              {experience.map((job) => (
                <div className="rsm-job" key={job.role + job.company}>
                  <div className="rsm-job-head">
                    <div>
                      <span className="rsm-job-role">{job.role}</span>{' '}
                      <span className="rsm-job-company">· {job.company}</span>
                    </div>
                    <span className="rsm-job-period">{job.period}</span>
                  </div>
                  <ul className="rsm-job-bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>

            <div className="rsm-grid2">
              <article className="rsm-card">
                <p className="rsm-card-eyebrow">Education</p>
                <p className="rsm-edu-title">West Bengal State University</p>
                <p className="rsm-edu-meta">Taki, West Bengal · Jan 2019 – Jan 2022</p>
                <p className="rsm-edu-degree">B.Sc Honours Mathematics — 73.70%</p>
                <p className="rsm-para">
                  Taki Government College, B.Sc Mathematics (Honours), 2019–2022. Deepened understanding of
                  mathematical principles, acquired analytical skills across domains, and engaged in rigorous
                  coursework that fostered critical thinking.
                </p>
              </article>

              <article className="rsm-card">
                <p className="rsm-card-eyebrow">Languages</p>
                <div>
                  {languages.map((l) => (
                    <div className="rsm-lang-row" key={l.name}>
                      <span className="rsm-lang-name">{l.name}</span>
                      <span className="rsm-lang-level">{l.level}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rsm-card">
              <p className="rsm-card-eyebrow">Certifications &amp; Licenses</p>
              <ul className="rsm-cert-list">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>

            <div className="rsm-cta">
              <p className="rsm-cta-title">Let&rsquo;s connect</p>
              <p className="rsm-cta-text">
                Open to opportunities in Client Support, Trading Operations, Account Operations, and risk-related
                support functions at prop firms and forex brokers.
              </p>
              <div className="rsm-dl">
                <a href="/downloads/koushik-ranjit-resume.pdf" className="rsm-btn rsm-btn-green" download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Résumé (PDF)
                </a>
                <a href="mailto:koushikranjit8@gmail.com" className="rsm-btn rsm-btn-ghost">
                  Email Me
                </a>
              </div>
            </div>
          </main>

          <footer className="relative border-t border-white/[0.06] bg-black overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">
              <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 mb-14 sm:mb-20">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">Contact</p>
                  <div className="space-y-2 text-sm">
                    <a href="tel:+919564659426" className="block text-gray-300 hover:text-emerald-400 transition-colors">+91 95646 59426</a>
                    <a href="mailto:koushikranjit8@gmail.com" className="block text-gray-300 hover:text-emerald-400 transition-colors">koushikranjit8@gmail.com</a>
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
                    <a href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">LinkedIn</a>
                    <a href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Discord</a>
                    <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">Instagram</a>
                    <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="block text-gray-200 font-medium hover:text-emerald-400 transition-colors">X (Twitter)</a>
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

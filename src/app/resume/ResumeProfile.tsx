'use client';

import { useState } from 'react';

/* ──────────────────────────────────────────────────────────────
   IMAGES
   Logos are hosted in the KR-Website repo (GitHub raw URLs), per
   the project's image-hosting rule. To add a company logo, upload
   it to that repo and paste its raw URL here — the tile swaps from
   the lettermark placeholder to the real logo automatically.
   ────────────────────────────────────────────────────────────── */
const IMG = {
  portrait:
    'https://github.com/koushikranjit/KR-Website/blob/263a05f4d358b149a5714d3e6ee42d37cc82ca33/KR%20Headshot%20.jpg?raw=true',
  titan: '', // e.g. https://github.com/koushikranjit/KR-Website/blob/<sha>/titan-logo.png?raw=true
  alpha: '',
  wbsu: '',
};

const HEADLINE = [
  'Client Support & Discord Moderator',
  'Prop Firm Operations & Account Investigation',
  'MT5 Manager & Axcera',
  'cTrader & TradeLocker',
  'CFD & Futures Trader',
];

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const experience = [
  {
    role: 'Discord Moderator',
    company: 'Titan Capital Markets',
    period: 'Remote · Dec 2024 — Current',
    logo: IMG.titan,
    mark: 'T',
    brand: 'titan',
    bullets: [
      'Manage day-to-day trader support across Discord and ticketing platforms, responding to account, trading-rule, platform, verification, payout, and general trader inquiries.',
      'Investigate trader account and trading-related concerns using Axcera and MT5 Manager, reviewing account information and trading history to determine the cause of reported issues.',
      'Analyze account activity and rule-related concerns, including DD breaches, and provide clear, accurate explanations and appropriate resolutions or next steps.',
      'Handle complex account cases by investigating backend information and escalating to Risk, Compliance, or Operations when further review is required.',
      'Support traders across MT5, TradeLocker, and cTrader, including platform-related troubleshooting and account assistance.',
      'Assist with account verification, account management, payout requests, and trading-rule guidance.',
      'Document support cases and identify recurring issues to improve case resolution and operational workflows.',
      'Moderate the Discord community and maintain professional, helpful communication with traders.',
    ],
  },
  {
    role: 'Customer Support Representative',
    company: 'Alpha Capital Group',
    period: 'Remote · Apr 2024 — Oct 2024',
    logo: IMG.alpha,
    mark: 'A',
    brand: 'alpha',
    bullets: [
      'Managed client support across Discord and ticketing platforms, resolving 300+ support tickets per month while maintaining 99% compliance accuracy and fast response times.',
      'Assisted with backend operations, trader verification, payout requests, account-related concerns, and platform support across MT5 and cTrader.',
      'Investigated and resolved trader enquiries related to accounts, trading rules, platform functionality, and general support issues.',
      'Collaborated with Risk, Compliance, and Operations teams to ensure policy compliance and efficient case resolution.',
      'Identified recurring client issues and contributed to process improvements supporting faster, more consistent resolutions.',
      'Provided clear, professional, client-focused support across a high volume of trader enquiries.',
    ],
  },
];

const skillGroups = [
  {
    label: 'Support & Operations',
    accent: true,
    items: ['Client Support', 'Prop Firm Operations', 'Trading Operations', 'Account Investigation', 'Payout Operations'],
  },
  {
    label: 'Platforms & Tools',
    accent: false,
    items: ['MT5 Manager', 'Axcera', 'MetaTrader', 'cTrader', 'TradeLocker'],
  },
  {
    label: 'Risk & Compliance',
    accent: false,
    items: ['Trading Rule Analysis', 'DD & Rule Breach Analysis', 'KYC & Account Verification', 'Risk & Compliance Coordination', 'Platform Troubleshooting'],
  },
];

const certifications = [
  { name: 'Customer Service Leadership', by: 'LinkedIn Learning' },
  { name: 'Customer Service: Problem-Solving and Troubleshooting', by: 'LinkedIn Learning' },
  { name: 'Managing a Customer Contact Center', by: 'LinkedIn Learning' },
  { name: 'Empathy for Customer Service Professionals', by: 'LinkedIn Learning' },
  { name: 'Project Management Foundations', by: 'NASBA' },
];

const languages = [
  { name: 'Bengali', level: 'Native' },
  { name: 'English', level: 'Proficient' },
  { name: 'Hindi', level: 'Proficient' },
];

const stats = [
  { value: '300+', label: 'Support tickets resolved monthly' },
  { value: '99%', label: 'Compliance accuracy maintained' },
  { value: '3', label: 'Trading platforms supported' },
];

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function ResumeProfile() {
  const [active, setActive] = useState('about');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&family=JetBrains+Mono:wght@400;600&display=swap');

        .rsm *:not(:where(footer, footer *)) { box-sizing: border-box; margin: 0; padding: 0; }

        .rsm {
          --panel: #101413;
          --panel-2: #141918;
          --line: rgba(255,255,255,0.07);
          --line-soft: rgba(255,255,255,0.045);
          --ink: #F2F6F4;
          --ink-2: #9FB0AA;
          --ink-3: #667872;
          --accent: #10B981;
          --accent-deep: #059669;
          --accent-wash: rgba(16,185,129,0.09);
          --accent-line: rgba(16,185,129,0.22);
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #080A09;
          color: var(--ink-2);
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: clip;
        }

        .rsm-amb { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .rsm-amb i { position: absolute; border-radius: 50%; filter: blur(110px); display: block; }
        .rsm-amb i:nth-child(1) { width: 560px; height: 560px; background: radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%); top: -200px; right: -160px; }
        .rsm-amb i:nth-child(2) { width: 440px; height: 440px; background: radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%); bottom: -120px; left: -160px; }

        .rsm-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(8,10,9,0.82);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--line);
          padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
        }
        .rsm-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; color: var(--ink); text-decoration: none; }
        .rsm-back { font-size: 13px; font-weight: 600; color: var(--ink-3); text-decoration: none; display: flex; align-items: center; gap: 5px; transition: color .2s; }
        .rsm-back:hover { color: var(--accent); }

        .rsm-wrap {
          position: relative; z-index: 1; max-width: 1240px; margin: 0 auto;
          padding: 34px 24px 60px; display: grid; grid-template-columns: 326px 1fr; gap: 26px; align-items: start;
        }

        .rsm-side { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 26px 24px 28px; position: sticky; top: 92px; text-align: center; }

        .rsm-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-3); }

        .rsm-photo { width: 170px; height: 170px; border-radius: 22px; margin: 0 auto 18px; overflow: hidden; position: relative; border: 1px solid var(--line); box-shadow: 0 16px 44px rgba(0,0,0,.5); }
        .rsm-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rsm-photo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 55%, rgba(8,10,9,.5) 100%); }

        .rsm-name { font-size: 26px; font-weight: 800; letter-spacing: -.035em; color: var(--ink); line-height: 1.15; margin-bottom: 12px; }
        .rsm-headline { font-size: 12.5px; line-height: 1.7; color: var(--ink-2); margin-bottom: 22px; }
        .rsm-headline i { color: var(--accent); font-style: normal; opacity: .55; margin: 0 3px; }

        .rsm-facts { display: flex; flex-direction: column; gap: 2px; text-align: left; margin-bottom: 20px; }
        .rsm-fact { display: flex; align-items: center; gap: 13px; padding: 11px 4px; border-bottom: 1px solid var(--line-soft); color: inherit; text-decoration: none; }
        .rsm-facts .rsm-fact:last-child { border-bottom: none; }
        .rsm-fact .ic { width: 34px; height: 34px; flex: 0 0 34px; border-radius: 10px; background: var(--accent-wash); border: 1px solid var(--accent-line); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .rsm-fact .ic svg { width: 15px; height: 15px; }
        .rsm-fact .txt { min-width: 0; }
        .rsm-fact .val { display: block; font-size: 13.5px; font-weight: 600; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        a.rsm-fact:hover .val { color: var(--accent); }

        .rsm-socials { display: flex; gap: 9px; justify-content: center; }
        .rsm-soc { width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,.035); border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--ink-2); transition: color .18s, border-color .18s, transform .18s; }
        .rsm-soc svg { width: 16px; height: 16px; }
        .rsm-soc:hover { color: var(--accent); border-color: var(--accent-line); transform: translateY(-2px); }

        .rsm-main { display: flex; flex-direction: column; gap: 22px; min-width: 0; }

        .rsm-tabs { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 9px; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
        .rsm-tabs::-webkit-scrollbar { display: none; }
        .rsm-tabs button { font: inherit; font-size: 14.5px; font-weight: 600; color: var(--ink-3); background: none; border: 0; cursor: pointer; padding: 11px 20px; border-radius: 11px; white-space: nowrap; transition: color .18s, background .18s; }
        .rsm-tabs button:hover { color: var(--ink-2); }
        .rsm-tabs button[aria-selected="true"] { color: var(--accent); background: var(--accent-wash); }
        .rsm-tabs button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .rsm-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 38px 40px 42px; position: relative; overflow: hidden; }
        .rsm-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 190px; pointer-events: none; background: radial-gradient(ellipse 60% 100% at 62% 0%, rgba(16,185,129,.11), transparent 70%); }

        .rsm-ph { position: relative; margin-bottom: 30px; }
        .rsm-ph h2 { font-size: 31px; font-weight: 800; letter-spacing: -.04em; color: var(--ink); line-height: 1.1; }
        .rsm-rule { width: 66px; height: 3px; border-radius: 2px; background: var(--accent); margin-top: 13px; }
        .rsm-ph p { font-size: 14.5px; color: var(--ink-3); margin-top: 12px; max-width: 62ch; }

        .rsm-prose p { font-size: 15.5px; line-height: 1.78; margin-bottom: 14px; max-width: 68ch; }
        .rsm-prose p:last-child { margin-bottom: 0; }
        .rsm-prose strong { color: var(--ink); font-weight: 600; }

        .rsm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 26px 0 4px; }
        .rsm-stat { background: var(--panel-2); border: 1px solid var(--line); border-radius: 13px; padding: 16px 18px; }
        .rsm-stat b { display: block; font-size: 23px; font-weight: 800; color: var(--accent); letter-spacing: -.03em; font-variant-numeric: tabular-nums; margin-bottom: 2px; }
        .rsm-stat span { font-size: 11.5px; color: var(--ink-3); line-height: 1.4; display: block; }

        .rsm-job { position: relative; padding-left: 30px; padding-bottom: 30px; }
        .rsm-job:last-child { padding-bottom: 0; }
        .rsm-job::before { content: ''; position: absolute; left: 0; top: 20px; width: 11px; height: 11px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px rgba(16,185,129,.14); }
        .rsm-job::after { content: ''; position: absolute; left: 5px; top: 35px; bottom: 0; width: 1px; background: var(--line); }
        .rsm-job:last-child::after { display: none; }
        .rsm-jobhead { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 12px; }
        .rsm-jobhead .meta { min-width: 0; }
        .rsm-job h3 { font-size: 17px; font-weight: 800; color: var(--ink); letter-spacing: -.015em; line-height: 1.35; }
        .rsm-org { font-size: 14.5px; font-weight: 700; color: var(--accent); margin-top: 2px; }
        .rsm-when { margin-top: 5px; }
        .rsm-job ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .rsm-job li { font-size: 14.5px; line-height: 1.7; padding-left: 17px; position: relative; max-width: 70ch; }
        .rsm-job li::before { content: ''; position: absolute; left: 0; top: 10px; width: 5px; height: 5px; border-radius: 50%; background: var(--ink-3); }

        .rsm-tile { width: 46px; height: 46px; flex: 0 0 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; letter-spacing: -.02em; color: #fff; overflow: hidden; }
        .rsm-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rsm-tile.titan { background: linear-gradient(150deg, #3A0C0C, #E01B24); box-shadow: 0 6px 18px rgba(224,27,36,.24); }
        .rsm-tile.alpha { background: linear-gradient(150deg, #071B3F, #1E5BD6); box-shadow: 0 6px 18px rgba(30,91,214,.24); }

        .rsm-grp { margin-bottom: 26px; }
        .rsm-grp:last-child { margin-bottom: 0; }
        .rsm-grp .rsm-mono { display: block; margin-bottom: 12px; }
        .rsm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .rsm-chip { font-size: 13px; font-weight: 600; color: var(--ink-2); background: rgba(255,255,255,.035); border: 1px solid var(--line); border-radius: 999px; padding: 7px 15px; }
        .rsm-chip.on { color: #B7EFD9; background: var(--accent-wash); border-color: var(--accent-line); }

        .rsm-certs { display: flex; flex-direction: column; gap: 10px; }
        .rsm-cert { display: flex; gap: 13px; align-items: flex-start; background: var(--panel-2); border: 1px solid var(--line); border-radius: 12px; padding: 15px 17px; }
        .rsm-cert .ic { width: 30px; height: 30px; flex: 0 0 30px; border-radius: 9px; background: var(--accent-wash); border: 1px solid var(--accent-line); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .rsm-cert .ic svg { width: 14px; height: 14px; }
        .rsm-cert b { display: block; font-size: 14.5px; font-weight: 600; color: var(--ink); line-height: 1.45; }
        .rsm-cert span { font-size: 12.5px; color: var(--ink-3); }

        .rsm-two { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .rsm-block { background: var(--panel-2); border: 1px solid var(--line); border-radius: 14px; padding: 24px 26px; }
        .rsm-block h3 { font-size: 16.5px; font-weight: 800; color: var(--ink); letter-spacing: -.015em; margin: 6px 0 3px; }
        .rsm-block .sub { font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 9px; }
        .rsm-block p { font-size: 14.5px; line-height: 1.7; }

        .rsm-eduhead { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 10px; }
        .rsm-crest { width: 52px; height: 52px; flex: 0 0 52px; border-radius: 12px; background: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--line); font-size: 11px; font-weight: 800; color: #1a2f6b; text-align: center; line-height: 1.15; }
        .rsm-crest img { width: 100%; height: 100%; object-fit: contain; display: block; }

        .rsm-rows { display: flex; flex-direction: column; margin-top: 10px; }
        .rsm-row { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; padding: 11px 0; border-bottom: 1px solid var(--line-soft); font-size: 14.5px; }
        .rsm-row:last-child { border-bottom: none; }
        .rsm-row b { color: var(--ink); font-weight: 600; }
        .rsm-row span { color: var(--ink-3); font-size: 13px; }

        .rsm-cta { margin-top: 30px; background: var(--accent-wash); border: 1px solid var(--accent-line); border-radius: 15px; padding: 30px; text-align: center; }
        .rsm-cta h3 { font-size: 19px; font-weight: 800; color: var(--ink); letter-spacing: -.02em; margin-bottom: 7px; }
        .rsm-cta p { font-size: 14.5px; color: var(--ink-3); max-width: 48ch; margin: 0 auto 20px; }

        .rsm-btns { display: flex; gap: 11px; justify-content: center; flex-wrap: wrap; }
        .rsm-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 14.5px; font-weight: 700; text-decoration: none; padding: 12px 22px; border-radius: 11px; transition: transform .18s, box-shadow .18s, color .18s, border-color .18s; }
        .rsm-btn-a { background: linear-gradient(135deg, var(--accent-deep), var(--accent)); color: #04120D; box-shadow: 0 5px 22px rgba(16,185,129,.3); }
        .rsm-btn-a:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(16,185,129,.4); }
        .rsm-btn-b { background: rgba(255,255,255,.04); color: var(--ink-2); border: 1px solid var(--line); }
        .rsm-btn-b:hover { color: var(--ink); border-color: rgba(255,255,255,.18); }
        .rsm-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        @media (max-width: 940px) {
          .rsm-wrap { grid-template-columns: 1fr; padding-top: 24px; }
          .rsm-side { position: static; }
          .rsm-two { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .rsm-wrap { padding: 20px 15px 44px; gap: 18px; }
          .rsm-panel { padding: 26px 20px 30px; }
          .rsm-ph h2 { font-size: 25px; }
          .rsm-stats { grid-template-columns: 1fr; }
          .rsm-side { padding: 24px 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rsm *, .rsm *::before, .rsm *::after { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div className="rsm">
        <div className="rsm-amb" aria-hidden="true"><i /><i /></div>

        <header className="rsm-nav">
          <a href="/" className="rsm-logo" aria-label="Koushik Ranjit Home">KOUSHIK RANJIT</a>
          <a href="/" className="rsm-back" aria-label="Back to Home">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 4l-4 4 4 4" /></svg>
            Home
          </a>
        </header>

        <div className="rsm-wrap">
          {/* ───── sidebar ───── */}
          <aside className="rsm-side">
            <div className="rsm-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.portrait} alt="Portrait of Koushik Ranjit" />
            </div>
            <h1 className="rsm-name">Koushik Ranjit</h1>
            <p className="rsm-headline">
              {HEADLINE.map((part, i) => (
                <span key={part}>
                  {i > 0 && <i>|</i>}
                  {part}
                </span>
              ))}
            </p>

            <div className="rsm-facts">
              <a className="rsm-fact" href="mailto:koushikranjit8@gmail.com">
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></span>
                <span className="txt"><span className="rsm-mono">Email</span><span className="val">koushikranjit8@gmail.com</span></span>
              </a>
              <a className="rsm-fact" href="tel:+919564659426">
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></span>
                <span className="txt"><span className="rsm-mono">Phone</span><span className="val">+91 95646 59426</span></span>
              </a>
              <a className="rsm-fact" href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer">
                <span className="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z" /></svg></span>
                <span className="txt"><span className="rsm-mono">LinkedIn</span><span className="val">koushik-ranjit</span></span>
              </a>
              <div className="rsm-fact">
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></span>
                <span className="txt"><span className="rsm-mono">Location</span><span className="val">Kolkata, India</span></span>
              </div>
            </div>

            <div className="rsm-socials">
              <a className="rsm-soc" href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>
              </a>
              <a className="rsm-soc" href="https://discord.gg/sffdu4wXx2" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" /></svg>
              </a>
              <a className="rsm-soc" href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a className="rsm-soc" href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
              </a>
            </div>
          </aside>

          {/* ───── main ───── */}
          <div className="rsm-main">
            <nav className="rsm-tabs" role="tablist" aria-label="Profile sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-controls={`panel-${t.id}`}
                  aria-selected={active === t.id}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* ABOUT */}
            {active === 'about' && (
              <section className="rsm-panel" role="tabpanel" id="panel-about" aria-labelledby="tab-about">
                <div className="rsm-ph"><h2>About</h2><div className="rsm-rule" /></div>
                <div className="rsm-prose">
                  <p>I&rsquo;m a <strong>Client Support &amp; Discord Moderator</strong> with hands-on experience in proprietary trading environments, specializing in trader support, account investigation, and operational support.</p>
                  <p>My role combines client-facing support with backend account investigation. I manage trader enquiries across Discord and support ticketing channels, assist with account-related concerns, and provide accurate, professional, and solution-focused support.</p>
                  <p>I have hands-on experience using <strong>Axcera</strong> and <strong>MT5 Manager</strong> to investigate and resolve a wide range of trader account and trading-related concerns. I analyze account information, trading activity, rule-related issues, and relevant account history to determine what happened, and provide clear explanations and appropriate resolutions to traders.</p>
                  <p>My operational experience includes account verification, payout-related support, trading-rule guidance, platform assistance, troubleshooting, and case resolution across <strong>MT5, cTrader, and TradeLocker</strong>. I also work with Risk, Compliance, and Operations teams when cases require further review or escalation.</p>
                  <p>As an active CFD and futures trader, I have practical knowledge of trading environments and understand the challenges traders face — so I can support them from an informed perspective rather than a scripted one.</p>
                </div>
                <div className="rsm-stats">
                  {stats.map((s) => (
                    <div className="rsm-stat" key={s.label}>
                      <b>{s.value}</b><span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            {active === 'experience' && (
              <section className="rsm-panel" role="tabpanel" id="panel-experience" aria-labelledby="tab-experience">
                <div className="rsm-ph">
                  <h2>Experience</h2><div className="rsm-rule" />
                  <p>Client support and account operations across proprietary trading firms.</p>
                </div>
                {experience.map((job) => (
                  <article className="rsm-job" key={job.company}>
                    <div className="rsm-jobhead">
                      <span className={`rsm-tile ${job.brand}`} aria-hidden="true">
                        {job.logo
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={job.logo} alt="" />
                          : job.mark}
                      </span>
                      <div className="meta">
                        <h3>{job.role}</h3>
                        <div className="rsm-org">{job.company}</div>
                        <div className="rsm-when rsm-mono">{job.period}</div>
                      </div>
                    </div>
                    <ul>
                      {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </article>
                ))}
              </section>
            )}

            {/* SKILLS */}
            {active === 'skills' && (
              <section className="rsm-panel" role="tabpanel" id="panel-skills" aria-labelledby="tab-skills">
                <div className="rsm-ph">
                  <h2>Skills</h2><div className="rsm-rule" />
                  <p>Grouped by where they apply day to day.</p>
                </div>
                {skillGroups.map((g) => (
                  <div className="rsm-grp" key={g.label}>
                    <span className="rsm-mono">{g.label}</span>
                    <div className="rsm-chips">
                      {g.items.map((s) => (
                        <span className={`rsm-chip${g.accent ? ' on' : ''}`} key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="rsm-grp">
                  <span className="rsm-mono">Certifications &amp; Licenses</span>
                  <div className="rsm-certs">
                    {certifications.map((c) => (
                      <div className="rsm-cert" key={c.name}>
                        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg></span>
                        <div><b>{c.name}</b><span>{c.by}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {active === 'education' && (
              <section className="rsm-panel" role="tabpanel" id="panel-education" aria-labelledby="tab-education">
                <div className="rsm-ph"><h2>Education</h2><div className="rsm-rule" /></div>
                <div className="rsm-two">
                  <div className="rsm-block">
                    <div className="rsm-eduhead">
                      <span className="rsm-crest" aria-hidden="true">
                        {IMG.wbsu
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={IMG.wbsu} alt="" />
                          : 'WBSU'}
                      </span>
                      <div className="meta">
                        <span className="rsm-mono">2019 — 2022</span>
                        <h3 style={{ marginTop: '4px' }}>West Bengal State University</h3>
                      </div>
                    </div>
                    <div className="sub">B.Sc Honours Mathematics · 73.70%</div>
                    <p>Taki Government College, Taki, West Bengal. Deepened understanding of mathematical principles, acquired analytical skills applicable across domains, and engaged in rigorous coursework that fostered critical thinking.</p>
                  </div>
                  <div className="rsm-block">
                    <span className="rsm-mono">Languages</span>
                    <div className="rsm-rows">
                      {languages.map((l) => (
                        <div className="rsm-row" key={l.name}>
                          <b>{l.name}</b><span>{l.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* CONTACT */}
            {active === 'contact' && (
              <section className="rsm-panel" role="tabpanel" id="panel-contact" aria-labelledby="tab-contact">
                <div className="rsm-ph">
                  <h2>Contact</h2><div className="rsm-rule" />
                  <p>Open to roles in Client Support, Trading Operations, Account Operations, and risk-related support functions at prop firms and forex brokers.</p>
                </div>
                <div className="rsm-two">
                  <a className="rsm-block" href="mailto:koushikranjit8@gmail.com" style={{ textDecoration: 'none', display: 'block' }}>
                    <span className="rsm-mono">Email</span>
                    <h3 style={{ marginTop: '8px' }}>koushikranjit8@gmail.com</h3>
                    <p style={{ marginTop: '4px' }}>Best for opportunities and enquiries</p>
                  </a>
                  <a className="rsm-block" href="tel:+919564659426" style={{ textDecoration: 'none', display: 'block' }}>
                    <span className="rsm-mono">Phone</span>
                    <h3 style={{ marginTop: '8px' }}>+91 95646 59426</h3>
                    <p style={{ marginTop: '4px' }}>Kolkata, India · IST</p>
                  </a>
                </div>
                <div className="rsm-cta">
                  <h3>Let&rsquo;s work together</h3>
                  <p>Grab the full résumé as a PDF, or reach out directly — I reply to every genuine enquiry.</p>
                  <div className="rsm-btns">
                    <a className="rsm-btn rsm-btn-a" href="/downloads/koushik-ranjit-resume.pdf" download><DownloadIcon />Download Résumé</a>
                    <a className="rsm-btn rsm-btn-b" href="mailto:koushikranjit8@gmail.com">Email Me</a>
                    <a className="rsm-btn rsm-btn-b" href="https://www.linkedin.com/in/koushik-ranjit-011957188/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

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
    </>
  );
}

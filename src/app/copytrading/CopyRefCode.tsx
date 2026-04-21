'use client';
import { useState } from 'react';

export default function CopyRefCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="ref-box" aria-label="Vantage referral code">
      <div className="ref-left">
        <div>
          <p className="ref-label">Referral Code</p>
          <p className="ref-code">{code}</p>
        </div>
      </div>
      <button
        className={`copy-btn${copied ? ' copied' : ''}`}
        aria-label="Copy referral code"
        type="button"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="2 6 5 9 10 3"/>
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy Code
          </>
        )}
      </button>
    </div>
  );
}

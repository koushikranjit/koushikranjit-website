import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KR Trades — Live Nasdaq Futures Trading | Koushik Ranjit',
  description: 'Learn live Nasdaq futures trading with Koushik Ranjit. Master disciplined, rule-based day trading strategies. Limited seats available.',
  openGraph: {
    title: 'KR Trades — Live Nasdaq Futures Trading',
    description: 'Master Nasdaq futures trading with disciplined, rule-based strategies. Learn from a professional day trader.',
    url: 'https://koushikranjit.in/KRtrades',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KR Trades — Live Nasdaq Futures Trading',
    description: 'Master Nasdaq futures trading with disciplined, rule-based strategies.',
  },
}

export default function KRTradesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

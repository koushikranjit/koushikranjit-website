'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  TrendingUp, Users, Shield, ChevronRight, CheckCircle2,
  BarChart3, Target, Zap, MapPin, Calendar, Clock, Ticket,
  ArrowRight, Star, HandshakeIcon, GlobeIcon
} from 'lucide-react'

// ── Config ──────────────────────────────────────────────────────────────
const EVENT_DATE = new Date('2026-05-24T10:00:00+05:30')
const TICKET_SALE_DATE = new Date('2026-05-17T00:00:00+05:30') // 7 days before
const EVENT_VENUE = 'Kolkata, West Bengal'
const EVENT_VENUE_DETAIL = 'Science City Auditorium, JBS Haldane Avenue, Kolkata 700046'

// ── Phase logic ─────────────────────────────────────────────────────────
type Phase = 'warmup' | 'tickets' | 'past'

function getPhase(): Phase {
  const now = new Date()
  if (now >= EVENT_DATE) return 'past'
  if (now >= TICKET_SALE_DATE) return 'tickets'
  return 'warmup'
}

// ── Countdown hook ──────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function calcTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  }
}

// ── Team members ────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'Koushik Ranjit',
    role: 'Organizer & Nasdaq Futures Trader',
    image: 'https://github.com/koushikranjit/KR-Website/blob/851c87d89048a11631e7fa1bfe6b57db03bb9e15/KR%20IMAGE.jpg.JPG?raw=true',
  },
  {
    name: 'Speaker TBA',
    role: 'Options Strategist',
    image: null,
  },
  {
    name: 'Speaker TBA',
    role: 'Swing Trading Expert',
    image: null,
  },
  {
    name: 'Speaker TBA',
    role: 'Institutional Trader',
    image: null,
  },
]

// ── Partners ────────────────────────────────────────────────────────────
const PARTNERS = [
  { name: 'MyTradesBooks', url: 'https://mytradebook.vercel.app' },
]

// ── Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState<Phase>('warmup')

  useEffect(() => {
    setPhase(getPhase())
    const id = setInterval(() => setPhase(getPhase()), 60_000)
    return () => clearInterval(id)
  }, [])

  const countdownTarget = phase === 'warmup' ? TICKET_SALE_DATE : EVENT_DATE
  const countdown = useCountdown(countdownTarget)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Replace with your API endpoint (e.g. Supabase, Google Sheets, etc.)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative lg:min-h-screen flex items-center">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#22c55e" />
        <Spotlight className="top-20 right-0 md:right-60" fill="#16a34a" />

        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* ── Left: Content + Form ── */}
            <div className="flex-1 w-full max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                {phase === 'warmup' ? (
                  <><Zap className="w-3.5 h-3.5" /> Early Registration Open</>
                ) : phase === 'tickets' ? (
                  <><Ticket className="w-3.5 h-3.5" /> Tickets Now on Sale!</>
                ) : (
                  <><CheckCircle2 className="w-3.5 h-3.5" /> Event Completed</>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Kolkata
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">
                  Trader Meetup
                </span>
              </h1>

              <p className="mt-4 text-neutral-400 text-lg leading-relaxed max-w-md">
                The biggest trader networking event in Eastern India.
                Connect with professionals, learn battle-tested strategies,
                and level up your trading game.
              </p>

              {/* Event quick info */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {EVENT_DATE.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {EVENT_VENUE}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  10:00 AM IST
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex gap-6 mt-6 mb-8">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">500+</p>
                  <p className="text-xs text-neutral-500">Expected Traders</p>
                </div>
                <div className="w-px bg-neutral-800" />
                <div>
                  <p className="text-2xl font-bold text-emerald-400">10+</p>
                  <p className="text-xs text-neutral-500">Expert Speakers</p>
                </div>
                <div className="w-px bg-neutral-800" />
                <div>
                  <p className="text-2xl font-bold text-emerald-400">1 Day</p>
                  <p className="text-xs text-neutral-500">Full Program</p>
                </div>
              </div>

              {/* ── Registration / Ticket Card ── */}
              <Card className="border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-emerald-500/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">
                    {submitted
                      ? "You're In!"
                      : phase === 'warmup'
                        ? 'Register Your Interest'
                        : phase === 'tickets'
                          ? 'Get Your Ticket'
                          : 'Event Has Ended'}
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    {submitted
                      ? "We'll notify you when tickets go live."
                      : phase === 'warmup'
                        ? 'Be the first to know when tickets drop.'
                        : phase === 'tickets'
                          ? 'Secure your seat before they sell out.'
                          : 'Thanks to everyone who attended!'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center py-6 gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium">Registration Complete!</p>
                        <p className="text-neutral-400 text-sm mt-1">
                          Check your email for confirmation & updates.
                        </p>
                      </div>
                    </div>
                  ) : phase === 'past' ? (
                    <div className="flex flex-col items-center py-6 gap-4">
                      <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-neutral-500" />
                      </div>
                      <p className="text-neutral-400 text-sm text-center">
                        This event has concluded. Follow us for future events.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-neutral-300">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-neutral-300">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                      </div>

                      {/* Ticket tier selector (only in ticket phase) */}
                      {phase === 'tickets' && (
                        <div className="space-y-2">
                          <Label className="text-neutral-300">Select Ticket</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <button type="button" className="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-500/10 text-left transition-all">
                              <p className="text-white font-semibold text-sm">General</p>
                              <p className="text-emerald-400 font-bold">&#8377;499</p>
                            </button>
                            <button type="button" className="p-3 rounded-lg border border-neutral-700 bg-neutral-900/50 text-left hover:border-emerald-500/50 transition-all">
                              <p className="text-white font-semibold text-sm">VIP</p>
                              <p className="text-emerald-400 font-bold">&#8377;1,499</p>
                            </button>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:from-emerald-400 hover:to-yellow-400 transition-all duration-300 h-11 cursor-pointer"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            {phase === 'tickets' ? 'Processing...' : 'Registering...'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {phase === 'tickets' ? 'Buy Ticket' : 'Register Now'}
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                      <p className="text-xs text-neutral-600 text-center">
                        {phase === 'warmup'
                          ? "We'll email you when tickets go live. No spam."
                          : 'Secure checkout. Instant confirmation.'}
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── Right: Countdown + Visual ── */}
            <div className="flex-1 relative w-full min-h-[300px] lg:min-h-[600px] flex flex-col items-center justify-center gap-8">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />

              {/* Countdown */}
              {phase !== 'past' && (
                <div className="relative z-20 w-full max-w-md">
                  <p className="text-center text-sm text-neutral-500 mb-3 uppercase tracking-widest">
                    {phase === 'warmup' ? 'Tickets drop in' : 'Event starts in'}
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Mins' },
                      { val: countdown.seconds, label: 'Secs' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col items-center p-3 rounded-xl border border-emerald-500/20 bg-neutral-950/80 backdrop-blur-sm">
                        <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-neutral-500 mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Candlestick Chart Visual */}
              <div className="relative z-0 w-full max-w-lg">
                <div className="relative p-6 rounded-2xl border border-emerald-500/20 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-emerald-500/10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white font-semibold text-lg">NIFTY 50</p>
                      <p className="text-emerald-400 text-sm font-medium">+2.34% Today</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-2xl">24,857.30</p>
                      <p className="text-emerald-400 text-sm">+568.50</p>
                    </div>
                  </div>

                  {/* Candlesticks */}
                  <div className="flex items-end gap-1.5 h-48 mb-6">
                    {[
                      { h: 60, body: 20, green: true }, { h: 75, body: 30, green: false },
                      { h: 50, body: 15, green: true }, { h: 85, body: 25, green: true },
                      { h: 40, body: 18, green: false }, { h: 70, body: 22, green: true },
                      { h: 55, body: 28, green: false }, { h: 90, body: 35, green: true },
                      { h: 65, body: 20, green: true }, { h: 45, body: 15, green: false },
                      { h: 80, body: 30, green: true }, { h: 95, body: 40, green: true },
                      { h: 60, body: 18, green: false }, { h: 75, body: 25, green: true },
                      { h: 100, body: 35, green: true }, { h: 70, body: 20, green: true },
                      { h: 50, body: 22, green: false }, { h: 85, body: 28, green: true },
                      { h: 110, body: 40, green: true }, { h: 90, body: 30, green: true },
                    ].map((candle, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end">
                        <div className={`w-px ${candle.green ? 'bg-emerald-500/60' : 'bg-red-500/60'}`} style={{ height: `${(candle.h - candle.body) / 2}px` }} />
                        <div className={`w-full rounded-sm ${candle.green ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ height: `${candle.body}px` }} />
                        <div className={`w-px ${candle.green ? 'bg-emerald-500/60' : 'bg-red-500/60'}`} style={{ height: `${(candle.h - candle.body) / 2}px` }} />
                      </div>
                    ))}
                  </div>

                  {/* Volume */}
                  <div className="flex items-end gap-1.5 h-12 mb-4">
                    {[30, 50, 25, 60, 20, 45, 35, 70, 40, 22, 55, 80, 30, 50, 90, 45, 28, 60, 95, 65].map((v, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-emerald-500/20" style={{ height: `${(v / 95) * 100}%` }} />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
                    <div><p className="text-neutral-500 text-xs">Volume</p><p className="text-white text-sm font-medium">12.8M</p></div>
                    <div><p className="text-neutral-500 text-xs">High</p><p className="text-emerald-400 text-sm font-medium">24,920</p></div>
                    <div><p className="text-neutral-500 text-xs">Low</p><p className="text-red-400 text-sm font-medium">24,650</p></div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-emerald-500/30 bg-neutral-950/90 backdrop-blur-sm shadow-lg animate-pulse">
                  <p className="text-emerald-400 text-xs font-medium">BUY NIFTY</p>
                  <p className="text-white text-sm font-bold">+&#8377;12,450</p>
                </div>
                <div className="absolute -bottom-3 -left-2 md:-bottom-4 md:-left-4 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-emerald-500/30 bg-neutral-950/90 backdrop-blur-sm shadow-lg">
                  <p className="text-emerald-400 text-xs font-medium">Win Rate</p>
                  <p className="text-white text-sm font-bold">87.5%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ EVENT DETAILS ═══════════════════ */}
      <section className="relative py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Event Details
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              A full day of trading insights, networking, and community building in the heart of Kolkata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <MapPin className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Venue</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{EVENT_VENUE_DETAIL}</p>
              </CardContent>
            </Card>

            <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Calendar className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Date & Time</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {EVENT_DATE.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  <br />10:00 AM &ndash; 6:00 PM IST
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Users className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Networking</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Meet 500+ traders, share strategies, and build lasting connections in the trading community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════ AGENDA / FEATURES ═══════════════════ */}
      <section className="relative py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              What to Expect
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              A packed day of value — from market analysis to hands-on strategy sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Live Market Analysis', description: 'Real-time chart breakdowns with expert commentary on current market conditions.' },
              { icon: Target, title: 'Proven Strategies', description: 'Entry/exit frameworks and risk management techniques used by professional traders.' },
              { icon: HandshakeIcon, title: 'Network & Connect', description: 'Dedicated networking sessions to build relationships with like-minded traders.' },
              { icon: Shield, title: 'Risk Management', description: 'Master capital preservation, position sizing, and portfolio management.' },
            ].map((feature, i) => (
              <Card key={i} className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ KEY MEMBERS / SPEAKERS ═══════════════════ */}
      <section className="relative py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Faces of the Meetup
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              Learn from traders who walk the talk. More speakers to be announced soon.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-emerald-500/50 transition-colors mb-4 bg-neutral-900 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="w-10 h-10 text-neutral-700" />
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">{member.name}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="relative py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              What Traders Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul S.', role: 'Futures Trader', quote: 'The strategies I learned in one meeting were worth more than months of self-study. Absolutely game-changing.' },
              { name: 'Priya M.', role: 'Options Trader', quote: "The community and mentorship here is unmatched. I've finally found consistency in my trading." },
              { name: 'Amit K.', role: 'Swing Trader', quote: 'From struggling to profitable in 3 months. The risk management framework alone is worth it.' },
            ].map((testimonial, i) => (
              <Card key={i} className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-neutral-500 text-xs">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative py-24 border-t border-neutral-900">
        <Spotlight className="-top-40 left-1/2 -translate-x-1/2" fill="#22c55e" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            Don&apos;t Miss Out
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            Your Trading Journey Starts Here
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Seats are limited. Register now and take the first step toward
            becoming a consistently profitable trader.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:from-emerald-400 hover:to-yellow-400 px-8 h-12 text-base cursor-pointer"
          >
            {phase === 'tickets' ? 'Get Your Ticket' : 'Register Now'}
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* ═══════════════════ PARTNERS ═══════════════════ */}
      <section className="relative py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-600 uppercase tracking-widest mb-8">
            Our Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-neutral-800 bg-neutral-950/50 hover:border-emerald-500/30 transition-all duration-300"
              >
                <GlobeIcon className="w-6 h-6 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                <span className="text-lg font-semibold text-neutral-400 group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm">
            &copy; {new Date().getFullYear()} Kolkata Trader Meetup. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

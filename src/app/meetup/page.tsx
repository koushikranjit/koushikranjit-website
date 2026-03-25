'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Users, ChevronRight, CheckCircle2, MapPin, Calendar,
  Ticket, Lock, Star, AlertTriangle
} from 'lucide-react'

// ── Config ──────────────────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL = '' // TODO: Add your Google Apps Script Web App URL

// ── Component ───────────────────────────────────────────────────────────
export default function MeetupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            timestamp: new Date().toISOString(),
          }),
        })
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">

      {/* ── Background effects ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* ── Floating orbs ── */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/3 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

      {/* ═══════════════════ NAV ═══════════════════ */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="https://koushikranjit.in" className="text-white font-bold text-lg tracking-tight">
            K<span className="text-emerald-400">R</span>
          </a>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Kolkata, India
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Registrations Open &mdash; Limited Seats
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Kolkata&apos;s Biggest
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">
            Traders&apos; Meetup
          </span>
        </h1>

        <p className="mt-6 text-center text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          An exclusive, invite-only gathering for serious traders.
          Connect with top professionals, share strategies, and build
          your trading network &mdash; all in one room.
        </p>

        {/* Quick info pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Coming Soon &mdash; Kolkata
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300">
            <Ticket className="w-4 h-4 text-emerald-400" />
            Ticketed Event
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300">
            <Lock className="w-4 h-4 text-emerald-400" />
            By Selection Only
          </span>
        </div>
      </section>

      {/* ═══════════════════ KEY HIGHLIGHTS ═══════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Limited Seats',
              desc: 'Only a select few will be chosen. Not everyone who registers will get in.',
            },
            {
              icon: <Ticket className="w-6 h-6" />,
              title: 'Ticketed Entry',
              desc: 'Tickets will be available for purchase once the final announcement is made.',
            },
            {
              icon: <Star className="w-6 h-6" />,
              title: 'Exclusive Access',
              desc: 'Network with professional traders, fund managers, and market experts in person.',
            },
          ].map((item) => (
            <div key={item.title} className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ REGISTRATION FORM ═══════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-lg mx-auto">

          {/* Section heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Register Your Interest
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Fill in your details to express interest. Selected registrants will be
              notified with ticket purchase details once the final announcement is made.
            </p>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-300 font-medium">Seats are extremely limited</p>
              <p className="text-amber-200/60 mt-1">
                Registration does not guarantee a spot. Only selected individuals
                will receive a confirmation and ticket purchase link.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl shadow-emerald-500/5">
            {submitted ? (
              <div className="flex flex-col items-center py-8 gap-5">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center animate-[scale-in_0.3s_ease-out]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="text-center">
                  <p className="text-white text-xl font-semibold">You&apos;re on the List!</p>
                  <p className="text-neutral-400 text-sm mt-2 max-w-xs mx-auto">
                    We&apos;ve received your details. If selected, you&apos;ll be notified
                    with the ticket purchase link via email.
                  </p>
                </div>
                <div className="w-full h-px bg-white/5 my-2" />
                <p className="text-neutral-600 text-xs text-center">
                  Follow{' '}
                  <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    @koushik_ranjit
                  </a>{' '}
                  for updates
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-300 text-sm">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300 text-sm">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-neutral-300 text-sm">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-neutral-300 text-sm">Your City / Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Kolkata, Mumbai, Delhi"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:from-emerald-400 hover:to-green-300 transition-all duration-300 h-12 rounded-xl text-base cursor-pointer shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Register Your Interest
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                <p className="text-xs text-neutral-600 text-center">
                  Your details are safe with us. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Register', desc: 'Fill out the interest form with your details' },
            { step: '02', title: 'Selection', desc: 'Our team reviews and selects attendees' },
            { step: '03', title: 'Announcement', desc: 'Selected individuals get notified via email' },
            { step: '04', title: 'Buy Ticket', desc: 'Purchase your ticket through the link provided' },
          ].map((item) => (
            <div key={item.step} className="relative text-center p-6">
              <div className="text-5xl font-black text-emerald-500/10 mb-3">{item.step}</div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-neutral-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href="https://koushikranjit.in" className="text-white font-bold">
                K<span className="text-emerald-400">R</span>
              </a>
              <span className="text-neutral-600 text-sm">&copy; 2026 Koushik Ranjit</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="https://www.instagram.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Instagram</a>
              <a href="https://x.com/koushik_ranjit" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">X / Twitter</a>
              <a href="https://discord.gg/jxuDkpUr5X" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  QrCode,
  Calendar,
  Users,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-white">
      {/* Subtle grid pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient gradient aura */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-b from-brand-100/60 to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-xs backdrop-blur-xs mb-8 hover:bg-brand-100/80 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span>Purpose-Built for Indian Tuition Centres &amp; Coaching Academies</span>
          <span className="text-brand-300">|</span>
          <span className="font-bold text-brand-800">Bengaluru Pilot</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-surface-950 sm:text-6xl md:text-7xl leading-[1.08] font-sans">
          Admissions,{' '}
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-sky-600 bg-clip-text text-transparent">
            organised.
          </span>
        </h1>

        {/* Lead Narrative */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-surface-600 leading-relaxed font-normal">
          Stop losing prospective students in chaotic WhatsApp chats, paper notebooks, and spreadsheets.
          EnrolmentDesk gives your coaching centre a single, clear workspace to manage parent enquiries,
          schedule trial classes, and convert admissions.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-700 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Interactive Demo</span>
            <ArrowRight className="h-4 w-4 opacity-75" />
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-300 bg-white px-6 py-3.5 text-sm font-semibold text-surface-700 shadow-xs hover:bg-surface-50 hover:text-surface-900 active:scale-[0.99] transition-all"
          >
            <span>Explore Modules</span>
          </Link>
        </div>

        {/* Trust & Spec Micro-features */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-surface-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Zero software installation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Official WhatsApp Click-to-Chat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Printable Reception QR Standee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            <span>India DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}

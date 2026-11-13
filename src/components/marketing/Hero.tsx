'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-32 bg-white dark:bg-[#070b14] transition-colors">
      {/* Subtle grid pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient gradient aura inspired by 21st.dev */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-brand-200/50 dark:from-brand-600/15 via-brand-100/30 dark:via-indigo-900/10 to-transparent blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 dark:border-brand-500/30 bg-brand-50/80 dark:bg-brand-950/50 px-4 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 shadow-xs backdrop-blur-md mb-8 hover:bg-brand-100/80 dark:hover:bg-brand-900/50 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span>Purpose-Built for Indian Tuition Centres &amp; Coaching Academies</span>
          <span className="text-brand-300 dark:text-brand-700">|</span>
          <span className="font-bold text-brand-800 dark:text-brand-200">Bengaluru Pilot</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-surface-950 dark:text-white sm:text-6xl md:text-7xl leading-[1.08] font-sans">
          Admissions,{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-sky-500 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent">
            organised.
          </span>
        </h1>

        {/* Lead Narrative */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-surface-600 dark:text-surface-300 leading-relaxed font-normal">
          Stop losing prospective students in chaotic WhatsApp chats, paper notebooks, and spreadsheets.
          EnrolmentDesk gives your coaching centre a single, clear workspace to manage parent enquiries,
          schedule trial classes, and convert admissions.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.99] transition-all cursor-pointer glow-brand"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Interactive Demo</span>
            <ArrowRight className="h-4 w-4 opacity-75" />
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-300 dark:border-surface-800 bg-white dark:bg-surface-900/60 px-6 py-3.5 text-sm font-semibold text-surface-700 dark:text-surface-200 shadow-xs hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-950 dark:hover:text-white active:scale-[0.99] transition-all"
          >
            <span>Explore Modules</span>
          </Link>
        </div>

        {/* Trust & Spec Micro-features */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-surface-500 dark:text-surface-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Zero software installation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Official WhatsApp Click-to-Chat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Printable Reception QR Standee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <span>India DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}

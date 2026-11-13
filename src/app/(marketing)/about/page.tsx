import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — EnrolmentDesk',
  description:
    'Learn about EnrolmentDesk — the admissions management platform purpose-built for Indian tuition centres.',
}

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-surface-200 dark:border-surface-800 py-20 bg-white dark:bg-[#070b14] transition-colors relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 px-3.5 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-4 border border-brand-200 dark:border-brand-500/30">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span>Mission &amp; Origins</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white md:text-5xl font-sans">
            About EnrolmentDesk
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500 dark:text-surface-400">
            We&apos;re building the operating system for tuition centre admissions — starting with
            the basics done right.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white dark:bg-[#070b14] transition-colors">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6 text-surface-600 dark:text-surface-300">
            <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white font-sans">The problem we saw</h2>
            <p className="text-base leading-relaxed">
              India has hundreds of thousands of independent tuition centres — from single-room
              coaching classes to multi-branch academies. Almost all of them manage admissions the
              same way: WhatsApp groups, phone call logs, paper registers, and the occasional
              spreadsheet.
            </p>
            <p className="text-base leading-relaxed">
              Enquiries get lost in chat threads. Follow-ups happen from memory. There&apos;s no way
              to know how many leads came in last month, where they came from, or why they
              didn&apos;t convert. The tools that exist are either too expensive, too complex, or
              built for schools — not coaching centres.
            </p>

            <h2 className="pt-8 text-2xl font-bold tracking-tight text-surface-900 dark:text-white font-sans">
              What we&apos;re building
            </h2>
            <p className="text-base leading-relaxed">
              EnrolmentDesk is a focused, affordable admissions workspace designed for how tuition
              centres actually work. We handle the core workflow — capturing enquiries, tracking them
              through a pipeline, scheduling demos, managing follow-ups, and giving you analytics
              that help you convert more admissions.
            </p>
            <p className="text-base leading-relaxed">
              We integrate with the tools you already use (like WhatsApp) instead of forcing you to
              adopt an entirely new system. And we keep prices realistic for independent centres —
              not enterprise SaaS budgets.
            </p>

            <h2 className="pt-8 text-2xl font-bold tracking-tight text-surface-900 dark:text-white font-sans">
              Based in Bengaluru
            </h2>
            <p className="text-base leading-relaxed">
              EnrolmentDesk is built in Bengaluru, India. We work closely with local tuition centres
              to understand their real needs and build features that actually get used — not bloated
              dashboards that look good in demos but gather dust in practice.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all glow-brand"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

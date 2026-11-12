import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — EnrolmentDesk',
  description:
    'Learn about EnrolmentDesk — the admissions management platform purpose-built for Indian tuition centres.',
}

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-surface-200 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 md:text-5xl">
            About EnrolmentDesk
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500">
            We&apos;re building the operating system for tuition centre admissions — starting with
            the basics done right.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-surface max-w-none">
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">The problem we saw</h2>
            <p className="mt-4 text-base leading-relaxed text-surface-500">
              India has hundreds of thousands of independent tuition centres — from single-room
              coaching classes to multi-branch academies. Almost all of them manage admissions the
              same way: WhatsApp groups, phone call logs, paper registers, and the occasional
              spreadsheet.
            </p>
            <p className="mt-4 text-base leading-relaxed text-surface-500">
              Enquiries get lost in chat threads. Follow-ups happen from memory. There&apos;s no way
              to know how many leads came in last month, where they came from, or why they
              didn&apos;t convert. The tools that exist are either too expensive, too complex, or
              built for schools — not coaching centres.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-surface-900">
              What we&apos;re building
            </h2>
            <p className="mt-4 text-base leading-relaxed text-surface-500">
              EnrolmentDesk is a focused, affordable admissions workspace designed for how tuition
              centres actually work. We handle the core workflow — capturing enquiries, tracking them
              through a pipeline, scheduling demos, managing follow-ups, and giving you analytics
              that help you convert more admissions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-surface-500">
              We integrate with the tools you already use (like WhatsApp) instead of forcing you to
              adopt an entirely new system. And we keep prices realistic for independent centres —
              not enterprise SaaS budgets.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-surface-900">
              Based in Bengaluru
            </h2>
            <p className="mt-4 text-base leading-relaxed text-surface-500">
              EnrolmentDesk is built in Bengaluru, India. We work closely with local tuition centres
              to understand their real needs and build features that actually get used — not bloated
              dashboards that look good in demos but gather dust in practice.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

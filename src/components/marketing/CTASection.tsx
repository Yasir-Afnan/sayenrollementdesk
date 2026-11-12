import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
          Ready to organise your admissions?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-surface-500">
          Join tuition centres across Bengaluru that are moving from scattered WhatsApp chats to a
          single, clear admissions pipeline.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-0 px-6 py-3 text-sm font-semibold text-surface-700 shadow-sm transition-colors hover:bg-surface-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

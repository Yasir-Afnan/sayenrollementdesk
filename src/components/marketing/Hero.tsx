import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
        <p className="mb-4 inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700">
          Built for Indian tuition centres
        </p>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-surface-900 md:text-6xl md:leading-[1.1]">
          Admissions,{' '}
          <span className="text-brand-600">organised.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-surface-500 md:text-xl">
          Stop juggling WhatsApp chats, phone calls, and spreadsheets. EnrolmentDesk gives your
          tuition centre a single workspace to track every enquiry from first contact to confirmed
          admission.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-surface-0 px-6 py-3 text-sm font-semibold text-surface-700 shadow-sm transition-colors hover:bg-surface-50"
          >
            See Features
          </Link>
        </div>
      </div>
    </section>
  )
}

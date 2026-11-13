import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-[#070b14] relative overflow-hidden transition-colors">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-gradient-to-b from-brand-50 to-brand-100/40 dark:from-[#0e1629] dark:to-[#090d16] border border-brand-200 dark:border-brand-500/30 p-10 sm:p-16 text-center relative overflow-hidden shadow-xl glow-brand">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-surface-950 dark:text-white md:text-4xl font-sans">
              Ready to organise your coaching admissions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-surface-600 dark:text-surface-300">
              Join tuition centres across Bengaluru that are moving from scattered WhatsApp chats to a
              single, clear admissions pipeline.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 dark:bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-700 dark:hover:bg-brand-600 active:scale-95 glow-brand"
              >
                <Sparkles className="h-4 w-4" />
                <span>Launch Interactive Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 px-6 py-3.5 text-sm font-semibold text-surface-700 dark:text-surface-200 shadow-xs transition-all hover:bg-surface-50 dark:hover:bg-surface-700"
              >
                Contact Admissions Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

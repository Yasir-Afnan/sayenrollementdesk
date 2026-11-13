import type { Metadata } from 'next'
import PricingCards from '@/components/marketing/PricingCards'
import FAQ from '@/components/marketing/FAQ'
import CTASection from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'Pricing — EnrolmentDesk',
  description:
    'Simple, transparent pricing for EnrolmentDesk. One-time setup from ₹1,499. Monthly maintenance at ₹799/month.',
}

export default function PricingPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-surface-200 dark:border-surface-800 py-20 bg-white dark:bg-[#070b14] transition-colors relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white md:text-5xl font-sans">
            Fair, Transparent Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500 dark:text-surface-400">
            Affordable plans designed for independent tuition centres. Start with a one-time setup,
            add monthly maintenance when you&apos;re ready.
          </p>
        </div>
      </section>

      <PricingCards />
      <FAQ />
      <CTASection />
    </>
  )
}

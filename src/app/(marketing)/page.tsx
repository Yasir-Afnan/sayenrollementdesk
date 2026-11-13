import Hero from '@/components/marketing/Hero'
import Features from '@/components/marketing/Features'
import HowItWorks from '@/components/marketing/HowItWorks'
import DashboardPreview from '@/components/marketing/DashboardPreview'
import PricingCards from '@/components/marketing/PricingCards'
import FAQ from '@/components/marketing/FAQ'
import CTASection from '@/components/marketing/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Problem statement */}
      <section className="border-t border-surface-200 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            Admissions shouldn&apos;t run on WhatsApp
          </h2>
          <p className="mt-6 text-base leading-relaxed text-surface-500 md:text-lg">
            Most tuition centres still manage enquiries across scattered WhatsApp chats, phone call
            logs, notebooks, and spreadsheets. Leads fall through the cracks, follow-ups get missed,
            and there&apos;s no way to know where your admissions really stand.
          </p>
          <p className="mt-4 text-base leading-relaxed text-surface-500 md:text-lg">
            EnrolmentDesk replaces all of that with a single, purpose-built workspace — so you can
            focus on teaching, not chasing leads.
          </p>
        </div>
      </section>

      <HowItWorks />
      <DashboardPreview />
      <Features />
      <PricingCards />
      <FAQ />
      <CTASection />
    </>
  )
}

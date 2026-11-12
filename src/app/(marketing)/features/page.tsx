import type { Metadata } from 'next'
import Features from '@/components/marketing/Features'
import CTASection from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'Features — EnrolmentDesk',
  description:
    'Explore the features that make EnrolmentDesk the simplest admissions management platform for tuition centres.',
}

export default function FeaturesPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-surface-200 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 md:text-5xl">
            Features
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500">
            Built specifically for how tuition centres work — from capturing enquiries to tracking
            every follow-up and converting more admissions.
          </p>
        </div>
      </section>

      <Features />

      {/* Detail sections */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-20">
            {/* Enquiry Pipeline detail */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold tracking-wide text-brand-600">Enquiry Pipeline</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-surface-900 md:text-3xl">
                  See every lead at a glance
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-surface-500">
                  Move enquiries through custom stages — New, Contacted, Demo Scheduled, Follow-up,
                  and Enrolled. Know exactly where each prospective student stands without opening a
                  single spreadsheet.
                </p>
              </div>
              <div className="rounded-xl border border-surface-200 bg-surface-50 p-8">
                <div className="flex flex-wrap gap-2">
                  {['New', 'Contacted', 'Demo Scheduled', 'Follow-up', 'Enrolled'].map((stage) => (
                    <span
                      key={stage}
                      className="rounded-full border border-surface-200 bg-surface-0 px-3 py-1.5 text-xs font-medium text-surface-600"
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* QR Capture detail */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="flex items-center justify-center rounded-xl border border-surface-200 bg-surface-50 p-12">
                  <div className="grid h-24 w-24 grid-cols-5 grid-rows-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 12].includes(i)
                            ? 'bg-surface-900'
                            : 'bg-surface-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <p className="text-sm font-semibold tracking-wide text-brand-600">QR Capture</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-surface-900 md:text-3xl">
                  Walk-in to pipeline in seconds
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-surface-500">
                  Print your centre&apos;s unique QR code and display it at the entrance. Parents
                  scan it, fill a short enquiry form on their phone, and the lead appears in your
                  pipeline instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

import { QrCode, GitPullRequestArrow, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: QrCode,
    title: 'Capture enquiries',
    description:
      'Parents scan your QR code, fill a short form, or you log walk-ins and phone calls manually. Every enquiry lands in one place.',
  },
  {
    number: '02',
    icon: GitPullRequestArrow,
    title: 'Track & follow up',
    description:
      'Move enquiries through your pipeline — schedule demos, set follow-up reminders, and communicate with parents via WhatsApp.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Convert & enrol',
    description:
      'Mark successful conversions, see your analytics improve, and know exactly where every admission stands — without a spreadsheet in sight.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            Three steps to organised admissions
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center md:text-left">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 md:mx-0">
                <step.icon className="h-6 w-6 text-brand-600" />
              </div>
              <span className="text-xs font-bold tracking-widest text-brand-400">
                STEP {step.number}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-surface-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

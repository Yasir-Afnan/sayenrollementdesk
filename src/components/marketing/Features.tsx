import {
  GitPullRequestArrow,
  Bell,
  CalendarCheck,
  MessageCircle,
  QrCode,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: GitPullRequestArrow,
    title: 'Enquiry Pipeline',
    description:
      'Visualise every enquiry across stages — from new lead to enrolled student. Never lose track of a prospective admission.',
  },
  {
    icon: Bell,
    title: 'Follow-up Management',
    description:
      'Set reminders and track follow-up tasks so no parent conversation falls through the cracks.',
  },
  {
    icon: CalendarCheck,
    title: 'Demo Class Scheduling',
    description:
      'Schedule demo classes, send confirmations, and record outcomes — all from one place.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    description:
      'Connect your WhatsApp to capture enquiries and communicate with parents without switching apps.',
  },
  {
    icon: QrCode,
    title: 'QR-based Enquiry Capture',
    description:
      'Generate a QR code for your centre. Parents scan it, fill an enquiry form, and land straight in your pipeline.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'See conversion rates, source attribution, and pipeline health at a glance with real-time analytics.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-surface-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            Everything you need to manage admissions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-surface-500">
            Purpose-built tools that replace the scattered WhatsApp groups, notebooks, and
            spreadsheets you rely on today.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-surface-200 bg-surface-0 p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <feature.icon className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-surface-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

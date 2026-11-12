import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter Pilot',
    price: '₹1,499',
    frequency: 'one-time',
    description: 'Get up and running with the essentials — perfect for a single-location centre trying EnrolmentDesk for the first time.',
    features: [
      'Enquiry pipeline setup',
      'QR-based enquiry capture',
      'Follow-up reminders',
      'Up to 100 enquiries',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Standard Setup',
    price: '₹3,999',
    frequency: 'one-time',
    description: 'Full onboarding with advanced features for centres that want to hit the ground running.',
    features: [
      'Everything in Starter Pilot',
      'WhatsApp integration',
      'Demo class scheduling',
      'Analytics dashboard',
      'Unlimited enquiries',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Monthly Maintenance',
    price: '₹799',
    frequency: '/month',
    description: 'Ongoing platform access, updates, and support to keep your admissions flowing smoothly.',
    features: [
      'Continued platform access',
      'Feature updates',
      'Data backups',
      'WhatsApp & integrations',
      'Dedicated support',
    ],
    highlighted: false,
  },
]

export default function PricingCards() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-surface-500">
            No hidden charges. Start with a one-time setup, add monthly maintenance when you&apos;re
            ready.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                plan.highlighted
                  ? 'border-brand-600 bg-surface-0 shadow-lg ring-1 ring-brand-600'
                  : 'border-surface-200 bg-surface-0'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Recommended
                </span>
              )}

              <h3 className="text-lg font-semibold text-surface-900">{plan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-500">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold tracking-tight text-surface-900">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-surface-500">{plan.frequency}</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-surface-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href="/register"
                  className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'border border-surface-300 bg-surface-0 text-surface-700 hover:bg-surface-50'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

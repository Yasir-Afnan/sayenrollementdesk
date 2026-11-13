'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter Pilot',
    tagline: 'Ideal for single-teacher & nascent tuition centres testing digital management.',
    price: '₹1,499',
    type: 'one-time investment',
    features: [
      'Centralized student enquiry pipeline',
      'Walk-in & phone lead logging',
      'Today & overdue follow-up reminders',
      'Official WhatsApp direct click-to-chat',
      'Up to 100 prospective student records',
      'Export student records to CSV',
    ],
    highlighted: false,
    ctaText: 'Start Pilot Setup',
  },
  {
    name: 'Standard Setup',
    tagline: 'The complete admissions suite for growing coaching institutes & academies.',
    price: '₹3,999',
    type: 'one-time setup & onboarding',
    features: [
      'Everything in Starter Pilot',
      'Printable High-Res QR Reception Standee',
      'Public Mobile Enquiry Form (/enquire/your-centre)',
      'Trial & Demo class scheduling module',
      'Student attendance & faculty sentiment logging',
      '1-Click Demo to Admission conversion',
      'Full staff counseling team access (up to 5 staff)',
      'DPDP Act 2023 parental consent tracking',
    ],
    highlighted: true,
    badge: 'Most Popular for Centres',
    ctaText: 'Get Standard Installation',
  },
  {
    name: 'Monthly Maintenance',
    tagline: 'Ongoing cloud hosting, database backups, and software updates.',
    price: '₹799',
    type: 'per month',
    features: [
      'Unlimited student enquiry records',
      'Managed cloud database & daily automated backups',
      'Priority phone & WhatsApp coordinator support',
      'Quarterly feature updates & performance optimizations',
      'Staff onboarding and coordinator refresher training',
      'Cancel anytime without lock-in',
    ],
    highlighted: false,
    ctaText: 'Add Monthly Care',
  },
]

export default function PricingCards() {
  return (
    <section id="pricing" className="bg-surface-50/70 dark:bg-[#070b14]/70 py-24 border-t border-surface-200 dark:border-surface-800/80 transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Transparent &amp; Fair Pricing</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-surface-950 dark:text-white sm:text-4xl font-sans">
            One-time installation. No expensive monthly traps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-surface-500 dark:text-surface-400">
            Enterprise school ERPs cost lakhs and require weeks of painful training. EnrolmentDesk gives independent tuition centres a modern, working solution at affordable Indian pricing.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? 'bg-white dark:bg-[#0e1629] border-2 border-brand-600 dark:border-brand-500 shadow-xl relative scale-100 lg:-translate-y-2 ring-4 ring-brand-500/10 dark:ring-brand-500/20 glow-brand'
                  : 'bg-white dark:bg-[#0e1424] border border-surface-200 dark:border-surface-800 shadow-xs hover:border-surface-300 dark:hover:border-surface-700'
              }`}
            >
              <div>
                {plan.badge && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 dark:bg-brand-500 px-3 py-1 text-[11px] font-bold text-white mb-3 shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-surface-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1.5 text-xs text-surface-500 dark:text-surface-400 min-h-[32px] leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mt-5 pb-5 border-b border-surface-100 dark:border-surface-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-surface-950 dark:text-white tracking-tight font-sans">
                      {plan.price}
                    </span>
                    <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">{plan.type}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                    What&apos;s Included:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-surface-700 dark:text-surface-300">
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-100 dark:border-surface-800">
                <Link
                  href="/login"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                    plan.highlighted
                      ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-sm hover:bg-brand-700 dark:hover:bg-brand-600'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

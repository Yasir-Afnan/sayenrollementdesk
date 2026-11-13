'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Who is EnrolmentDesk for?',
    answer:
      'EnrolmentDesk is built for independent tuition centres, coaching institutes, and local educational academies — especially those currently managing admissions through WhatsApp, phone calls, or paper registers.',
  },
  {
    question: 'Do I need any technical knowledge to use it?',
    answer:
      'Not at all. EnrolmentDesk is designed to be simple enough for anyone at your centre to use. If you can use WhatsApp, you can use EnrolmentDesk.',
  },
  {
    question: 'What does the one-time setup fee cover?',
    answer:
      'The setup fee covers your initial account creation, pipeline configuration, QR code generation, and onboarding walkthrough. You get a fully configured workspace ready to accept enquiries.',
  },
  {
    question: 'Can I try it before committing to the monthly plan?',
    answer:
      'Yes. Start with the Starter Pilot at ₹1,499 (one-time). It gives you a working pipeline to evaluate before deciding on the monthly maintenance plan.',
  },
  {
    question: 'How does the WhatsApp integration work?',
    answer:
      'You send pre-formatted, personalised WhatsApp messages with 1-click via official wa.me direct links without paying expensive per-message third-party API costs or middlemen fees.',
  },
  {
    question: 'Is my student data secure and DPDP compliant?',
    answer:
      'Yes. All records are isolated per institute using PostgreSQL Row Level Security (RLS), encrypted in transit and at rest, and adhere to India’s Digital Personal Data Protection Act 2023.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-surface-50 dark:bg-[#070b14] py-24 transition-colors">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white md:text-4xl font-sans">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-14 divide-y divide-surface-200 dark:divide-surface-800">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left cursor-pointer group"
              >
                <span className="text-sm font-semibold text-surface-900 dark:text-surface-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 pr-4 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-surface-400 dark:text-surface-500 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed text-surface-600 dark:text-surface-400 animate-in fade-in-50 duration-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

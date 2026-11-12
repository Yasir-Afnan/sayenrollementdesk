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
      'You connect your WhatsApp Business number to EnrolmentDesk. Incoming enquiry messages are captured automatically, and you can send follow-ups directly from the platform.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. All data is encrypted in transit and at rest. We use industry-standard security practices and your data is never shared with third parties.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-14 divide-y divide-surface-200">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-surface-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-surface-400 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed text-surface-500">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

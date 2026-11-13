'use client'

import React from 'react'
import {
  GitPullRequestArrow,
  Clock,
  CalendarCheck,
  MessageSquare,
  QrCode,
  BarChart3,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react'

const features = [
  {
    icon: GitPullRequestArrow,
    tag: 'Pipeline CRM',
    title: 'Admissions Funnel & Kanban',
    description:
      'Track students across 7 transparent stages from initial walk-in or website enquiry to trial class and paid enrollment.',
    benefit: 'Never lose a prospective admission record again.',
  },
  {
    icon: Clock,
    tag: 'Counselor Task Queue',
    title: 'Overdue Follow-up Desk',
    description:
      'Categorized daily queues for Today, Overdue, and Upcoming calls. Log parent conversation outcomes and reschedule with a click.',
    benefit: 'Visual red badges for overdue parent callbacks.',
  },
  {
    icon: CalendarCheck,
    tag: 'Trial Class Booking',
    title: 'Demo Class Scheduling',
    description:
      'Assign faculty members, select batch classroom slots, track student attendance, and convert interested trial students straight into admissions.',
    benefit: 'Convert 3x more trial students into paid admissions.',
  },
  {
    icon: MessageSquare,
    tag: 'Zero Middleman Fees',
    title: 'Official WhatsApp Click-to-Chat',
    description:
      'Dispatch personalized WhatsApp reminders, welcome greetings, and demo confirmations via official wa.me direct links without paying expensive per-message third-party API costs.',
    benefit: 'Pre-formatted templates with dynamic name replacement.',
  },
  {
    icon: QrCode,
    tag: 'Lead Capture',
    title: 'Printable Reception QR Standee',
    description:
      'Download a high-resolution, branded QR code for your reception counter and pamphlets. Parents scan it to submit mobile-friendly admission enquiries directly into your pipeline.',
    benefit: 'Walk-ins register themselves without filling paper forms.',
  },
  {
    icon: BarChart3,
    tag: 'Velocity & Metrics',
    title: 'Real-Time Admissions Analytics',
    description:
      'Derive weekly inquiry velocity, conversion rates, and lead source distribution (Walk-ins vs WhatsApp vs QR vs Referrals) from actual stored records.',
    benefit: 'Know exactly which marketing channel yields the most students.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 border-t border-surface-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Built for Independent Educators</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-surface-950 sm:text-4xl font-sans">
            Everything your coaching centre needs to run admissions smoothly
          </h2>
          <p className="mt-4 text-base leading-relaxed text-surface-500">
            Tailored specifically for Indian coaching institutes, multi-teacher centres, and local academies.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="saas-card rounded-2xl p-6 flex flex-col justify-between hover:border-brand-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100 group-hover:scale-105 transition-transform">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-surface-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-surface-600">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-surface-600">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{feature.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useState } from 'react'
import {
  Users,
  Clock,
  Calendar,
  MessageSquare,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'followups' | 'demos' | 'whatsapp'>('pipeline')

  return (
    <section className="bg-surface-50/60 py-20 border-y border-surface-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Product Tour</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-surface-950 sm:text-4xl">
            A clear, real-time command center for your tuition centre
          </h2>
          <p className="mt-3.5 text-base text-surface-500 leading-relaxed">
            Everything your front-desk coordinators and teachers need — from walk-in logging to WhatsApp reminders — consolidated into one fast workspace.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex rounded-xl bg-surface-200/80 p-1 text-xs font-semibold gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-brand-600" />
              <span>Enquiry Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'followups'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>Follow-up Desk</span>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'demos'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-purple-600" />
              <span>Demo Schedules</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Templates</span>
            </button>
          </div>
        </div>

        {/* Mock Window Chrome */}
        <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-surface-300/80 bg-white shadow-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-surface-200 bg-surface-100/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 rounded-md bg-white border border-surface-200 px-3 py-1 text-[11px] font-mono text-surface-500 shadow-2xs">
              <span className="text-surface-300">https://</span>
              <span className="text-surface-800 font-medium">app.enrolmentdesk.in/dashboard</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Academic Year 2026-27</span>
            </div>
          </div>

          {/* Interactive Tab Content */}
          <div className="p-6">
            {activeTab === 'pipeline' && (
              <div className="space-y-4">
                {/* Micro Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-2">
                  <div className="rounded-xl border border-surface-200 bg-surface-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-surface-500">Total Enquiries</p>
                    <p className="text-xl font-bold text-surface-900 mt-0.5 font-sans">84 Leads</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 bg-surface-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Demos Scheduled</p>
                    <p className="text-xl font-bold text-brand-700 mt-0.5 font-sans">18 Trial Slots</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 bg-surface-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Pending Calls</p>
                    <p className="text-xl font-bold text-amber-700 mt-0.5 font-sans">5 Overdue</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 bg-surface-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Confirmed Enrolled</p>
                    <p className="text-xl font-bold text-emerald-700 mt-0.5 font-sans">22 Admitted</p>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="rounded-xl border border-surface-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-surface-50 border-b border-surface-200 text-surface-500 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="px-4 py-2.5">Student &amp; Parent</th>
                        <th className="px-4 py-2.5">Program</th>
                        <th className="px-4 py-2.5">Lead Source</th>
                        <th className="px-4 py-2.5">Pipeline Status</th>
                        <th className="px-4 py-2.5 text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      <tr className="hover:bg-surface-50/60">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900">Aditi Varma</p>
                          <p className="text-[11px] text-surface-500">Father: Ramesh Varma • 98451 12233</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800">Class 10 CBSE Math &amp; Science</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-surface-700">Walk-in</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 text-[10px]">New Enquiry</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                            <MessageSquare className="h-3 w-3" /> WhatsApp
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-50/60">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900">Tarun Reddy</p>
                          <p className="text-[11px] text-surface-500">Father: Suresh Reddy • 98803 34455</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800">Class 12 NEET Biology &amp; Chemistry</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-surface-700">QR Code</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 text-[10px]">Demo Scheduled</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded border border-brand-200">
                            <Calendar className="h-3 w-3" /> Sat 10:00 AM
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-50/60">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900">Sneha Hegde</p>
                          <p className="text-[11px] text-surface-500">Father: Praveen Hegde • 97404 45566</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800">KCET / JEE Foundation Class 11</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-surface-700">WhatsApp</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 text-[10px]">Admitted</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Enrolled (Fee Paid)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'followups' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-surface-200">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      Urgent Overdue (2)
                    </span>
                    <span className="text-surface-500">Parents waiting for fee concession &amp; timing callback</span>
                  </div>
                  <span className="text-surface-400 font-mono text-[11px]">Today: 3 Calls Due</span>
                </div>

                <div className="rounded-xl border border-red-300 bg-red-50/30 p-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                      <span className="font-bold text-surface-900">Siddharth Rao (Parent: Meenakshi Rao)</span>
                      <span className="text-[10px] text-red-600 font-bold">1 Day Overdue</span>
                    </div>
                    <p className="text-surface-600 mt-1">Send syllabus breakdown and JEE batch fee structure on WhatsApp.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold cursor-pointer">
                      Send WhatsApp
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-surface-200 text-surface-700 font-medium cursor-pointer">
                      Mark Done
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-200 bg-white p-3.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-surface-900">Nikhil Gowda (Parent: Harish Gowda)</span>
                    <p className="text-surface-600 mt-1">Discuss 10% sibling discount approval with Dr. Anand before confirmation.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-semibold cursor-pointer">
                      Call Parent
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-surface-200 text-surface-700 font-medium cursor-pointer">
                      Reschedule
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-surface-200 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-surface-900">Tarun Reddy (Class 12 NEET)</span>
                    <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">Scheduled</span>
                  </div>
                  <p className="text-surface-600">Faculty: Dr. Anand Rao • Duration: 60 mins</p>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-100 text-[11px]">
                    <span className="text-surface-500 font-medium">Sat 10:00 AM • Classroom 2</span>
                    <span className="text-emerald-600 font-semibold cursor-pointer">Send Parent Reminder</span>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-50/20 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-surface-900">Sneha Hegde (Class 10 CBSE)</span>
                    <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">Attended &amp; Interested</span>
                  </div>
                  <p className="text-surface-600 italic">&ldquo;Student engaged actively with trigonometry exercises. Parent ready to enrol.&rdquo;</p>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-100 text-[11px]">
                    <span className="text-surface-500">Conducted yesterday</span>
                    <span className="text-brand-700 font-bold">Converted to Admission ✓</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="rounded-xl bg-[#efeae2] p-4 border border-[#dad3c8]">
                <div className="max-w-md ml-auto rounded-xl bg-[#d9fdd3] p-3 text-xs text-surface-900 shadow-xs space-y-1.5 border border-[#b8f5ae]">
                  <p className="font-semibold text-emerald-950">Apex Academy Bangalore — Admissions Desk</p>
                  <p className="leading-relaxed">
                    Hello Ramesh Varma, thank you for visiting Apex Academy regarding Aditi&apos;s Class 10 CBSE preparation. We have reserved a complimentary demo class seat for her on Saturday at 10:00 AM. Would you like to confirm the slot?
                  </p>
                  <div className="text-right text-[10px] text-surface-500 font-medium">10:42 AM • ✓✓</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Call to Action inside Preview */}
          <div className="border-t border-surface-200 bg-surface-50/80 px-6 py-3.5 flex items-center justify-between text-xs">
            <span className="text-surface-500 font-medium">Ready to try with real tuition centre data?</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700"
            >
              <span>Test 1-Click Interactive Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

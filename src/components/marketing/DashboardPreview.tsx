'use client'

import React, { useState } from 'react'
import {
  Users,
  Clock,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'followups' | 'demos' | 'whatsapp'>('pipeline')

  return (
    <section className="bg-surface-50/60 dark:bg-[#070b14]/70 py-20 border-y border-surface-200 dark:border-surface-800/80 transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 px-3.5 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-3 border border-brand-200 dark:border-brand-500/30">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span>Interactive Product Tour</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-surface-950 dark:text-white sm:text-4xl">
            A clear, real-time command center for your tuition centre
          </h2>
          <p className="mt-3.5 text-base text-surface-500 dark:text-surface-400 leading-relaxed">
            Everything your front-desk coordinators and teachers need — from walk-in logging to WhatsApp reminders — consolidated into one fast workspace.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex rounded-xl bg-surface-200/80 dark:bg-surface-900/90 p-1 text-xs font-semibold gap-1 max-w-full overflow-x-auto border border-surface-200 dark:border-surface-800">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              <span>Enquiry Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'followups'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Follow-up Desk</span>
            </button>
            <button
              onClick={() => setActiveTab('demos')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'demos'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              <span>Demo Schedules</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Templates</span>
            </button>
          </div>
        </div>

        {/* Mock Window Chrome */}
        <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-surface-300/80 dark:border-surface-800/80 bg-white dark:bg-[#0d1424] shadow-2xl overflow-hidden transition-colors">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-800 bg-surface-100/70 dark:bg-[#080d1a] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 rounded-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 px-3 py-1 text-[11px] font-mono text-surface-500 dark:text-surface-400 shadow-2xs">
              <span className="text-surface-300 dark:text-surface-600">https://</span>
              <span className="text-surface-800 dark:text-surface-200 font-medium">app.enrolmentdesk.in/dashboard</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
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
                  <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">Total Enquiries</p>
                    <p className="text-xl font-bold text-surface-900 dark:text-white mt-0.5 font-sans">84 Leads</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Demos Scheduled</p>
                    <p className="text-xl font-bold text-brand-700 dark:text-brand-300 mt-0.5 font-sans">18 Trial Slots</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Calls</p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300 mt-0.5 font-sans">5 Overdue</p>
                  </div>
                  <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Confirmed Enrolled</p>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-0.5 font-sans">22 Admitted</p>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="rounded-xl border border-surface-200 dark:border-surface-800 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-surface-50 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-800 text-surface-500 dark:text-surface-400 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="px-4 py-2.5">Student &amp; Parent</th>
                        <th className="px-4 py-2.5">Program</th>
                        <th className="px-4 py-2.5">Lead Source</th>
                        <th className="px-4 py-2.5">Pipeline Status</th>
                        <th className="px-4 py-2.5 text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800/70">
                      <tr className="hover:bg-surface-50/60 dark:hover:bg-surface-800/40">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900 dark:text-surface-100">Aditi Varma</p>
                          <p className="text-[11px] text-surface-500 dark:text-surface-400">Father: Ramesh Varma • 98451 12233</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800 dark:text-surface-200">Class 10 CBSE Math &amp; Science</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 dark:bg-surface-800 px-2 py-0.5 text-[10px] font-medium text-surface-700 dark:text-surface-300">Walk-in</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 font-bold px-2.5 py-0.5 text-[10px] border border-blue-200 dark:border-blue-800/60">New Enquiry</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/60">
                            <MessageSquare className="h-3 w-3" /> WhatsApp
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-50/60 dark:hover:bg-surface-800/40">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900 dark:text-surface-100">Tarun Reddy</p>
                          <p className="text-[11px] text-surface-500 dark:text-surface-400">Father: Suresh Reddy • 98803 34455</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800 dark:text-surface-200">Class 12 NEET Biology &amp; Chemistry</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 dark:bg-surface-800 px-2 py-0.5 text-[10px] font-medium text-surface-700 dark:text-surface-300">QR Code</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 font-bold px-2.5 py-0.5 text-[10px] border border-purple-200 dark:border-purple-800/60">Demo Scheduled</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-1 rounded border border-brand-200 dark:border-brand-800/60">
                            <Calendar className="h-3 w-3" /> Sat 10:00 AM
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-50/60 dark:hover:bg-surface-800/40">
                        <td className="px-4 py-3">
                          <p className="font-bold text-surface-900 dark:text-surface-100">Sneha Hegde</p>
                          <p className="text-[11px] text-surface-500 dark:text-surface-400">Father: Praveen Hegde • 97404 45566</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-surface-800 dark:text-surface-200">KCET / JEE Foundation Class 11</td>
                        <td className="px-4 py-3"><span className="rounded bg-surface-100 dark:bg-surface-800 px-2 py-0.5 text-[10px] font-medium text-surface-700 dark:text-surface-300">WhatsApp</span></td>
                        <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 text-[10px] border border-emerald-200 dark:border-emerald-800/60">Admitted</span></td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
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
                <div className="flex items-center justify-between pb-2 border-b border-surface-200 dark:border-surface-800">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      Urgent Overdue (2)
                    </span>
                    <span className="text-surface-500 dark:text-surface-400">Parents waiting for fee concession &amp; timing callback</span>
                  </div>
                  <span className="text-surface-400 dark:text-surface-500 font-mono text-[11px]">Today: 3 Calls Due</span>
                </div>

                <div className="rounded-xl border border-red-300 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20 p-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                      <span className="font-bold text-surface-900 dark:text-surface-100">Siddharth Rao (Parent: Meenakshi Rao)</span>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">1 Day Overdue</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">Send syllabus breakdown and JEE batch fee structure on WhatsApp.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold cursor-pointer">
                      Send WhatsApp
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 font-medium cursor-pointer">
                      Mark Done
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900/40 p-3.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-surface-900 dark:text-surface-100">Nikhil Gowda (Parent: Harish Gowda)</span>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">Discuss 10% sibling discount approval with Dr. Anand before confirmation.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 font-semibold cursor-pointer">
                      Call Parent
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 font-medium cursor-pointer">
                      Reschedule
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-surface-900 dark:text-surface-100">Tarun Reddy (Class 12 NEET)</span>
                    <span className="rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 text-[10px] font-bold">Scheduled</span>
                  </div>
                  <p className="text-surface-600 dark:text-surface-400">Faculty: Dr. Anand Rao • Duration: 60 mins</p>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-100 dark:border-surface-800 text-[11px]">
                    <span className="text-surface-500 dark:text-surface-400 font-medium">Sat 10:00 AM • Classroom 2</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer">Send Parent Reminder</span>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-surface-900 dark:text-surface-100">Sneha Hegde (Class 10 CBSE)</span>
                    <span className="rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Attended &amp; Interested</span>
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 italic">&ldquo;Student engaged actively with trigonometry exercises. Parent ready to enrol.&rdquo;</p>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-100 dark:border-surface-800 text-[11px]">
                    <span className="text-surface-500 dark:text-surface-400">Conducted yesterday</span>
                    <span className="text-brand-700 dark:text-brand-300 font-bold">Converted to Admission ✓</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="rounded-xl bg-[#efeae2] dark:bg-[#151c27] p-4 border border-[#dad3c8] dark:border-surface-800">
                <div className="max-w-md ml-auto rounded-xl bg-[#d9fdd3] dark:bg-[#075e54]/30 dark:border-emerald-800/40 p-3 text-xs text-surface-900 dark:text-surface-100 shadow-xs space-y-1.5 border border-[#b8f5ae]">
                  <p className="font-semibold text-emerald-950 dark:text-emerald-300">Apex Academy Bangalore — Admissions Desk</p>
                  <p className="leading-relaxed">
                    Hello Ramesh Varma, thank you for visiting Apex Academy regarding Aditi&apos;s Class 10 CBSE preparation. We have reserved a complimentary demo class seat for her on Saturday at 10:00 AM. Would you like to confirm the slot?
                  </p>
                  <div className="text-right text-[10px] text-surface-500 dark:text-surface-400 font-medium">10:42 AM • ✓✓</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Call to Action inside Preview */}
          <div className="border-t border-surface-200 dark:border-surface-800 bg-surface-50/80 dark:bg-[#080d1a] px-6 py-3.5 flex items-center justify-between text-xs">
            <span className="text-surface-500 dark:text-surface-400 font-medium">Ready to try with real tuition centre data?</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
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

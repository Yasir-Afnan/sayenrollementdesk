'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StatusBadge } from '@/components/enquiries/StatusBadge'
import { formatDate, generateWhatsAppLink } from '@/lib/utils'
import { Phone, Calendar, ArrowRight, MessageCircle, Clock, AlertTriangle, User } from 'lucide-react'
import type { Enquiry, FollowUp } from '@/lib/types'

export function RecentActivity({
  recentEnquiries,
  upcomingFollowUps,
}: {
  recentEnquiries: Enquiry[]
  upcomingFollowUps: FollowUp[]
}) {
  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Enquiries Feed */}
      <Card className="saas-card">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-surface-100">
          <div>
            <CardTitle className="text-sm font-bold text-surface-950 font-sans tracking-tight">
              Recent Admissions Enquiries
            </CardTitle>
            <CardDescription className="text-xs text-surface-500">
              Latest prospective students registered across your centre channels
            </CardDescription>
          </div>
          <Link
            href="/dashboard/enquiries"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="divide-y divide-surface-100">
            {recentEnquiries.slice(0, 5).map((enq) => {
              const waLink = generateWhatsAppLink(
                enq.guardian_phone,
                `Hello ${enq.guardian_name}, this is regarding ${enq.student_name}'s enquiry at EnrolmentDesk.`
              )

              return (
                <div
                  key={enq.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-surface-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold text-xs border border-brand-100">
                      {enq.student_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/enquiries/${enq.id}`}
                          className="text-xs font-bold text-surface-950 hover:text-brand-600 transition-colors truncate"
                        >
                          {enq.student_name}
                        </Link>
                        <StatusBadge status={enq.status} />
                      </div>
                      <p className="text-[11px] text-surface-500 truncate mt-0.5">
                        Parent: {enq.guardian_name} • {enq.academic_level || 'General'} • {enq.source}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-surface-400 font-medium hidden sm:inline">
                      {formatDate(enq.enquiry_date)}
                    </span>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Send WhatsApp message"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Immediate Follow-Up Tasks */}
      <Card className="saas-card">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-surface-100">
          <div>
            <CardTitle className="text-sm font-bold text-surface-950 font-sans tracking-tight">
              Action Queue: Follow-Up Calls
            </CardTitle>
            <CardDescription className="text-xs text-surface-500">
              Parent conversations and callbacks requiring counselor attention
            </CardDescription>
          </div>
          <Link
            href="/dashboard/follow-ups"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
          >
            <span>Open Desk</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="divide-y divide-surface-100">
            {upcomingFollowUps.length === 0 ? (
              <p className="text-xs text-surface-400 py-8 text-center font-medium">
                All follow-ups are up to date! Zero pending callbacks.
              </p>
            ) : (
              upcomingFollowUps.slice(0, 5).map((fup) => {
                const isOverdue = fup.scheduled_date < todayStr
                const waLink = fup.enquiry?.guardian_phone
                  ? generateWhatsAppLink(
                      fup.enquiry.guardian_phone,
                      `Hello ${fup.enquiry.guardian_name}, this is following up on ${fup.enquiry.student_name}'s admissions enquiry.`
                    )
                  : '#'

                return (
                  <div
                    key={fup.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-surface-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wide ${
                            isOverdue
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isOverdue && <AlertTriangle className="h-2.5 w-2.5" />}
                          {isOverdue ? 'Overdue' : 'Due Today'}
                        </span>
                        <span className="text-xs font-bold text-surface-950 truncate">
                          {fup.enquiry?.student_name || 'Student Lead'}
                        </span>
                      </div>
                      <p className="text-[11px] text-surface-600 truncate mt-0.5">
                        {fup.notes || 'Routine follow-up call with parent'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {fup.enquiry?.guardian_phone && (
                        <>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                          <a
                            href={`tel:${fup.enquiry.guardian_phone}`}
                            className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50 transition-colors"
                            title="Call parent"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        </>
                      )}
                      <Link
                        href="/dashboard/follow-ups"
                        className="px-2.5 py-1 rounded-lg bg-surface-100 text-[11px] font-semibold text-surface-700 hover:bg-surface-200 transition-colors"
                      >
                        Action
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StatusBadge } from '@/components/enquiries/StatusBadge'
import { formatDate, generateWhatsAppLink } from '@/lib/utils'
import { Phone, Calendar, ArrowRight, MessageCircle } from 'lucide-react'
import type { Enquiry, FollowUp } from '@/lib/types'

export function RecentActivity({
  recentEnquiries,
  upcomingFollowUps,
}: {
  recentEnquiries: Enquiry[]
  upcomingFollowUps: FollowUp[]
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Enquiries Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold text-surface-900">
              Recent Enquiries
            </CardTitle>
            <CardDescription>
              Latest prospective students registered in the centre
            </CardDescription>
          </div>
          <Link
            href="/dashboard/enquiries"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-surface-100">
            {recentEnquiries.slice(0, 5).map((enq) => (
              <div
                key={enq.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-surface-50/50 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-surface-900 truncate">
                      {enq.student_name}
                    </p>
                    <StatusBadge status={enq.status} />
                  </div>
                  <p className="text-[11px] text-surface-500 truncate mt-0.5">
                    Parent: {enq.guardian_name} • {enq.academic_level || 'General'} • {enq.source}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-surface-400">
                    {formatDate(enq.enquiry_date)}
                  </span>
                  <a
                    href={generateWhatsAppLink(
                      enq.guardian_phone,
                      `Hello ${enq.guardian_name}, this is regarding ${enq.student_name}'s enquiry at EnrolmentDesk.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Send WhatsApp message"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Urgent / Upcoming Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold text-surface-900">
              Immediate Follow-Ups
            </CardTitle>
            <CardDescription>
              Calls and parent interactions requiring attention
            </CardDescription>
          </div>
          <Link
            href="/dashboard/follow-ups"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Follow-up Desk</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-surface-100">
            {upcomingFollowUps.length === 0 ? (
              <p className="text-xs text-surface-400 py-6 text-center">
                All follow-ups are up to date! Great job.
              </p>
            ) : (
              upcomingFollowUps.slice(0, 5).map((fup) => {
                const todayStr = new Date().toISOString().split('T')[0]
                const isOverdue = fup.scheduled_date < todayStr

                return (
                  <div
                    key={fup.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-surface-50/50 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            isOverdue
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isOverdue ? 'Overdue' : 'Due Today'}
                        </span>
                        <p className="text-xs font-semibold text-surface-900 truncate">
                          {fup.enquiry?.student_name || 'Student Enquiry'}
                        </p>
                      </div>
                      <p className="text-[11px] text-surface-500 truncate mt-0.5">
                        {fup.notes || 'Routine follow-up call with parent'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {fup.enquiry?.guardian_phone && (
                        <a
                          href={`tel:${fup.enquiry.guardian_phone}`}
                          className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50 transition-colors"
                          title="Call parent"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      <Link
                        href={`/dashboard/follow-ups`}
                        className="px-2 py-1 rounded bg-surface-100 text-[11px] font-medium text-surface-700 hover:bg-surface-200 transition-colors"
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

import React from 'react'
import Link from 'next/link'
import { getDemoClasses, getCourses, getBatches } from '@/lib/data-provider'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDate, generateWhatsAppLink } from '@/lib/utils'
import {
  GraduationCap,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  ArrowRight,
  User,
  BookOpen,
} from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'

export const dynamic = 'force-dynamic'

export default async function DemoClassesPage() {
  const [demos, courses, batches] = await Promise.all([
    getDemoClasses(),
    getCourses(),
    getBatches(),
  ])

  const total = demos.length
  const scheduled = demos.filter((d) => d.status === 'scheduled').length
  const completed = demos.filter((d) => d.status === 'completed').length
  const attended = demos.filter((d) => d.attendance === true).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Demo Class Scheduling"
        description="Organise trial sessions, assign instructors, record student attendance, and convert successful demos into confirmed admissions."
        actions={
          <Link href="/dashboard/demos/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Schedule Demo</span>
            </Button>
          </Link>
        }
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-surface-200 bg-white p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">
            Total Demos
          </span>
          <p className="text-2xl font-bold text-surface-900 mt-1">{total}</p>
        </div>
        <div className="rounded-xl border border-surface-200 bg-white p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
            Upcoming / Scheduled
          </span>
          <p className="text-2xl font-bold text-brand-600 mt-1">{scheduled}</p>
        </div>
        <div className="rounded-xl border border-surface-200 bg-white p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            Completed Sessions
          </span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{completed}</p>
        </div>
        <div className="rounded-xl border border-surface-200 bg-white p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
            Attended Students
          </span>
          <p className="text-2xl font-bold text-purple-600 mt-1">{attended}</p>
        </div>
      </div>

      {/* Demo Cards Grid */}
      {demos.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-6 w-6 text-brand-600" />}
          title="No demo classes scheduled"
          description="Schedule a trial class for an interested student to demonstrate your faculty's teaching methodology."
          actionLabel="Schedule First Demo"
          actionHref="/dashboard/demos/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demos.map((demo) => {
            const waReminder = demo.enquiry?.guardian_phone
              ? generateWhatsAppLink(
                  demo.enquiry.guardian_phone,
                  `Dear ${demo.enquiry.guardian_name}, this is a reminder that ${demo.enquiry.student_name}'s demo class for ${demo.course?.name || 'our coaching program'} is scheduled on ${formatDate(demo.scheduled_date)} at ${demo.scheduled_time}. We look forward to seeing you!`
                )
              : '#'

            return (
              <Card
                key={demo.id}
                className="hover:border-surface-300 transition-all flex flex-col justify-between"
              >
                <CardHeader className="pb-3 border-b border-surface-100">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        demo.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : demo.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-surface-100 text-surface-600'
                      }`}
                    >
                      {demo.status}
                    </span>

                    {demo.attendance !== null && (
                      <span
                        className={`text-[11px] font-semibold flex items-center gap-1 ${
                          demo.attendance ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {demo.attendance ? (
                          <>
                            <CheckCircle className="h-3 w-3" /> Attended
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" /> Absent
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-base font-bold text-surface-900 mt-2">
                    {demo.enquiry?.student_name || 'Prospective Student'}
                  </CardTitle>
                  <p className="text-xs text-surface-500">
                    Parent: {demo.enquiry?.guardian_name} • {demo.enquiry?.guardian_phone}
                  </p>
                </CardHeader>

                <CardContent className="pt-4 space-y-3 flex-1">
                  <div className="space-y-1.5 text-xs text-surface-700">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-surface-400" />
                      <span className="font-medium truncate">
                        {demo.course?.name || 'General Program'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-surface-400" />
                      <span>{formatDate(demo.scheduled_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-surface-400" />
                      <span>
                        {demo.scheduled_time} ({demo.duration_minutes} mins)
                      </span>
                    </div>
                    {demo.conductor && (
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-surface-400" />
                        <span>Teacher: {demo.conductor.name}</span>
                      </div>
                    )}
                  </div>

                  {demo.feedback && (
                    <div className="rounded-lg bg-surface-50 p-2.5 text-xs text-surface-600 italic border border-surface-200/60">
                      &ldquo;{demo.feedback}&rdquo;
                    </div>
                  )}

                  {demo.result && (
                    <div className="text-xs font-semibold">
                      Student Sentiment:{' '}
                      <span
                        className={
                          demo.result === 'interested'
                            ? 'text-emerald-700'
                            : demo.result === 'needs_follow_up'
                            ? 'text-amber-700'
                            : 'text-surface-600'
                        }
                      >
                        {demo.result.replace(/_/g, ' ')}
                      </span>
                    </div>
                  )}
                </CardContent>

                <div className="p-4 pt-0 border-t border-surface-100 flex items-center justify-between mt-auto">
                  {demo.status === 'scheduled' && (
                    <a
                      href={waReminder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      title="Send WhatsApp demo reminder to parent"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Send Reminder</span>
                    </a>
                  )}

                  <Link
                    href={`/dashboard/demos/${demo.id}`}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <span>Manage</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

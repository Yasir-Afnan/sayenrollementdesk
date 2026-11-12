import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getEnquiryById,
  getFollowUps,
  getDemoClasses,
  getCourses,
} from '@/lib/data-provider'
import { PageHeader } from '@/components/ui/page-header'
import { StatusBadge } from '@/components/enquiries/StatusBadge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  formatDate,
  formatCurrency,
  generateWhatsAppLink,
  ENQUIRY_STATUS_LABELS,
} from '@/lib/utils'
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  GraduationCap,
  CheckCircle,
  FileText,
  User,
  BookOpen,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [enquiry, followUps, demos, courses] = await Promise.all([
    getEnquiryById(id),
    getFollowUps('all'),
    getDemoClasses(),
    getCourses(),
  ])

  if (!enquiry) {
    notFound()
  }

  const relatedFollowUps = followUps.filter((f) => f.enquiry_id === enquiry.id)
  const relatedDemos = demos.filter((d) => d.enquiry_id === enquiry.id)
  const course = courses.find((c) => c.id === enquiry.course_id)

  const waLink = generateWhatsAppLink(
    enquiry.guardian_phone,
    `Hello ${enquiry.guardian_name}, this is from EnrolmentDesk regarding ${enquiry.student_name}'s admissions inquiry.`
  )

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/dashboard/enquiries"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Enquiries</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-200/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-surface-900 font-sans">
              {enquiry.student_name}
            </h1>
            <StatusBadge status={enquiry.status} />
          </div>
          <p className="mt-1 text-xs text-surface-500">
            Enquiry recorded on {formatDate(enquiry.enquiry_date)} via{' '}
            <span className="font-semibold text-surface-700">{enquiry.source}</span>
          </p>
        </div>

        {/* Quick Contact CTAs */}
        <div className="flex items-center gap-2.5">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${enquiry.guardian_phone}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3.5 py-2 text-xs font-semibold text-surface-700 hover:bg-surface-50 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call Parent</span>
          </a>
        </div>
      </div>

      {/* Grid: Details & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student & Guardian Profile */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-surface-900">
                <User className="h-4 w-4 text-brand-600" />
                <span>Contact & Guardian Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Student Name
                </span>
                <p className="text-surface-900 font-semibold text-sm mt-0.5">
                  {enquiry.student_name}
                </p>
              </div>
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Guardian / Parent
                </span>
                <p className="text-surface-900 font-semibold text-sm mt-0.5">
                  {enquiry.guardian_name}
                </p>
              </div>
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Parent Phone
                </span>
                <p className="text-surface-900 font-semibold text-sm mt-0.5">
                  {enquiry.guardian_phone}
                </p>
              </div>
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Parent Email
                </span>
                <p className="text-surface-900 font-medium text-sm mt-0.5">
                  {enquiry.guardian_email || 'Not provided'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Academic & Program Info */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-surface-900">
                <BookOpen className="h-4 w-4 text-brand-600" />
                <span>Academic Interest & Course Allocation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Interested Course
                </span>
                <p className="text-surface-900 font-semibold text-sm mt-0.5">
                  {course?.name || 'General Guidance'}
                </p>
                {course?.fee_amount && (
                  <p className="text-brand-600 font-bold mt-1">
                    Course Fee: {formatCurrency(course.fee_amount)}
                  </p>
                )}
              </div>
              <div>
                <span className="text-surface-400 font-medium uppercase tracking-wider text-[10px]">
                  Academic Level
                </span>
                <p className="text-surface-900 font-semibold text-sm mt-0.5">
                  {enquiry.academic_level || 'Standard curriculum'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Admissions Notes */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-surface-900">
                <FileText className="h-4 w-4 text-brand-600" />
                <span>Admissions Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-xs text-surface-700 leading-relaxed whitespace-pre-wrap">
              {enquiry.notes || 'No specific notes logged for this student.'}
            </CardContent>
          </Card>

          {/* Related Demo Classes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-surface-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-surface-900">
                <GraduationCap className="h-4 w-4 text-brand-600" />
                <span>Trial / Demo Class Schedules</span>
              </CardTitle>
              <Link href={`/dashboard/demos/new?enquiryId=${enquiry.id}`}>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Schedule Demo
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              {relatedDemos.length === 0 ? (
                <p className="text-xs text-surface-400 py-3 text-center">
                  No demo classes scheduled yet for this student.
                </p>
              ) : (
                <div className="space-y-3">
                  {relatedDemos.map((demo) => (
                    <div
                      key={demo.id}
                      className="rounded-lg border border-surface-200 p-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-surface-900">
                            {formatDate(demo.scheduled_date)} at {demo.scheduled_time}
                          </span>
                          <span className="rounded bg-surface-100 px-2 py-0.5 text-[10px] uppercase font-bold text-surface-600">
                            {demo.status}
                          </span>
                        </div>
                        {demo.feedback && (
                          <p className="text-surface-600 mt-1 italic">&ldquo;{demo.feedback}&rdquo;</p>
                        )}
                      </div>
                      <Link
                        href={`/dashboard/demos/${demo.id}`}
                        className="text-xs font-semibold text-brand-600 hover:underline"
                      >
                        Manage Demo
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Actions & Tasks */}
        <div className="space-y-6">
          {/* Quick Follow-Up Scheduler */}
          <Card>
            <CardHeader className="pb-3 border-b border-surface-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-surface-900">
                <Clock className="h-4 w-4 text-brand-600" />
                <span>Follow-Up Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {relatedFollowUps.length === 0 ? (
                <p className="text-xs text-surface-400 py-2">
                  No follow-ups recorded.
                </p>
              ) : (
                relatedFollowUps.map((fup) => (
                  <div
                    key={fup.id}
                    className="rounded-lg bg-surface-50 p-3 text-xs border border-surface-200/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-surface-900">
                        {formatDate(fup.scheduled_date)}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${
                          fup.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fup.status}
                      </span>
                    </div>
                    <p className="text-surface-600">{fup.notes}</p>
                    {fup.outcome && (
                      <p className="mt-1 text-surface-800 font-medium">
                        Outcome: {fup.outcome}
                      </p>
                    )}
                  </div>
                ))
              )}

              <Link href="/dashboard/follow-ups">
                <Button size="sm" variant="outline" className="w-full text-xs mt-2">
                  Open Follow-up Workspace
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Institutional Compliance Box */}
          <div className="rounded-xl border border-surface-200 bg-surface-50 p-4 text-[11px] text-surface-500 space-y-2">
            <p className="font-semibold text-surface-700">Digital Privacy Compliance</p>
            <p>
              Guardian contact consent verified. Private educational records are isolated and
              protected under India DPDP Act provisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

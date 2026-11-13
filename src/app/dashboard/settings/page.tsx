import React from 'react'
import {
  getActiveInstitution,
  getCourses,
  getBatches,
  getStaffMembers,
} from '@/lib/data-provider'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'
import {
  Building2,
  BookOpen,
  Users,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Clock,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const [institution, courses, batches, staff] = await Promise.all([
    getActiveInstitution(),
    getCourses(),
    getBatches(),
    getStaffMembers(),
  ])

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Institution Settings & Curriculum"
        description="Configure your centre profile, contact details, active coaching courses, and faculty counselor access."
      />

      {/* 1. Centre Profile */}
      <Card>
        <CardHeader className="border-b border-surface-100 pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-surface-900">
            <Building2 className="h-4 w-4 text-brand-600" />
            <span>Centre Profile</span>
          </CardTitle>
          <CardDescription>
            Official institutional information displayed on parent QR forms and admissions receipts.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Institution Legal / Brand Name"
              defaultValue={institution.name}
              disabled
            />
            <Input
              label="Public URL Slug"
              defaultValue={institution.slug}
              disabled
              helperText={`URL: /enquire/${institution.slug}`}
            />
            <Input
              label="Centre Street Address"
              defaultValue={institution.address || '4th Block, Jayanagar'}
              disabled
            />
            <Input
              label="City & State"
              defaultValue={`${institution.city}, ${institution.state}`}
              disabled
            />
            <Input
              label="Official Contact Number"
              defaultValue={institution.phone || '+91 98450 12345'}
              disabled
            />
            <Input
              label="Admissions Email"
              defaultValue={institution.email || 'admissions@apexacademy.edu.in'}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Courses & Fee Structure */}
      <Card>
        <CardHeader className="border-b border-surface-100 pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-surface-900">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>Courses & Academic Programs ({courses.length})</span>
          </CardTitle>
          <CardDescription>
            Courses offered to prospective students during enquiry entry and QR submissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="divide-y divide-surface-100">
            {courses.map((course) => (
              <div
                key={course.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-xs font-bold text-surface-900">
                    {course.name}
                  </p>
                  <p className="text-[11px] text-surface-500">
                    {course.academic_level} • {course.duration_months} Months Duration
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-600">
                    {course.fee_amount ? formatCurrency(course.fee_amount) : 'Free'}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Batches */}
      <Card>
        <CardHeader className="border-b border-surface-100 pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-surface-900">
            <Clock className="h-4 w-4 text-brand-600" />
            <span>Classroom Batches ({batches.length})</span>
          </CardTitle>
          <CardDescription>
            Scheduled batch timings for demo allocations and student enrollments.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="divide-y divide-surface-100">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-xs font-bold text-surface-900">{batch.name}</p>
                  <p className="text-[11px] text-surface-500">
                    {batch.days_of_week?.join(', ')} • {batch.start_time} to {batch.end_time}
                  </p>
                </div>
                <div className="text-xs text-surface-600 font-medium">
                  {batch.current_students} / {batch.max_students} Students Enrolled
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Staff & Faculty Counselors */}
      <Card>
        <CardHeader className="border-b border-surface-100 pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-surface-900">
            <Users className="h-4 w-4 text-brand-600" />
            <span>Staff Members & Admissions Counselors</span>
          </CardTitle>
          <CardDescription>
            Team members authorised to manage student follow-ups and trial demo classes.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="divide-y divide-surface-100">
            {staff.map((member) => (
              <div
                key={member.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-xs font-bold text-surface-900">{member.name}</p>
                  <p className="text-[11px] text-surface-500">
                    {member.email} • {member.phone}
                  </p>
                </div>
                <span className="rounded-md bg-surface-100 px-2 py-0.5 text-[10px] font-bold uppercase text-surface-700">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Subscription Plan Status */}
      <Card className="border-brand-200 bg-brand-50/20">
        <CardHeader className="border-b border-brand-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-brand-950">
              <CreditCard className="h-4 w-4 text-brand-600" />
              <span>Commercial Plan &amp; Installation</span>
            </CardTitle>
            <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
              Standard Setup
            </span>
          </div>
          <CardDescription className="text-brand-800">
            Current subscription package for {institution.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-3 text-xs text-brand-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Full admissions pipeline with unlimited prospective student enquiries</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Dedicated QR Lead Capture and public admissions landing page</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Interactive WhatsApp message dispatch with pre-filled templates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Daily overdue follow-up queues and trial demo scheduling</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

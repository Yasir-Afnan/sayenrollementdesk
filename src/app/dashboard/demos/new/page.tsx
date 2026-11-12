import React from 'react'
import { getEnquiries, getCourses, getBatches, getStaffMembers } from '@/lib/data-provider'
import { PageHeader } from '@/components/ui/page-header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DemoScheduleForm } from '@/components/demos/DemoScheduleForm'

export const dynamic = 'force-dynamic'

export default async function NewDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ enquiryId?: string }>
}) {
  const { enquiryId } = await searchParams
  const [enquiries, courses, batches, staff] = await Promise.all([
    getEnquiries(),
    getCourses(),
    getBatches(),
    getStaffMembers(),
  ])

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link
          href="/dashboard/demos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Demo Schedule</span>
        </Link>
      </div>

      <PageHeader
        title="Schedule Trial / Demo Class"
        description="Book a dedicated classroom or trial slot for a prospective student."
      />

      <DemoScheduleForm
        enquiries={enquiries}
        courses={courses}
        batches={batches}
        staffMembers={staff}
        defaultEnquiryId={enquiryId}
      />
    </div>
  )
}

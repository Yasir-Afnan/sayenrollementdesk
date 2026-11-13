import React from 'react'
import { getCourses, getStaffMembers } from '@/lib/data-provider'
import { EnquiryForm } from '@/components/enquiries/EnquiryForm'
import { PageHeader } from '@/components/ui/page-header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewEnquiryPage() {
  const [courses, staff] = await Promise.all([
    getCourses(),
    getStaffMembers(),
  ])

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <Link
          href="/dashboard/enquiries"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Enquiries</span>
        </Link>
      </div>

      <PageHeader
        title="Record New Enquiry"
        description="Capture prospective student information from walk-ins, phone calls, or digital enquiries."
      />

      <EnquiryForm courses={courses} staffMembers={staff} />
    </div>
  )
}

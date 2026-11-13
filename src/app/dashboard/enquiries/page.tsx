import React from 'react'
import { getEnquiries, getCourses } from '@/lib/data-provider'
import { EnquiryTable } from '@/components/enquiries/EnquiryTable'
import { PageHeader } from '@/components/ui/page-header'

export const dynamic = 'force-dynamic'

export default async function EnquiriesPage() {
  const [enquiries, courses] = await Promise.all([
    getEnquiries(),
    getCourses(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Enquiries"
        description="Track prospective students across every stage of the admissions pipeline from first contact to admission."
      />

      <EnquiryTable initialEnquiries={enquiries} courses={courses} />
    </div>
  )
}

import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDemoClasses } from '@/lib/data-provider'
import { PageHeader } from '@/components/ui/page-header'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { DemoDetailManager } from '@/components/demos/DemoDetailManager'

export const dynamic = 'force-dynamic'

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const demos = await getDemoClasses()
  const demo = demos.find((d) => d.id === id)

  if (!demo) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl">
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
        title={`Demo Class: ${demo.enquiry?.student_name || 'Student'}`}
        description={`Scheduled on ${formatDate(demo.scheduled_date)} at ${demo.scheduled_time} for ${
          demo.course?.name || 'General Program'
        }.`}
      />

      <DemoDetailManager demo={demo} />
    </div>
  )
}

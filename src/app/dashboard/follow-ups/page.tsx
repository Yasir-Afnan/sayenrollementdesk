import React from 'react'
import { getFollowUps, getStaffMembers } from '@/lib/data-provider'
import { FollowUpList } from '@/components/follow-ups/FollowUpList'
import { PageHeader } from '@/components/ui/page-header'

export const dynamic = 'force-dynamic'

export default async function FollowUpsPage() {
  const [followUps, staff] = await Promise.all([
    getFollowUps('all'),
    getStaffMembers(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Follow-Up Workspace"
        description="Never miss a prospective parent conversation. Prioritize overdue calls, manage today's reminders, and log outcomes."
      />

      <FollowUpList initialFollowUps={followUps} staffMembers={staff} />
    </div>
  )
}

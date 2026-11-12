import React from 'react'
import {
  Users,
  UserPlus,
  PhoneCall,
  GraduationCap,
  Clock,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import type { DashboardMetrics } from '@/lib/types'

export function MetricsCards({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8">
      <StatCard
        label="Total Enquiries"
        value={metrics.totalEnquiries}
        icon={<Users className="h-4 w-4" />}
        subtitle="All pipeline records"
      />
      <StatCard
        label="New Enquiries"
        value={metrics.newEnquiries}
        icon={<UserPlus className="h-4 w-4" />}
        trend="up"
        change="Uncontacted"
        subtitle="Awaiting first call"
      />
      <StatCard
        label="Contacted"
        value={metrics.contactedParents}
        icon={<PhoneCall className="h-4 w-4" />}
        subtitle="In active dialogue"
      />
      <StatCard
        label="Demos Booked"
        value={metrics.demosScheduled}
        icon={<GraduationCap className="h-4 w-4" />}
        subtitle="Upcoming trial classes"
      />
      <StatCard
        label="Pending Tasks"
        value={metrics.pendingFollowUps}
        icon={<Clock className="h-4 w-4" />}
        trend={metrics.pendingFollowUps > 0 ? 'down' : 'neutral'}
        change={metrics.pendingFollowUps > 0 ? 'Action required' : 'Clear'}
        subtitle="Due or overdue"
      />
      <StatCard
        label="Admitted"
        value={metrics.admissions}
        icon={<CheckCircle2 className="h-4 w-4" />}
        trend="up"
        change="Converted"
        subtitle="Paid enrollments"
      />
      <StatCard
        label="Conversion"
        value={`${metrics.conversionRate}%`}
        icon={<TrendingUp className="h-4 w-4" />}
        trend="up"
        change="Target: >20%"
        subtitle="Enquiry to admission"
      />
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import {
  getDashboardMetrics,
  getEnquiries,
  getFollowUps,
  getActiveInstitution,
} from '@/lib/data-provider'
import { MetricsCards } from '@/components/dashboard/MetricsCards'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { Button } from '@/components/ui/button'
import { Plus, QrCode, MessageSquare, Sparkles, Building2, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [metrics, enquiries, followUps, institution] = await Promise.all([
    getDashboardMetrics(),
    getEnquiries(),
    getFollowUps('all'),
    getActiveInstitution(),
  ])

  const pendingOrTodayFollowUps = followUps.filter((f) => f.status === 'pending')

  return (
    <div className="space-y-7">
      {/* Top Banner & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-200/90 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-surface-950 font-sans">
              Admissions Command Center
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Pipeline</span>
            </span>
          </div>

          <p className="mt-1 text-xs text-surface-500 font-medium">
            Active admissions pipeline, parent inquiries, and demo trial velocity for{' '}
            <strong className="text-surface-800">{institution.name}</strong> •{' '}
            <span>{formatDate(new Date())}</span>
          </p>
        </div>

        {/* Top Action Cluster */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/dashboard/qr-capture">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 bg-white">
              <QrCode className="h-3.5 w-3.5 text-brand-600" />
              <span>Print Standee</span>
            </Button>
          </Link>
          <Link href="/dashboard/whatsapp">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 bg-white">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </Button>
          </Link>
          <Link href="/dashboard/enquiries/new">
            <Button size="sm" className="gap-1.5 text-xs h-9 shadow-xs">
              <Plus className="h-4 w-4" />
              <span>New Enquiry</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <MetricsCards metrics={metrics} />

      {/* Velocity and Distribution Visualizations */}
      <DashboardCharts enquiries={enquiries} />

      {/* Action Feeds: Recent Enquiries & Follow-up Queue */}
      <RecentActivity
        recentEnquiries={enquiries}
        upcomingFollowUps={pendingOrTodayFollowUps}
      />
    </div>
  )
}

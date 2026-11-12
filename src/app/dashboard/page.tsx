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
import { Plus, QrCode, MessageSquare, Sparkles, Building2 } from 'lucide-react'

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
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-surface-900 font-sans">
              Admissions Overview
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 border border-brand-200">
              <Sparkles className="h-3 w-3" /> Live Pipeline
            </span>
          </div>
          <p className="mt-1 text-xs text-surface-500">
            Real-time enquiry velocity, demo schedule metrics, and follow-up queues for{' '}
            <span className="font-semibold text-surface-700">{institution.name}</span>.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/dashboard/qr-capture">
            <Button variant="outline" size="sm" className="gap-1.5">
              <QrCode className="h-3.5 w-3.5" />
              <span>QR Code</span>
            </Button>
          </Link>
          <Link href="/dashboard/whatsapp">
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </Button>
          </Link>
          <Link href="/dashboard/enquiries/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>New Enquiry</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <MetricsCards metrics={metrics} />

      {/* Analytics Visualizations */}
      <DashboardCharts enquiries={enquiries} />

      {/* Action Feeds: Recent Enquiries & Follow-up Queue */}
      <RecentActivity
        recentEnquiries={enquiries}
        upcomingFollowUps={pendingOrTodayFollowUps}
      />
    </div>
  )
}

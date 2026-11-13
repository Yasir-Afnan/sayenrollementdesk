'use client'

import React from 'react'
import {
  Users,
  UserPlus,
  PhoneCall,
  GraduationCap,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react'
import type { DashboardMetrics } from '@/lib/types'

export function MetricsCards({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 mb-8">
      {/* 1. Total Enquiries */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between dark:bg-[#0e1424] dark:border-surface-800">
        <div className="flex items-center justify-between text-surface-500 dark:text-surface-400">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Inflow</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-extrabold text-surface-950 dark:text-white font-sans tracking-tight tabular-nums">
            {metrics.totalEnquiries}
          </p>
          <span className="text-[11px] text-surface-400 dark:text-surface-500 font-medium">All student leads</span>
        </div>
      </div>

      {/* 2. New Enquiries */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between border-blue-200/80 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/20">
        <div className="flex items-center justify-between text-blue-800 dark:text-blue-300">
          <span className="text-[10px] font-bold uppercase tracking-wider">New Uncontacted</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            <UserPlus className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <p className="text-2xl font-extrabold text-blue-950 dark:text-blue-200 font-sans tracking-tight tabular-nums">
              {metrics.newEnquiries}
            </p>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Pending Call</span>
          </div>
          <span className="text-[11px] text-blue-700/80 dark:text-blue-400/80 font-medium">Action: 1st contact</span>
        </div>
      </div>

      {/* 3. Contacted */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between dark:bg-[#0e1424] dark:border-surface-800">
        <div className="flex items-center justify-between text-surface-500 dark:text-surface-400">
          <span className="text-[10px] font-bold uppercase tracking-wider">In Dialogue</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
            <PhoneCall className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-extrabold text-surface-950 dark:text-white font-sans tracking-tight tabular-nums">
            {metrics.contactedParents}
          </p>
          <span className="text-[11px] text-surface-400 dark:text-surface-500 font-medium">Parent engaged</span>
        </div>
      </div>

      {/* 4. Demos Scheduled */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between border-purple-200/80 dark:border-purple-900/50 bg-purple-50/20 dark:bg-purple-950/20">
        <div className="flex items-center justify-between text-purple-800 dark:text-purple-300">
          <span className="text-[10px] font-bold uppercase tracking-wider">Demo Classes</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
            <GraduationCap className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-extrabold text-purple-950 dark:text-purple-200 font-sans tracking-tight tabular-nums">
            {metrics.demosScheduled}
          </p>
          <span className="text-[11px] text-purple-700/80 dark:text-purple-400/80 font-medium">Classroom trials</span>
        </div>
      </div>

      {/* 5. Pending Tasks (Follow-ups) */}
      <div className={`saas-card rounded-2xl p-4 flex flex-col justify-between ${
        metrics.pendingFollowUps > 0
          ? 'border-amber-200/90 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20'
          : 'dark:bg-[#0e1424] dark:border-surface-800'
      }`}>
        <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
          <span className="text-[10px] font-bold uppercase tracking-wider">Pending Calls</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <p className="text-2xl font-extrabold text-amber-950 dark:text-amber-200 font-sans tracking-tight tabular-nums">
              {metrics.pendingFollowUps}
            </p>
            {metrics.pendingFollowUps > 0 && (
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-2.5 w-2.5 mr-0.5" /> Due
              </span>
            )}
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Scheduled reminders</span>
        </div>
      </div>

      {/* 6. Confirmed Admissions */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/20">
        <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
          <span className="text-[10px] font-bold uppercase tracking-wider">Admitted</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-200 font-sans tracking-tight tabular-nums">
              {metrics.admissions}
            </p>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Paid Enrolled</span>
          </div>
          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 font-medium">Active students</span>
        </div>
      </div>

      {/* 7. Conversion Rate */}
      <div className="saas-card rounded-2xl p-4 flex flex-col justify-between border-sky-200/80 dark:border-sky-900/50 bg-sky-50/20 dark:bg-sky-950/20">
        <div className="flex items-center justify-between text-sky-800 dark:text-sky-300">
          <span className="text-[10px] font-bold uppercase tracking-wider">Conversion</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-extrabold text-sky-950 dark:text-sky-200 font-sans tracking-tight tabular-nums">
              {metrics.conversionRate}%
            </p>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> Target &gt;20%
            </span>
          </div>
          <span className="text-[11px] text-sky-700/80 dark:text-sky-400/80 font-medium">Lead to fee payment</span>
        </div>
      </div>
    </div>
  )
}

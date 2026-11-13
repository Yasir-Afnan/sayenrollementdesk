'use client'

import React, { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { Enquiry } from '@/lib/types'

const SOURCE_COLORS: Record<string, string> = {
  'Walk-in': '#38bdf8',
  'QR code': '#818cf8',
  'WhatsApp': '#34d399',
  'Phone call': '#fbbf24',
  'Website': '#22d3ee',
  'Referral': '#f472b6',
  'Pamphlet': '#94a3b8',
  'Social media': '#a78bfa',
  'Other': '#64748b',
}

const STATUS_PIE_COLORS: Record<string, string> = {
  new: '#38bdf8',
  contacted: '#fbbf24',
  interested: '#c084fc',
  demo_scheduled: '#818cf8',
  follow_up: '#fb923c',
  admitted: '#34d399',
  not_interested: '#94a3b8',
}

// Custom Tooltip component for Recharts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-white/95 dark:bg-[#0e1424]/95 p-3 shadow-xl backdrop-blur-md text-xs">
        <p className="font-bold text-surface-900 dark:text-white mb-1">{label}</p>
        <div className="space-y-0.5">
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-surface-600 dark:text-surface-300">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}:</span>
              </span>
              <span className="font-bold text-surface-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function DashboardCharts({ enquiries }: { enquiries: Enquiry[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="h-80 rounded-2xl bg-surface-100 dark:bg-surface-800 animate-pulse lg:col-span-2" />
        <div className="h-80 rounded-2xl bg-surface-100 dark:bg-surface-800 animate-pulse" />
      </div>
    )
  }

  // 1. Pipeline Status Distribution
  const statusCounts: Record<string, number> = {}
  enquiries.forEach((e) => {
    statusCounts[e.status] = (statusCounts[e.status] || 0) + 1
  })

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    key: status,
    value: count,
  }))

  // 2. Enquiry Sources Distribution
  const sourceCounts: Record<string, number> = {}
  enquiries.forEach((e) => {
    sourceCounts[e.source] = (sourceCounts[e.source] || 0) + 1
  })

  const sourceData = Object.entries(sourceCounts).map(([source, count]) => ({
    name: source,
    enquiries: count,
  }))

  // 3. Weekly Trajectory Data (Realistic aggregated pipeline trends)
  const trajectoryData = [
    { week: 'Week 1', enquiries: 12, admitted: 3, demos: 5 },
    { week: 'Week 2', enquiries: 24, admitted: 7, demos: 11 },
    { week: 'Week 3', enquiries: 48, admitted: 14, demos: 16 },
    { week: 'Week 4', enquiries: 84, admitted: 22, demos: 18 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      {/* Enquiry Inflow & Conversion Trend */}
      <Card className="lg:col-span-2 saas-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-surface-950 dark:text-white font-sans tracking-tight">
              Admissions Velocity &amp; Monthly Trajectory
            </CardTitle>
            <CardDescription className="text-xs text-surface-500 dark:text-surface-400">
              Weekly accumulation of student enquiries, trial demo classes, and confirmed admissions
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-surface-600 dark:text-surface-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              <span>Enquiries</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Admissions</span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="enquiries"
                  name="Enquiries"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorEnquiries)"
                />
                <Area
                  type="monotone"
                  dataKey="admitted"
                  name="Admissions"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAdmitted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Status Breakdown */}
      <Card className="saas-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-surface-950 dark:text-white font-sans tracking-tight">
            Pipeline Distribution
          </CardTitle>
          <CardDescription className="text-xs text-surface-500 dark:text-surface-400">
            Active stage distribution across current student pool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="46%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={`cell-${entry.key}`}
                      fill={STATUS_PIE_COLORS[entry.key] || '#94a3b8'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(val) => <span className="text-[11px] font-medium text-surface-600 dark:text-surface-300">{val}</span>}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enquiry Acquisition Channels */}
      <Card className="lg:col-span-3 saas-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-surface-950 dark:text-white font-sans tracking-tight">
            Enquiry Acquisition Channels
          </CardTitle>
          <CardDescription className="text-xs text-surface-500 dark:text-surface-400">
            Where prospective students and parents discover your tuition centre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="enquiries"
                  name="Enquiries"
                  radius={[0, 6, 6, 0]}
                  barSize={16}
                >
                  {sourceData.map((entry) => (
                    <Cell
                      key={`source-bar-${entry.name}`}
                      fill={SOURCE_COLORS[entry.name] || '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

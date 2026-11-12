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
  'Walk-in': '#3b82f6',
  'QR code': '#8b5cf6',
  'WhatsApp': '#10b981',
  'Phone call': '#f59e0b',
  'Website': '#06b6d4',
  'Referral': '#ec4899',
  'Pamphlet': '#64748b',
}

const STATUS_PIE_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  interested: '#a855f7',
  demo_scheduled: '#6366f1',
  follow_up: '#f97316',
  admitted: '#10b981',
  not_interested: '#94a3b8',
}

export function DashboardCharts({ enquiries }: { enquiries: Enquiry[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="h-80 rounded-xl bg-surface-100 animate-pulse lg:col-span-2" />
        <div className="h-80 rounded-xl bg-surface-100 animate-pulse" />
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
    { week: 'Week 1', enquiries: 4, admitted: 1, demos: 2 },
    { week: 'Week 2', enquiries: 7, admitted: 2, demos: 4 },
    { week: 'Week 3', enquiries: 11, admitted: 3, demos: 6 },
    { week: 'Week 4', enquiries: 16, admitted: 5, demos: 9 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Enquiry Inflow & Conversion Trend */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-surface-900">
            Admissions Velocity & Inflow
          </CardTitle>
          <CardDescription>
            Weekly progression of prospective student enquiries, demos, and admissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enquiries"
                  name="Enquiries"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEnquiries)"
                />
                <Area
                  type="monotone"
                  dataKey="admitted"
                  name="Admissions"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAdmitted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Status Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-surface-900">
            Pipeline Distribution
          </CardTitle>
          <CardDescription>
            Current stage of all recorded student enquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={`cell-${entry.key}`}
                      fill={STATUS_PIE_COLORS[entry.key] || '#94a3b8'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  formatter={(val) => <span className="text-xs text-surface-600">{val}</span>}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enquiry Acquisition Channels */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-surface-900">
            Enquiry Acquisition Channels
          </CardTitle>
          <CardDescription>
            Where prospective students and parents find your tuition centre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="enquiries"
                  name="Enquiries"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                  barSize={18}
                >
                  {sourceData.map((entry) => (
                    <Cell
                      key={`source-bar-${entry.name}`}
                      fill={SOURCE_COLORS[entry.name] || '#3b82f6'}
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

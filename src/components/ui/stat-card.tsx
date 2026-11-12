import * as React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon,
  change,
  trend = 'neutral',
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-xs hover:border-surface-300 transition-all',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-surface-500">
          {label}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-100 text-surface-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-surface-900 font-sans">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold',
              trend === 'up'
                ? 'text-emerald-600'
                : trend === 'down'
                ? 'text-red-600'
                : 'text-surface-500'
            )}
          >
            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {trend === 'neutral' && <Minus className="h-3 w-3" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-surface-400 font-medium">{subtitle}</p>
      )}
    </div>
  )
}

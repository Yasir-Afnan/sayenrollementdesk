'use client'

import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS } from '@/lib/utils'
import type { EnquiryStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  status: EnquiryStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide capitalize',
        ENQUIRY_STATUS_COLORS[status] || 'bg-surface-100 text-surface-700',
        className
      )}
    >
      {ENQUIRY_STATUS_LABELS[status] || status}
    </span>
  )
}

export default StatusBadge

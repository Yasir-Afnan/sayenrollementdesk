import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Spinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }
  return (
    <Loader2
      className={cn('animate-spin text-brand-600', sizeClasses[size], className)}
    />
  )
}

export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm font-medium text-surface-500">{message}</p>
    </div>
  )
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-200/70', className)}
      {...props}
    />
  )
}

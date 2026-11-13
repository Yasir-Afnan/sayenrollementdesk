'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={cn(
          'relative w-full rounded-2xl bg-white p-6 shadow-2xl border border-surface-200 transition-all z-10 animate-in fade-in zoom-in-95',
          maxWidthClasses[maxWidth]
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-surface-400 hover:bg-surface-100 hover:text-surface-700 transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {title && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-surface-900">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-surface-500">{description}</p>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  )
}

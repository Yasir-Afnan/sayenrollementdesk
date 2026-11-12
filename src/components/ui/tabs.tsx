'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsContextType {
  activeTab: string
  setActiveTab: (val: string) => void
}

const TabsContext = React.createContext<TabsContextType | null>(null)

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (val: string) => void
  children: React.ReactNode
  className?: string
}) {
  const [internalTab, setInternalTab] = React.useState(defaultValue || '')
  const activeTab = value !== undefined ? value : internalTab

  const handleTabChange = (val: string) => {
    if (value === undefined) {
      setInternalTab(val)
    }
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex h-11 items-center justify-start rounded-xl bg-surface-100 p-1 text-surface-600 gap-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
  badge,
  className,
}: {
  value: string
  children: React.ReactNode
  badge?: number | string
  className?: string
}) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be within Tabs')

  const isActive = context.activeTab === value

  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer',
        isActive
          ? 'bg-white text-surface-900 shadow-xs font-semibold'
          : 'text-surface-600 hover:text-surface-900 hover:bg-white/50',
        className
      )}
    >
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'ml-1 rounded-full px-2 py-0.5 text-xs',
            isActive
              ? 'bg-brand-50 text-brand-700 font-semibold'
              : 'bg-surface-200 text-surface-700'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be within Tabs')

  if (context.activeTab !== value) return null

  return (
    <div className={cn('mt-4 focus-visible:outline-none', className)}>
      {children}
    </div>
  )
}

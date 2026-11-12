'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Clock,
  GraduationCap,
  MessageSquare,
  QrCode,
  Settings,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Enquiries',
    href: '/dashboard/enquiries',
    icon: Users,
  },
  {
    name: 'Follow-ups',
    href: '/dashboard/follow-ups',
    icon: Clock,
  },
  {
    name: 'Demo Classes',
    href: '/dashboard/demos',
    icon: GraduationCap,
  },
  {
    name: 'WhatsApp Desk',
    href: '/dashboard/whatsapp',
    icon: MessageSquare,
  },
  {
    name: 'QR Lead Capture',
    href: '/dashboard/qr-capture',
    icon: QrCode,
  },
  {
    name: 'Settings & Courses',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar({
  institutionName = 'Apex Academy',
  slug = 'apex-academy-bengaluru',
  className,
}: {
  institutionName?: string
  slug?: string
  className?: string
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'flex h-screen w-64 flex-col border-r border-surface-200 bg-surface-900 text-white select-none',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-surface-800">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-bold text-white shadow-xs">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight">
              EnrolmentDesk
            </span>
            <span className="text-[10px] font-medium text-surface-400">
              Admissions, organised.
            </span>
          </div>
        </Link>
      </div>

      {/* Institution Switcher / Badge */}
      <div className="px-4 py-3 border-b border-surface-800/80 bg-surface-950/40">
        <div className="flex items-center justify-between text-xs text-surface-400 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[10px]">
            Institution
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-brand-950/80 px-1.5 py-0.5 text-[10px] font-medium text-brand-400 border border-brand-800/50">
            <Sparkles className="h-2.5 w-2.5" /> Demo Mode
          </span>
        </div>
        <p className="text-xs font-semibold text-surface-100 truncate">
          {institutionName}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname?.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all',
                isActive
                  ? 'bg-brand-600 text-white shadow-sm font-semibold'
                  : 'text-surface-300 hover:bg-surface-800 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isActive ? 'text-white' : 'text-surface-400 group-hover:text-white'
                  )}
                />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-brand-200" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Public Form Link */}
      <div className="p-4 border-t border-surface-800">
        <a
          href={`/enquire/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl bg-surface-800/80 p-3 text-xs text-surface-300 hover:bg-surface-800 hover:text-white transition-all border border-surface-700/50"
        >
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4 text-brand-400" />
            <span className="font-medium">Public Enquiry Page</span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-surface-400" />
        </a>
      </div>
    </aside>
  )
}

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
  MapPin,
  Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    name: 'Admissions Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Enquiries Pipeline',
    href: '/dashboard/enquiries',
    icon: Users,
    badge: '8',
  },
  {
    name: 'Follow-up Workspace',
    href: '/dashboard/follow-ups',
    icon: Clock,
    alertBadge: '2 Due',
  },
  {
    name: 'Trial & Demo Classes',
    href: '/dashboard/demos',
    icon: GraduationCap,
    badge: '3',
  },
  {
    name: 'WhatsApp Desk',
    href: '/dashboard/whatsapp',
    icon: MessageSquare,
  },
  {
    name: 'QR Lead Standee',
    href: '/dashboard/qr-capture',
    icon: QrCode,
  },
  {
    name: 'Centre & Courses',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar({
  institutionName = 'Apex Academy of Science',
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
        'flex h-screen w-64 flex-col border-r border-surface-800 bg-[#0B0F19] text-white select-none z-30',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-surface-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 font-extrabold text-white shadow-sm ring-1 ring-white/20">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight group-hover:text-brand-300 transition-colors">
              Enrolment<span className="text-sky-400">Desk</span>
            </span>
            <span className="text-[10px] font-medium text-surface-400">
              Admissions, organised.
            </span>
          </div>
        </Link>
      </div>

      {/* Centre Campus Switcher Card */}
      <div className="p-3 mx-3 my-3 rounded-xl border border-surface-800 bg-surface-900/60 backdrop-blur-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-surface-400 flex items-center gap-1">
            <Building2 className="h-3 w-3 text-sky-400" />
            <span>Centre</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-amber-950/90 px-1.5 py-0.2 text-[9px] font-semibold text-amber-300 border border-amber-800/60">
            <Sparkles className="h-2 w-2" /> Demo Mode
          </span>
        </div>
        <p className="text-xs font-bold text-surface-100 truncate">
          {institutionName}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-surface-400 mt-0.5">
          <MapPin className="h-2.5 w-2.5 text-surface-500" />
          <span>Jayanagar, Bengaluru</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-surface-500">
          Main Workspace
        </p>

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
                'group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all cursor-pointer',
                isActive
                  ? 'bg-brand-600 text-white font-semibold shadow-xs ring-1 ring-white/15'
                  : 'text-surface-300 hover:bg-surface-800/80 hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isActive ? 'text-white' : 'text-surface-400 group-hover:text-sky-400'
                  )}
                />
                <span>{item.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.alertBadge && (
                  <span className="rounded-full bg-red-500/20 px-1.5 py-0.2 text-[9px] font-bold text-red-300 border border-red-500/30">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && (
                  <span className={cn(
                    'rounded-full px-1.5 py-0.2 text-[9px] font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-surface-800 text-surface-300'
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="h-3 w-3 text-sky-200" />}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Public Standee Banner */}
      <div className="p-3 border-t border-surface-800/80 bg-surface-950/40">
        <a
          href={`/enquire/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl bg-surface-800/50 p-2.5 text-xs text-surface-300 hover:bg-surface-800 hover:text-white transition-all border border-surface-700/50 group"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-brand-500/20 text-brand-400 group-hover:bg-brand-500/30">
              <QrCode className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] leading-tight">Public Admissions Page</span>
              <span className="text-[9px] text-surface-400">Scan &amp; Enquire QR</span>
            </div>
          </div>
          <ExternalLink className="h-3 w-3 text-surface-400 group-hover:text-white" />
        </a>
      </div>
    </aside>
  )
}

'use client'

import React, { useState } from 'react'
import {
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Plus,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Command,
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { logout } from '@/lib/actions/auth'

export function TopBar({
  userName = 'Dr. Anand Rao',
  institutionName = 'Apex Academy of Science & Mathematics',
  onMobileMenuToggle,
  isMobileMenuOpen,
}: {
  userName?: string
  institutionName?: string
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-surface-200/90 bg-white/95 px-4 md:px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="rounded-lg p-2 text-surface-600 hover:bg-surface-100 lg:hidden cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle navigation</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-surface-500 font-medium">
          <span className="font-bold text-surface-900 tracking-tight">{institutionName}</span>
          <span className="text-surface-300">/</span>
          <span className="text-surface-600">Admissions Desk</span>
        </div>
      </div>

      {/* Center/Right: Quick Search & Actions */}
      <div className="flex items-center gap-2.5">
        {/* Global Search Bar (Linear style) */}
        <Link
          href="/dashboard/enquiries"
          className="hidden md:flex items-center gap-2 h-9 w-64 rounded-xl border border-surface-200 bg-surface-50/70 px-3 text-xs text-surface-400 hover:border-surface-300 hover:bg-white transition-all cursor-pointer shadow-2xs"
        >
          <Search className="h-3.5 w-3.5 text-surface-400" />
          <span className="truncate">Search students, phone...</span>
          <kbd className="ml-auto flex items-center gap-0.5 rounded border border-surface-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-surface-400 shadow-2xs">
            ⌘K
          </kbd>
        </Link>

        {/* Notifications Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-800 transition-colors cursor-pointer"
            title="Follow-up notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-surface-200 bg-white p-3 shadow-xl z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-surface-100 pb-2 mb-2 font-bold text-surface-900">
                <span>Admissions Alerts</span>
                <span className="rounded bg-red-100 text-red-700 px-1.5 py-0.2 text-[10px]">2 Urgent</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/dashboard/follow-ups"
                  onClick={() => setShowNotifications(false)}
                  className="block p-2 rounded-lg bg-red-50/50 hover:bg-red-50 border border-red-200/60"
                >
                  <p className="font-bold text-red-900">Siddharth Rao — Call Overdue</p>
                  <p className="text-[11px] text-red-700">JEE Foundation fee structure request</p>
                </Link>
                <Link
                  href="/dashboard/demos"
                  onClick={() => setShowNotifications(false)}
                  className="block p-2 rounded-lg bg-surface-50 hover:bg-surface-100 border border-surface-200"
                >
                  <p className="font-bold text-surface-900">Tarun Reddy — Demo Saturday</p>
                  <p className="text-[11px] text-surface-500">Class 12 NEET Biology trial session</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick New Enquiry CTA */}
        <Link href="/dashboard/enquiries/new">
          <Button size="sm" className="gap-1.5 text-xs shadow-xs">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Enquiry</span>
          </Button>
        </Link>

        {/* User Profile */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-brand-500/20 transition-all cursor-pointer"
          >
            <Avatar name={userName} size="sm" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-surface-200 bg-white p-2 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="border-b border-surface-100 px-3 py-2.5">
                <p className="font-bold text-surface-900">{userName}</p>
                <p className="text-[11px] text-surface-500">Director / Centre Head</p>
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Apex Academy Bangalore</span>
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-surface-700 hover:bg-surface-50 font-medium transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-surface-400" />
                  <span>Centre Profile &amp; Courses</span>
                </Link>
                <Link
                  href="/features"
                  target="_blank"
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-surface-700 hover:bg-surface-50 font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-3.5 w-3.5 text-surface-400" />
                    <span>Documentation &amp; Guides</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-surface-400" />
                </Link>
              </div>

              <div className="border-t border-surface-100 pt-1">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

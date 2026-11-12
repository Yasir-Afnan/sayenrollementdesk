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

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-surface-200 bg-white/90 px-6 backdrop-blur-md">
      {/* Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="rounded-lg p-1.5 text-surface-600 hover:bg-surface-100 lg:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle navigation</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-surface-500 font-medium">
          <span className="font-semibold text-surface-900">{institutionName}</span>
          <span className="text-surface-300">/</span>
          <span>Admissions Desk</span>
        </div>
      </div>

      {/* Action Center */}
      <div className="flex items-center gap-3">
        {/* Quick New Enquiry CTA */}
        <Link href="/dashboard/enquiries/new">
          <Button size="sm" className="hidden sm:inline-flex gap-1.5">
            <Plus className="h-4 w-4" />
            <span>New Enquiry</span>
          </Button>
        </Link>

        {/* Demo Mode Notice */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Interactive Demo Data</span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-100 transition-colors"
          >
            <Avatar name={userName} size="sm" />
            <span className="hidden text-xs font-semibold text-surface-800 lg:inline-block pr-1">
              {userName}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-surface-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="border-b border-surface-100 px-3 py-2">
                <p className="text-xs font-semibold text-surface-900">{userName}</p>
                <p className="text-[11px] text-surface-500 truncate">
                  Director / Centre Head
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-surface-700 hover:bg-surface-50 font-medium"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Centre Profile & Settings</span>
                </Link>
                <Link
                  href="/features"
                  target="_blank"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-surface-700 hover:bg-surface-50 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Documentation & Help</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-surface-400" />
                </Link>
              </div>

              <div className="border-t border-surface-100 pt-1">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
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

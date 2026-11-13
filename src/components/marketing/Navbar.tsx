'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200/80 dark:border-surface-800/80 bg-white/85 dark:bg-[#070b14]/85 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 font-extrabold text-white shadow-xs group-hover:shadow-sm transition-all">
            E
          </div>
          <span className="text-lg font-bold tracking-tight text-surface-950 dark:text-white font-sans">
            Enrolment<span className="text-brand-600 dark:text-brand-400">Desk</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-semibold text-surface-600 dark:text-surface-300 transition-colors hover:text-surface-950 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-xs font-semibold text-surface-700 dark:text-surface-300 hover:text-surface-950 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-xs active:scale-95 transition-all glow-brand"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Try Interactive Demo</span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0d1424] px-6 pb-6 pt-4 md:hidden animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-surface-700 dark:text-surface-200 py-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-surface-100 dark:border-surface-800 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center text-sm font-semibold text-surface-700 dark:text-surface-200 py-2 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center text-sm font-semibold text-white py-2.5 rounded-xl bg-brand-600 shadow-xs"
              >
                Try Interactive Demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

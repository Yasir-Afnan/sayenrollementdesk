'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/50 animate-pulse ${className}`}
        aria-hidden="true"
      />
    )
  }

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/80 border border-surface-200 dark:border-surface-800/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${className}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-indigo-400" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export function ThemeSegmentedControl() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-100/70 dark:bg-surface-900/80 backdrop-blur-sm text-xs">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
          theme === 'light'
            ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
            : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
        }`}
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span>Light</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
          theme === 'dark'
            ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
            : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
        }`}
      >
        <Moon className="w-3.5 h-3.5 text-indigo-400" />
        <span>Dark</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
          theme === 'system'
            ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
            : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>System</span>
      </button>
    </div>
  )
}

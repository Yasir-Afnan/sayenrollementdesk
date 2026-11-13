'use client'

import { useState } from 'react'
import Link from 'next/link'
import { register } from '@/lib/actions/auth'
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)
    try {
      const result = await register(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // redirect throws
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] p-8 shadow-sm transition-colors">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white font-bold text-xl shadow-xs mb-3">
          E
        </div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white font-sans">
          Create your centre account
        </h1>
        <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
          Get started with EnrolmentDesk admissions workspace
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-700 dark:text-red-300 font-medium border border-red-200 dark:border-red-900/60">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300"
          >
            Director / Coordinator Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Dr. Anand Rao"
              className="w-full rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#070b14] py-2.5 pl-10 pr-4 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="anand@apexacademy.in"
              className="w-full rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#070b14] py-2.5 pl-10 pr-4 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#070b14] py-2.5 pl-10 pr-4 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60 cursor-pointer shadow-xs glow-brand"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          Create Centre Account
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

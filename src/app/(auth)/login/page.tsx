'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/actions/auth'
import { LogIn, Mail, Lock, Loader2, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)
    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // redirect throws, which is expected
    } finally {
      setLoading(false)
    }
  }

  function handleFillDemo() {
    setEmail('demo@enrolmentdesk.in')
    setPassword('demo1234')
  }

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white font-bold text-xl shadow-xs mb-3">
          E
        </div>
        <h1 className="text-2xl font-bold text-surface-900 font-sans">
          Welcome back
        </h1>
        <p className="mt-1 text-xs text-surface-500">
          Sign in to your EnrolmentDesk admissions workspace
        </p>
      </div>

      {/* Demo Credentials Quick-Fill Banner */}
      <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50/50 p-3.5 text-xs text-brand-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="h-4 w-4 text-brand-600" />
            <span>Interactive Demo Mode</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-brand-700 underline hover:text-brand-800 cursor-pointer"
          >
            Auto-fill credentials
          </button>
        </div>
        <p className="mt-1 text-[11px] text-brand-700 leading-relaxed">
          Evaluate with sample centre data: <span className="font-mono font-semibold">demo@enrolmentdesk.in</span> / <span className="font-mono font-semibold">demo1234</span>
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-600"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@centre.edu.in"
              className="w-full rounded-lg border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-surface-600"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/reset-password"
            className="text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 cursor-pointer shadow-xs"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          Sign in to Dashboard
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-surface-500">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/register"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Create centre account
        </Link>
      </p>
    </div>
  )
}

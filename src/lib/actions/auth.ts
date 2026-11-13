'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { isSupabaseConfigured } from '@/lib/data-provider'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  // Demo account bypass or when Supabase is not yet configured
  if (email === 'demo@enrolmentdesk.in' || !isSupabaseConfigured()) {
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { error: 'All fields are required.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  if (!isSupabaseConfigured()) {
    revalidatePath('/', 'layout')
    redirect('/dashboard/onboarding')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/onboarding')
}

export async function logout() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch {
      // fallback
    }
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required.' }
  }

  if (!isSupabaseConfigured()) {
    return { success: 'Password reset link sent (Demo simulation). Check your inbox.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard/settings`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Password reset email sent. Check your inbox.' }
}

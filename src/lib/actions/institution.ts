'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

export async function createInstitution(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const city = (formData.get('city') as string) || 'Bengaluru'
  const pincode = formData.get('pincode') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string

  if (!name) {
    return { error: 'Institution name is required.' }
  }

  const baseSlug = generateSlug(name)
  const slug = `${baseSlug}-${Date.now().toString(36)}`

  const { data: institution, error: instError } = await supabase
    .from('institutions')
    .insert({
      name,
      slug,
      address: address || null,
      city,
      pincode: pincode || null,
      phone: phone || null,
      email: email || null,
      owner_user_id: user.id,
    })
    .select()
    .single()

  if (instError) {
    return { error: instError.message }
  }

  // Create the owner staff member record
  const { error: staffError } = await supabase.from('staff_members').insert({
    user_id: user.id,
    institution_id: institution.id,
    role: 'owner',
    name: user.user_metadata?.full_name || user.email || 'Owner',
    email: user.email,
  })

  if (staffError) {
    return { error: staffError.message }
  }

  return { success: true, institutionId: institution.id }
}

export async function updateInstitution(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const institutionId = formData.get('institutionId') as string
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const city = formData.get('city') as string
  const pincode = formData.get('pincode') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string

  if (!institutionId || !name) {
    return { error: 'Institution name is required.' }
  }

  const { error } = await supabase
    .from('institutions')
    .update({
      name,
      address: address || null,
      city: city || 'Bengaluru',
      pincode: pincode || null,
      phone: phone || null,
      email: email || null,
    })
    .eq('id', institutionId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/settings')
  return { success: true }
}

export async function addCourse(formData: FormData) {
  const supabase = await createClient()

  const institutionId = formData.get('institutionId') as string
  const name = formData.get('name') as string
  const academicLevel = formData.get('academicLevel') as string
  const feeAmount = formData.get('feeAmount') as string

  if (!institutionId || !name) {
    return { error: 'Course name is required.' }
  }

  const { data, error } = await supabase
    .from('courses')
    .insert({
      institution_id: institutionId,
      name,
      academic_level: academicLevel || null,
      fee_amount: feeAmount ? parseFloat(feeAmount) : null,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/onboarding')
  return { success: true, course: data }
}

export async function addBatch(formData: FormData) {
  const supabase = await createClient()

  const institutionId = formData.get('institutionId') as string
  const courseId = formData.get('courseId') as string
  const name = formData.get('name') as string
  const startTime = formData.get('startTime') as string
  const endTime = formData.get('endTime') as string
  const daysString = formData.get('days') as string

  if (!institutionId || !courseId || !name) {
    return { error: 'Batch name and course are required.' }
  }

  const daysOfWeek = daysString ? daysString.split(',') : []

  const { data, error } = await supabase
    .from('batches')
    .insert({
      institution_id: institutionId,
      course_id: courseId,
      name,
      start_time: startTime || null,
      end_time: endTime || null,
      days_of_week: daysOfWeek.length > 0 ? daysOfWeek : null,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/onboarding')
  return { success: true, batch: data }
}

export async function getUserInstitution() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('institutions')
    .select('*')
    .eq('owner_user_id', user.id)
    .single()

  return data
}

export async function getInstitutionCourses(institutionId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('institution_id', institutionId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return data || []
}

export async function getInstitutionBatches(institutionId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('batches')
    .select('*, courses(*)')
    .eq('institution_id', institutionId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return data || []
}

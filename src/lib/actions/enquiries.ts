'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { EnquiryStatus } from '@/lib/types'
import {
  isSupabaseConfigured,
  createEnquiryRecord,
  updateEnquiryStatusRecord,
  deleteEnquiryRecord,
  getEnquiries as getProviderEnquiries,
  getEnquiryById,
  getCourses as getProviderCourses,
  getStaffMembers as getProviderStaff,
} from '@/lib/data-provider'

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

const enquirySchema = z.object({
  student_name: z.string().min(1, 'Student name is required').max(200),
  guardian_name: z.string().min(1, 'Guardian name is required').max(200),
  guardian_phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(15)
    .regex(/^[0-9+\- ]+$/, 'Invalid phone number'),
  guardian_email: z.string().email('Invalid email').optional().or(z.literal('')),
  academic_level: z.string().optional().or(z.literal('')),
  course_id: z.string().optional().or(z.literal('')),
  source: z.string().min(1, 'Source is required'),
  status: z
    .enum([
      'new',
      'contacted',
      'interested',
      'demo_scheduled',
      'follow_up',
      'admitted',
      'not_interested',
    ])
    .optional()
    .default('new'),
  notes: z.string().optional().or(z.literal('')),
  next_follow_up_date: z.string().optional().or(z.literal('')),
  assigned_staff_id: z.string().optional().or(z.literal('')),
  contact_consent: z.boolean().optional().default(false),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export interface EnquiryFilters {
  status?: string
  source?: string
  course_id?: string
  search?: string
  date_from?: string
  date_to?: string
}

// ---------------------------------------------------------------------------
// Server Actions
// ---------------------------------------------------------------------------

export async function createEnquiry(formData: EnquiryFormValues) {
  const parsed = enquirySchema.safeParse(formData)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: staff } = await supabase
          .from('staff_members')
          .select('institution_id')
          .eq('user_id', user.id)
          .single()

        const instId =
          staff?.institution_id ||
          (
            await supabase
              .from('institutions')
              .select('id')
              .eq('owner_user_id', user.id)
              .single()
          ).data?.id

        if (instId) {
          const insertData: Record<string, unknown> = {
            institution_id: instId,
            student_name: parsed.data.student_name,
            guardian_name: parsed.data.guardian_name,
            guardian_phone: parsed.data.guardian_phone,
            source: parsed.data.source,
            status: parsed.data.status,
            contact_consent: parsed.data.contact_consent,
          }
          if (parsed.data.guardian_email)
            insertData.guardian_email = parsed.data.guardian_email
          if (parsed.data.academic_level)
            insertData.academic_level = parsed.data.academic_level
          if (parsed.data.course_id)
            insertData.course_id = parsed.data.course_id
          if (parsed.data.notes) insertData.notes = parsed.data.notes
          if (parsed.data.next_follow_up_date)
            insertData.next_follow_up_date = parsed.data.next_follow_up_date

          const { data, error } = await supabase
            .from('enquiries')
            .insert(insertData)
            .select()
            .single()

          if (!error && data) {
            revalidatePath('/dashboard/enquiries')
            revalidatePath('/dashboard')
            return { data }
          }
        }
      }
    } catch {
      // fallback to provider
    }
  }

  // Demo fallback
  const created = await createEnquiryRecord(parsed.data)
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { data: created }
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const success = await updateEnquiryStatusRecord(id, status)
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { success }
}

export async function deleteEnquiry(id: string) {
  const success = await deleteEnquiryRecord(id)
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { success }
}

export async function getEnquiries(filters: EnquiryFilters = {}) {
  return await getProviderEnquiries({
    status: filters.status,
    source: filters.source,
    courseId: filters.course_id,
    search: filters.search,
  })
}

export async function getEnquiry(id: string) {
  return await getEnquiryById(id)
}

export async function getCourses() {
  return await getProviderCourses()
}

export async function getStaffMembers() {
  return await getProviderStaff()
}

// Aliases for component imports
export const createEnquiryAction = createEnquiry
export const updateEnquiryStatusAction = updateEnquiryStatus
export const deleteEnquiryAction = deleteEnquiry

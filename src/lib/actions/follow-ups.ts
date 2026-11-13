'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import type { FollowUp } from '@/lib/types'
import {
  isSupabaseConfigured,
  getFollowUps as getProviderFollowUps,
  createFollowUpRecord,
  markFollowUpComplete,
  rescheduleFollowUpRecord,
} from '@/lib/data-provider'

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const followUpSchema = z.object({
  enquiry_id: z.string().min(1, 'Invalid enquiry'),
  scheduled_date: z.string().min(1, 'Date is required'),
  scheduled_time: z.string().optional().or(z.literal('')),
  type: z.enum(['phone_call', 'whatsapp', 'in_person', 'email', 'other']).default('phone_call'),
  notes: z.string().optional().or(z.literal('')),
  assigned_staff_id: z.string().optional().or(z.literal('')),
})

export type FollowUpFormValues = z.infer<typeof followUpSchema>

export interface FollowUpFilters {
  tab?: 'today' | 'overdue' | 'upcoming' | 'completed' | 'all'
  assigned_staff_id?: string
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function createFollowUp(formData: FollowUpFormValues) {
  const parsed = followUpSchema.safeParse(formData)
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
          const { data, error } = await supabase
            .from('follow_ups')
            .insert({
              institution_id: instId,
              enquiry_id: parsed.data.enquiry_id,
              scheduled_date: parsed.data.scheduled_date,
              scheduled_time: parsed.data.scheduled_time || null,
              type: parsed.data.type,
              notes: parsed.data.notes || null,
              status: 'pending',
            })
            .select()
            .single()

          if (!error && data) {
            revalidatePath('/dashboard/follow-ups')
            revalidatePath('/dashboard')
            return { data }
          }
        }
      }
    } catch {
      // fallback
    }
  }

  const created = await createFollowUpRecord(parsed.data)
  revalidatePath('/dashboard/follow-ups')
  revalidatePath('/dashboard')
  return { data: created }
}

export async function completeFollowUp(id: string, outcome: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { error } = await supabase
        .from('follow_ups')
        .update({
          status: 'completed',
          outcome,
          completed_at: new Date().toISOString(),
        })
        .eq('id', id)
      if (!error) {
        revalidatePath('/dashboard/follow-ups')
        revalidatePath('/dashboard')
        return { success: true }
      }
    } catch {
      // fallback
    }
  }

  const success = await markFollowUpComplete(id, outcome)
  revalidatePath('/dashboard/follow-ups')
  revalidatePath('/dashboard')
  return { success }
}

export async function rescheduleFollowUp(id: string, newDate: string, newTime?: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { error } = await supabase
        .from('follow_ups')
        .update({
          scheduled_date: newDate,
          scheduled_time: newTime || null,
          status: 'pending',
        })
        .eq('id', id)
      if (!error) {
        revalidatePath('/dashboard/follow-ups')
        revalidatePath('/dashboard')
        return { success: true }
      }
    } catch {
      // fallback
    }
  }

  const success = await rescheduleFollowUpRecord(id, newDate, newTime)
  revalidatePath('/dashboard/follow-ups')
  revalidatePath('/dashboard')
  return { success }
}

export async function getFollowUps(filters: FollowUpFilters = {}) {
  const data = await getProviderFollowUps(filters.tab)
  return { data }
}

export const completeFollowUpAction = completeFollowUp
export const rescheduleFollowUpAction = rescheduleFollowUp

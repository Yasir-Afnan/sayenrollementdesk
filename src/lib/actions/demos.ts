'use server'

import { revalidatePath } from 'next/cache'
import {
  createDemoRecord,
  recordDemoResultAction,
  convertDemoToAdmissionAction,
} from '@/lib/data-provider'
import type { DemoClass } from '@/lib/types'

export async function scheduleDemoClass(data: Partial<DemoClass>) {
  const demo = await createDemoRecord(data)
  revalidatePath('/dashboard/demos')
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { data: demo }
}

export async function recordDemoResult(
  id: string,
  result: 'interested' | 'not_interested' | 'needs_follow_up',
  feedback: string,
  attendance: boolean
) {
  const success = await recordDemoResultAction(id, result, feedback, attendance)
  revalidatePath('/dashboard/demos')
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { success }
}

export async function convertDemoToAdmission(demoId: string, notes?: string) {
  const success = await convertDemoToAdmissionAction(demoId, notes)
  revalidatePath('/dashboard/demos')
  revalidatePath('/dashboard/enquiries')
  revalidatePath('/dashboard')
  return { success }
}

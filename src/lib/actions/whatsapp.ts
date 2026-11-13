'use server'

import { revalidatePath } from 'next/cache'
import {
  getWhatsAppTemplates,
  saveWhatsAppTemplate,
} from '@/lib/data-provider'
import type { WhatsAppTemplate } from '@/lib/types'

export async function getTemplates() {
  const data = await getWhatsAppTemplates()
  return { data }
}

export async function saveTemplate(template: Partial<WhatsAppTemplate>) {
  const data = await saveWhatsAppTemplate(template)
  revalidatePath('/dashboard/whatsapp')
  return { data }
}

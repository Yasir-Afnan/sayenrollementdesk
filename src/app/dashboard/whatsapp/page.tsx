import React from 'react'
import {
  getWhatsAppTemplates,
  getEnquiries,
  getActiveInstitution,
} from '@/lib/data-provider'
import { WhatsAppWorkspace } from '@/components/whatsapp/WhatsAppWorkspace'
import { PageHeader } from '@/components/ui/page-header'

export const dynamic = 'force-dynamic'

export default async function WhatsAppPage() {
  const [templates, enquiries, institution] = await Promise.all([
    getWhatsAppTemplates(),
    getEnquiries(),
    getActiveInstitution(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="WhatsApp Desk & Messaging"
        description="Communicate with parents via pre-approved WhatsApp templates, demo class reminders, and admission notifications."
      />

      <WhatsAppWorkspace
        templates={templates}
        enquiries={enquiries}
        institution={institution}
      />
    </div>
  )
}

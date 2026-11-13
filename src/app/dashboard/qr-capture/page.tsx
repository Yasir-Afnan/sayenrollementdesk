import React from 'react'
import { getActiveInstitution } from '@/lib/data-provider'
import { generateQRCodeDataUrl } from '@/lib/actions/qr'
import { PageHeader } from '@/components/ui/page-header'
import { QRCodeManager } from '@/components/qr/QRCodeManager'

export const dynamic = 'force-dynamic'

export default async function QRCapturePage() {
  const institution = await getActiveInstitution()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const enquiryUrl = `${appUrl}/enquire/${institution.slug}`
  const qrDataUrl = await generateQRCodeDataUrl(enquiryUrl)

  return (
    <div className="space-y-6">
      <PageHeader
        title="QR Lead Capture & Digital Standee"
        description="Empower parents to register admissions enquiries directly from their mobile phones by scanning your centre's QR code."
      />

      <QRCodeManager
        institution={institution}
        qrDataUrl={qrDataUrl}
        enquiryUrl={enquiryUrl}
      />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Printer,
  Sparkles,
  Smartphone,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Institution } from '@/lib/types'

export function QRCodeManager({
  institution,
  qrDataUrl,
  enquiryUrl,
}: {
  institution: Institution
  qrDataUrl: string
  enquiryUrl: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(enquiryUrl)
    setCopied(true)
    toast.success('Public enquiry link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = `${institution.slug}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR Code image downloaded!')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: QR Code Display & Download */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <Card className="w-full text-center p-6 border-surface-200">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-3">
              <QrCode className="h-5 w-5" />
            </div>

            <CardTitle className="text-base font-bold text-surface-900">
              Front Desk & Pamphlet QR
            </CardTitle>
            <CardDescription className="text-xs text-surface-500 mt-1">
              Print this code on admission brochures, standees, or your front reception desk.
            </CardDescription>

            {/* Rendered QR Code */}
            <div className="my-6 inline-block rounded-2xl border-4 border-surface-900 bg-white p-4 shadow-md">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${institution.name}`}
                  className="h-56 w-56 object-contain"
                />
              ) : (
                <div className="h-56 w-56 flex items-center justify-center bg-surface-100 text-surface-400">
                  Generating QR...
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-[10px] font-bold text-surface-900 uppercase tracking-widest">
                  Scan to Enquire
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full">
              <Button
                variant="default"
                size="sm"
                onClick={handleDownload}
                className="w-full sm:w-auto gap-1.5 text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download High-Res PNG</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="w-full sm:w-auto gap-1.5 text-xs"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Standee</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Link & Mobile Experience Info */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-surface-900">
                Shareable Admissions Link
              </CardTitle>
              <CardDescription>
                Direct web link for WhatsApp status, Google Business Profile, and Instagram bio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-xs font-mono text-surface-700 truncate">
                  {enquiryUrl}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="shrink-0 gap-1 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <span>Preview</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>

              <div className="rounded-xl border border-surface-200 bg-surface-50/70 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-surface-900">
                  <Smartphone className="h-4 w-4 text-brand-600" />
                  <span>How QR Enquiry Capture Works for Your Centre</span>
                </div>
                <ol className="list-decimal list-inside text-xs text-surface-600 space-y-2 leading-relaxed">
                  <li>
                    A parent visits your centre or sees your brochure and scans the QR code with their mobile phone camera.
                  </li>
                  <li>
                    They are instantly taken to your dedicated mobile-friendly enquiry form without installing any app.
                  </li>
                  <li>
                    They enter their child&apos;s name, class, course interest, and phone number, with explicit contact consent.
                  </li>
                  <li>
                    The enquiry immediately appears in your EnrolmentDesk pipeline tagged as{' '}
                    <span className="font-semibold text-brand-700 bg-brand-50 px-1 py-0.5 rounded">
                      Source: QR code
                    </span>
                    .
                  </li>
                  <li>
                    You receive an immediate notification to initiate the first WhatsApp greeting or phone call.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

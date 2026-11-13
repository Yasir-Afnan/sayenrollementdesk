'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Printer,
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
  const [standeeHeadline, setStandeeHeadline] = useState('Admissions Open for Academic Year 2026-27')
  const [standeeSubhead, setStandeeSubhead] = useState('Scan with your smartphone camera to book a free trial demo class & receive syllabus details')

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
    toast.success('High-Resolution QR Code downloaded!')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/50 dark:bg-brand-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-600 text-white shadow-xs">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-surface-950 dark:text-white">
              Front Desk &amp; Reception QR Standee
            </h2>
            <p className="text-xs text-surface-600 dark:text-surface-400">
              Place on your front counter, brochure inserts, and noticeboards to capture walk-in parent leads automatically.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs bg-white dark:bg-surface-800">
            <Printer className="h-3.5 w-3.5" />
            <span>Print Counter Standee</span>
          </Button>
          <Button size="sm" onClick={handleDownload} className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span>Download PNG</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Printable Standee Preview */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full text-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Live Counter Standee Preview (A5 / Table Tent)
            </span>
          </div>

          {/* Standee Frame (Printable Target) - White card as physical paper target */}
          <div
            id="printable-standee"
            className="w-full max-w-md rounded-3xl border-2 border-surface-900 bg-white p-8 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[500px]"
          >
            {/* Top Logo / Badge */}
            <div className="space-y-1.5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-xl shadow-md mb-2">
                {institution.name.charAt(0)}
              </div>
              <h3 className="text-lg font-extrabold text-surface-950 tracking-tight font-sans">
                {institution.name}
              </h3>
              <p className="text-[11px] font-bold text-brand-700 tracking-wide uppercase">
                {standeeHeadline}
              </p>
            </div>

            {/* Framed QR Code with Scanner Target */}
            <div className="my-6 rounded-2xl border-4 border-surface-950 bg-white p-4 shadow-sm inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${institution.name}`}
                  className="h-48 w-48 object-contain"
                />
              ) : (
                <div className="h-48 w-48 flex items-center justify-center bg-surface-100 text-surface-400">
                  Generating QR...
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-[10px] font-black text-surface-950 uppercase tracking-widest bg-surface-100 px-2 py-0.5 rounded">
                  SCAN WITH PHONE CAMERA
                </span>
              </div>
            </div>

            {/* Call to Action Subtext */}
            <div className="space-y-2 max-w-xs">
              <p className="text-xs text-surface-700 font-medium leading-relaxed">
                {standeeSubhead}
              </p>
              <div className="pt-3 border-t border-surface-200 text-[10px] text-surface-500 flex flex-col items-center gap-0.5 font-medium">
                <span>📍 {institution.address || 'Jayanagar, Bengaluru'}</span>
                <span>📞 {institution.phone || '+91 98450 12345'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Standee Customization & Direct URL Links */}
        <div className="lg:col-span-6 space-y-6">
          {/* Customizer */}
          <Card className="saas-card">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-surface-950 dark:text-white">
                Customize Standee Headings
              </CardTitle>
              <CardDescription className="text-xs">
                Personalize the printed poster before displaying at your front office.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Poster Header Tagline"
                value={standeeHeadline}
                onChange={(e) => setStandeeHeadline(e.target.value)}
                placeholder="e.g. Admissions Open for 2026-27"
              />
              <Input
                label="Instruction Text"
                value={standeeSubhead}
                onChange={(e) => setStandeeSubhead(e.target.value)}
                placeholder="e.g. Scan with your camera to book a trial demo class"
              />
            </CardContent>
          </Card>

          {/* Shareable Link Box */}
          <Card className="saas-card">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-surface-950 dark:text-white">
                Shareable Digital Link
              </CardTitle>
              <CardDescription className="text-xs">
                Direct link for WhatsApp messages, Instagram bio, and Google Maps listing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 px-3.5 py-2.5 text-xs font-mono text-surface-700 dark:text-surface-300 truncate select-all">
                  {enquiryUrl}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="shrink-0 gap-1 text-xs h-10"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <Button size="sm" variant="outline" className="gap-1 text-xs h-10">
                    <span>Preview</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>

              {/* 3 Step Explanation */}
              <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50/70 dark:bg-surface-900/40 p-4 space-y-2.5 text-xs">
                <p className="font-bold text-surface-900 dark:text-white">How Lead Capture Works:</p>
                <div className="space-y-2 text-surface-600 dark:text-surface-400 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-[10px] font-bold text-brand-700 dark:text-brand-300">1</span>
                    <span>Parent scans the standee QR code with any mobile camera (iPhone / Android).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-[10px] font-bold text-brand-700 dark:text-brand-300">2</span>
                    <span>They enter student name, class, and parent phone with explicit consent.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-[10px] font-bold text-brand-700 dark:text-brand-300">3</span>
                    <span>Lead immediately lands in your pipeline tagged as <strong className="text-surface-900 dark:text-white">Source: QR code</strong> for instant WhatsApp follow-up.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

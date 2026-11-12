'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { generateWhatsAppLink } from '@/lib/utils'
import type { WhatsAppTemplate, Enquiry, Institution } from '@/lib/types'
import { saveTemplate } from '@/lib/actions/whatsapp'
import {
  MessageSquare,
  Send,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Plus,
} from 'lucide-react'
import { toast } from 'sonner'

export function WhatsAppWorkspace({
  templates: initialTemplates,
  enquiries,
  institution,
}: {
  templates: WhatsAppTemplate[]
  enquiries: Enquiry[]
  institution: Institution
}) {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(initialTemplates)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialTemplates[0]?.id || ''
  )
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string>(
    enquiries[0]?.id || ''
  )
  const [customPhone, setCustomPhone] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  // Edit / new template state
  const [isEditingTemplate, setIsEditingTemplate] = useState(false)
  const [editTemplateName, setEditTemplateName] = useState('')
  const [editTemplateCategory, setEditTemplateCategory] = useState<
    'enquiry_response' | 'follow_up' | 'demo_reminder' | 'admission_confirmation' | 'general'
  >('enquiry_response')
  const [editTemplateText, setEditTemplateText] = useState('')

  const activeTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0]
  const activeEnquiry = enquiries.find((e) => e.id === selectedEnquiryId)

  // Variable interpolation
  const interpolate = (text: string) => {
    if (!text) return ''
    return text
      .replace(/{student_name}/g, activeEnquiry?.student_name || 'Student')
      .replace(/{guardian_name}/g, activeEnquiry?.guardian_name || 'Parent')
      .replace(/{institute_name}/g, institution.name || 'EnrolmentDesk')
      .replace(/{institute_address}/g, institution.address || 'Bengaluru')
      .replace(/{course_name}/g, activeEnquiry?.course?.name || 'Coaching Course')
      .replace(/{demo_date}/g, 'Saturday')
      .replace(/{demo_time}/g, '10:00 AM')
  }

  const previewText = customMessage || (activeTemplate ? interpolate(activeTemplate.template_text) : '')
  const recipientPhone = customPhone || activeEnquiry?.guardian_phone || '9845012345'
  const waLink = generateWhatsAppLink(recipientPhone, previewText)

  const handleCopy = () => {
    navigator.clipboard.writeText(previewText)
    setIsCopied(true)
    toast.success('Message text copied to clipboard!')
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSaveNewTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editTemplateName || !editTemplateText) {
      toast.error('Template title and text are required')
      return
    }

    try {
      const res = await saveTemplate({
        name: editTemplateName,
        category: editTemplateCategory,
        template_text: editTemplateText,
      })
      if (res.data) {
        setTemplates((prev) => [...prev, res.data])
        setSelectedTemplateId(res.data.id)
        setIsEditingTemplate(false)
        setEditTemplateName('')
        setEditTemplateText('')
        toast.success('Template saved successfully!')
      }
    } catch {
      toast.error('Failed to save template')
    }
  }

  return (
    <div className="space-y-6">
      {/* Official WhatsApp Compliance Banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-950 flex items-start gap-3">
        <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-emerald-900">
            Official Click-to-Chat Direct Integration (wa.me)
          </p>
          <p className="text-emerald-800 leading-relaxed">
            EnrolmentDesk generates pre-filled, compliant WhatsApp links. Messages open in your
            browser or WhatsApp mobile app directly from your centre&apos;s phone number. No costly
            per-message third party fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
              Message Templates
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditingTemplate(!isEditingTemplate)}
              className="text-xs h-8 gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Template</span>
            </Button>
          </div>

          {/* New Template Collapsible Form */}
          {isEditingTemplate && (
            <Card className="border-brand-200 bg-brand-50/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-brand-900">
                  Create Custom Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveNewTemplate} className="space-y-3">
                  <Input
                    label="Template Name"
                    placeholder="e.g. Fee Reminder"
                    value={editTemplateName}
                    onChange={(e) => setEditTemplateName(e.target.value)}
                    required
                  />
                  <Select
                    label="Category"
                    value={editTemplateCategory}
                    onChange={(e) =>
                      setEditTemplateCategory(
                        e.target.value as
                          | 'enquiry_response'
                          | 'follow_up'
                          | 'demo_reminder'
                          | 'admission_confirmation'
                          | 'general'
                      )
                    }
                  >
                    <option value="enquiry_response">Enquiry Response</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="demo_reminder">Demo Reminder</option>
                    <option value="admission_confirmation">Admission Welcome</option>
                    <option value="general">General</option>
                  </Select>
                  <Textarea
                    label="Message Text (Supports {student_name}, {guardian_name})"
                    rows={3}
                    placeholder="Hello {guardian_name}..."
                    value={editTemplateText}
                    onChange={(e) => setEditTemplateText(e.target.value)}
                    required
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingTemplate(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm">
                      Save Template
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Template Cards */}
          <div className="space-y-2.5">
            {templates.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId
              return (
                <div
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplateId(tmpl.id)
                    setCustomMessage('')
                  }}
                  className={`rounded-xl border p-3.5 text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/30 ring-1 ring-brand-500 shadow-xs'
                      : 'border-surface-200 bg-white hover:border-surface-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-surface-900">{tmpl.name}</span>
                    <span className="rounded bg-surface-100 px-2 py-0.5 text-[10px] font-semibold text-surface-600 uppercase">
                      {tmpl.category.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-surface-600 line-clamp-2 leading-relaxed">
                    {tmpl.template_text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live Composer & Preview */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span>WhatsApp Message Preview & Dispatch</span>
                <span className="text-xs text-surface-500 font-normal">
                  Target: +91 {recipientPhone}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              {/* Select Prospective Student */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Select Student Enquiry"
                  value={selectedEnquiryId}
                  onChange={(e) => setSelectedEnquiryId(e.target.value)}
                >
                  {enquiries.map((enq) => (
                    <option key={enq.id} value={enq.id}>
                      {enq.student_name} ({enq.guardian_phone})
                    </option>
                  ))}
                </Select>

                <Input
                  label="Or Custom Phone Number"
                  placeholder="e.g. 9845012345"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                />
              </div>

              {/* Dynamic Variables Pill Bar */}
              <div className="rounded-lg bg-surface-50 p-2.5 text-[11px] text-surface-500 flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-surface-700">Auto-filled:</span>
                <span className="rounded bg-white px-2 py-0.5 border border-surface-200 font-mono text-[10px]">
                  {activeEnquiry?.student_name || '{student_name}'}
                </span>
                <span className="rounded bg-white px-2 py-0.5 border border-surface-200 font-mono text-[10px]">
                  {activeEnquiry?.guardian_name || '{guardian_name}'}
                </span>
                <span className="rounded bg-white px-2 py-0.5 border border-surface-200 font-mono text-[10px]">
                  {institution.name}
                </span>
              </div>

              {/* Realistic WhatsApp Chat Bubble Preview */}
              <div className="rounded-2xl bg-[#efeae2] p-4 border border-[#dad3c8] shadow-inner relative overflow-hidden">
                <div className="max-w-md ml-auto rounded-xl rounded-tr-xs bg-[#d9fdd3] p-3 text-xs text-surface-900 shadow-xs space-y-2 border border-[#b8f5ae]">
                  <p className="whitespace-pre-wrap leading-relaxed font-sans">
                    {previewText}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-surface-500">
                    <span>Just now</span>
                    <span className="text-brand-600 font-bold">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Dispatch Action CTAs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Text</span>
                    </>
                  )}
                </Button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#20ba59] active:bg-[#1caa52] transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Send via WhatsApp</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

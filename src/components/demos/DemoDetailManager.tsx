'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { recordDemoResult, convertDemoToAdmission } from '@/lib/actions/demos'
import { formatDate, generateWhatsAppLink } from '@/lib/utils'
import {
  CheckCircle2,
  XCircle,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import type { DemoClass } from '@/lib/types'
import { toast } from 'sonner'

export function DemoDetailManager({ demo }: { demo: DemoClass }) {
  const router = useRouter()
  const [attendance, setAttendance] = useState<boolean>(demo.attendance ?? true)
  const [result, setResult] = useState<'interested' | 'not_interested' | 'needs_follow_up'>(
    demo.result || 'interested'
  )
  const [feedback, setFeedback] = useState(demo.feedback || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isConverting, setIsConverting] = useState(false)

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await recordDemoResult(demo.id, result, feedback, attendance)
      toast.success('Demo evaluation and attendance saved!')
      router.refresh()
    } catch {
      toast.error('Failed to save demo result')
    } finally {
      setIsSaving(false)
    }
  }

  const handleConvertToAdmission = async () => {
    if (!confirm('Are you sure you want to convert this student to an Admitted student?')) return
    setIsConverting(true)
    try {
      await convertDemoToAdmission(demo.id, feedback || 'Converted after demo class.')
      toast.success('Congratulations! Student status converted to Admitted.')
      router.push('/dashboard/enquiries')
    } catch {
      toast.error('Failed to convert to admission')
    } finally {
      setIsConverting(false)
    }
  }

  const waLink = demo.enquiry?.guardian_phone
    ? generateWhatsAppLink(
        demo.enquiry.guardian_phone,
        `Hello ${demo.enquiry.guardian_name}, this is from EnrolmentDesk regarding ${demo.enquiry.student_name}'s demo class feedback.`
      )
    : '#'

  return (
    <div className="space-y-6">
      {/* Student & Parent Info Strip */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
            Student Candidate
          </span>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">
            {demo.enquiry?.student_name}
          </h2>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            Parent: {demo.enquiry?.guardian_name} • {demo.enquiry?.guardian_phone}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {demo.enquiry?.guardian_phone && (
            <>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Parent</span>
              </a>
              <a
                href={`tel:${demo.enquiry.guardian_phone}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-2 text-xs font-semibold text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Evaluation & Attendance Form */}
      <form onSubmit={handleSaveResult} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-surface-900 dark:text-white">
              Record Attendance &amp; Faculty Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300 mb-2">
                Class Attendance
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance(true)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                    attendance
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80 ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Student Attended</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance(false)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                    !attendance
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800/80 ring-2 ring-red-500/20'
                      : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                >
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span>Absent / No Show</span>
                </button>
              </div>
            </div>

            {/* Student Sentiment / Result */}
            <Select
              label="Student & Parent Sentiment"
              value={result}
              onChange={(e) =>
                setResult(e.target.value as 'interested' | 'not_interested' | 'needs_follow_up')
              }
            >
              <option value="interested">Highly Interested (Ready for Enrolment)</option>
              <option value="needs_follow_up">Needs Follow-Up / Comparing Other Centres</option>
              <option value="not_interested">Not Interested / Timing Mismatch</option>
            </Select>

            {/* Faculty Notes */}
            <Textarea
              label="Faculty Observations & Feedback"
              placeholder="e.g. Student grasped quadratic equations quickly. Parent inquired about scholarship and fee installments..."
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex justify-between items-center pt-2">
              <Button type="submit" isLoading={isSaving} size="sm">
                Save Evaluation
              </Button>

              {/* Convert to Admission Direct CTA */}
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleConvertToAdmission}
                isLoading={isConverting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>Convert to Admission</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

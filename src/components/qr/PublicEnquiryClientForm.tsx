'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { submitPublicEnquiry } from '@/lib/actions/qr'
import type { Course } from '@/lib/types'
import {
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Phone,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react'
import { toast } from 'sonner'

const ACADEMIC_LEVELS = [
  'Class 9 CBSE / ICSE',
  'Class 10 Board Exam',
  'Class 11 Science (PUC / CBSE)',
  'Class 12 Board + Entrance',
  'KCET / JEE Foundation',
  'NEET Medical Coaching',
  'Other / Foundation',
]

export function PublicEnquiryClientForm({
  slug,
  institutionName,
  courses,
}: {
  slug: string
  institutionName: string
  courses: Course[]
}) {
  const [formData, setFormData] = useState({
    student_name: '',
    guardian_name: '',
    guardian_phone: '',
    guardian_email: '',
    academic_level: 'Class 10 Board Exam',
    course_id: courses[0]?.id || '',
    notes: '',
    contact_consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }))
    setError(null)
  }

  const handleSelectLevel = (level: string) => {
    setFormData((prev) => ({ ...prev, academic_level: level }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contact_consent) {
      setError('Please check the consent box below to allow our admissions team to contact you.')
      return
    }

    if (formData.guardian_phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await submitPublicEnquiry({
        slug,
        ...formData,
      })

      if (res.error) {
        setError(res.error)
        toast.error(res.error)
      } else {
        setIsSubmitted(true)
        toast.success('Enquiry registered successfully!')
      }
    } catch {
      setError('Unable to submit your enquiry at this time. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold text-surface-950 font-sans tracking-tight">
            Admissions Enquiry Registered!
          </h2>
          <p className="text-xs text-surface-600 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out to <strong className="text-surface-900">{institutionName}</strong>.
            Our admissions counselor has received <strong className="text-surface-900">{formData.student_name}</strong>&apos;s details.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950 max-w-sm mx-auto space-y-1 text-left">
          <p className="font-bold flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-emerald-700" />
            <span>What happens next?</span>
          </p>
          <p className="text-emerald-800 text-[11px] leading-relaxed">
            We will message you on WhatsApp at <strong className="font-mono">{formData.guardian_phone}</strong> with batch timings, fee structures, and a complimentary trial demo class slot.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                student_name: '',
                guardian_name: '',
                guardian_phone: '',
                guardian_email: '',
                academic_level: 'Class 10 Board Exam',
                course_id: courses[0]?.id || '',
                notes: '',
                contact_consent: false,
              })
            }}
            className="text-xs"
          >
            Submit Another Student Enquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 p-3.5 text-xs text-red-700 font-medium border border-red-200 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Student & Parent Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-1.5 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-brand-600" />
            <span>Student Full Name</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            name="student_name"
            placeholder="e.g. Aditi Sharma"
            value={formData.student_name}
            onChange={handleChange}
            className="w-full h-11 rounded-xl border border-surface-300 bg-white px-3.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-1.5 flex items-center gap-1.5">
              <span>Parent / Guardian Name</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              name="guardian_name"
              placeholder="e.g. Ramesh Sharma"
              value={formData.guardian_name}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-surface-300 bg-white px-3.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Contact</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              name="guardian_phone"
              placeholder="10-digit mobile number"
              value={formData.guardian_phone}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-surface-300 bg-white px-3.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Academic Level Selector Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-2 flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-brand-600" />
            <span>Select Student&apos;s Class / Grade</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ACADEMIC_LEVELS.map((lvl) => {
              const isSelected = formData.academic_level === lvl
              return (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => handleSelectLevel(lvl)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                  }`}
                >
                  {lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-brand-600" />
            <span>Course of Interest</span>
          </label>
          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="w-full h-11 rounded-xl border border-surface-300 bg-white px-3.5 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.fee_amount ? `(₹${c.fee_amount.toLocaleString('en-IN')})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Optional notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-700 mb-1.5">
            Any Special Questions or Batch Timing Preferences?
          </label>
          <textarea
            name="notes"
            rows={2}
            placeholder="e.g. Interested in morning vs evening batch, extra help in Mathematics..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-xl border border-surface-300 bg-white p-3 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          />
        </div>

        {/* Explicit Consent Box (DPDP Compliance) */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-start gap-3">
          <input
            id="public_contact_consent"
            name="contact_consent"
            type="checkbox"
            required
            checked={formData.contact_consent}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <label
            htmlFor="public_contact_consent"
            className="text-xs text-emerald-950 leading-relaxed cursor-pointer font-medium"
          >
            I provide consent to receive course syllabus details, fee structures, and trial class
            schedules via WhatsApp and phone calls from{' '}
            <strong className="font-bold text-emerald-950">{institutionName}</strong> under Indian Digital Personal Data Protection standards.
          </label>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full h-12 text-sm font-bold gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <Send className="h-4 w-4" />
        <span>Submit Admission Enquiry</span>
      </Button>
    </form>
  )
}

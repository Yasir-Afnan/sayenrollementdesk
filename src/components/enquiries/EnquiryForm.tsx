'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  ENQUIRY_STATUSES,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_SOURCES,
} from '@/lib/utils'
import type { Course, EnquiryStatus, StaffMember } from '@/lib/types'
import { createEnquiryAction } from '@/lib/actions/enquiries'
import { toast } from 'sonner'
import Link from 'next/link'

export function EnquiryForm({
  courses,
  staffMembers = [],
}: {
  courses: Course[]
  staffMembers?: StaffMember[]
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    student_name: '',
    guardian_name: '',
    guardian_phone: '',
    guardian_email: '',
    academic_level: 'Class 10',
    course_id: courses[0]?.id || '',
    source: 'Walk-in',
    status: 'new' as EnquiryStatus,
    notes: '',
    next_follow_up_date: new Date().toISOString().split('T')[0],
    assigned_staff_id: staffMembers[0]?.id || '',
    contact_consent: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

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

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const res = await createEnquiryAction(formData)
      if (res?.error) {
        const flatErrors: Record<string, string> = {}
        Object.entries(res.error).forEach(([k, v]) => {
          if (Array.isArray(v) && v.length > 0) flatErrors[k] = v[0]
        })
        setErrors(flatErrors)
        toast.error('Please resolve the errors highlighted below.')
      } else {
        toast.success('Enquiry added successfully!')
        router.push('/dashboard/enquiries')
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-xs space-y-6">
        <h2 className="text-base font-semibold text-surface-900 border-b border-surface-100 pb-3">
          Student & Guardian Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Student Full Name"
            name="student_name"
            required
            placeholder="e.g. Aditi Sharma"
            value={formData.student_name}
            onChange={handleChange}
            error={errors.student_name}
          />
          <Input
            label="Guardian / Parent Name"
            name="guardian_name"
            required
            placeholder="e.g. Ramesh Sharma"
            value={formData.guardian_name}
            onChange={handleChange}
            error={errors.guardian_name}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Parent Contact Number (WhatsApp enabled)"
            name="guardian_phone"
            required
            placeholder="e.g. 9845012345"
            value={formData.guardian_phone}
            onChange={handleChange}
            error={errors.guardian_phone}
            helperText="10-digit mobile number for WhatsApp & calls"
          />
          <Input
            label="Parent Email Address"
            name="guardian_email"
            type="email"
            placeholder="parent@example.com (optional)"
            value={formData.guardian_email}
            onChange={handleChange}
            error={errors.guardian_email}
          />
        </div>
      </div>

      <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-xs space-y-6">
        <h2 className="text-base font-semibold text-surface-900 border-b border-surface-100 pb-3">
          Academic Interests & Pipeline Stage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Interested Course"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.fee_amount ? `(₹${c.fee_amount.toLocaleString('en-IN')})` : ''}
              </option>
            ))}
          </Select>

          <Input
            label="Current Class / Academic Level"
            name="academic_level"
            placeholder="e.g. Class 10 CBSE / Class 12 State Board"
            value={formData.academic_level}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Enquiry Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            {ENQUIRY_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>

          <Select
            label="Initial Pipeline Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {ENQUIRY_STATUS_LABELS[s]}
              </option>
            ))}
          </Select>

          <Input
            label="Next Follow-Up Date"
            name="next_follow_up_date"
            type="date"
            value={formData.next_follow_up_date}
            onChange={handleChange}
          />
        </div>

        <Textarea
          label="Admissions Notes / Special Requirements"
          name="notes"
          placeholder="e.g. Looking for weekend batch, requires extra attention in Mathematics trigonometry, referred by neighbor..."
          rows={3}
          value={formData.notes}
          onChange={handleChange}
        />

        <div className="flex items-start gap-3 rounded-lg bg-surface-50 p-4 border border-surface-200/60">
          <input
            id="contact_consent"
            name="contact_consent"
            type="checkbox"
            checked={formData.contact_consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
          <label htmlFor="contact_consent" className="text-xs text-surface-600 leading-relaxed">
            Parent has provided explicit consent to receive phone calls, SMS notifications, and
            WhatsApp admissions updates pursuant to Digital Personal Data Protection standards.
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link href="/dashboard/enquiries">
          <Button variant="outline" type="button" disabled={isSubmitting}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          Save Enquiry
        </Button>
      </div>
    </form>
  )
}

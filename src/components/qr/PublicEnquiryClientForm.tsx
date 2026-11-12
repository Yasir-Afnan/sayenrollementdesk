'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { submitPublicEnquiry } from '@/lib/actions/qr'
import type { Course } from '@/lib/types'
import { CheckCircle2, Send, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

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
    academic_level: 'Class 10',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contact_consent) {
      setError('Please check the consent box to allow the centre to reach out to you.')
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
        toast.success('Your enquiry has been received!')
      }
    } catch {
      setError('Unable to submit your enquiry at this time. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-surface-900">
          Enquiry Received!
        </h2>
        <p className="text-xs text-surface-600 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to <span className="font-semibold text-surface-800">{institutionName}</span>.
          Our admissions coordinator will contact you via WhatsApp or phone call shortly.
        </p>

        <div className="pt-4">
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
                academic_level: 'Class 10',
                course_id: courses[0]?.id || '',
                notes: '',
                contact_consent: false,
              })
            }}
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Student Full Name"
          name="student_name"
          required
          placeholder="e.g. Rahul Sharma"
          value={formData.student_name}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Parent / Guardian Name"
            name="guardian_name"
            required
            placeholder="e.g. Ramesh Sharma"
            value={formData.guardian_name}
            onChange={handleChange}
          />

          <Input
            label="Mobile Number (WhatsApp)"
            name="guardian_phone"
            required
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.guardian_phone}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Parent Email (Optional)"
          name="guardian_email"
          type="email"
          placeholder="parent@example.com"
          value={formData.guardian_email}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Course of Interest"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input
            label="Student's Current Class / Grade"
            name="academic_level"
            placeholder="e.g. Class 10 CBSE"
            value={formData.academic_level}
            onChange={handleChange}
          />
        </div>

        <Textarea
          label="Questions or Specific Requirements"
          name="notes"
          rows={3}
          placeholder="Any specific batch timing requests or academic doubts..."
          value={formData.notes}
          onChange={handleChange}
        />

        {/* Consent Checkbox */}
        <div className="flex items-start gap-3 rounded-xl bg-surface-50 p-4 border border-surface-200/80">
          <input
            id="public_contact_consent"
            name="contact_consent"
            type="checkbox"
            required
            checked={formData.contact_consent}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
          <label
            htmlFor="public_contact_consent"
            className="text-xs text-surface-600 leading-relaxed cursor-pointer"
          >
            I consent to receive phone calls, SMS notifications, and WhatsApp updates from{' '}
            <span className="font-semibold text-surface-800">{institutionName}</span> regarding
            admissions, fee details, and demo class schedules.
          </label>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full h-11 text-sm font-semibold gap-2 mt-4"
      >
        <Send className="h-4 w-4" />
        <span>Submit Admission Enquiry</span>
      </Button>
    </form>
  )
}

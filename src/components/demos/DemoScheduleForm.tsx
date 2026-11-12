'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { scheduleDemoClass } from '@/lib/actions/demos'
import type { Enquiry, Course, Batch, StaffMember } from '@/lib/types'
import { toast } from 'sonner'
import Link from 'next/link'

export function DemoScheduleForm({
  enquiries,
  courses,
  batches,
  staffMembers,
  defaultEnquiryId,
}: {
  enquiries: Enquiry[]
  courses: Course[]
  batches: Batch[]
  staffMembers: StaffMember[]
  defaultEnquiryId?: string
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    enquiry_id: defaultEnquiryId || enquiries[0]?.id || '',
    course_id: courses[0]?.id || '',
    batch_id: batches[0]?.id || '',
    scheduled_date: tomorrow,
    scheduled_time: '17:30',
    duration_minutes: 60,
    conducted_by: staffMembers[0]?.id || '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await scheduleDemoClass({
        enquiry_id: formData.enquiry_id,
        course_id: formData.course_id || null,
        batch_id: formData.batch_id || null,
        scheduled_date: formData.scheduled_date,
        scheduled_time: formData.scheduled_time,
        duration_minutes: Number(formData.duration_minutes),
        conducted_by: formData.conducted_by || null,
        status: 'scheduled',
      })
      toast.success('Demo class scheduled successfully!')
      router.push('/dashboard/demos')
    } catch {
      toast.error('Failed to schedule demo class')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-xs space-y-4">
        <Select
          label="Select Student Enquiry"
          name="enquiry_id"
          required
          value={formData.enquiry_id}
          onChange={handleChange}
        >
          {enquiries.map((e) => (
            <option key={e.id} value={e.id}>
              {e.student_name} (Parent: {e.guardian_name} - {e.guardian_phone})
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Course Subject"
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

          <Select
            label="Assigned Batch (Optional)"
            name="batch_id"
            value={formData.batch_id}
            onChange={handleChange}
          >
            <option value="">No specific batch / Trial Session</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.start_time} - {b.end_time})
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Demo Date"
            type="date"
            name="scheduled_date"
            required
            value={formData.scheduled_date}
            onChange={handleChange}
          />

          <Input
            label="Start Time"
            type="time"
            name="scheduled_time"
            required
            value={formData.scheduled_time}
            onChange={handleChange}
          />

          <Select
            label="Duration"
            name="duration_minutes"
            value={formData.duration_minutes}
            onChange={handleChange}
          >
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes (1 Hour)</option>
            <option value={90}>90 minutes (1.5 Hours)</option>
            <option value={120}>120 minutes (2 Hours)</option>
          </Select>
        </div>

        <Select
          label="Faculty / Instructor Conducting Demo"
          name="conducted_by"
          value={formData.conducted_by}
          onChange={handleChange}
        >
          {staffMembers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.role})
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard/demos">
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          Confirm & Schedule Demo
        </Button>
      </div>
    </form>
  )
}

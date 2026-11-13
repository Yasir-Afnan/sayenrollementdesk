'use server'

import QRCode from 'qrcode'
import { getInstitutionBySlug, createEnquiryRecord, getCourses } from '@/lib/data-provider'
import type { Enquiry } from '@/lib/types'

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
    })
  } catch (err) {
    console.error('QR code generation error:', err)
    return ''
  }
}

export async function submitPublicEnquiry(formData: {
  slug: string
  student_name: string
  guardian_name: string
  guardian_phone: string
  guardian_email?: string
  academic_level?: string
  course_id?: string
  notes?: string
  contact_consent: boolean
}) {
  const institution = await getInstitutionBySlug(formData.slug)
  if (!institution) {
    return { error: 'Institution not found.' }
  }

  if (!formData.student_name || !formData.guardian_name || !formData.guardian_phone) {
    return { error: 'Please provide student name, guardian name, and phone number.' }
  }

  if (!formData.contact_consent) {
    return { error: 'Parental contact consent is required to submit this form.' }
  }

  const newEnquiry = await createEnquiryRecord({
    institution_id: institution.id,
    student_name: formData.student_name,
    guardian_name: formData.guardian_name,
    guardian_phone: formData.guardian_phone,
    guardian_email: formData.guardian_email || null,
    academic_level: formData.academic_level || null,
    course_id: formData.course_id || null,
    source: 'QR code',
    status: 'new',
    notes: formData.notes ? `[Public QR Form] ${formData.notes}` : '[Public QR Form Submission]',
    contact_consent: true,
  })

  return { data: newEnquiry }
}

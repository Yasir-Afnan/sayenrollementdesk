import { createClient } from '@/lib/supabase/server'
import {
  DEMO_INSTITUTION,
  DEMO_STAFF,
  DEMO_COURSES,
  DEMO_BATCHES,
  DEMO_ENQUIRIES,
  DEMO_FOLLOW_UPS,
  DEMO_CLASSES,
  DEMO_TEMPLATES,
} from './demo-data'
import type {
  Enquiry,
  FollowUp,
  DemoClass,
  Course,
  Batch,
  StaffMember,
  Institution,
  WhatsAppTemplate,
  DashboardMetrics,
  EnquiryStatus,
} from './types'

// Check if live Supabase is configured with actual credentials
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(
    url &&
      key &&
      !url.includes('your-supabase-url') &&
      !key.includes('your-supabase-anon-key')
  )
}

// In-memory store for demo session mutations
let memoryEnquiries = [...DEMO_ENQUIRIES]
let memoryFollowUps = [...DEMO_FOLLOW_UPS]
let memoryDemos = [...DEMO_CLASSES]
let memoryTemplates = [...DEMO_TEMPLATES]
let memoryCourses = [...DEMO_COURSES]
let memoryBatches = [...DEMO_BATCHES]
let memoryInstitution = { ...DEMO_INSTITUTION }

// ---------------------------------------------------------------------------
// Institution
// ---------------------------------------------------------------------------
export async function getActiveInstitution(): Promise<Institution> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: staff } = await supabase
          .from('staff_members')
          .select('institution_id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single()

        const instId = staff?.institution_id
        if (instId) {
          const { data: inst } = await supabase
            .from('institutions')
            .select('*')
            .eq('id', instId)
            .single()
          if (inst) return inst
        }

        const { data: ownedInst } = await supabase
          .from('institutions')
          .select('*')
          .eq('owner_user_id', user.id)
          .single()
        if (ownedInst) return ownedInst
      }
    } catch {
      // fallback to demo
    }
  }

  return memoryInstitution
}

export async function getInstitutionBySlug(slug: string): Promise<Institution | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('institutions')
        .select('*')
        .eq('slug', slug)
        .single()
      if (data) return data
    } catch {
      // fallback
    }
  }

  if (memoryInstitution.slug === slug || slug === 'demo') {
    return memoryInstitution
  }
  return null
}

// ---------------------------------------------------------------------------
// Dashboard Metrics
// ---------------------------------------------------------------------------
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const enquiries = await getEnquiries()
  const followUps = await getFollowUps()
  const demos = await getDemoClasses()

  const totalEnquiries = enquiries.length
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length
  const contactedParents = enquiries.filter(
    (e) => e.status === 'contacted' || e.status === 'interested'
  ).length
  const demosScheduled = demos.filter((d) => d.status === 'scheduled').length
  const todayStr = new Date().toISOString().split('T')[0]
  const pendingFollowUps = followUps.filter(
    (f) => f.status === 'pending' && f.scheduled_date <= todayStr
  ).length
  const admissions = enquiries.filter((e) => e.status === 'admitted').length

  const conversionRate =
    totalEnquiries > 0
      ? Math.round((admissions / totalEnquiries) * 100 * 10) / 10
      : 0

  return {
    totalEnquiries,
    newEnquiries,
    contactedParents,
    demosScheduled,
    pendingFollowUps,
    admissions,
    conversionRate,
  }
}

// ---------------------------------------------------------------------------
// Enquiries
// ---------------------------------------------------------------------------
export async function getEnquiries(params?: {
  status?: string
  source?: string
  courseId?: string
  search?: string
}): Promise<Enquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      let query = supabase
        .from('enquiries')
        .select('*, course:courses(*), assigned_staff:staff_members(*)')
        .order('created_at', { ascending: false })

      if (params?.status && params.status !== 'all') {
        query = query.eq('status', params.status)
      }
      if (params?.source && params.source !== 'all') {
        query = query.eq('source', params.source)
      }
      if (params?.courseId && params.courseId !== 'all') {
        query = query.eq('course_id', params.courseId)
      }
      if (params?.search) {
        query = query.or(
          `student_name.ilike.%${params.search}%,guardian_name.ilike.%${params.search}%,guardian_phone.ilike.%${params.search}%`
        )
      }

      const { data, error } = await query
      if (!error && data) return data as Enquiry[]
    } catch {
      // fallback
    }
  }

  let result = [...memoryEnquiries]

  if (params?.status && params.status !== 'all') {
    result = result.filter((e) => e.status === params.status)
  }
  if (params?.source && params.source !== 'all') {
    result = result.filter((e) => e.source === params.source)
  }
  if (params?.courseId && params.courseId !== 'all') {
    result = result.filter((e) => e.course_id === params.courseId)
  }
  if (params?.search) {
    const term = params.search.toLowerCase()
    result = result.filter(
      (e) =>
        e.student_name.toLowerCase().includes(term) ||
        e.guardian_name.toLowerCase().includes(term) ||
        e.guardian_phone.includes(term)
    )
  }

  // Join courses and staff
  return result.map((e) => ({
    ...e,
    course: memoryCourses.find((c) => c.id === e.course_id),
    assigned_staff: DEMO_STAFF.find((s) => s.id === e.assigned_staff_id),
  }))
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const all = await getEnquiries()
  return all.find((e) => e.id === id) || null
}

export async function createEnquiryRecord(data: Partial<Enquiry>): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now().toString(36)}`,
    institution_id: data.institution_id || memoryInstitution.id,
    student_name: data.student_name || '',
    guardian_name: data.guardian_name || '',
    guardian_phone: data.guardian_phone || '',
    guardian_email: data.guardian_email || null,
    academic_level: data.academic_level || null,
    course_id: data.course_id || null,
    source: data.source || 'Walk-in',
    status: (data.status as EnquiryStatus) || 'new',
    assigned_staff_id: data.assigned_staff_id || null,
    notes: data.notes || null,
    next_follow_up_date: data.next_follow_up_date || null,
    enquiry_date: new Date().toISOString().split('T')[0],
    contact_consent: Boolean(data.contact_consent),
    is_demo_data: !isSupabaseConfigured(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data: inserted, error } = await supabase
        .from('enquiries')
        .insert(newEnquiry)
        .select()
        .single()
      if (!error && inserted) return inserted as Enquiry
    } catch {
      // fallback
    }
  }

  memoryEnquiries.unshift(newEnquiry)

  // Auto-schedule follow-up if follow-up date is provided
  if (newEnquiry.next_follow_up_date) {
    const fup: FollowUp = {
      id: `fup-${Date.now().toString(36)}`,
      enquiry_id: newEnquiry.id,
      institution_id: newEnquiry.institution_id,
      assigned_staff_id: newEnquiry.assigned_staff_id,
      scheduled_date: newEnquiry.next_follow_up_date,
      scheduled_time: '11:00',
      type: 'phone_call',
      status: 'pending',
      notes: `Initial follow-up for enquiry: ${newEnquiry.student_name}`,
      outcome: null,
      completed_at: null,
      is_demo_data: newEnquiry.is_demo_data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    memoryFollowUps.unshift(fup)
  }

  return newEnquiry
}

export async function updateEnquiryStatusRecord(
  id: string,
  status: EnquiryStatus
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { error } = await supabase
        .from('enquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (!error) return true
    } catch {
      // fallback
    }
  }

  const enq = memoryEnquiries.find((e) => e.id === id)
  if (enq) {
    enq.status = status
    enq.updated_at = new Date().toISOString()
    return true
  }
  return false
}

export async function deleteEnquiryRecord(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.from('enquiries').delete().eq('id', id)
      if (!error) return true
    } catch {
      // fallback
    }
  }

  memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id)
  memoryFollowUps = memoryFollowUps.filter((f) => f.enquiry_id !== id)
  memoryDemos = memoryDemos.filter((d) => d.enquiry_id !== id)
  return true
}

// ---------------------------------------------------------------------------
// Follow-Ups
// ---------------------------------------------------------------------------
export async function getFollowUps(tab?: 'today' | 'overdue' | 'upcoming' | 'completed' | 'all'): Promise<FollowUp[]> {
  const todayStr = new Date().toISOString().split('T')[0]
  const enquiries = await getEnquiries()

  let result = memoryFollowUps.map((f) => ({
    ...f,
    enquiry: enquiries.find((e) => e.id === f.enquiry_id),
    assigned_staff: DEMO_STAFF.find((s) => s.id === f.assigned_staff_id),
  }))

  if (!tab || tab === 'all') return result

  if (tab === 'today') {
    return result.filter(
      (f) => f.status === 'pending' && f.scheduled_date === todayStr
    )
  }
  if (tab === 'overdue') {
    return result.filter(
      (f) => f.status === 'pending' && f.scheduled_date < todayStr
    )
  }
  if (tab === 'upcoming') {
    return result.filter(
      (f) => f.status === 'pending' && f.scheduled_date > todayStr
    )
  }
  if (tab === 'completed') {
    return result.filter((f) => f.status === 'completed')
  }

  return result
}

export async function createFollowUpRecord(data: Partial<FollowUp>): Promise<FollowUp> {
  const newFollowUp: FollowUp = {
    id: `fup-${Date.now().toString(36)}`,
    enquiry_id: data.enquiry_id || '',
    institution_id: data.institution_id || memoryInstitution.id,
    assigned_staff_id: data.assigned_staff_id || null,
    scheduled_date: data.scheduled_date || new Date().toISOString().split('T')[0],
    scheduled_time: data.scheduled_time || '11:00',
    type: data.type || 'phone_call',
    status: 'pending',
    notes: data.notes || null,
    outcome: null,
    completed_at: null,
    is_demo_data: !isSupabaseConfigured(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  memoryFollowUps.unshift(newFollowUp)
  return newFollowUp
}

export async function markFollowUpComplete(
  id: string,
  outcome: string
): Promise<boolean> {
  const fup = memoryFollowUps.find((f) => f.id === id)
  if (fup) {
    fup.status = 'completed'
    fup.outcome = outcome
    fup.completed_at = new Date().toISOString()
    fup.updated_at = new Date().toISOString()
    return true
  }
  return false
}

export async function rescheduleFollowUpRecord(
  id: string,
  newDate: string,
  newTime?: string
): Promise<boolean> {
  const fup = memoryFollowUps.find((f) => f.id === id)
  if (fup) {
    fup.scheduled_date = newDate
    if (newTime) fup.scheduled_time = newTime
    fup.status = 'pending'
    fup.updated_at = new Date().toISOString()
    return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Demo Classes
// ---------------------------------------------------------------------------
export async function getDemoClasses(): Promise<DemoClass[]> {
  const enquiries = await getEnquiries()

  return memoryDemos.map((d) => ({
    ...d,
    enquiry: enquiries.find((e) => e.id === d.enquiry_id),
    course: memoryCourses.find((c) => c.id === d.course_id),
    batch: memoryBatches.find((b) => b.id === d.batch_id),
    conductor: DEMO_STAFF.find((s) => s.id === d.conducted_by),
  }))
}

export async function createDemoRecord(data: Partial<DemoClass>): Promise<DemoClass> {
  const newDemo: DemoClass = {
    id: `demo-${Date.now().toString(36)}`,
    enquiry_id: data.enquiry_id || '',
    institution_id: data.institution_id || memoryInstitution.id,
    course_id: data.course_id || null,
    batch_id: data.batch_id || null,
    scheduled_date: data.scheduled_date || new Date().toISOString().split('T')[0],
    scheduled_time: data.scheduled_time || '10:00',
    duration_minutes: data.duration_minutes || 60,
    status: 'scheduled',
    attendance: null,
    result: null,
    feedback: null,
    conducted_by: data.conducted_by || null,
    is_demo_data: !isSupabaseConfigured(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  memoryDemos.unshift(newDemo)

  // Also update enquiry status to demo_scheduled
  if (newDemo.enquiry_id) {
    await updateEnquiryStatusRecord(newDemo.enquiry_id, 'demo_scheduled')
  }

  return newDemo
}

export async function recordDemoResultAction(
  id: string,
  result: 'interested' | 'not_interested' | 'needs_follow_up',
  feedback: string,
  attendance: boolean
): Promise<boolean> {
  const demo = memoryDemos.find((d) => d.id === id)
  if (demo) {
    demo.result = result
    demo.feedback = feedback
    demo.attendance = attendance
    demo.status = 'completed'
    demo.updated_at = new Date().toISOString()

    // If result was interested, move enquiry to interested
    if (demo.enquiry_id) {
      if (result === 'interested') {
        await updateEnquiryStatusRecord(demo.enquiry_id, 'interested')
      } else if (result === 'not_interested') {
        await updateEnquiryStatusRecord(demo.enquiry_id, 'not_interested')
      } else if (result === 'needs_follow_up') {
        await updateEnquiryStatusRecord(demo.enquiry_id, 'follow_up')
      }
    }
    return true
  }
  return false
}

export async function convertDemoToAdmissionAction(
  demoId: string,
  notes?: string
): Promise<boolean> {
  const demo = memoryDemos.find((d) => d.id === demoId)
  if (demo && demo.enquiry_id) {
    demo.status = 'completed'
    demo.result = 'interested'
    demo.attendance = true
    await updateEnquiryStatusRecord(demo.enquiry_id, 'admitted')
    const enq = memoryEnquiries.find((e) => e.id === demo.enquiry_id)
    if (enq && notes) {
      enq.notes = (enq.notes ? enq.notes + '\n\n' : '') + `Admission note: ${notes}`
    }
    return true
  }
  return false
}

// ---------------------------------------------------------------------------
// WhatsApp Templates
// ---------------------------------------------------------------------------
export async function getWhatsAppTemplates(): Promise<WhatsAppTemplate[]> {
  return memoryTemplates
}

export async function saveWhatsAppTemplate(
  data: Partial<WhatsAppTemplate>
): Promise<WhatsAppTemplate> {
  if (data.id) {
    const existing = memoryTemplates.find((t) => t.id === data.id)
    if (existing) {
      existing.name = data.name || existing.name
      existing.category = data.category || existing.category
      existing.template_text = data.template_text || existing.template_text
      return existing
    }
  }

  const newTmpl: WhatsAppTemplate = {
    id: `tmpl-${Date.now().toString(36)}`,
    institution_id: memoryInstitution.id,
    name: data.name || 'Custom Template',
    category: data.category || 'general',
    template_text: data.template_text || '',
    is_active: true,
    created_at: new Date().toISOString(),
  }

  memoryTemplates.push(newTmpl)
  return newTmpl
}

// ---------------------------------------------------------------------------
// Courses, Batches, Staff
// ---------------------------------------------------------------------------
export async function getCourses(): Promise<Course[]> {
  return memoryCourses
}

export async function getBatches(): Promise<Batch[]> {
  return memoryBatches.map((b) => ({
    ...b,
    course: memoryCourses.find((c) => c.id === b.course_id),
  }))
}

export async function getStaffMembers(): Promise<StaffMember[]> {
  return DEMO_STAFF
}

export interface Institution {
  id: string
  name: string
  slug: string
  address: string | null
  city: string
  state: string
  pincode: string | null
  phone: string | null
  email: string | null
  website: string | null
  logo_url: string | null
  owner_user_id: string
  created_at: string
  updated_at: string
}

export interface StaffMember {
  id: string
  user_id: string
  institution_id: string
  role: 'owner' | 'admin' | 'staff'
  name: string
  phone: string | null
  email: string | null
  is_active: boolean
  created_at: string
}

export interface Course {
  id: string
  institution_id: string
  name: string
  description: string | null
  academic_level: string | null
  fee_amount: number | null
  duration_months: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Batch {
  id: string
  institution_id: string
  course_id: string
  name: string
  start_time: string | null
  end_time: string | null
  days_of_week: string[] | null
  max_students: number
  current_students: number
  is_active: boolean
  created_at: string
  course?: Course
}

export interface Enquiry {
  id: string
  institution_id: string
  student_name: string
  guardian_name: string
  guardian_phone: string
  guardian_email: string | null
  academic_level: string | null
  course_id: string | null
  source: string
  status: EnquiryStatus
  assigned_staff_id: string | null
  notes: string | null
  next_follow_up_date: string | null
  enquiry_date: string
  contact_consent: boolean
  is_demo_data: boolean
  created_at: string
  updated_at: string
  // Joined fields
  course?: Course
  assigned_staff?: StaffMember
}

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'demo_scheduled'
  | 'follow_up'
  | 'admitted'
  | 'not_interested'

export interface EnquiryHistory {
  id: string
  enquiry_id: string
  institution_id: string
  changed_by: string | null
  field_name: string
  old_value: string | null
  new_value: string | null
  notes: string | null
  created_at: string
  staff_member?: StaffMember
}

export interface FollowUp {
  id: string
  enquiry_id: string
  institution_id: string
  assigned_staff_id: string | null
  scheduled_date: string
  scheduled_time: string | null
  type: 'phone_call' | 'whatsapp' | 'in_person' | 'email' | 'other'
  status: 'pending' | 'completed' | 'rescheduled' | 'cancelled'
  notes: string | null
  outcome: string | null
  completed_at: string | null
  is_demo_data: boolean
  created_at: string
  updated_at: string
  // Joined fields
  enquiry?: Enquiry
  assigned_staff?: StaffMember
}

export interface DemoClass {
  id: string
  enquiry_id: string
  institution_id: string
  course_id: string | null
  batch_id: string | null
  scheduled_date: string
  scheduled_time: string
  duration_minutes: number
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  attendance: boolean | null
  result: 'interested' | 'not_interested' | 'needs_follow_up' | null
  feedback: string | null
  conducted_by: string | null
  is_demo_data: boolean
  created_at: string
  updated_at: string
  // Joined fields
  enquiry?: Enquiry
  course?: Course
  batch?: Batch
  conductor?: StaffMember
}

export interface WhatsAppTemplate {
  id: string
  institution_id: string
  name: string
  category:
    | 'enquiry_response'
    | 'follow_up'
    | 'demo_reminder'
    | 'admission_confirmation'
    | 'general'
  template_text: string
  is_active: boolean
  created_at: string
}

export interface DashboardMetrics {
  totalEnquiries: number
  newEnquiries: number
  contactedParents: number
  demosScheduled: number
  pendingFollowUps: number
  admissions: number
  conversionRate: number
}

export interface PricingPlan {
  name: string
  price: string
  priceNote: string
  description: string
  features: string[]
  highlighted?: boolean
  ctaText: string
}

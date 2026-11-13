-- EnrolmentDesk Database Schema
-- Run this migration against your Supabase PostgreSQL database.

-- =============================================================================
-- 1. INSTITUTIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'Bengaluru',
  state TEXT DEFAULT 'Karnataka',
  pincode TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_institutions_owner ON institutions(owner_user_id);
CREATE INDEX idx_institutions_slug ON institutions(slug);

-- =============================================================================
-- 2. STAFF MEMBERS (users belonging to an institution)
-- =============================================================================
CREATE TABLE IF NOT EXISTS staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'staff')),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, institution_id)
);

CREATE INDEX idx_staff_institution ON staff_members(institution_id);
CREATE INDEX idx_staff_user ON staff_members(user_id);

-- =============================================================================
-- 3. COURSES
-- =============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  academic_level TEXT, -- e.g., 'Class 10', 'Class 12', 'Competitive Exam'
  fee_amount NUMERIC(10, 2),
  duration_months INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_courses_institution ON courses(institution_id);

-- =============================================================================
-- 4. BATCHES
-- =============================================================================
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_time TIME,
  end_time TIME,
  days_of_week TEXT[], -- e.g., ['Mon', 'Wed', 'Fri']
  max_students INTEGER DEFAULT 30,
  current_students INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_batches_institution ON batches(institution_id);
CREATE INDEX idx_batches_course ON batches(course_id);

-- =============================================================================
-- 5. ENQUIRIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  guardian_name TEXT NOT NULL,
  guardian_phone TEXT NOT NULL,
  guardian_email TEXT,
  academic_level TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'Walk-in',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'interested', 'demo_scheduled', 'follow_up', 'admitted', 'not_interested')),
  assigned_staff_id UUID REFERENCES staff_members(id) ON DELETE SET NULL,
  notes TEXT,
  next_follow_up_date DATE,
  enquiry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  contact_consent BOOLEAN DEFAULT false,
  is_demo_data BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_enquiries_institution ON enquiries(institution_id);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_course ON enquiries(course_id);
CREATE INDEX idx_enquiries_staff ON enquiries(assigned_staff_id);
CREATE INDEX idx_enquiries_follow_up ON enquiries(next_follow_up_date);
CREATE INDEX idx_enquiries_created ON enquiries(created_at);

-- =============================================================================
-- 6. ENQUIRY HISTORY (audit log)
-- =============================================================================
CREATE TABLE IF NOT EXISTS enquiry_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES staff_members(id) ON DELETE SET NULL,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_history_enquiry ON enquiry_history(enquiry_id);
CREATE INDEX idx_history_institution ON enquiry_history(institution_id);

-- =============================================================================
-- 7. FOLLOW-UPS
-- =============================================================================
CREATE TABLE IF NOT EXISTS follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  assigned_staff_id UUID REFERENCES staff_members(id) ON DELETE SET NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  type TEXT NOT NULL DEFAULT 'phone_call'
    CHECK (type IN ('phone_call', 'whatsapp', 'in_person', 'email', 'other')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'rescheduled', 'cancelled')),
  notes TEXT,
  outcome TEXT,
  completed_at TIMESTAMPTZ,
  is_demo_data BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_followups_institution ON follow_ups(institution_id);
CREATE INDEX idx_followups_enquiry ON follow_ups(enquiry_id);
CREATE INDEX idx_followups_date ON follow_ups(scheduled_date);
CREATE INDEX idx_followups_status ON follow_ups(status);
CREATE INDEX idx_followups_staff ON follow_ups(assigned_staff_id);

-- =============================================================================
-- 8. DEMO CLASSES
-- =============================================================================
CREATE TABLE IF NOT EXISTS demo_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  attendance BOOLEAN,
  result TEXT CHECK (result IN ('interested', 'not_interested', 'needs_follow_up', NULL)),
  feedback TEXT,
  conducted_by UUID REFERENCES staff_members(id) ON DELETE SET NULL,
  is_demo_data BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_demos_institution ON demo_classes(institution_id);
CREATE INDEX idx_demos_enquiry ON demo_classes(enquiry_id);
CREATE INDEX idx_demos_date ON demo_classes(scheduled_date);
CREATE INDEX idx_demos_status ON demo_classes(status);

-- =============================================================================
-- 9. WHATSAPP MESSAGE TEMPLATES
-- =============================================================================
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('enquiry_response', 'follow_up', 'demo_reminder', 'admission_confirmation', 'general')),
  template_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_wa_templates_institution ON whatsapp_templates(institution_id);

-- =============================================================================
-- 10. ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- Helper function: get institution IDs for the current user
CREATE OR REPLACE FUNCTION get_user_institution_ids()
RETURNS SETOF UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT institution_id FROM staff_members WHERE user_id = auth.uid() AND is_active = true
  UNION
  SELECT id FROM institutions WHERE owner_user_id = auth.uid()
$$;

-- INSTITUTIONS policies
CREATE POLICY "Users can view their own institutions"
  ON institutions FOR SELECT
  USING (id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Authenticated users can create institutions"
  ON institutions FOR INSERT
  WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can update their institutions"
  ON institutions FOR UPDATE
  USING (owner_user_id = auth.uid());

-- STAFF MEMBERS policies
CREATE POLICY "Staff can view colleagues in same institution"
  ON staff_members FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Owners can manage staff"
  ON staff_members FOR INSERT
  WITH CHECK (institution_id IN (
    SELECT id FROM institutions WHERE owner_user_id = auth.uid()
  ));

CREATE POLICY "Owners can update staff"
  ON staff_members FOR UPDATE
  USING (institution_id IN (
    SELECT id FROM institutions WHERE owner_user_id = auth.uid()
  ));

CREATE POLICY "Owners can delete staff"
  ON staff_members FOR DELETE
  USING (institution_id IN (
    SELECT id FROM institutions WHERE owner_user_id = auth.uid()
  ));

-- COURSES policies
CREATE POLICY "Users can view courses of their institutions"
  ON courses FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can manage courses"
  ON courses FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update courses"
  ON courses FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete courses"
  ON courses FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- BATCHES policies
CREATE POLICY "Users can view batches of their institutions"
  ON batches FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can manage batches"
  ON batches FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update batches"
  ON batches FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete batches"
  ON batches FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- ENQUIRIES policies
CREATE POLICY "Users can view enquiries of their institutions"
  ON enquiries FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can create enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update enquiries"
  ON enquiries FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete enquiries"
  ON enquiries FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- ENQUIRY HISTORY policies
CREATE POLICY "Users can view enquiry history of their institutions"
  ON enquiry_history FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can create enquiry history"
  ON enquiry_history FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

-- FOLLOW-UPS policies
CREATE POLICY "Users can view follow-ups of their institutions"
  ON follow_ups FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can create follow-ups"
  ON follow_ups FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update follow-ups"
  ON follow_ups FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete follow-ups"
  ON follow_ups FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- DEMO CLASSES policies
CREATE POLICY "Users can view demo classes of their institutions"
  ON demo_classes FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can create demo classes"
  ON demo_classes FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update demo classes"
  ON demo_classes FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete demo classes"
  ON demo_classes FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- WHATSAPP TEMPLATES policies
CREATE POLICY "Users can view templates of their institutions"
  ON whatsapp_templates FOR SELECT
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can manage templates"
  ON whatsapp_templates FOR INSERT
  WITH CHECK (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can update templates"
  ON whatsapp_templates FOR UPDATE
  USING (institution_id IN (SELECT get_user_institution_ids()));

CREATE POLICY "Staff can delete templates"
  ON whatsapp_templates FOR DELETE
  USING (institution_id IN (SELECT get_user_institution_ids()));

-- =============================================================================
-- 11. PUBLIC ENQUIRY FORM (bypass RLS for anonymous submissions)
-- =============================================================================
-- Allow anonymous users to insert enquiries via the public enquiry form
-- The enquiry form uses the service role or a special insert policy
CREATE POLICY "Public can submit enquiries via form"
  ON enquiries FOR INSERT
  WITH CHECK (
    -- Only allow if the institution exists and the source is 'QR code' or 'Website'
    source IN ('QR code', 'Website')
    AND EXISTS (SELECT 1 FROM institutions WHERE id = institution_id)
    AND contact_consent = true
  );

-- Allow public to view active courses for enquiry form dropdowns
CREATE POLICY "Public can view active courses for enquiry forms"
  ON courses FOR SELECT
  USING (is_active = true);

-- Allow public to view institution basic info for enquiry forms
CREATE POLICY "Public can view institution basic info"
  ON institutions FOR SELECT
  USING (true); -- slug-based lookup needs this; sensitive data is not in this table

-- =============================================================================
-- 12. UPDATED_AT TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_follow_ups_updated_at
  BEFORE UPDATE ON follow_ups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_classes_updated_at
  BEFORE UPDATE ON demo_classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

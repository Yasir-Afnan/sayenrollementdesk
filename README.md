# EnrolmentDesk — Admissions, organised.

> The purpose-built admissions and prospective student enquiry management platform for independent tuition centres, coaching institutes, and local educational academies in India.

![EnrolmentDesk](https://img.shields.io/badge/Status-Production--Ready-emerald?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Database-PostgreSQL_%7C_Supabase-3ecf8e?style=flat-square&logo=supabase)

---

## 1. Executive Summary & Business Objective

Most small and independent tuition centres across Bengaluru and urban India manage admissions through scattered WhatsApp chats, handwritten notebooks, phone call logs, and disconnected spreadsheets. Valuable leads drop through the cracks, demo classes go unattended without reminders, and directors have zero real-time visibility into conversion velocity.

**EnrolmentDesk** replaces this chaos with a centralized admissions operating system designed specifically for the Indian tuition ecosystem:

- **Centralized Pipeline**: Capture leads from walk-ins, phone calls, website forms, and printed QR standees.
- **Dedicated Follow-Up Workspace**: Categorized daily queues for Today, Overdue (with visual alerts), and Upcoming calls.
- **Trial & Demo Class Scheduling**: Track faculty assignments, session times, student attendance, and convert successful trials directly to admissions.
- **Click-to-Chat WhatsApp Desk**: Compliant `wa.me` message templates with variable interpolation ({student_name}, {guardian_name}, {course_name}) without costly third-party API middleman charges.
- **QR Lead Capture & Public Standee**: Instant, mobile-friendly enquiry forms for front desks and flyers.
- **Indian Privacy Compliance (DPDP Act)**: Guardian consent verification, strict tenant isolation, and PostgreSQL Row-Level Security.

---

## 2. Product Architecture & Tech Stack

```
enrolmentdesk/
├── src/
│   ├── app/
│   │   ├── (marketing)/           # High-conversion public marketing website
│   │   │   ├── page.tsx           # Homepage (Hero, Problem, Features, Pricing, FAQ, CTA)
│   │   │   ├── features/          # Detailed capability breakdown
│   │   │   ├── pricing/           # Transparent pricing plans
│   │   │   ├── about/             # Mission & target market narrative
│   │   │   └── contact/           # Contact details (Bengaluru, India)
│   │   ├── (auth)/                # Secure authentication & password recovery
│   │   │   ├── login/             # Centre login + 1-Click Demo evaluation
│   │   │   ├── register/          # Tuition centre registration
│   │   │   └── reset-password/    # Password recovery
│   │   ├── dashboard/             # Private multi-tenant admissions suite
│   │   │   ├── page.tsx           # Real-time KPIs & velocity analytics
│   │   │   ├── enquiries/         # Full CRUD enquiry management & CSV export
│   │   │   ├── follow-ups/        # Overdue & daily counselor queues
│   │   │   ├── demos/             # Trial class calendar, attendance & conversion
│   │   │   ├── whatsapp/          # Dynamic template composer & wa.me dispatcher
│   │   │   ├── qr-capture/        # High-res PNG QR generator & printable standee
│   │   │   ├── onboarding/        # Centre configuration wizard
│   │   │   └── settings/          # Courses, batches, fees, and staff counselors
│   │   ├── enquire/[slug]/        # Public mobile enquiry page (no login required)
│   │   ├── globals.css            # Custom brand tokens & typography
│   │   └── layout.tsx             # Root layout with Inter font and toast providers
│   ├── components/
│   │   ├── dashboard/             # Sidebar, TopBar, Charts, Metrics, RecentActivity
│   │   ├── enquiries/             # EnquiryTable, EnquiryForm, StatusBadge
│   │   ├── follow-ups/            # FollowUpList with completion & reschedule modals
│   │   ├── demos/                 # DemoScheduleForm, DemoDetailManager
│   │   ├── whatsapp/              # WhatsAppWorkspace with realistic message bubble preview
│   │   ├── qr/                    # QRCodeManager, PublicEnquiryClientForm
│   │   └── ui/                    # Reusable design system primitives
│   └── lib/
│       ├── actions/               # Server Actions (auth, enquiries, follow-ups, demos, qr, institution)
│       ├── supabase/              # SSR-ready Supabase client, server, and middleware
│       ├── data-provider.ts       # Unified data layer with seamless demo fallback
│       ├── demo-data.ts           # Realistic Bengaluru tuition centre seed dataset
│       ├── types.ts               # Complete TypeScript domain contracts
│       └── utils.ts               # Formatters, Indian currency, status mappings
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql # Complete PostgreSQL schema with RLS policies
```

---

## 3. Commercial Model & Pricing Structure

| Package | Investment | Scope |
| :--- | :--- | :--- |
| **Starter Pilot** | **₹1,499** one-time | Core pipeline, walk-in logging, manual follow-up tracker, up to 100 students. |
| **Standard Setup** | **₹3,999** one-time | Full installation, custom QR standee, WhatsApp templates, demo class scheduler, staff training. |
| **Monthly Maintenance** | **₹799** / month | Cloud hosting, automated database backups, quarterly software updates, priority phone support. |

---

## 4. Getting Started Locally

### Prerequisites
- Node.js 18.x or 20.x+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Yasir-Afnan/sayenrollementdesk.git
cd sayenrollementdesk

# Switch to the MVP feature branch
git checkout feat/enrolmentdesk-mvp

# Install dependencies
npm install

# Configure environment variables (optional for demo mode)
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 5. Instant Interactive Demo Mode

EnrolmentDesk includes an **out-of-the-box interactive demo experience**. You do not need to configure Supabase or external database credentials to immediately evaluate the product:

1. Navigate to `/login`
2. Click **"Auto-fill credentials"** or enter:
   - **Email**: `demo@enrolmentdesk.in`
   - **Password**: `demo1234`
3. Click **"Sign in to Dashboard"**
4. Experience a pre-populated, realistic tuition centre: **"Apex Academy of Science & Mathematics, Jayanagar, Bengaluru"**
   - Add, edit, filter, and delete student enquiries
   - Export student records to CSV
   - Complete overdue follow-up calls
   - Evaluate demo class attendance and convert trials to admissions
   - Compose WhatsApp messages with variable replacement
   - Test the live public QR admissions form at `/enquire/apex-academy-bengaluru`

---

## 6. Supabase Database Setup & Deployment

When deploying to production with a dedicated Supabase PostgreSQL database:

### 1. Execute SQL Migration
Open your Supabase project's **SQL Editor** and run the contents of:
`supabase/migrations/001_initial_schema.sql`

This script creates:
- `institutions`, `staff_members`, `courses`, `batches`
- `enquiries`, `enquiry_history`, `follow_ups`, `demo_classes`, `whatsapp_templates`
- Row-Level Security (RLS) policies enforcing institution-level tenant isolation
- Public submission policy allowing QR code enquiries without compromising private records
- Automated `updated_at` database triggers

### 2. Configure Environment Variables
Set the following keys in `.env.local` or your Vercel Project Settings:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=EnrolmentDesk
```

### 3. Deploy on Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add the environment variables from above.
4. Deploy. Next.js App Router and Server Actions will be hosted automatically on Vercel's Edge network.

---

## 7. Security, Privacy & DPDP Compliance

1. **Multi-Tenant Data Isolation**: Database queries in production are protected by PostgreSQL Row-Level Security (RLS) linked to `auth.uid()`. Cross-institution record access is blocked at the database engine level.
2. **Protection of Minors**: Student contact information is never rendered on unauthenticated endpoints.
3. **Explicit Parental Consent**: Public enquiry forms require explicit opt-in confirmation for telephonic and WhatsApp outreach under India's Digital Personal Data Protection (DPDP) Act.
4. **Safe WhatsApp Dispatch**: Uses standard, sanctioned `https://wa.me/` protocol links without storing or exposing WhatsApp credentials.

---

## 8. Verification & Quality Assurance Results

- **TypeScript Compilation**: `npm run type-check` (Passed, 0 errors)
- **Production Optimization**: `npm run build` (Passed, 100% of 13 routes optimized)
- **Export Verification**: Validated client-side CSV generator with UTF-8 encoding.
- **QR Code Rendering**: Tested high-contrast data URI rendering for mobile camera scanners.

---

© 2026 EnrolmentDesk. Bengaluru, India. All rights reserved.

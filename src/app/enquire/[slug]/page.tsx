import React from 'react'
import { notFound } from 'next/navigation'
import { getInstitutionBySlug, getCourses } from '@/lib/data-provider'
import { PublicEnquiryClientForm } from '@/components/qr/PublicEnquiryClientForm'
import { Phone, MapPin, ShieldCheck } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export const dynamic = 'force-dynamic'

export default async function PublicEnquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [institution, courses] = await Promise.all([
    getInstitutionBySlug(slug),
    getCourses(),
  ])

  if (!institution) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-[#070b14] py-10 px-4 sm:px-6 transition-colors">
      <div className="mx-auto max-w-xl">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Centre Brand Header */}
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] p-6 shadow-sm mb-6 text-center transition-colors">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white font-bold text-2xl shadow-xs mb-3">
            {institution.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white font-sans">
            {institution.name}
          </h1>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 font-medium">
            Student Admissions &amp; Course Enquiry Form
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-surface-600 dark:text-surface-300 pt-3 border-t border-surface-100 dark:border-surface-800">
            {institution.address && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-surface-400" />
                <span>
                  {institution.address}, {institution.city}
                </span>
              </span>
            )}
            {institution.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-surface-400" />
                <span>{institution.phone}</span>
              </span>
            )}
          </div>
        </div>

        {/* Public Form Component */}
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] p-6 sm:p-8 shadow-sm transition-colors">
          <PublicEnquiryClientForm
            slug={slug}
            institutionName={institution.name}
            courses={courses}
          />
        </div>

        {/* DPDP Trust Footer */}
        <div className="mt-6 text-center text-[11px] text-surface-400 dark:text-surface-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            Powered by EnrolmentDesk • Your data is protected under India DPDP Act 2023.
          </span>
        </div>
      </div>
    </div>
  )
}

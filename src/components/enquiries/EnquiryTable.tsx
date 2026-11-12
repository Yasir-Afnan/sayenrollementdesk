'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Select } from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import {
  formatDate,
  generateWhatsAppLink,
  ENQUIRY_STATUSES,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_SOURCES,
} from '@/lib/utils'
import {
  Phone,
  MessageCircle,
  Download,
  Trash2,
  ExternalLink,
  UserPlus,
  Filter,
} from 'lucide-react'
import type { Enquiry, Course, EnquiryStatus } from '@/lib/types'
import { updateEnquiryStatusAction, deleteEnquiryAction } from '@/lib/actions/enquiries'
import { toast } from 'sonner'

export function EnquiryTable({
  initialEnquiries,
  courses,
}: {
  initialEnquiries: Enquiry[]
  courses: Course[]
}) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCourse, setSelectedCourse] = useState<string>('all')
  const [selectedSource, setSelectedSource] = useState<string>('all')

  // Deletion state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Filtering
  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      search === '' ||
      item.student_name.toLowerCase().includes(search.toLowerCase()) ||
      item.guardian_name.toLowerCase().includes(search.toLowerCase()) ||
      item.guardian_phone.includes(search)

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus
    const matchesCourse =
      selectedCourse === 'all' || item.course_id === selectedCourse
    const matchesSource =
      selectedSource === 'all' || item.source === selectedSource

    return matchesSearch && matchesStatus && matchesCourse && matchesSource
  })

  // Handle status update
  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      await updateEnquiryStatusAction(enquiryId, newStatus)
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      )
      toast.success(`Status updated to ${ENQUIRY_STATUS_LABELS[newStatus]}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  // Handle deletion
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    setIsDeleting(true)
    try {
      await deleteEnquiryAction(deleteTargetId)
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTargetId))
      toast.success('Enquiry record deleted')
      setDeleteTargetId(null)
    } catch {
      toast.error('Failed to delete enquiry')
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle CSV export
  const exportToCSV = () => {
    if (filtered.length === 0) {
      toast.error('No enquiries to export')
      return
    }

    const headers = [
      'Student Name',
      'Guardian Name',
      'Guardian Phone',
      'Guardian Email',
      'Academic Level',
      'Course',
      'Source',
      'Status',
      'Enquiry Date',
      'Next Follow-Up',
      'Notes',
    ]

    const rows = filtered.map((e) => [
      `"${e.student_name.replace(/"/g, '""')}"`,
      `"${e.guardian_name.replace(/"/g, '""')}"`,
      `"${e.guardian_phone}"`,
      `"${e.guardian_email || ''}"`,
      `"${e.academic_level || ''}"`,
      `"${e.course?.name || ''}"`,
      `"${e.source}"`,
      `"${ENQUIRY_STATUS_LABELS[e.status] || e.status}"`,
      `"${e.enquiry_date}"`,
      `"${e.next_follow_up_date || ''}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `enrolmentdesk_enquiries_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('CSV exported successfully')
  }

  return (
    <div className="space-y-4">
      {/* Filter and Action Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-xl bg-white p-4 border border-surface-200">
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder="Search by student, parent, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 rounded-lg border border-surface-200 bg-white px-3 text-xs font-medium text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Statuses ({enquiries.length})</option>
            {ENQUIRY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {ENQUIRY_STATUS_LABELS[status]}
              </option>
            ))}
          </select>

          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="h-10 rounded-lg border border-surface-200 bg-white px-3 text-xs font-medium text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="h-10 rounded-lg border border-surface-200 bg-white px-3 text-xs font-medium text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Sources</option>
            {ENQUIRY_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          {/* Export to CSV */}
          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-1.5 h-10">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>

          {/* New Enquiry Button */}
          <Link href="/dashboard/enquiries/new">
            <Button size="sm" className="gap-1.5 h-10">
              <UserPlus className="h-4 w-4" />
              <span>Add Enquiry</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Filter className="h-6 w-6" />}
          title="No enquiries matched"
          description="Try clearing your search query or removing the filters to see all student records."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('')
            setSelectedStatus('all')
            setSelectedCourse('all')
            setSelectedSource('all')
          }}
        />
      ) : (
        <div className="rounded-xl border border-surface-200 bg-white shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student & Parent</TableHead>
                <TableHead>Course & Level</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Next Follow-Up</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enq) => (
                <TableRow key={enq.id}>
                  {/* Student & Parent */}
                  <TableCell>
                    <div>
                      <Link
                        href={`/dashboard/enquiries/${enq.id}`}
                        className="text-xs font-bold text-surface-900 hover:text-brand-600 transition-colors"
                      >
                        {enq.student_name}
                      </Link>
                      <p className="text-[11px] text-surface-500">
                        {enq.guardian_name} • {enq.guardian_phone}
                      </p>
                    </div>
                  </TableCell>

                  {/* Course & Level */}
                  <TableCell>
                    <p className="text-xs font-medium text-surface-800">
                      {enq.course?.name || 'Unassigned Course'}
                    </p>
                    <p className="text-[11px] text-surface-500">
                      {enq.academic_level || 'General Level'}
                    </p>
                  </TableCell>

                  {/* Source */}
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-surface-100 px-2 py-0.5 text-[11px] font-medium text-surface-700">
                      {enq.source}
                    </span>
                  </TableCell>

                  {/* Status Dropdown */}
                  <TableCell>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                      }
                      className="text-xs font-semibold rounded-md border border-surface-200 bg-surface-50 py-1 px-2 focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer"
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {ENQUIRY_STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  {/* Enquiry Date */}
                  <TableCell className="text-xs text-surface-600 whitespace-nowrap">
                    {formatDate(enq.enquiry_date)}
                  </TableCell>

                  {/* Next Follow-Up */}
                  <TableCell className="text-xs whitespace-nowrap">
                    {enq.next_follow_up_date ? (
                      <span
                        className={
                          enq.next_follow_up_date <
                          new Date().toISOString().split('T')[0]
                            ? 'text-red-600 font-semibold'
                            : 'text-surface-700'
                        }
                      >
                        {formatDate(enq.next_follow_up_date)}
                      </span>
                    ) : (
                      <span className="text-surface-400">—</span>
                    )}
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* WhatsApp Link */}
                      <a
                        href={generateWhatsAppLink(
                          enq.guardian_phone,
                          `Hello ${enq.guardian_name}, this is from EnrolmentDesk regarding ${enq.student_name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>

                      {/* Phone Link */}
                      <a
                        href={`tel:${enq.guardian_phone}`}
                        className="rounded-lg p-1.5 text-surface-600 hover:bg-surface-100 transition-colors"
                        title="Call parent"
                      >
                        <Phone className="h-4 w-4" />
                      </a>

                      {/* Detail Link */}
                      <Link
                        href={`/dashboard/enquiries/${enq.id}`}
                        className="rounded-lg p-1.5 text-brand-600 hover:bg-brand-50 transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(enq.id)}
                        className="rounded-lg p-1.5 text-surface-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete enquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Enquiry Record"
        description="Are you sure you want to delete this enquiry? This action cannot be undone and will remove all associated follow-ups and demo schedules."
        confirmText="Delete Record"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

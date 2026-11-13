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
  LayoutGrid,
  List,
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
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban')
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
      toast.success(`Moved to ${ENQUIRY_STATUS_LABELS[newStatus]}`)
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

  // Export CSV
  const exportToCSV = () => {
    const headers = [
      'Student Name',
      'Guardian Name',
      'Guardian Phone',
      'Course',
      'Academic Level',
      'Lead Source',
      'Status',
      'Enquiry Date',
      'Next Follow-Up',
      'Notes',
    ]

    const rows = filtered.map((e) => [
      `"${e.student_name}"`,
      `"${e.guardian_name}"`,
      `"${e.guardian_phone}"`,
      `"${e.course?.name || ''}"`,
      `"${e.academic_level || ''}"`,
      `"${e.source}"`,
      `"${ENQUIRY_STATUS_LABELS[e.status]}"`,
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
      {/* Control Bar: Search, Filters, View Toggles, Actions */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-2xl bg-white dark:bg-[#0e1424] p-4 border border-surface-200/90 dark:border-surface-800 shadow-2xs transition-colors">
        {/* Search */}
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder="Search student, parent, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        {/* View Mode & Filter Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Table vs Kanban Toggle */}
          <div className="inline-flex rounded-xl bg-surface-100 dark:bg-surface-900 p-1 border border-surface-200/60 dark:border-surface-800">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Pipeline Board</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-3 text-xs font-medium text-surface-700 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Stages ({enquiries.length})</option>
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
            className="h-9 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-3 text-xs font-medium text-surface-700 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
            className="h-9 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-3 text-xs font-medium text-surface-700 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Sources</option>
            {ENQUIRY_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          {/* Export CSV */}
          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-1.5 h-9 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          {/* New Enquiry */}
          <Link href="/dashboard/enquiries/new">
            <Button size="sm" className="gap-1.5 h-9 text-xs">
              <UserPlus className="h-3.5 w-3.5" />
              <span>Add Enquiry</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main View Display */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Filter className="h-6 w-6" />}
          title="No enquiries matched filters"
          description="Try resetting search keywords or selecting all pipeline stages."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearch('')
            setSelectedStatus('all')
            setSelectedCourse('all')
            setSelectedSource('all')
          }}
        />
      ) : viewMode === 'kanban' ? (
        /* ================= KANBAN PIPELINE BOARD ================= */
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex items-start gap-4 min-w-full">
            {ENQUIRY_STATUSES.map((statusKey) => {
              const stageEnquiries = filtered.filter((e) => e.status === statusKey)
              const stageColorHeader = {
                new: 'border-t-blue-500',
                contacted: 'border-t-amber-500',
                interested: 'border-t-purple-500',
                demo_scheduled: 'border-t-indigo-500',
                follow_up: 'border-t-orange-500',
                admitted: 'border-t-emerald-500',
                not_interested: 'border-t-slate-400',
              }[statusKey]

              return (
                <div
                  key={statusKey}
                  className={`w-72 shrink-0 rounded-2xl bg-surface-100/70 dark:bg-[#0c1220] border border-surface-200/90 dark:border-surface-800 border-t-4 ${stageColorHeader} p-3 flex flex-col max-h-[calc(100vh-250px)]`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-200/70 dark:border-surface-800">
                    <span className="text-xs font-bold text-surface-900 dark:text-white tracking-tight">
                      {ENQUIRY_STATUS_LABELS[statusKey]}
                    </span>
                    <span className="rounded-full bg-white dark:bg-surface-800 px-2 py-0.5 text-[10px] font-bold text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700">
                      {stageEnquiries.length}
                    </span>
                  </div>

                  {/* Cards in Column */}
                  <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
                    {stageEnquiries.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-surface-200 dark:border-surface-800 p-4 text-center text-[11px] text-surface-400 dark:text-surface-500">
                        No students in this stage
                      </div>
                    ) : (
                      stageEnquiries.map((enq) => {
                        const waLink = generateWhatsAppLink(
                          enq.guardian_phone,
                          `Hello ${enq.guardian_name}, this is from EnrolmentDesk regarding ${enq.student_name}.`
                        )

                        return (
                          <div
                            key={enq.id}
                            className="saas-card rounded-xl p-3.5 bg-white dark:bg-[#131b2e] space-y-2 relative group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/dashboard/enquiries/${enq.id}`}
                                className="font-bold text-xs text-surface-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors leading-tight"
                              >
                                {enq.student_name}
                              </Link>
                              <span className="shrink-0 text-[10px] font-semibold text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-1.5 py-0.2 rounded">
                                {enq.source}
                              </span>
                            </div>

                            <p className="text-[11px] text-surface-500 dark:text-surface-400">
                              Parent: {enq.guardian_name} • {enq.guardian_phone}
                            </p>

                            <div className="text-[11px] font-medium text-brand-700 dark:text-brand-300 bg-brand-50/70 dark:bg-brand-950/60 px-2 py-1 rounded-md border border-brand-100/60 dark:border-brand-900/60 truncate">
                              {enq.course?.name || enq.academic_level || 'General Coaching'}
                            </div>

                            {/* Move Pipeline Stage Quick Switcher */}
                            <div className="pt-2 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between text-[11px]">
                              <select
                                value={enq.status}
                                onChange={(e) =>
                                  handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                                }
                                className="text-[10px] font-semibold text-surface-600 dark:text-surface-300 rounded bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 py-0.5 px-1.5 cursor-pointer focus:outline-none"
                              >
                                {ENQUIRY_STATUSES.map((s) => (
                                  <option key={s} value={s} className="bg-white dark:bg-surface-900 text-surface-900 dark:text-white">
                                    Move: {ENQUIRY_STATUS_LABELS[s]}
                                  </option>
                                ))}
                              </select>

                              <div className="flex items-center gap-1">
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                                  title="WhatsApp"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                </a>
                                <Link
                                  href={`/dashboard/enquiries/${enq.id}`}
                                  className="p-1 rounded text-surface-400 hover:text-brand-600 dark:hover:text-brand-400"
                                  title="View File"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ================= TABLE VIEW ================= */
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] shadow-2xs overflow-hidden transition-colors">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student &amp; Parent</TableHead>
                <TableHead>Course &amp; Level</TableHead>
                <TableHead>Lead Source</TableHead>
                <TableHead>Pipeline Stage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Next Follow-Up</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enq) => (
                <TableRow key={enq.id}>
                  <TableCell>
                    <div>
                      <Link
                        href={`/dashboard/enquiries/${enq.id}`}
                        className="text-xs font-bold text-surface-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {enq.student_name}
                      </Link>
                      <p className="text-[11px] text-surface-500 dark:text-surface-400">
                        {enq.guardian_name} • {enq.guardian_phone}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs font-medium text-surface-800 dark:text-surface-200">
                      {enq.course?.name || 'Unassigned Course'}
                    </p>
                    <p className="text-[11px] text-surface-500 dark:text-surface-400">
                      {enq.academic_level || 'General Level'}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-surface-100 dark:bg-surface-800 px-2 py-0.5 text-[11px] font-medium text-surface-700 dark:text-surface-300">
                      {enq.source}
                    </span>
                  </TableCell>

                  <TableCell>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                      }
                      className="text-xs font-semibold rounded-md border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white py-1 px-2 focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer"
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-white dark:bg-surface-900 text-surface-900 dark:text-white">
                          {ENQUIRY_STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  <TableCell className="text-xs text-surface-600 dark:text-surface-400 whitespace-nowrap">
                    {formatDate(enq.enquiry_date)}
                  </TableCell>

                  <TableCell className="text-xs whitespace-nowrap">
                    {enq.next_follow_up_date ? (
                      <span
                        className={
                          enq.next_follow_up_date <
                          new Date().toISOString().split('T')[0]
                            ? 'text-red-600 dark:text-red-400 font-bold flex items-center gap-1'
                            : 'text-surface-700 dark:text-surface-300'
                        }
                      >
                        {enq.next_follow_up_date <
                          new Date().toISOString().split('T')[0] && (
                          <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        )}
                        {formatDate(enq.next_follow_up_date)}
                      </span>
                    ) : (
                      <span className="text-surface-400 dark:text-surface-500">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={generateWhatsAppLink(
                          enq.guardian_phone,
                          `Hello ${enq.guardian_name}, this is from EnrolmentDesk regarding ${enq.student_name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>

                      <a
                        href={`tel:${enq.guardian_phone}`}
                        className="rounded-lg p-1.5 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        title="Call parent"
                      >
                        <Phone className="h-4 w-4" />
                      </a>

                      <Link
                        href={`/dashboard/enquiries/${enq.id}`}
                        className="rounded-lg p-1.5 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(enq.id)}
                        className="rounded-lg p-1.5 text-surface-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
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
        title="Delete Student Enquiry Record"
        description="Are you sure you want to permanently delete this student enquiry? This will remove all associated follow-ups, trial class schedules, and call logs."
        confirmText="Delete Record"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EmptyState } from '@/components/ui/empty-state'
import { formatDate, generateWhatsAppLink } from '@/lib/utils'
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Clock,
  AlertTriangle,
  User,
  ArrowRight,
} from 'lucide-react'
import type { FollowUp, StaffMember } from '@/lib/types'
import { completeFollowUpAction, rescheduleFollowUpAction } from '@/lib/actions/follow-ups'
import { toast } from 'sonner'

export function FollowUpList({
  initialFollowUps,
  staffMembers = [],
}: {
  initialFollowUps: FollowUp[]
  staffMembers?: StaffMember[]
}) {
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps)
  const [activeTab, setActiveTab] = useState<'today' | 'overdue' | 'upcoming' | 'completed'>('today')
  const [staffFilter, setStaffFilter] = useState<string>('all')

  // Completion modal state
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [outcomeNotes, setOutcomeNotes] = useState('')
  const [isSubmittingComplete, setIsSubmittingComplete] = useState(false)

  // Rescheduling modal state
  const [reschedulingId, setReschedulingId] = useState<string | null>(null)
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])
  const [newTime, setNewTime] = useState('11:00')
  const [isSubmittingReschedule, setIsSubmittingReschedule] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]

  // Filter based on tab and staff
  const filtered = followUps.filter((fup) => {
    const matchesStaff = staffFilter === 'all' || fup.assigned_staff_id === staffFilter

    if (!matchesStaff) return false

    if (activeTab === 'today') {
      return fup.status === 'pending' && fup.scheduled_date === todayStr
    }
    if (activeTab === 'overdue') {
      return fup.status === 'pending' && fup.scheduled_date < todayStr
    }
    if (activeTab === 'upcoming') {
      return fup.status === 'pending' && fup.scheduled_date > todayStr
    }
    if (activeTab === 'completed') {
      return fup.status === 'completed'
    }

    return true
  })

  // Tab counts
  const countToday = followUps.filter((f) => f.status === 'pending' && f.scheduled_date === todayStr).length
  const countOverdue = followUps.filter((f) => f.status === 'pending' && f.scheduled_date < todayStr).length
  const countUpcoming = followUps.filter((f) => f.status === 'pending' && f.scheduled_date > todayStr).length
  const countCompleted = followUps.filter((f) => f.status === 'completed').length

  const handleCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!completingId) return
    setIsSubmittingComplete(true)

    try {
      await completeFollowUpAction(completingId, outcomeNotes || 'Follow-up call completed.')
      setFollowUps((prev) =>
        prev.map((f) =>
          f.id === completingId
            ? {
                ...f,
                status: 'completed',
                outcome: outcomeNotes || 'Follow-up call completed.',
                completed_at: new Date().toISOString(),
              }
            : f
        )
      )
      toast.success('Follow-up marked as completed')
      setCompletingId(null)
      setOutcomeNotes('')
    } catch {
      toast.error('Failed to complete follow-up')
    } finally {
      setIsSubmittingComplete(false)
    }
  }

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reschedulingId) return
    setIsSubmittingReschedule(true)

    try {
      await rescheduleFollowUpAction(reschedulingId, newDate, newTime)
      setFollowUps((prev) =>
        prev.map((f) =>
          f.id === reschedulingId
            ? {
                ...f,
                scheduled_date: newDate,
                scheduled_time: newTime,
              }
            : f
        )
      )
      toast.success(`Rescheduled to ${formatDate(newDate)}`)
      setReschedulingId(null)
    } catch {
      toast.error('Failed to reschedule follow-up')
    } finally {
      setIsSubmittingReschedule(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="inline-flex rounded-xl bg-surface-100 dark:bg-surface-900 p-1 border border-surface-200/80 dark:border-surface-800 text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('today')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            <span>Today</span>
            <span className="rounded-full bg-brand-50 dark:bg-brand-950/60 px-1.5 py-0.2 text-[10px] text-brand-700 dark:text-brand-300">
              {countToday}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('overdue')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all cursor-pointer ${
              activeTab === 'overdue'
                ? 'bg-red-600 text-white shadow-xs font-bold'
                : 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Overdue</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeTab === 'overdue' ? 'bg-red-800 text-white' : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
              }`}
            >
              {countOverdue}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            <span>Upcoming</span>
            <span className="rounded-full bg-surface-200 dark:bg-surface-800 px-1.5 py-0.2 text-[10px] text-surface-700 dark:text-surface-300">
              {countUpcoming}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-xs'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            <span>Completed</span>
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 text-[10px] text-emerald-800 dark:text-emerald-300">
              {countCompleted}
            </span>
          </button>
        </div>

        {/* Staff Assignment Filter */}
        {staffMembers.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">Assigned to:</span>
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="h-9 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-3 text-xs font-medium text-surface-700 dark:text-surface-200 focus:outline-none"
            >
              <option value="all">All Counselors</option>
              {staffMembers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* List of Tasks */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
          title={`No ${activeTab} follow-ups`}
          description={
            activeTab === 'overdue'
              ? 'Awesome! You have zero overdue tasks. Every enquiry is addressed on schedule.'
              : `There are currently no tasks listed under ${activeTab}.`
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((fup) => {
            const isOverdue = fup.status === 'pending' && fup.scheduled_date < todayStr
            const waLink = fup.enquiry?.guardian_phone
              ? generateWhatsAppLink(
                  fup.enquiry.guardian_phone,
                  `Hello ${fup.enquiry.guardian_name}, this is from EnrolmentDesk following up on ${fup.enquiry.student_name}'s admissions enquiry.`
                )
              : '#'

            return (
              <div
                key={fup.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 shadow-xs transition-all ${
                  isOverdue
                    ? 'border-red-300 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/20'
                    : 'border-surface-200 dark:border-surface-800 bg-white dark:bg-[#0e1424] hover:border-surface-300 dark:hover:border-surface-700'
                }`}
              >
                {/* Left: Task Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {isOverdue && (
                      <span className="inline-flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        <AlertTriangle className="h-3 w-3" /> Overdue
                      </span>
                    )}

                    <span className="text-xs font-bold text-surface-900 dark:text-white">
                      {fup.enquiry?.student_name || 'Prospective Student'}
                    </span>

                    <span className="text-[11px] text-surface-500 dark:text-surface-400">
                      (Parent: {fup.enquiry?.guardian_name} • {fup.enquiry?.guardian_phone})
                    </span>
                  </div>

                  <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed font-medium">
                    {fup.notes || 'Routine follow-up call with parent regarding course enrolment.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-surface-400 dark:text-surface-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(fup.scheduled_date)}
                    </span>
                    {fup.scheduled_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {fup.scheduled_time}
                      </span>
                    )}
                    {fup.assigned_staff && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Assigned: {fup.assigned_staff.name}
                      </span>
                    )}
                    {fup.outcome && (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        Outcome: {fup.outcome}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-100 dark:border-surface-800">
                  {fup.status === 'pending' && (
                    <>
                      {/* WhatsApp CTA */}
                      {fup.enquiry?.guardian_phone && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {/* Direct Phone Call */}
                      {fup.enquiry?.guardian_phone && (
                        <a
                          href={`tel:${fup.enquiry.guardian_phone}`}
                          className="inline-flex items-center gap-1 rounded-xl bg-surface-50 dark:bg-surface-800 px-2.5 py-1.5 text-xs font-semibold text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call</span>
                        </a>
                      )}

                      {/* Reschedule Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => {
                          setReschedulingId(fup.id)
                          setNewDate(fup.scheduled_date)
                        }}
                      >
                        Reschedule
                      </Button>

                      {/* Mark Complete Button */}
                      <Button
                        size="sm"
                        className="text-xs h-8 gap-1"
                        onClick={() => {
                          setCompletingId(fup.id)
                          setOutcomeNotes('')
                        }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Done</span>
                      </Button>
                    </>
                  )}

                  {fup.enquiry_id && (
                    <Link
                      href={`/dashboard/enquiries/${fup.enquiry_id}`}
                      className="p-1.5 text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-colors"
                      title="View Student File"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Complete Task Dialog */}
      <Dialog
        open={Boolean(completingId)}
        onClose={() => setCompletingId(null)}
        title="Complete Follow-up Call"
        description="Record the parent's feedback or outcome of this conversation before marking complete."
      >
        <form onSubmit={handleCompleteSubmit} className="space-y-4">
          <Textarea
            label="Call Notes / Outcome"
            required
            placeholder="e.g. Spoke with mother. Confirmed attendance for Saturday demo class at 10 AM."
            rows={3}
            value={outcomeNotes}
            onChange={(e) => setOutcomeNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => setCompletingId(null)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isSubmittingComplete}>
              Save & Mark Completed
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Reschedule Task Dialog */}
      <Dialog
        open={Boolean(reschedulingId)}
        onClose={() => setReschedulingId(null)}
        title="Reschedule Follow-up"
        description="Select a new date and time to re-contact this parent."
      >
        <form onSubmit={handleRescheduleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="New Date"
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <Input
              label="Time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => setReschedulingId(null)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isSubmittingReschedule}>
              Confirm Reschedule
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

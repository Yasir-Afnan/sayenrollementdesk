import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const indianPhone = cleanPhone.startsWith('91')
    ? cleanPhone
    : `91${cleanPhone}`
  const url = `https://wa.me/${indianPhone}`
  return message ? `${url}?text=${encodeURIComponent(message)}` : url
}

export const ENQUIRY_STATUSES = [
  'new',
  'contacted',
  'interested',
  'demo_scheduled',
  'follow_up',
  'admitted',
  'not_interested',
] as const

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number]

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: 'New Enquiry',
  contacted: 'Contacted',
  interested: 'Interested',
  demo_scheduled: 'Demo Scheduled',
  follow_up: 'Follow-up Required',
  admitted: 'Admitted',
  not_interested: 'Not Interested',
}

export const ENQUIRY_STATUS_COLORS: Record<EnquiryStatus, string> = {
  new: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60',
  contacted: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
  interested: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60',
  demo_scheduled: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60',
  follow_up: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60',
  admitted: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
  not_interested: 'bg-surface-100 dark:bg-surface-800/60 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700/60',
}

export const ENQUIRY_SOURCES = [
  'Walk-in',
  'Phone call',
  'WhatsApp',
  'Website',
  'QR code',
  'Referral',
  'Social media',
  'Newspaper',
  'Pamphlet',
  'Other',
] as const

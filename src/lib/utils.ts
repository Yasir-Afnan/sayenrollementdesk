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
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  interested: 'bg-purple-100 text-purple-800',
  demo_scheduled: 'bg-indigo-100 text-indigo-800',
  follow_up: 'bg-orange-100 text-orange-800',
  admitted: 'bg-green-100 text-green-800',
  not_interested: 'bg-gray-100 text-gray-600',
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

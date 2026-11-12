import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-surface-900">
              Enrolment<span className="text-brand-600">Desk</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface-500">
              The admissions and enquiry management platform built for independent tuition centres
              and coaching institutes across India.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <Mail className="h-4 w-4 text-surface-400" />
                <a href="mailto:hello@enrolmentdesk.in" className="hover:text-surface-900">
                  hello@enrolmentdesk.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <MapPin className="h-4 w-4 text-surface-400" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-surface-900">{heading}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-500 transition-colors hover:text-surface-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-surface-200 pt-8">
          <p className="text-center text-xs text-surface-400">
            &copy; {new Date().getFullYear()} EnrolmentDesk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

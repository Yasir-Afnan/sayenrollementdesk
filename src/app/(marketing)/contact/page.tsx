import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — EnrolmentDesk',
  description: 'Get in touch with the EnrolmentDesk team. Based in Bengaluru, India.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-surface-200 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500">
            Have questions about EnrolmentDesk? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-surface-900">
                Let&apos;s talk
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-surface-500">
                Whether you&apos;re a tuition centre owner exploring your options or you already know
                you need better admissions tooling — reach out. We&apos;ll get back to you within 24
                hours.
              </p>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                    <Mail className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900">Email</h3>
                    <a
                      href="mailto:hello@enrolmentdesk.in"
                      className="mt-1 text-sm text-surface-500 hover:text-brand-600"
                    >
                      hello@enrolmentdesk.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                    <MapPin className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900">Location</h3>
                    <p className="mt-1 text-sm text-surface-500">Bengaluru, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-xl border border-surface-200 bg-surface-50 p-8">
              <h3 className="text-lg font-semibold text-surface-900">Send a message</h3>
              <p className="mt-1 text-sm text-surface-500">
                Fill out the form below and we&apos;ll get back to you soon.
              </p>

              <form className="mt-6 flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-surface-0 px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-surface-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-surface-0 px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="centre" className="block text-sm font-medium text-surface-700">
                    Centre name (optional)
                  </label>
                  <input
                    type="text"
                    id="centre"
                    name="centre"
                    placeholder="Your tuition centre"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-surface-0 px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-surface-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your centre and what you're looking for..."
                    className="mt-1.5 w-full resize-none rounded-lg border border-surface-300 bg-surface-0 px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

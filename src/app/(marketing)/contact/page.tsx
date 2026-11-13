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
      <section className="border-b border-surface-200 dark:border-surface-800 py-20 bg-white dark:bg-[#070b14] transition-colors relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white md:text-5xl font-sans">
            Contact Admissions Support
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-500 dark:text-surface-400">
            Have questions about EnrolmentDesk? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#070b14] transition-colors">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white font-sans">
                Let&apos;s talk
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                Whether you&apos;re a tuition centre owner exploring your options or you already know
                you need better admissions tooling — reach out. We&apos;ll get back to you within 24
                hours.
              </p>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/60">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Email</h3>
                    <a
                      href="mailto:hello@enrolmentdesk.in"
                      className="mt-1 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      hello@enrolmentdesk.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/60">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Location</h3>
                    <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-[#0e1424] p-8 transition-colors">
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">Send a message</h3>
              <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                Fill out the form below and our team will get back to you soon.
              </p>

              <form className="mt-6 flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Dr. Anand Rao"
                    className="mt-1.5 w-full rounded-xl border border-surface-300 dark:border-surface-700 bg-white dark:bg-[#070b14] px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@centre.edu.in"
                    className="mt-1.5 w-full rounded-xl border border-surface-300 dark:border-surface-700 bg-white dark:bg-[#070b14] px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your tuition centre and student intake goals..."
                    className="mt-1.5 w-full rounded-xl border border-surface-300 dark:border-surface-700 bg-white dark:bg-[#070b14] px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all glow-brand cursor-pointer"
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

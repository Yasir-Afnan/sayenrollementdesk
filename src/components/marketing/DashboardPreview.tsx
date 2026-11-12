export default function DashboardPreview() {
  const rows = [
    { name: 'Arjun Mehta', course: 'JEE Foundation', stage: 'Demo Scheduled', stageColor: 'bg-blue-100 text-blue-700' },
    { name: 'Priya Sharma', course: 'NEET Crash Course', stage: 'Follow-up', stageColor: 'bg-amber-100 text-amber-700' },
    { name: 'Rohan Nair', course: 'Class 10 Maths', stage: 'New Enquiry', stageColor: 'bg-brand-100 text-brand-700' },
    { name: 'Sneha Iyer', course: 'Class 12 Physics', stage: 'Enrolled', stageColor: 'bg-emerald-100 text-emerald-700' },
  ]

  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600">Your workspace</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-surface-900 md:text-4xl">
            A clear view of every enquiry
          </h2>
          <p className="mt-4 text-base leading-relaxed text-surface-500">
            No more digging through chat threads. See every prospective student, their status, and
            what needs to happen next.
          </p>
        </div>

        {/* Mock dashboard */}
        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-surface-200 bg-surface-0 shadow-lg">
          {/* Mock top bar */}
          <div className="flex items-center justify-between border-b border-surface-200 bg-surface-50 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-surface-300" />
              <div className="h-3 w-3 rounded-full bg-surface-300" />
              <div className="h-3 w-3 rounded-full bg-surface-300" />
            </div>
            <span className="text-xs font-medium text-surface-400">EnrolmentDesk — Enquiry Pipeline</span>
            <div />
          </div>

          {/* Mock table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                    Student
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                    Course Interest
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                    Stage
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.name}
                    className={i < rows.length - 1 ? 'border-b border-surface-100' : ''}
                  >
                    <td className="px-6 py-4 font-medium text-surface-900">{row.name}</td>
                    <td className="px-6 py-4 text-surface-600">{row.course}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${row.stageColor}`}
                      >
                        {row.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

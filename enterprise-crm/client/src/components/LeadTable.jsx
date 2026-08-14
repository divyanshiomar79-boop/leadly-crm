const STAGES = ["New", "Contacted", "Won", "Lost"];

const stageClass = (stage) =>
  ({
    New: "border-slate-300 bg-slate-50 text-slate-700",
    Contacted: "border-amber-300 bg-amber-50 text-amber-700",
    Won: "border-emerald-300 bg-emerald-50 text-emerald-700",
    Lost: "border-red-300 bg-red-50 text-red-700",
  })[stage] || "border-slate-300 bg-slate-50 text-slate-700";

export default function LeadTable({ leads, loading, onStageChange, onDelete }) {
  return (
    <section className="card overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Leads</h2>
        <span className="text-sm text-slate-500">{leads.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Phone</th>
              <th className="px-6 py-3 font-semibold">Deal Stage</th>
              <th className="px-6 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Loading leads...
                </td>
              </tr>
            )}

            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No leads yet. Add your first lead above.
                </td>
              </tr>
            )}

            {!loading &&
              leads.map((lead) => (
                <tr key={lead._id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 text-slate-600">{lead.email}</td>
                  <td className="px-6 py-4 text-slate-600">{lead.phone || "—"}</td>
                  <td className="px-6 py-4">
                    <select
                      aria-label={`Deal stage for ${lead.name}`}
                      className={`rounded-lg border px-2 py-1 text-xs font-semibold outline-none ${stageClass(lead.dealStage)}`}
                      value={lead.dealStage}
                      onChange={(event) => onStageChange(lead._id, event.target.value)}
                    >
                      {STAGES.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="btn-danger" onClick={() => onDelete(lead._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

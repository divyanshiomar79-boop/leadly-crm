import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enterprise CRM — Lead Management Dashboard" },
      {
        name: "description",
        content:
          "Track leads, deal stages and pipeline health in one modern CRM dashboard. Preview running on in-memory dummy data.",
      },
      { property: "og:title", content: "Enterprise CRM — Lead Management Dashboard" },
      {
        property: "og:description",
        content: "Track leads, deal stages and pipeline health in one modern CRM dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "New" | "Contacted" | "Won" | "Lost";
type Lead = { _id: string; name: string; email: string; phone: string; dealStage: Stage };

const STAGES: Stage[] = ["New", "Contacted", "Won", "Lost"];

const SEED: Lead[] = [
  { _id: "1", name: "Jane Cooper", email: "jane@acme.com", phone: "+1 555 0100", dealStage: "Won" },
  { _id: "2", name: "Marcus Webb", email: "marcus@northwind.io", phone: "+1 555 0142", dealStage: "Contacted" },
  { _id: "3", name: "Priya Nair", email: "priya@lumenlabs.com", phone: "+91 98200 11234", dealStage: "New" },
  { _id: "4", name: "Tomas Ricci", email: "tomas@vertexgroup.eu", phone: "+39 340 118 2277", dealStage: "Lost" },
  { _id: "5", name: "Sofia Almeida", email: "sofia@brightpath.co", phone: "+351 912 445 018", dealStage: "Contacted" },
  { _id: "6", name: "Daniel Osei", email: "daniel@harborstack.dev", phone: "", dealStage: "New" },
];

const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";
const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700";
const btnDanger =
  "inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100";

const stageClass = (stage: Stage) =>
  ({
    New: "border-slate-300 bg-slate-50 text-slate-700",
    Contacted: "border-amber-300 bg-amber-50 text-amber-700",
    Won: "border-emerald-300 bg-emerald-50 text-emerald-700",
    Lost: "border-red-300 bg-red-50 text-red-700",
  })[stage];

function Index() {
  const [leads, setLeads] = useState<Lead[]>(SEED);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const stats = useMemo(
    () => ({
      total: leads.length,
      won: leads.filter((l) => l.dealStage === "Won").length,
      inProgress: leads.filter((l) => l.dealStage === "New" || l.dealStage === "Contacted").length,
    }),
    [leads],
  );

  const addLead = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setLeads((prev) => [
      {
        _id: crypto.randomUUID(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dealStage: "New",
      },
      ...prev,
    ]);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Enterprise CRM</h1>
            <p className="text-sm text-slate-500">Lead management dashboard — in-memory demo data</p>
          </div>
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            No database required
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Leads", value: stats.total, accent: "text-slate-900", hint: "All leads in pipeline" },
            { label: "Won Leads", value: stats.won, accent: "text-emerald-600", hint: "Closed successfully" },
            { label: "In Progress", value: stats.inProgress, accent: "text-indigo-600", hint: "New + Contacted" },
          ].map((stat) => (
            <div key={stat.label} className={`${card} flex flex-col gap-1`}>
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <span className={`text-3xl font-bold ${stat.accent}`}>{stat.value}</span>
              <span className="text-xs text-slate-400">{stat.hint}</span>
            </div>
          ))}
        </section>

        <form onSubmit={addLead} className={card}>
          <h2 className="text-lg font-semibold">Add New Lead</h2>
          <p className="mt-1 text-sm text-slate-500">Capture a new contact into your pipeline.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="mb-1 block text-sm font-medium text-slate-700 capitalize">
                  {field}
                </label>
                <input
                  id={field}
                  className={input}
                  value={form[field]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  placeholder={
                    field === "name" ? "Jane Cooper" : field === "email" ? "jane@acme.com" : "+1 555 0100"
                  }
                />
              </div>
            ))}
          </div>
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <div className="mt-5">
            <button type="submit" className={btnPrimary}>
              Add Lead
            </button>
          </div>
        </form>

        <section className={`${card} overflow-hidden p-0`}>
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold">Leads</h2>
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
                {leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.email}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <select
                        aria-label={`Deal stage for ${lead.name}`}
                        className={`rounded-lg border px-2 py-1 text-xs font-semibold outline-none ${stageClass(lead.dealStage)}`}
                        value={lead.dealStage}
                        onChange={(e) =>
                          setLeads((prev) =>
                            prev.map((l) =>
                              l._id === lead._id ? { ...l, dealStage: e.target.value as Stage } : l,
                            ),
                          )
                        }
                      >
                        {STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className={btnDanger}
                        onClick={() => setLeads((prev) => prev.filter((l) => l._id !== lead._id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No leads yet. Add your first lead above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

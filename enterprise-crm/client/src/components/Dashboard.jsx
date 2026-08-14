const StatCard = ({ label, value, accent, hint }) => (
  <div className="card flex flex-col gap-1">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className={`text-3xl font-bold ${accent}`}>{value}</span>
    <span className="text-xs text-slate-400">{hint}</span>
  </div>
);

export default function Dashboard({ leads }) {
  const total = leads.length;
  const won = leads.filter((lead) => lead.dealStage === "Won").length;
  const inProgress = leads.filter(
    (lead) => lead.dealStage === "New" || lead.dealStage === "Contacted"
  ).length;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total Leads" value={total} accent="text-slate-900" hint="All leads in pipeline" />
      <StatCard label="Won Leads" value={won} accent="text-emerald-600" hint="Closed successfully" />
      <StatCard
        label="In Progress"
        value={inProgress}
        accent="text-indigo-600"
        hint="New + Contacted"
      />
    </section>
  );
}

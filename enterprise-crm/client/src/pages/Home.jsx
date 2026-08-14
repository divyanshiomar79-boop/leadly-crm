import { useCallback, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import LeadForm from "../components/LeadForm.jsx";
import LeadTable from "../components/LeadTable.jsx";
import { getLeads, createLead, updateLead, deleteLead } from "../services/api.js";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to reach the API on http://localhost:5000");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleCreate = async (payload) => {
    const created = await createLead(payload);
    setLeads((prev) => [created, ...prev]);
  };

  const handleStageChange = async (id, dealStage) => {
    const previous = leads;
    setLeads((prev) => prev.map((lead) => (lead._id === id ? { ...lead, dealStage } : lead)));
    try {
      await updateLead(id, { dealStage });
    } catch (err) {
      setLeads(previous);
      setError(err?.response?.data?.message || "Could not update deal stage.");
    }
  };

  const handleDelete = async (id) => {
    const previous = leads;
    setLeads((prev) => prev.filter((lead) => lead._id !== id));
    try {
      await deleteLead(id);
    } catch (err) {
      setLeads(previous);
      setError(err?.response?.data?.message || "Could not delete lead.");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Enterprise CRM</h1>
            <p className="text-sm text-slate-500">Lead management dashboard</p>
          </div>
          <button type="button" className="btn-primary" onClick={loadLeads}>
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <Dashboard leads={leads} />
        <LeadForm onCreate={handleCreate} />
        <LeadTable
          leads={leads}
          loading={loading}
          onStageChange={handleStageChange}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

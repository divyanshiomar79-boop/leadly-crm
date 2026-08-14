import { useState } from "react";

const empty = { name: "", email: "", phone: "" };

export default function LeadForm({ onCreate }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSaving(true);
    try {
      await onCreate({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setForm(empty);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not add lead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-lg font-semibold text-slate-900">Add New Lead</h2>
      <p className="mt-1 text-sm text-slate-500">Capture a new contact into your pipeline.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="input"
            placeholder="Jane Cooper"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="jane@acme.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="input"
            placeholder="+1 555 0100"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <div className="mt-5">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Adding..." : "Add Lead"}
        </button>
      </div>
    </form>
  );
}

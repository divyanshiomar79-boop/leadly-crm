// In-memory stand-in for the Mongoose Lead model.
// Used when USE_MEMORY_DB=true or MONGO_URI is not set, so the API runs
// without a MongoDB server. Data resets when the process restarts.

const STAGES = ["New", "Contacted", "Won", "Lost"];

let sequence = 0;
const makeId = () => {
  sequence += 1;
  return (Date.now().toString(16) + sequence.toString(16).padStart(8, "0")).slice(-24);
};

const leads = [];

const normalize = (payload) => {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const dealStage = STAGES.includes(payload.dealStage) ? payload.dealStage : "New";

  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");

  return { name, email, phone, dealStage };
};

const seed = [
  { name: "Jane Cooper", email: "jane@acme.com", phone: "+1 555 0100", dealStage: "Won" },
  { name: "Marcus Webb", email: "marcus@northwind.io", phone: "+1 555 0142", dealStage: "Contacted" },
  { name: "Priya Nair", email: "priya@lumenlabs.com", phone: "+91 98200 11234", dealStage: "New" },
  { name: "Tomas Ricci", email: "tomas@vertexgroup.eu", phone: "+39 340 118 2277", dealStage: "Lost" },
  { name: "Sofia Almeida", email: "sofia@brightpath.co", phone: "+351 912 445 018", dealStage: "Contacted" },
  { name: "Daniel Osei", email: "daniel@harborstack.dev", phone: "", dealStage: "New" },
];

seed.forEach((lead, index) => {
  leads.push({
    _id: makeId(),
    ...normalize(lead),
    createdAt: new Date(Date.now() - index * 36e5).toISOString(),
  });
});

const Lead = {
  find() {
    let result = [...leads];
    return {
      sort(spec) {
        const [key, direction] = Object.entries(spec || {})[0] || ["createdAt", -1];
        result.sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          if (av === bv) return 0;
          return (av > bv ? 1 : -1) * (direction < 0 ? -1 : 1);
        });
        return Promise.resolve(result);
      },
      then(resolve, reject) {
        return Promise.resolve(result).then(resolve, reject);
      },
    };
  },

  async findById(id) {
    return leads.find((lead) => lead._id === id) || null;
  },

  async findOne(query = {}) {
    const entries = Object.entries(query);
    return (
      leads.find((lead) =>
        entries.every(([key, value]) =>
          key === "email" ? lead.email === String(value).toLowerCase() : lead[key] === value
        )
      ) || null
    );
  },

  async create(payload) {
    const lead = {
      _id: makeId(),
      ...normalize(payload),
      createdAt: new Date().toISOString(),
    };
    leads.unshift(lead);
    return lead;
  },

  async findByIdAndUpdate(id, update) {
    const lead = leads.find((item) => item._id === id);
    if (!lead) return null;
    if (update.dealStage && !STAGES.includes(update.dealStage)) {
      throw new Error(`Invalid deal stage: ${update.dealStage}`);
    }
    Object.assign(lead, update);
    if (typeof lead.email === "string") lead.email = lead.email.toLowerCase();
    return lead;
  },

  async findByIdAndDelete(id) {
    const index = leads.findIndex((lead) => lead._id === id);
    if (index === -1) return null;
    return leads.splice(index, 1)[0];
  },
};

module.exports = Lead;

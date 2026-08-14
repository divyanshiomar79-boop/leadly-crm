const Lead = require("../models/Lead");

// GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/leads/:id
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/leads
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, dealStage } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const exists = await Lead.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "A lead with this email already exists" });
    }

    const lead = await Lead.create({ name, email, phone, dealStage });
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/leads/:id
exports.updateLead = async (req, res) => {
  try {
    const { name, email, phone, dealStage } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(email && { email }), ...(phone !== undefined && { phone }), ...(dealStage && { dealStage }) },
      { new: true, runValidators: true }
    );

    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/leads/:id
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

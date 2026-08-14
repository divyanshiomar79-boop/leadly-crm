const mongoose = require("mongoose");
const memoryLead = require("./memoryLead");

const useMemoryDb = process.env.USE_MEMORY_DB === "true" || !process.env.MONGO_URI;

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  dealStage: {
    type: String,
    enum: ["New", "Contacted", "Won", "Lost"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the in-memory store when no MongoDB is configured so the API still runs.
module.exports = useMemoryDb ? memoryLead : mongoose.model("Lead", leadSchema);

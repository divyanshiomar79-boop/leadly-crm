require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const leadRoutes = require("./routes/leadRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const USE_MEMORY_DB = process.env.USE_MEMORY_DB === "true" || !MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Enterprise CRM API",
    storage: USE_MEMORY_DB ? "in-memory (dummy data)" : "mongodb",
  });
});

app.use("/api/leads", leadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const start = () => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

if (USE_MEMORY_DB) {
  console.log("No MONGO_URI set — using in-memory database seeded with dummy leads.");
  start();
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      start();
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    });
}

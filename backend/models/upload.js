const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  filename: String,
  columns: [String],
  rows: [mongoose.Schema.Types.Mixed], // ✅ Store full table
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Upload", uploadSchema);

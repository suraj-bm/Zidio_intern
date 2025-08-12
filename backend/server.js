// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(cors({ origin: "https://excel-visualizer-frontend.onrender.com", credentials: true }));
app.use(bodyParser.json());

// Connect to MongoDB
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Mount routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api", adminRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

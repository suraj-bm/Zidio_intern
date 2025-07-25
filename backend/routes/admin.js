const router = require("express").Router();
const User = require("../models/user");
const Upload = require("../models/upload");
const verifyToken = require("../middleware/authMiddleware"); // optional, if admin is protected

// ✅ Get all users (admin only)
router.get("/admin/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// ✅ Get all uploads (admin only)
router.get("/admin/upload", verifyToken, async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ uploadedAt: -1 });
    res.status(200).json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploads", error: err.message });
  }
});

module.exports = router;

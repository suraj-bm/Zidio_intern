const XLSX = require("xlsx"); 
const Upload = require("../models/upload");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ---------- File Upload Route ----------
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const columns = Object.keys(jsonData[0] || {});
    const rows = jsonData;

    const uploadDoc = new Upload({
      filename: req.file.originalname,
      columns: columns,
      rows: rows,
    });

    await uploadDoc.save();
    res.status(200).json({ message: "File uploaded and data saved", upload: uploadDoc });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});
// ---------- Get Columns Route ----------
router.get("/columns", async (req, res) => {
  try {
    const latestFile = await Upload.findOne().sort({ uploadedAt: -1 });

    if (!latestFile || !latestFile.columns || latestFile.columns.length === 0) {
      return res.status(404).json({ message: "No columns found" });
    }

    res.status(200).json({ columns: latestFile.columns });
  } catch (error) {
    console.error("Error fetching columns:", error);
    res.status(500).json({ error: "Failed to fetch columns" });
  }
});


// ---------- Chart Data Route ----------
router.post("/chartdata", async (req, res) => {
  try {
    const { xAxis, yAxis } = req.body;

    const latestFile = await Upload.findOne().sort({ uploadedAt: -1 });

    if (!latestFile || !latestFile.rows || latestFile.rows.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    const labels = [];
    const values = [];

    latestFile.rows.forEach((row) => {
      if (row[xAxis] !== undefined && row[yAxis] !== undefined) {
        labels.push(row[xAxis]);
        values.push(row[yAxis]);
      }
    });

    res.status(200).json({ labels, values });
  } catch (error) {
    console.error("Chart data error:", error);
    res.status(500).json({ error: "Failed to generate chart data" });
  }
});

module.exports = router;

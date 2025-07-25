const Upload = require("../models/upload");

const generateChartData = async (req, res) => {
  try {
    const { xAxis, yAxis } = req.body;

    // Fetch the latest uploaded file (you can also use file ID if preferred)
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

    return res.json({ labels, values });

  } catch (err) {
    console.error("Error generating chart data:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  generateChartData,
  // ...export other existing functions here if needed
};

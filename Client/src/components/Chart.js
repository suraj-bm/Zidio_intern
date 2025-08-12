import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Chart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart() {
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [loading, setLoading] = useState(false);
  const [charts, setCharts] = useState([]); // Array of chart objects
  const chartRefs = useRef({}); // Store refs for each chart

  // ---------------------------
  // Helpers
  // ---------------------------
  const calcSummary = (values) => {
    if (!values?.length) return null;
    const n = values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const sorted = [...values].sort((a, b) => a - b);
    const median = n % 2 === 1
      ? sorted[(n - 1) / 2]
      : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

    return { count: n, min, max, mean, median };
  };

  // ---------------------------
  // Fetch column names
  // ---------------------------
  useEffect(() => {
    axios
      .get("https://excel-visualizer.onrender.com/api/upload/columns")
      .then((res) => {
        const cols = res.data.columns || [];
        if (cols.length === 0) {
          console.error("No columns found");
          return;
        }
        setColumns(cols);
        setXAxis(cols[0]);
        setYAxis(cols[1] || cols[0]);
      })
      .catch((err) => console.error("Error fetching columns", err));
  }, []);

  // ---------------------------
  // Generate new chart
  // ---------------------------
  const handleGenerate = async () => {
    if (!xAxis || !yAxis) {
      alert("Please select both X and Y axes.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://excel-visualizer.onrender.com/api/upload/chartdata", {
        xAxis,
        yAxis,
      });

      const id = Date.now(); // Unique chart ID
      const newChart = {
        id,
        xAxis,
        yAxis,
        labels: res.data.labels,
        values: res.data.values,
      };

      setCharts((prev) => [...prev, newChart]);
    } catch (err) {
      console.error("Error generating chart", err);
      alert("Failed to generate chart data.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Save chart to backend
  // ---------------------------
  const handleSaveGraph = async (id) => {
    const chart = chartRefs.current[id];
    if (!chart) return alert("Chart not available.");

    const base64 = chart.toBase64Image("image/png", 1);

    try {
      await axios.post("https://excel-visualizer.onrender.com/api/upload/savegraph", {
        image: base64,
        xAxis: charts.find((c) => c.id === id).xAxis,
        yAxis: charts.find((c) => c.id === id).yAxis,
      });
      alert("Graph saved successfully!");
    } catch (err) {
      console.error("Error saving graph:", err);
      alert("Failed to save graph.");
    }
  };

  // ---------------------------
  // Download chart as PNG
  // ---------------------------
  const handleDownloadGraph = (id) => {
    const chart = chartRefs.current[id];
    if (!chart) return alert("Chart not available.");

    const url = chart.toBase64Image("image/png", 1);
    const a = document.createElement("a");
    a.href = url;
    const chartObj = charts.find((c) => c.id === id);
    a.download = `chart-${chartObj.yAxis}-vs-${chartObj.xAxis}.png`;
    a.click();
  };

  // ---------------------------
  // Generate Summary
  // ---------------------------
  const handleGenerateSummary = (id) => {
    const chart = charts.find((c) => c.id === id);
    const values = chart?.values || [];
    const summary = calcSummary(values);

    if (!summary) return alert("No data to summarize.");

    alert(`
Summary for ${chart.yAxis}:
• Count  : ${summary.count}
• Min    : ${summary.min}
• Max    : ${summary.max}
• Mean   : ${summary.mean.toFixed(2)}
• Median : ${summary.median}
    `);
  };

  return (
    <div className="chart-container">
      <h2>Multiple Chart Visualizer</h2>

      {columns.length > 0 ? (
        <>
          <div className="chart-controls">
            <label>
              X Axis:
              <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Y Axis:
              <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate Chart"}
            </button>
          </div>

          {/* Render Multiple Charts */}
          {charts.map((chart) => {
            const chartData = {
              labels: chart.labels,
              datasets: [
                {
                  label: `${chart.yAxis} vs ${chart.xAxis}`,
                  data: chart.values,
                  backgroundColor: chart.labels.map(
                    (_, i) =>
                      ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"][
                        i % 6
                      ]
                  ),
                },
              ],
            };

            return (
              <div key={chart.id} className="chart-wrapper">
                <Bar
                  ref={(el) => (chartRefs.current[chart.id] = el)}
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: `${chart.yAxis} vs ${chart.xAxis}`,
                      },
                    },
                  }}
                />
                <div className="chart-actions">
                  <button onClick={() => handleSaveGraph(chart.id)}>Save</button>
                  <button onClick={() => handleDownloadGraph(chart.id)}>Download</button>
                  <button onClick={() => handleGenerateSummary(chart.id)}>Summary</button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading column data...</p>
      )}
    </div>
  );
}

export default Chart;

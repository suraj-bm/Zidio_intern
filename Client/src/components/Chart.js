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
  const [chartData, setChartData] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Chart.js instance ref
  const chartRef = useRef(null);

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
    const median =
      n % 2 === 1
        ? sorted[(n - 1) / 2]
        : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

    return { count: n, min, max, mean, median };
  };

  // ---------------------------
  // Fetch columns once
  // ---------------------------
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/upload/columns")
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
  // Generate chart data
  // ---------------------------
  const handleGenerate = async () => {
    if (!xAxis || !yAxis) {
      alert("Please select both X and Y axes.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload/chartdata",
        { xAxis, yAxis }
      );

      const chart = {
        labels: res.data.labels,
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: res.data.values,
            backgroundColor: res.data.labels.map(
              (_, i) =>
                ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"][i % 6]
            ),
          },
        ],
      };

      setChartData(chart);
      setChartVisible(true);
    } catch (err) {
      console.error("Error fetching chart data", err);
      alert("Failed to generate chart data.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Save chart to backend (base64)
  // ---------------------------
  const handleSaveGraph = async () => {
    const chart = chartRef.current;
    if (!chart) {
      alert("Chart not ready yet.");
      return;
    }
    const base64 = chart.toBase64Image("image/png", 1);

    try {
      await axios.post("http://localhost:5000/api/upload/savegraph", {
        image: base64,
        xAxis,
        yAxis,
      });
      alert("Graph saved successfully!");
    } catch (err) {
      console.error("Error saving graph:", err);
      alert("Failed to save graph (is the /savegraph route implemented?).");
    }
  };

  // ---------------------------
  // Download chart as PNG
  // ---------------------------
  const handleDownloadGraph = () => {
    const chart = chartRef.current;
    if (!chart) {
      alert("Chart not ready yet.");
      return;
    }
    const url = chart.toBase64Image("image/png", 1);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chart-${yAxis}-vs-${xAxis}.png`;
    a.click();
  };

  // ---------------------------
  // Generate local summary
  // ---------------------------
  const handleGenerateSummary = () => {
    if (!chartData) {
      alert("Please generate a chart first.");
      return;
    }
    const values = chartData.datasets?.[0]?.data || [];
    const summary = calcSummary(values);

    if (!summary) {
      alert("No data to summarize.");
      return;
    }

    const msg = `
Summary for ${yAxis}:
• Count  : ${summary.count}
• Min    : ${summary.min}
• Max    : ${summary.max}
• Mean   : ${summary.mean.toFixed(2)}
• Median : ${summary.median}
`;
    alert(msg);
  };

  return (
    <div className="chart-container">
      <h2>Charts Page</h2>

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
            {loading ? "Generating..." : "Generate Graph"}
          </button>
        </div>

        {chartVisible && chartData && (
          <div className="chart-wrapper">
            <Bar
              id="myChart" // optional
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: `${yAxis} vs ${xAxis}` },
                },
              }}
            />

            <div className="chart-actions">
              <button onClick={handleSaveGraph}>Save</button>
              <button onClick={handleDownloadGraph}>Download Graph</button>
              <button onClick={handleGenerateSummary}>Generate Summary</button>
            </div>
          </div>
        )}
      </>
      ) : (
        <p>Loading columns...</p>
      )}
    </div>
  );
}

export default Chart;

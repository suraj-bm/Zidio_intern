import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FileUpload from "../components/FileUpload";
import Chart from "../components/Chart";
import Summary from "../components/Summary";
import "./Dashboard.css";
import ProfileSettings from "../components/ProfileSettings";

function Dashboard() {
  const role = "User"; // or "Admin"

  // ✅ Add these states:
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="dashboard-main">
        <div className="dashboard-content">
        </div>

        <Routes>
          <Route index element={<h2 className="dashboard-welcome">Welcome to your Dashboard</h2>} />

          {/* ✅ Pass props here */}
          <Route
            path="uploads"
            element={
              <FileUpload
                setColumns={setColumns}
                setData={setData}
              />
            }
          />

          <Route path="analyze" element={<Chart data={data} columns={columns} />} />
          <Route path="summary" element={<Summary />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;

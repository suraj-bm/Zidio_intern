import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileSettings from "./components/ProfileSettings";
import ManageUsers from "./components/ManageUsers";
import DataUsage from "./pages/DataUsage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileSettings />
            </ProtectedRoute>
            } />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/data-usage" element={<DataUsage />} />

      </Routes>
    </Router>
  );
}

export default App;


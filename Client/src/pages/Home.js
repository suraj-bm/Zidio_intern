import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      {/* Navbar */}
      {/* <header className="navbar">
        <div className="logo">
          <span className="green">MERN</span>
          <span className="black">PROJECT</span>
        </div>

        <nav className="nav-links">
          <a href="/home" className="active">Home</a>
          <a href="/features">Features</a>
          <a href="/register">Login/Register</a>
        </nav>

        <FaUserCircle className="profile-icon" title="Profile" />
      </header> */}

      {/* Hero Section */}
      <main className="hero-section">
        <h1>
          Turn <span className="highlight purple">Excel Data</span> <br />
          into <span className="highlight purple">Instant AI Insights</span>
        </h1>
        <p className="subtitle">
          Upload your Excel file and see it transform into charts <br />
          and summaries using AI-powered tools. <strong>(No code needed)</strong>
        </p>

        <Link to="dashboard/uploads">
          <button className="upload-button">Upload</button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a href="#">About</a> | <a href="#">Privacy</a> | <a href="#">GitHub</a>
      </footer>
    </div>
  );
}

export default Home;

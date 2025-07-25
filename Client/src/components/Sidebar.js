import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ role }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-user">
        <div className="avatar">👤</div>
        <p>{user?.name || "Name"}</p>
        <p>{user?.email || "emailid@gmail.com"}</p>
      </div>

      {role === "Admin" ? (
        <nav>
          <Link to="/manage-users" className={location.pathname === "/manage-users" ? "active" : ""}>
            Manage Users
          </Link>
          <Link to="/data-usage" className={location.pathname === "/data-usage" ? "active" : ""}>
            Data Usage
          </Link>
          <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
            Profile Settings
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <nav>
          <Link
            to="/dashboard/uploads"
            className={location.pathname === "/dashboard/uploads" ? "active" : ""}
          >
            My Uploads
          </Link>
          <Link
            to="/dashboard/analyze"
            className={location.pathname === "/dashboard/analyze" ? "active" : ""}
          >
            Analyze Data
          </Link>
          <Link
            to="/dashboard/summary"
            className={location.pathname === "/dashboard/summary" ? "active" : ""}
          >
            AI Summary
          </Link>
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            Profile Settings
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}

      <footer>
        <a href="#">About</a> | <a href="#">Privacy</a> | <a href="#">GitHub</a>
      </footer>
    </div>
  );
}

export default Sidebar;

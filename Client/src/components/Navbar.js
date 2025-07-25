import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate=useNavigate();

  return (
    <header className="navbar">
      <div className="logo">
        <span className="green">MERN</span>
        <span className="black">PROJECT</span>
      </div>

      <nav className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className={location.pathname.startsWith("/dashboard") ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/features"
          className={location.pathname === "/features" ? "active" : ""}
        >
          Features
        </Link>
      </nav>

      <FaUserCircle className="profile-icon" title="Profile" onClick={()=>{
        
        navigate("/profile")

      }} />
    </header>
  );
};


export default Navbar;

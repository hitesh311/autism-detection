import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  // Check if user or admin is logged in
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ Logo is now untouchable */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="nav-menu">
          <ul>
            {admin ? (
              // Admin Links
              <>
              </>
            ) : user ? (
              // Logged-in User Links
              <>
              
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/login-dashboard">Dashboard</Link></li>
              </>
            ) : (
              // Guest Links
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login / Sign Up</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

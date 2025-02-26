import React, { useState } from "react";
import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showRules, setShowRules] = useState({
    name: true,
    email: true,
    password: true,
  });

  const navigate = useNavigate();

  const validateInputs = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    if (!nameRegex.test(name)) {
      newErrors.name = "Only letters allowed (Max 30 characters).";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Valid format: example@domain.com";
    }

    let passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push("At least 8 characters required.");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Must contain 1 uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push("Must contain 1 number.");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      passwordErrors.push("Must contain 1 special character.");
    }

    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      if (response.data === "User registered successfully!") {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response ? `Error: ${error.response.data}` : "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-header">Sign Up</h2>

        {/* Full Name Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.length > 0) setShowRules({ ...showRules, name: false });
              else setShowRules({ ...showRules, name: true });
            }}
          />
          {showRules.name && <p className="input-rule-box">Only letters, max 30 characters.</p>}
          {errors.name && <p className="error-box">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.length > 0) setShowRules({ ...showRules, email: false });
              else setShowRules({ ...showRules, email: true });
            }}
          />
          {showRules.email && <p className="input-rule-box">Format: example@domain.com</p>}
          {errors.email && <p className="error-box">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length > 0) setShowRules({ ...showRules, password: false });
              else setShowRules({ ...showRules, password: true });
            }}
          />
          {showRules.password && (
            <p className="input-rule-box">Min 8 chars, 1 uppercase, 1 number, 1 special character.</p>
          )}
          {errors.password && (
            <ul className="error-box">
              {errors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Sign Up Button */}
        <button onClick={handleSignup}>Sign Up</button>

        {/* Google Sign Up */}
        <button className="google-btn">Sign Up with Google</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

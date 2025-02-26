import React, { useState } from "react";
import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig"; // Import API URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // To redirect after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // ✅ Step 1: Try Admin Login
      console.log("Trying admin login:", email, password);
      const adminResponse = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });

      if (adminResponse.data === "Admin Login Successful") {
        localStorage.setItem("admin", JSON.stringify({ email }));
        navigate("/admin/dashboard"); // Redirect admin
        return; // ✅ Stop further execution
      }
    } catch (adminError) {
      console.log("Admin login failed, trying user login...");
    }

    try {
      // ✅ Step 2: Try User Login if Admin Login Fails
      console.log("Trying user login:", email, password);
      const userResponse = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      if (userResponse.data === "Login successful!") {
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/dashboard"); // Redirect user
      } else {
        alert("Invalid email or password!"); // If response isn't success
      }
    } catch (userError) {
      console.error("User login failed:", userError);

      if (userError.response) {
        alert(`Error: ${userError.response.data}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update state
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update state
        />
        <button onClick={handleLogin}>Login</button> {/* Call API on click */}
        <button className="google-btn">Login with Google</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

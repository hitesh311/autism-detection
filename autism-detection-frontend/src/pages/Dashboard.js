import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null); // Store uploaded file
  const [previewUrl, setPreviewUrl] = useState(null); // Store image preview URL
  const [classificationResult, setClassificationResult] = useState(null); // Store AI result

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/login-dashboard"); // Redirect logged-in users
    }
  }, [navigate]);

  // ✅ Handle File Selection (Preview Image Before Upload)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // ✅ Handle Image Upload & Classification
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:9090/api/classify", formData);
      setClassificationResult(response.data); // Store the classification result
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image!");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Limited Access Mode</h2>
        <p>Upload an image to test the AI autism detection model.</p>

        <div className="guest-actions">
          {/* File Selection Button */}
          <label className="file-label">
            Choose Image
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {/* Upload & Classify Button */}
          <button className="upload-btn" onClick={handleUpload}>Upload & Classify</button>
        </div>

        {/* ✅ Display Image on Right & Result on Left */}
        {classificationResult && (
          <div className="classification-container">
            <div className={`classification-result ${classificationResult.autism_detected ? "autism" : "no-autism"}`}>
              <h3>Classification Result</h3>
              <p>
                {classificationResult.autism_detected
                  ? `🚨 Autism detected with confidence: ${classificationResult.confidence}%`
                  : `✅ No autism detected with confidence: ${classificationResult.confidence}%`}
              </p>
            </div>
            {previewUrl && <img src={previewUrl} alt="Uploaded Preview" className="uploaded-image" />}
          </div>
        )}

        <p>Sign up to save your results.</p>
        <button className="signup-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

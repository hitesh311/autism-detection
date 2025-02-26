import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";
import "./LoginDashboard.css";

const LoginDashboard = () => {
  const [reports, setReports] = useState([]); // Stores user reports
  const [selectedFile, setSelectedFile] = useState(null); // Stores uploaded file
  const [previewImage, setPreviewImage] = useState(null); // Stores preview of uploaded image
  const [classificationResult, setClassificationResult] = useState(null); // Stores AI result
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user

  useEffect(() => {
    if (!user) {
      navigate("/dashboard");
    } else {
      fetchReports();
    }
  }, [user, navigate]);

  // ✅ Fetch User's Reports from Backend
  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${user.email}`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // ✅ Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
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
      // ✅ Send Image to Flask API for Classification
      const response = await axios.post(`${API_BASE_URL}/api/classify`, formData);
      setClassificationResult(response.data); // Store AI result

      // ✅ Save Classification Result as Report in MongoDB
      await axios.post(`${API_BASE_URL}/reports/save`, {
        email: user.email,
        diagnosis: response.data.autism_detected
          ? `Autism detected with confidence: ${response.data.confidence}%`
          : `No autism detected with confidence: ${response.data.confidence}%`,
      });

      // ✅ Refresh Reports List After Saving
      fetchReports();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image!");
    }
  };

  // ✅ Handle Report Download
  const downloadReport = async (reportId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/pdf/${reportId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user session
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div className="login-dashboard">
      <h2>Welcome, {user?.email}</h2>
      <p>Upload a new photo for autism detection or view your past reports.</p>

      {/* ✅ Upload Section */}
      <div className="upload-section">
        {/* File Selection Button */}
        <label className="file-label">
          Choose Image
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {/* Upload & Classify Button */}
        <button className="upload-btn" onClick={handleUpload}>
          Upload & Classify
        </button>
      </div>

      {/* ✅ Display Classification Result with Image Inside */}
      {classificationResult && (
        <div className={`classification-result ${classificationResult.autism_detected ? "autism" : "no-autism"}`}>
          <div className="result-content">
            {/* Image Preview Inside the Output Box */}
            {previewImage && <img src={previewImage} alt="Uploaded Preview" className="result-image" />}
            <div>
              <h3>Classification Result</h3>
              <p>
                {classificationResult.autism_detected
                  ? `🚨 Autism detected with confidence: ${classificationResult.confidence}%`
                  : `✅ No autism detected with confidence: ${classificationResult.confidence}%`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Reports Section */}
      <div className="reports-section">
        <h3>Your Previous Reports</h3>
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="report-item">
              <p><strong>Diagnosis:</strong> {report.diagnosis}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <button className="download-btn" onClick={() => downloadReport(report.id)}>
                Download PDF
              </button>
            </div>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>

      {/* ✅ Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginDashboard;

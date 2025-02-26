import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllReports } from '../../api/adminApi';
import "./AdminDashboard.css"; // Ensure correct CSS import

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("admin")) {
            console.warn("Admin not logged in, redirecting...");
            navigate('/admin/login');
        } else {
            loadReports();
        }
    }, [navigate]);

    const loadReports = async () => {
        console.log("Fetching reports..."); // Debugging
        try {
            const data = await fetchAllReports();
            console.log("Fetched Reports:", data); // Debugging
            setReports(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    // ✅ Logout Function
    const handleLogout = () => {
        localStorage.removeItem("admin"); // Remove admin login data
        navigate("/"); // Redirect to Home Page
    };

    return (
        <div className="admin-dashboard">
            <h2 className="admin-header">Admin Dashboard</h2>
            <div className="admin-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Diagnosis</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.id}</td>
                                    <td>{report.email}</td>
                                    <td>{report.diagnosis}</td>
                                    <td>{new Date(report.date).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", color: "red" }}>No reports available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;

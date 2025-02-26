import axios from 'axios';

const BASE_URL = 'http://localhost:9090/admin'; // Update this if needed

// Admin Login API
export const adminLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Login failed!";
    }
};

// Fetch all reports API
export const fetchAllReports = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/reports`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Failed to fetch reports!";
    }
};

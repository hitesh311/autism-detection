package com.hitesh.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AdminService {

    // ✅ Hardcoded Admin Credentials
    private final String ADMIN_EMAIL = "admin@example.com";
    private final String ADMIN_PASSWORD = "Admin@123";

    // ✅ Admin Login with Fixed Credentials
    public boolean loginAdmin(String email, String password) {
        return ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password);
    }
}

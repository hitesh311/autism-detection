package com.hitesh.backend.controller;

public class AdminLoginRequest {
    private String email;
    private String password;

    // ✅ Constructor
    public AdminLoginRequest() {}

    // ✅ Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

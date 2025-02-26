package com.hitesh.backend.controller;

import com.hitesh.backend.model.Report;

import com.hitesh.backend.model.User;
import com.hitesh.backend.service.ReportService;
import com.hitesh.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private ReportService reportService;

    
    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody AdminLoginRequest request) {
        if ("admin@example.com".equals(request.getEmail()) && "Admin@123".equals(request.getPassword())) {
            return ResponseEntity.ok("Admin Login Successful");
        }
        return ResponseEntity.status(401).body("Invalid Admin Credentials");
    }

  
    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }
    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable String reportId) {
        boolean deleted = reportService.deleteReport(reportId);
        if (deleted) {
            return ResponseEntity.ok("Report deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Report not found!");
        }
    }
    @DeleteMapping("/reports")
    public ResponseEntity<String> deleteAllReports() {
        boolean deleted = reportService.deleteAllReports();
        if (deleted) {
            return ResponseEntity.ok("All reports deleted successfully!");
        } else {
            return ResponseEntity.status(500).body("Failed to delete reports!");
        }
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
}

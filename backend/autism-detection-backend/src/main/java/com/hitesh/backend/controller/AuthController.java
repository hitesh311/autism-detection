package com.hitesh.backend.controller;

import com.hitesh.backend.model.User;
import com.hitesh.backend.service.UserService;
import com.hitesh.backend.service.ReportService;  // ✅ Import missing ReportService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;  // ✅ Import missing Resource
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;  // ✅ Import missing IOException
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;  // ✅ Fix: Autowire ReportService

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String response = userService.registerUser(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        String response = userService.loginUser(email, password);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports/download/{reportId}")
    public ResponseEntity<Resource> downloadReport(@PathVariable String reportId) throws IOException {
        return reportService.generatePdf(reportId);
    }
}

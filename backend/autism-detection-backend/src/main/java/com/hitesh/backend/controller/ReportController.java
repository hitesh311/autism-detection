package com.hitesh.backend.controller;

import com.hitesh.backend.model.Report;
import com.hitesh.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ✅ Save Report
    @PostMapping("/save")
    public ResponseEntity<String> saveReport(@RequestBody Map<String, String> reportData) {
        String email = reportData.get("email");
        String diagnosis = reportData.get("diagnosis");
        String response = reportService.saveReport(email, diagnosis);
        return ResponseEntity.ok(response);
    }

    // ✅ Get Reports by Email
    @GetMapping("/{email}")
    public ResponseEntity<List<Report>> getReports(@PathVariable String email) {
        List<Report> reports = reportService.getReportsByEmail(email);
        return ResponseEntity.ok(reports);
    }

    // ✅ Generate PDF Report by Report ID
    @GetMapping("/pdf/{reportId}")
    public ResponseEntity<Resource> generatePdf(@PathVariable String reportId) throws IOException {
        return reportService.generatePdf(reportId);
    }
}

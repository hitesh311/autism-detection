package com.hitesh.backend.service;

import com.hitesh.backend.model.Report;
import com.hitesh.backend.repository.ReportRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    // ✅ Save Report to Database
    public String saveReport(String email, String diagnosis) {
        Report report = new Report(email, diagnosis, LocalDateTime.now());
        reportRepository.save(report);
        return "Report saved successfully!";
    }

    // ✅ Retrieve All Reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // ✅ Delete Single Report
    public boolean deleteReport(String reportId) {
        if (reportRepository.existsById(reportId)) {
            reportRepository.deleteById(reportId);
            return true;
        }
        return false;
    }

    // ✅ Delete All Reports
    public boolean deleteAllReports() {
        try {
            reportRepository.deleteAll();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ✅ Get Reports by Email
    public List<Report> getReportsByEmail(String email) {
        return reportRepository.findByEmail(email);
    }

    // ✅ Generate PDF Report by Report ID
    public ResponseEntity<Resource> generatePdf(String reportId) throws IOException {
        Optional<Report> reportOpt = reportRepository.findById(reportId);
        if (!reportOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Report report = reportOpt.get();

        // Create PDF
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            contentStream.beginText();
            contentStream.newLineAtOffset(100, 700);
            contentStream.showText("Autism Diagnosis Report");
            contentStream.endText();

            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.beginText();
            contentStream.newLineAtOffset(100, 650);
            contentStream.showText("Report ID: " + report.getId());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Email: " + report.getEmail());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Diagnosis: " + report.getDiagnosis());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Date: " + report.getDate());
            contentStream.endText();
        }

        document.save(out);
        document.close();

        ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}

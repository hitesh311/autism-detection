package com.hitesh.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;  // ✅ Fix: Use Timestamp instead of Date

@Document(collection = "reports")
public class Report {

    @Id
    private String id;
    private String email;
    private String diagnosis;
    private LocalDateTime date;  // ✅ Fix: Change to Timestamp

    public Report() {}

    public Report(String email, String diagnosis, LocalDateTime date) {
        this.email = email;
        this.diagnosis = diagnosis;
        this.date = date;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }  // ✅ Fix: Accept Timestamp
}

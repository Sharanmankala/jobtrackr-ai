package com.jobtrackr.ai.dto.application;

import com.jobtrackr.ai.entity.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class JobApplicationRequest {

    @NotBlank
    private String companyName;

    @NotBlank
    private String jobTitle;

    @NotBlank
    private String jobUrl;

    @NotNull
    private ApplicationStatus status;

    @NotNull
    private LocalDate appliedDate;

    private String notes;
    private String location;
    private String salaryRange;
    private String jdSummary;
    private String followupEmail;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobUrl() {
        return jobUrl;
    }

    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getJdSummary() {
        return jdSummary;
    }

    public void setJdSummary(String jdSummary) {
        this.jdSummary = jdSummary;
    }

    public String getFollowupEmail() {
        return followupEmail;
    }

    public void setFollowupEmail(String followupEmail) {
        this.followupEmail = followupEmail;
    }
}

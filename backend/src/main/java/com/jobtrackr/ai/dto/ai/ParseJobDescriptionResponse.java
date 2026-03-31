package com.jobtrackr.ai.dto.ai;

import java.util.List;

public class ParseJobDescriptionResponse {

    private String companyName;
    private String jobTitle;
    private String location;
    private String salaryRange;
    private String summary;
    private List<String> keyRequirements;

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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getKeyRequirements() {
        return keyRequirements;
    }

    public void setKeyRequirements(List<String> keyRequirements) {
        this.keyRequirements = keyRequirements;
    }
}

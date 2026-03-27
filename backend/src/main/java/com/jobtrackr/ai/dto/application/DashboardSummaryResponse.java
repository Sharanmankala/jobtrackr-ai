package com.jobtrackr.ai.dto.application;

import com.jobtrackr.ai.entity.ApplicationStatus;
import java.util.Map;

public class DashboardSummaryResponse {

    private final Map<ApplicationStatus, Long> countsByStatus;
    private final long totalApplications;

    public DashboardSummaryResponse(Map<ApplicationStatus, Long> countsByStatus, long totalApplications) {
        this.countsByStatus = countsByStatus;
        this.totalApplications = totalApplications;
    }

    public Map<ApplicationStatus, Long> getCountsByStatus() {
        return countsByStatus;
    }

    public long getTotalApplications() {
        return totalApplications;
    }
}

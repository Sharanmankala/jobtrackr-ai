package com.jobtrackr.ai.service;

import com.jobtrackr.ai.dto.application.DashboardSummaryResponse;
import com.jobtrackr.ai.dto.application.JobApplicationRequest;
import com.jobtrackr.ai.dto.application.JobApplicationResponse;
import com.jobtrackr.ai.entity.ApplicationStatus;
import com.jobtrackr.ai.entity.JobApplication;
import com.jobtrackr.ai.entity.User;
import com.jobtrackr.ai.exception.ResourceNotFoundException;
import com.jobtrackr.ai.repository.JobApplicationRepository;
import com.jobtrackr.ai.repository.UserRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    public List<JobApplicationResponse> getApplications(UUID userId, ApplicationStatus status) {
        List<JobApplication> applications = status == null
                ? jobApplicationRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                : jobApplicationRepository.findByUser_IdAndStatusOrderByCreatedAtDesc(userId, status);

        return applications.stream().map(this::toResponse).toList();
    }

    public JobApplicationResponse getApplication(UUID userId, UUID applicationId) {
        return toResponse(getOwnedApplication(userId, applicationId));
    }

    public JobApplicationResponse createApplication(UUID userId, JobApplicationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        JobApplication application = new JobApplication();
        application.setUser(user);
        mapRequestToEntity(request, application);

        return toResponse(jobApplicationRepository.save(application));
    }

    public JobApplicationResponse updateApplication(UUID userId, UUID applicationId, JobApplicationRequest request) {
        JobApplication application = getOwnedApplication(userId, applicationId);
        mapRequestToEntity(request, application);
        return toResponse(jobApplicationRepository.save(application));
    }

    public void deleteApplication(UUID userId, UUID applicationId) {
        JobApplication application = getOwnedApplication(userId, applicationId);
        jobApplicationRepository.delete(application);
    }

    public int getHealthScore(UUID userId, UUID applicationId) {
        JobApplication application = getOwnedApplication(userId, applicationId);
        application.setHealthScore(calculateHealthScore(application));
        jobApplicationRepository.save(application);
        return application.getHealthScore();
    }

    public DashboardSummaryResponse getDashboardSummary(UUID userId) {
        List<JobApplication> applications = jobApplicationRepository.findByUser_IdOrderByCreatedAtDesc(userId);
        Map<ApplicationStatus, Long> counts = new EnumMap<>(ApplicationStatus.class);
        Arrays.stream(ApplicationStatus.values()).forEach(status -> counts.put(status, 0L));
        applications.forEach(application ->
                counts.put(application.getStatus(), counts.get(application.getStatus()) + 1)
        );
        return new DashboardSummaryResponse(counts, applications.size());
    }

    private JobApplication getOwnedApplication(UUID userId, UUID applicationId) {
        return jobApplicationRepository.findByIdAndUser_Id(applicationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
    }

    private void mapRequestToEntity(JobApplicationRequest request, JobApplication application) {
        application.setCompanyName(request.getCompanyName().trim());
        application.setJobTitle(request.getJobTitle().trim());
        application.setJobUrl(request.getJobUrl().trim());
        application.setStatus(request.getStatus());
        application.setAppliedDate(request.getAppliedDate());
        application.setNotes(blankToNull(request.getNotes()));
        application.setLocation(blankToNull(request.getLocation()));
        application.setSalaryRange(blankToNull(request.getSalaryRange()));
        application.setJdSummary(blankToNull(request.getJdSummary()));
        application.setFollowupEmail(blankToNull(request.getFollowupEmail()));
        application.setHealthScore(calculateHealthScore(application));
    }

    private int calculateHealthScore(JobApplication application) {
        int score = 0;

        if (hasText(application.getJobUrl())) {
            score += 10;
        }
        if (hasText(application.getNotes())) {
            score += 10;
        }
        if (hasText(application.getSalaryRange())) {
            score += 10;
        }
        if (hasText(application.getLocation())) {
            score += 10;
        }

        long daysSinceApplied = ChronoUnit.DAYS.between(application.getAppliedDate(), LocalDate.now());
        if (daysSinceApplied <= 7) {
            score += 40;
        } else if (daysSinceApplied <= 14) {
            score += 20;
        }

        if (hasText(application.getJdSummary())) {
            score += 10;
        }
        if (hasText(application.getFollowupEmail())) {
            score += 10;
        }

        return score;
    }

    private JobApplicationResponse toResponse(JobApplication application) {
        JobApplicationResponse response = new JobApplicationResponse();
        response.setId(application.getId());
        response.setCompanyName(application.getCompanyName());
        response.setJobTitle(application.getJobTitle());
        response.setJobUrl(application.getJobUrl());
        response.setStatus(application.getStatus());
        response.setAppliedDate(application.getAppliedDate());
        response.setNotes(application.getNotes());
        response.setLocation(application.getLocation());
        response.setSalaryRange(application.getSalaryRange());
        response.setJdSummary(application.getJdSummary());
        response.setFollowupEmail(application.getFollowupEmail());
        response.setHealthScore(application.getHealthScore());
        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());
        return response;
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}

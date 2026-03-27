package com.jobtrackr.ai.controller;

import com.jobtrackr.ai.dto.application.DashboardSummaryResponse;
import com.jobtrackr.ai.dto.application.JobApplicationRequest;
import com.jobtrackr.ai.dto.application.JobApplicationResponse;
import com.jobtrackr.ai.entity.ApplicationStatus;
import com.jobtrackr.ai.entity.User;
import com.jobtrackr.ai.repository.UserRepository;
import com.jobtrackr.ai.service.JobApplicationService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final UserRepository userRepository;

    public JobApplicationController(JobApplicationService jobApplicationService, UserRepository userRepository) {
        this.jobApplicationService = jobApplicationService;
        this.userRepository = userRepository;
    }

    @GetMapping("/applications")
    public List<JobApplicationResponse> getApplications(@RequestParam(required = false) ApplicationStatus status,
                                                        Authentication authentication) {
        return jobApplicationService.getApplications(getCurrentUserId(authentication), status);
    }

    @GetMapping("/applications/{id}")
    public JobApplicationResponse getApplication(@PathVariable UUID id, Authentication authentication) {
        return jobApplicationService.getApplication(getCurrentUserId(authentication), id);
    }

    @PostMapping("/applications")
    @ResponseStatus(HttpStatus.CREATED)
    public JobApplicationResponse createApplication(@Valid @RequestBody JobApplicationRequest request,
                                                    Authentication authentication) {
        return jobApplicationService.createApplication(getCurrentUserId(authentication), request);
    }

    @PutMapping("/applications/{id}")
    public JobApplicationResponse updateApplication(@PathVariable UUID id,
                                                    @Valid @RequestBody JobApplicationRequest request,
                                                    Authentication authentication) {
        return jobApplicationService.updateApplication(getCurrentUserId(authentication), id, request);
    }

    @DeleteMapping("/applications/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(@PathVariable UUID id, Authentication authentication) {
        jobApplicationService.deleteApplication(getCurrentUserId(authentication), id);
    }

    @GetMapping("/applications/{id}/score")
    public Map<String, Integer> getScore(@PathVariable UUID id, Authentication authentication) {
        return Map.of("healthScore", jobApplicationService.getHealthScore(getCurrentUserId(authentication), id));
    }

    @GetMapping("/dashboard")
    public DashboardSummaryResponse getDashboard(Authentication authentication) {
        return jobApplicationService.getDashboardSummary(getCurrentUserId(authentication));
    }

    private UUID getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
        return user.getId();
    }
}

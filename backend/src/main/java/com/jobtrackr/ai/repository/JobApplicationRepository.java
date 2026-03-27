package com.jobtrackr.ai.repository;

import com.jobtrackr.ai.entity.ApplicationStatus;
import com.jobtrackr.ai.entity.JobApplication;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    List<JobApplication> findByUser_IdOrderByCreatedAtDesc(UUID userId);
    List<JobApplication> findByUser_IdAndStatusOrderByCreatedAtDesc(UUID userId, ApplicationStatus status);
    Optional<JobApplication> findByIdAndUser_Id(UUID id, UUID userId);
}

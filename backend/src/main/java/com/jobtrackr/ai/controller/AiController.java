package com.jobtrackr.ai.controller;

import com.jobtrackr.ai.dto.ai.ParseJobDescriptionRequest;
import com.jobtrackr.ai.dto.ai.ParseJobDescriptionResponse;
import com.jobtrackr.ai.service.AiService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/parse-jd")
    public ParseJobDescriptionResponse parseJobDescription(@Valid @RequestBody ParseJobDescriptionRequest request) {
        return aiService.parseJobDescription(request.getRawText());
    }
}

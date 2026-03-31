package com.jobtrackr.ai.dto.ai;

import jakarta.validation.constraints.NotBlank;

public class ParseJobDescriptionRequest {

    @NotBlank(message = "Raw job description text is required")
    private String rawText;

    public String getRawText() {
        return rawText;
    }

    public void setRawText(String rawText) {
        this.rawText = rawText;
    }
}

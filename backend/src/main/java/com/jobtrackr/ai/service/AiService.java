package com.jobtrackr.ai.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtrackr.ai.dto.ai.ParseJobDescriptionResponse;
import com.jobtrackr.ai.exception.AiIntegrationException;
import com.jobtrackr.ai.exception.BadRequestException;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class AiService {

    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    @Value("${app.openai.api-key:}")
    private String openAiApiKey;

    @Value("${app.openai.base-url:https://api.openai.com/v1}")
    private String openAiBaseUrl;

    @Value("${app.openai.model:gpt-5.2}")
    private String openAiModel;

    public AiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder().build();
    }

    public ParseJobDescriptionResponse parseJobDescription(String rawText) {
        if (rawText == null || rawText.isBlank()) {
            throw new BadRequestException("Job description text cannot be empty");
        }

        if (openAiApiKey == null || openAiApiKey.isBlank() || "your_openai_api_key_here".equals(openAiApiKey)) {
            throw new AiIntegrationException("OpenAI API key is not configured");
        }

        try {
            JsonNode openAiResponse = restClient.post()
                    .uri(openAiBaseUrl + "/responses")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + openAiApiKey)
                    .body(buildRequestBody(rawText.trim()))
                    .retrieve()
                    .body(JsonNode.class);

            return parseStructuredResponse(openAiResponse);
        } catch (RestClientResponseException ex) {
            throw new AiIntegrationException("OpenAI request failed: " + ex.getResponseBodyAsString(), ex);
        } catch (JsonProcessingException ex) {
            throw new AiIntegrationException("Failed to parse OpenAI response", ex);
        }
    }

    private Map<String, Object> buildRequestBody(String rawText) {
        Map<String, Object> schema = Map.of(
                "type", "object",
                "additionalProperties", false,
                "properties", Map.of(
                        "companyName", Map.of("type", "string"),
                        "jobTitle", Map.of("type", "string"),
                        "location", Map.of("type", "string"),
                        "salaryRange", Map.of("type", "string"),
                        "summary", Map.of("type", "string"),
                        "keyRequirements", Map.of(
                                "type", "array",
                                "items", Map.of("type", "string")
                        )
                ),
                "required", List.of("companyName", "jobTitle", "location", "salaryRange", "summary", "keyRequirements")
        );

        return Map.of(
                "model", openAiModel,
                "input", List.of(
                        Map.of(
                                "role", "system",
                                "content", List.of(
                                        Map.of(
                                                "type", "input_text",
                                                "text", "Extract structured job posting data. If a field is missing, return an empty string. Return exactly three concise key requirements."
                                        )
                                )
                        ),
                        Map.of(
                                "role", "user",
                                "content", List.of(
                                        Map.of(
                                                "type", "input_text",
                                                "text", rawText
                                        )
                                )
                        )
                ),
                "text", Map.of(
                        "format", Map.of(
                                "type", "json_schema",
                                "name", "parsed_job_description",
                                "schema", schema,
                                "strict", true
                        )
                )
        );
    }

    private ParseJobDescriptionResponse parseStructuredResponse(JsonNode openAiResponse) throws JsonProcessingException {
        JsonNode output = openAiResponse.path("output");
        if (!output.isArray() || output.isEmpty()) {
            throw new AiIntegrationException("OpenAI returned an empty response");
        }

        String textPayload = null;
        String refusalMessage = null;
        for (JsonNode outputItem : output) {
            JsonNode content = outputItem.path("content");
            if (!content.isArray()) {
                continue;
            }
            for (JsonNode contentItem : content) {
                String refusal = contentItem.path("refusal").asText(null);
                if (refusal != null && !refusal.isBlank()) {
                    refusalMessage = refusal;
                }
                String candidateText = contentItem.path("text").asText(null);
                if (candidateText != null && !candidateText.isBlank()) {
                    textPayload = candidateText;
                    break;
                }
            }
            if (textPayload != null) {
                break;
            }
        }

        if (refusalMessage != null && !refusalMessage.isBlank()) {
            throw new AiIntegrationException("OpenAI refused to parse this job description: " + refusalMessage);
        }

        if (textPayload == null || textPayload.isBlank()) {
            throw new AiIntegrationException("OpenAI returned blank parsed content");
        }

        ParseJobDescriptionResponse response = objectMapper.readValue(textPayload, ParseJobDescriptionResponse.class);
        if (response.getKeyRequirements() == null || response.getKeyRequirements().size() != 3) {
            throw new AiIntegrationException("OpenAI returned an invalid requirements list");
        }

        return response;
    }
}

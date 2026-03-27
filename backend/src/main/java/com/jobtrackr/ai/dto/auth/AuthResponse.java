package com.jobtrackr.ai.dto.auth;

import java.util.UUID;

public class AuthResponse {

    private final String token;
    private final UUID userId;
    private final String email;
    private final String name;

    public AuthResponse(String token, UUID userId, String email, String name) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}

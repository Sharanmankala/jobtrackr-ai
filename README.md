# JobTrackr AI

JobTrackr AI is a beginner-friendly full-stack starter for tracking job applications with a Spring Boot 3 backend, PostgreSQL database, and React + TypeScript frontend.

## What is included right now

- Spring Boot 3 backend with layered architecture
- PostgreSQL-ready JPA entities for `User` and `JobApplication`
- JWT authentication with register and login
- Protected Job application CRUD scoped to the authenticated user
- Dashboard summary endpoint with counts by status
- Health score calculation endpoint
- React frontend with login, register, dashboard, and applications pages
- Dockerfiles and `docker-compose.yml` for local container setup

## Current backend API

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Applications

- `GET /api/applications`
- `POST /api/applications`
- `GET /api/applications/{id}`
- `PUT /api/applications/{id}`
- `DELETE /api/applications/{id}`
- `GET /api/applications/{id}/score`
- `GET /api/dashboard`

### AI

- `POST /api/ai/parse-jd`
- `POST /api/ai/generate-followup`

## Planned next features

- `POST /api/ai/generate-followup`
- richer dashboard visualizations
- Railway deployment polish

## Project structure

```text
.
├── backend
├── frontend
└── docker-compose.yml
```

## Requirements

Before running locally, make sure you have:

- Java 17
- Maven
- Node.js and npm
- PostgreSQL

## Single local startup path

### 1. Start PostgreSQL

Start PostgreSQL locally and create a database named `jobtrackr_ai`.

### 2. Configure backend environment

Use [backend/.env.example](/Users/sharan/Documents/New project/backend/.env.example) as your template and provide:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`
- `PORT`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_BASE_URL`

Important:
- Keep `OPENAI_API_KEY` in your shell or local environment settings.
- Do not hardcode it.
- Do not commit it.

### 3. Start the backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

### 4. Configure frontend environment

Copy [frontend/.env.example](/Users/sharan/Documents/New project/frontend/.env.example) to `.env` and set:

- `VITE_API_BASE_URL=http://localhost:8080/api`

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## First verification path

Test in this order:

1. Register and login
2. Create one application
3. Edit and delete that application
4. Call `POST /api/ai/parse-jd` with the JWT token
5. Call `POST /api/ai/generate-followup` with the JWT token

Example first AI test:

```bash
curl -X POST http://localhost:8080/api/ai/parse-jd \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "rawText": "Senior Backend Engineer at Acme in Austin, TX with Java, Spring Boot, PostgreSQL, and cloud experience..."
  }'
```

Example follow-up generation test:

```bash
curl -X POST http://localhost:8080/api/ai/generate-followup \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Acme",
    "jobTitle": "Backend Engineer",
    "status": "APPLIED",
    "notes": "Applied last week and had a positive initial conversation."
  }'
```

## Local setup with Docker

```bash
docker compose up --build
```

This starts:

- PostgreSQL on `5432`
- Backend on `8080`
- Frontend on `5173`

## Notes for Railway deployment

- Backend reads database and JWT config from environment variables.
- Frontend reads API base URL from `VITE_API_BASE_URL`.
- The current backend uses `spring.jpa.hibernate.ddl-auto=update` for MVP speed. For production, move to migrations with Flyway or Liquibase.

## Repo guidance

- Keep the repo root clean and use it as the main starting point.
- Project-specific agent instructions live in [AGENTS.md](/Users/sharan/Documents/New project/AGENTS.md).

## Default health score logic

- Completeness: URL `+10`, Notes `+10`, Salary `+10`, Location `+10`
- Follow-up health: `0-7` days `+40`, `8-14` days `+20`, `15+` days `+0`
- AI preparedness: JD summary `+10`, Follow-up draft `+10`

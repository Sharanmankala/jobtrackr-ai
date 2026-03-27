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

## Planned next features

- `POST /api/ai/parse-jd`
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

## Local setup without Docker

### 1. Start PostgreSQL

Create a database named `jobtrackr_ai` in your local PostgreSQL instance.

### 2. Configure backend environment

Copy `backend/.env.example` into your preferred local env source and set:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`
- `PORT`

### 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on `http://localhost:8080`.

### 4. Configure frontend environment

Copy `frontend/.env.example` to `.env` and update `VITE_API_BASE_URL` if needed.

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

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

## Default health score logic

- Completeness: URL `+10`, Notes `+10`, Salary `+10`, Location `+10`
- Follow-up health: `0-7` days `+40`, `8-14` days `+20`, `15+` days `+0`
- AI preparedness: JD summary `+10`, Follow-up draft `+10`

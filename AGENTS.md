# JobTrackr AI instructions

## Project root
- Work from the repository root.
- The repo root is the source of truth for commands, docs, and verification.

## Required local tools
- Java 17
- Maven
- Node.js and npm
- PostgreSQL

## Environment variables
- Do not hardcode secrets.
- Do not commit secrets.
- Backend requires `OPENAI_API_KEY` for `/api/ai/parse-jd`.
- Backend also uses `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, and `PORT`.
- Frontend uses `VITE_API_BASE_URL`.

## Backend
- Run from `backend/`
- Install/build with: `mvn clean package`
- Start with: `mvn spring-boot:run`
- Requires PostgreSQL running locally

## Frontend
- Run from `frontend/`
- Install with: `npm install`
- Start with: `npm run dev`

## Single startup path
1. Start PostgreSQL and create database `jobtrackr_ai` if it does not exist.
2. Set backend environment variables, including `OPENAI_API_KEY`.
3. Start backend from `backend/` with `mvn spring-boot:run`.
4. Set frontend environment variables from `frontend/.env.example`.
5. Start frontend from `frontend/` with `npm install && npm run dev`.

## Verification
- Verify backend starts on `http://localhost:8080`.
- Verify frontend starts on `http://localhost:5173`.
- Test auth first:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Then test applications CRUD:
  - `GET /api/applications`
  - `POST /api/applications`
  - `PUT /api/applications/{id}`
  - `DELETE /api/applications/{id}`
- Then test AI parsing:
  - `POST /api/ai/parse-jd`
- For AI parsing, use the logged-in JWT token in the `Authorization: Bearer <token>` header.

## Rules
- Do not change auth flow unless explicitly asked.
- Do not change existing application CRUD behavior unless explicitly asked.
- Keep code beginner-friendly and interview-friendly.
- Prefer simple layered backend changes and straightforward React state updates.

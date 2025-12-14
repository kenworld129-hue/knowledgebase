# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (Japanese/English) incident management knowledge base system with:
- **Frontend**: Next.js 16 (App Router + Pages Router hybrid) with React 19, TypeScript, Tailwind CSS
- **Backend**: Rust (Axum web framework) with PostgreSQL database
- **Authentication**: JWT-based auth with bcrypt password hashing

The system allows users to track, create, and manage system incidents with details like severity, occurrence time, root cause, and resolution.

## Development Commands

### Frontend (in `frontend/` directory)
```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Backend (in `backend/` directory)
```bash
# Build the project
cargo build

# Run development server (http://0.0.0.0:8000)
cargo run

# Build for release
cargo build --release

# Run tests
cargo test

# Check code without building
cargo check
```

## Architecture

### Frontend Architecture

**Routing Strategy**: The frontend uses a **hybrid routing approach**:
- `app/` directory: Contains the main dashboard page using Next.js App Router
- `pages/` directory: Contains incident management pages using Next.js Pages Router
  - `pages/login.tsx` - Login page
  - `pages/incidents/index.tsx` - List all incidents
  - `pages/incidents/new.tsx` - Create new incident
  - `pages/incidents/[id].tsx` - View incident details

**Key Frontend Files**:
- `lib/api.ts` - API client functions with JWT token handling via localStorage
- `lib/theme.ts` - Centralized design system (colors, shadows, spacing, button/card styles)
- `app/page.tsx` - Dashboard with stats and recent incidents (static data for now)

**Authentication Flow**: JWT tokens are stored in localStorage after login and sent in Authorization headers for all API requests.

**Styling**: Uses inline styles with a centralized theme system (no CSS modules or styled-components). The theme provides consistent colors (turquoise green + navy blue accents on gray base), shadows, and interactive effects.

### Backend Architecture

**Framework**: Built with Axum (async Rust web framework) on Tokio runtime.

**Project Structure**:
```
backend/src/
├── main.rs              # Application entry point, CORS config, server setup
├── db.rs                # PostgreSQL connection pool setup
├── models/              # Data models
│   └── incident.rs      # Incident struct with custom datetime deserialization
├── handlers/            # Request handlers (business logic)
│   ├── incidents.rs     # CRUD operations for incidents
│   └── login.rs         # Login handler
├── routes/              # Route definitions
│   ├── incidents.rs     # Incident routes (/api/incidents)
│   └── auth.rs          # Auth routes (/auth/login) + AppState definition
└── auth/                # Authentication utilities
    ├── jwt.rs           # JWT token creation with 24h expiration
    └── middleware.rs    # Auth middleware (if implemented)
```

**Key Backend Details**:
- **Database**: Uses SQLx with compile-time query verification for PostgreSQL
- **CORS**: Configured for `http://localhost:3000` and `http://118.27.109.133:3000`
- **Server**: Binds to `0.0.0.0:8000` for production deployment
- **Datetime Handling**: Custom deserializer in `incident.rs` handles datetime-local input format from frontend (converts "T" to space, adds missing seconds)

### Database Schema

The `incidents` table includes:
- `id` (primary key)
- `title`, `description`, `root_cause`, `resolution`
- `system_name`, `severity`
- `occurred_at`, `resolved_at` (timestamps)
- `created_by` (user ID reference)

### API Endpoints

**Authentication**:
- `POST /auth/login` - Login with username/password, returns JWT token

**Incidents**:
- `GET /api/incidents?page=1` - List incidents with pagination (20 per page)
- `GET /api/incidents/{id}` - Get incident details
- `POST /api/incidents` - Create new incident (requires JWT auth)

All incident endpoints require `Authorization: Bearer <token>` header.

## Environment Configuration

### Backend Environment Variables (backend/.env)
Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing

### Frontend Environment Variables
Optional:
- `NEXT_PUBLIC_API_URL` - Backend API URL (defaults to `http://localhost:8000`)

## Common Development Patterns

### Adding New Incident Fields
1. Update `Incident` struct in `backend/src/models/incident.rs`
2. Update database query strings in `backend/src/handlers/incidents.rs`
3. Update TypeScript interfaces in `frontend/lib/api.ts`
4. Update forms in `frontend/pages/incidents/new.tsx`

### Authentication Pattern
- Backend creates JWT with user_id, username, role, 24h expiration
- Frontend stores token in localStorage after login
- All authenticated requests include `Authorization: Bearer <token>` header
- Backend validates JWT in handlers (middleware may be in development)

### Custom Datetime Handling
The backend includes a custom deserializer for datetime fields that:
- Replaces "T" separator with space (from HTML datetime-local input)
- Adds ":00" for seconds if missing
- Parses as NaiveDateTime in "YYYY-MM-DD HH:MM:SS" format

This handles the format difference between HTML5 datetime-local inputs and PostgreSQL timestamps.

## Testing Strategy

- Backend: Use `cargo test` for unit and integration tests
- Frontend: Testing setup appears minimal (ESLint configured)
- Manual testing via frontend UI and direct API calls

## Deployment Notes

- Backend listens on `0.0.0.0:8000` (all interfaces) for production
- CORS configured for production IP `http://118.27.109.133:3000`
- Git commits indicate production deployment to that IP address
- Frontend likely deployed separately (Next.js production build)

# Project: Full-Stack Digital Agency Website

## Architecture
- **Frontend**: Next.js 16 (App Router), React 19.2, Tailwind CSS, Framer Motion, and Three.js (via React Three Fiber).
- **Backend/BaaS**: Supabase integration for CRUD data storage and admin auth. In "demo" integrity mode, a mock database client layer will simulate Supabase API client-side and server-side using file-based storage or memory to support testing and deterministic execution.
- **Traffic Tracking**: A GDPR & DPDP compliant cookie consent banner controls custom client-side analytics. Traffic logs are persisted in the database only after explicit consent is given.
- **Security**: Next.js App Router route handlers and middleware (renamed to `proxy.ts` in Next.js 16) protect `/admin/*` routes. Rate-limiting is applied on `/api/auth/login` (admin login) yielding HTTP 429 after repeated failures.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | E2E Test Suite | Create test framework and write Tiers 1-4 E2E tests | None | IN_PROGRESS (Conv: a111174b) |
| M2 | DB Setup & Schema | Define DB schema for Services, Blog, Leads, Traffic and setup Mock client | None | IN_PROGRESS (Conv: 227aee0d) |
| M3 | Core Pages & WebGL | Implement Home, Services, About, Contact pages and pre-loader + WebGL hero | M2 | PLANNED |
| M4 | CMS & CRUD | Admin dashboard CRUD for Services, Blogs, and view Leads | M2, M3 | PLANNED |
| M5 | Analytics & Privacy | DPDP/GDPR banner, custom tracking script, traffic dashboard | M2, M3 | PLANNED |
| M6 | Auth & Security | Route protection and Rate Limiting on Login | M2, M4 | PLANNED |
| M7 | E2E Integration | Run & pass all E2E test cases, perform Tier 5 adversarial hardening | M1, M5, M6 | PLANNED |

## Interface Contracts
### Client ↔ Server (BaaS Database Operations)
- Database schema and tables:
  - `services`: `id` (uuid/serial), `title` (text), `description` (text), `created_at` (timestamp)
  - `blog_posts`: `id` (uuid/serial), `title` (text), `content` (text), `created_at` (timestamp)
  - `leads`: `id` (uuid/serial), `name` (text), `email` (text), `message` (text), `created_at` (timestamp)
  - `traffic_logs`: `id` (uuid/serial), `path` (text), `timestamp` (timestamp), `user_agent` (text), `consent_granted` (boolean)

### API Routes
- `/api/auth/login`: Post request with `{ email, password }`. Rate-limited to 5 failures per window (returns HTTP 429).
- `/api/leads`: Post request to submit lead contact form.
- `/api/track`: Post request with traffic data (only if cookie consent is accepted).

## Code Layout
- `src/app/` - Next.js page routes, layouts, and API routes.
- `src/components/` - React components (e.g. `hero`, `cms`, `ui`).
- `src/lib/` - Shared utilities, validation, and Database adapter (Supabase client/mock).
- `src/proxy.ts` - Request proxy/middleware (Next.js 16 standard).
- `tests/` - E2E and unit test suites.

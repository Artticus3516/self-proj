# Scope: Implementation Track

## Architecture
- **Frontend**: Next.js 16 (App Router), React 19.2, Tailwind CSS, Framer Motion, Three.js (via React Three Fiber).
- **Backend**: Supabase integration for CRUD data storage and admin auth. In "demo" integrity mode, a robust mock database client layer wrapped in the Supabase client interface is implemented, running deterministically without internet, but using proper env vars.
- **Traffic Tracking**: A GDPR & DPDP compliant cookie consent banner controlling custom client-side analytics, traffic logs persisted in the database after consent.
- **Security**: Next.js App Router route handlers and middleware (renamed to `src/proxy.ts` in Next.js 16) protecting `/admin/*` routes. Rate-limiting applied on `/api/auth/login` (admin login) yielding HTTP 429 after 5 repeated failures in a window.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M2 | DB Setup & Schema | Define DB schema and setup Mock client | None | PLANNED |
| M3 | Core Pages & WebGL | Home, Services, About, Contact pages and pre-loader + WebGL hero | M2 | PLANNED |
| M4 | CMS & CRUD | Admin dashboard CRUD for Services, Blogs, and view Leads | M2, M3 | PLANNED |
| M5 | Analytics & Privacy | DPDP/GDPR banner, custom tracking script, traffic dashboard | M2, M3 | PLANNED |
| M6 | Auth & Security | Route protection and Rate Limiting on Login | M2, M4 | PLANNED |

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

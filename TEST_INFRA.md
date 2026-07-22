# E2E Test Infra: Full-Stack Digital Agency Website

## Test Philosophy

- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory

| #  | Feature                              | Source (requirement)                              | Tier 1 | Tier 2 | Tier 3 |
|----|--------------------------------------|---------------------------------------------------|:------:|:------:|:------:|
| F1 | Core Pages & WebGL Hero              | PROJECT.md § Architecture, Milestones             |   5    |   5    |   ✓    |
| F2 | Database CRUD & Admin Dashboard      | PROJECT.md § Architecture, Milestones, Interfaces |   5    |   5    |   ✓    |
| F3 | Traffic Tracking & Cookie Consent    | PROJECT.md § Architecture, Interfaces             |   5    |   5    |   ✓    |
| F4 | Admin Auth, Security & Rate-limiting | PROJECT.md § Architecture, Interfaces             |   5    |   5    |   ✓    |

## Test Architecture

- Test runner: Playwright (using `@playwright/test`)
- Test runner command: `npx playwright test`
- Location of tests: `tests/` directory
- Target Environment: Local Next.js dev server at `http://localhost:3000`

---

## Test Cases Inventory

### Tier 1 - Feature Coverage (5 per feature, 20 cases total)

#### F1: Core Pages & WebGL Hero

- **Test 1.1**: Verify landing page `/` renders main layout, header, footer, and navigation links.
- **Test 1.2**: Verify pre-loader is displayed initially and eventually dismissed (content revealed).
- **Test 1.3**: Verify navigation to Services page `/services` and rendering of its header and content.
- **Test 1.4**: Verify navigation to About page `/about` and Contact page `/contact` and rendering of their respective
  contents.
- **Test 1.5**: Verify WebGL canvas element `<canvas>` is present in the Hero component of the landing page.

#### F2: Database CRUD & Admin Dashboard

- **Test 2.1**: Verify Admin Dashboard displays lists of services, blogs, and leads retrieved from the database.
- **Test 2.2**: Verify Admin can create a new service with valid title and description, and it appears in the list.
- **Test 2.3**: Verify Admin can update an existing service's details, and the changes are persisted.
- **Test 2.4**: Verify Admin can delete a service, and it is removed from the list.
- **Test 2.5**: Verify Admin can create, read, update, and delete blog posts.

#### F3: Traffic Tracking & Cookie Consent

- **Test 3.1**: Verify cookie consent banner is displayed on first visit to the site.
- **Test 3.2**: Verify accepting cookie consent hides the banner and sets a consent cookie/storage item.
- **Test 3.3**: Verify declining cookie consent hides the banner and sets a rejection cookie/storage item.
- **Test 3.4**: Verify that when consent is accepted, navigation events trigger `/api/track` requests to log visits.
- **Test 3.5**: Verify that when consent is declined, navigation events do NOT trigger any `/api/track` requests.

#### F4: Admin Auth, Security & Rate-limiting

- **Test 4.1**: Verify unauthenticated attempts to access `/admin`, `/admin/services`, etc. are redirected to
  `/admin/login` or `/login`.
- **Test 4.2**: Verify logging in with correct credentials allows access to protected `/admin` routes.
- **Test 4.3**: Verify logging out revokes authentication and redirects back to login page.
- **Test 4.4**: Verify logging in with incorrect credentials displays a clean authentication error message.
- **Test 4.5**: Verify Next.js App Router middleware/proxy protects `/api/admin/*` API endpoints (if any) or admin page
  handlers from anonymous requests.

---

### Tier 2 - Boundary & Corner Cases (5 per feature, 20 cases total)

#### F1: Core Pages & WebGL Hero

- **Test 1.6**: Verify navigation link behavior when clicked repeatedly in rapid succession (no app crashes, correct
  final page displays).
- **Test 1.7**: Verify the Pre-loader handles delay/timeout gracefully if resources take time to load.
- **Test 1.8**: Verify page rendering on different viewport sizes (mobile, tablet, desktop responsive checks on layout).
- **Test 1.9**: Verify handling of non-existent page `/does-not-exist` displays a 404 page with a link to return home.
- **Test 1.10**: Verify the Contact Form input validation on `/contact` (empty email, invalid email format, empty
  message prevent submission).

#### F2: Database CRUD & Admin Dashboard

- **Test 2.6**: Verify Service creation rejects empty title or description (client & server validation).
- **Test 2.7**: Verify Service creation rejects very long strings (boundary check, e.g., >1000 characters for title) or
  special characters.
- **Test 2.8**: Verify Blog post creation handles markdown content or special characters in body properly.
- **Test 2.9**: Verify Lead submission via public contact form is successfully stored in database and shows up on Admin
  Leads view.
- **Test 2.10**: Verify UI displays empty state messages correctly when services, blogs, or leads tables are empty.

#### F3: Traffic Tracking & Cookie Consent

- **Test 3.6**: Verify cookie consent banner does not reappear on subsequent page loads or refreshes if consent was
  already given/refused.
- **Test 3.7**: Verify analytics script handles fetch errors (when `/api/track` fails) without crashing the frontend.
- **Test 3.8**: Verify consent can be revoked or changed via a privacy settings link/button on the page.
- **Test 3.9**: Verify no traffic logs are written to the database with `consent_granted=false` when cookies are
  rejected (strict DPDP compliance).
- **Test 3.10**: Verify that `/api/track` payload contains valid schema fields (path, timestamp, user_agent,
  consent_granted).

#### F4: Admin Auth, Security & Rate-limiting

- **Test 4.6**: Verify that repeated failed logins (5 attempts) on `/api/auth/login` trigger rate limiting and return
  HTTP 429 status.
- **Test 4.7**: Verify the rate limit window resets after its duration (e.g., 60 seconds) and lets user attempt login
  again.
- **Test 4.8**: Verify that authentication tokens/cookies are set with `HttpOnly`, `Secure` (in prod), and `SameSite`
  flags.
- **Test 4.9**: Verify that invalid/malformed session tokens/cookies are rejected by middleware and redirect to login.
- **Test 4.10**: Verify rate limiting counts failures per-IP or per-username separately so standard users are not
  blocked by a single attacker's failed attempts.

---

### Tier 3 - Cross-Feature Combinations (4 cases total)

- **Test 3.1 (F2 + F4 - Secured CRUD)**: Verify that database mutating requests (POST/PUT/DELETE `/api/admin/services`
  etc.) are completely rejected with 401/403 status if authentication cookie/token is invalid or missing, ensuring CRUD
  cannot be bypassed.
- **Test 3.2 (F3 + F4 - Admin Analytics Exclusion)**: Verify that when an authenticated admin is browsing `/admin/*`,
  their traffic is NOT logged or is marked differently in analytics tracking, preventing skewing of traffic logs.
- **Test 3.3 (F1 + F3 - Pre-loader & Consent Banner)**: Verify cookie consent banner is fully interactive and visible
  only after pre-loader is dismissed, ensuring no z-index overlap issues.
- **Test 3.4 (F2 + F3 - Leads & Traffic Linkage)**: Verify that submitting a lead form on `/contact` logs the lead
  database entry, and if user granted cookie consent, also matches a traffic log visit entry with matching
  timestamp/user_agent.

---

### Tier 4 - Real-World Application Scenarios (5 cases total)

#### Scenario A: End-to-End User Inquiry Flow (Test 4.1)

An anonymous user visits `/`, sees pre-loader, then the cookie consent banner. They accept cookies. They browse
`/services`, `/about`, and `/contact`. On `/contact`, they submit a lead inquiry form. E2E test verifies:

1. Consent cookie is set.
2. Traffic logs for `/`, `/services`, `/about`, `/contact` are written to the database with `consent_granted=true`.
3. Lead record is successfully saved in the database.

#### Scenario B: Admin Content Management Cycle (Test 4.2)

Admin logs in successfully, navigates to Services CRUD, creates a new Service ("Web Design"), updates it to ("Advanced
Web Design"), and deletes it. E2E test verifies database state matches each step.

#### Scenario C: GDPR Rejection Flow (Test 4.3)

An anonymous user visits `/`, declines cookie consent. They browse several pages. E2E test verifies that `traffic_logs`
table has NO new rows and `/api/track` was never hit.

#### Scenario D: Brute Force Security Defence (Test 4.4)

An attacker attempts to brute force `/api/auth/login` with incorrect credentials. E2E test verifies:

1. First 5 attempts return HTTP 401.
2. 6th attempt returns HTTP 429.
3. Valid credentials on 7th attempt still fail with 429 while rate limit is active.

#### Scenario E: Content Delivery Verification (Test 4.5)

An admin creates a blog post with specific title and content. E2E test verifies the new blog post appears in the public
blog section (e.g. `/blog` or `/`) and is readable by anonymous users, verifying the data loop from admin dashboard to
public facing pages.

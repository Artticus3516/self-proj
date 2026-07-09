# Original User Request

## 2026-07-08T20:33:48Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Build a complete, full-stack digital agency website. This includes the frontend (featuring the 3D animated dotted wave hero section), a robust backend content management system (CMS), BaaS database integration, privacy-compliant tracking, strict security measures, and SEO optimization.

Working directory: `C:/Users/aarav/GitHub/self-proj`
Integrity mode: demo

## Requirements

### R1. Digital Agency Frontend & Performance
Implement a multi-page frontend (Home, Services, About, Contact). The hero section must include a dense, 3D animated dotted wave background using WebGL (React Three Fiber/Three.js) layered beneath UI elements (Framer Motion). Implement a global pre-loader. The application must be highly optimized to load in under 2 seconds. Implement strict SEO meta tags on all public pages.

### R2. Backend-as-a-Service (BaaS) Integration
Integrate Firebase or Supabase to handle the database and backend logic. The application must securely communicate with the BaaS, utilizing proper environment variables and client/server SDKs.

### R3. Full Content Management System (CMS) & Traffic Dashboard
Develop an administrative CMS dashboard. It must support full CRUD operations for agency "Services" and "Blog Posts", and provide a secure view to manage incoming "Leads". Additionally, create a Traffic Dashboard view to monitor user activity data. 

### R4. Security & Rate Limiting
The CMS admin routes must be protected and redirect unauthenticated users to a login page. Implement strict rate limiting on the login page to prevent brute-force attacks from false login attempts.

### R5. DPDP/Global Privacy Compliance & Tracking
Build a cookie consent banner compliant with India's DPDP and other global standards (e.g. GDPR). Implement a custom user activity tracking mechanism that records behavior (to feed the Traffic Dashboard) **ONLY** if the user explicitly grants consent.

## Acceptance Criteria

### Frontend Quality & Performance
- [ ] Programmatic load testing or Lighthouse auditing confirms the initial page load time is under 2 seconds.
- [ ] A global pre-loader visually mounts and dismounts before the main content is accessible.
- [ ] A `<canvas>` element exists in the DOM for the hero section rendering WebGL context.
- [ ] Proper `<title>`, `<meta name="description">`, and OpenGraph tags are present in the document head for all public routes.

### CMS, Security & Database Integrity
- [ ] An automated test script successfully executes a Create, Read, Update, and Delete cycle for a "Service" entry in the database.
- [ ] An automated test simulating rapid, successive failed login attempts successfully triggers a rate-limit block (e.g., HTTP 429 response).
- [ ] The CMS admin routes are protected and correctly redirect unauthenticated users to a login page.

### Privacy Compliance & Analytics
- [ ] Automated browser tests confirm that activity tracking network requests are **NOT** fired when the user ignores or rejects the cookie consent banner.
- [ ] Automated browser tests confirm that activity tracking network requests **ARE** successfully fired and recorded in the database when the user explicitly accepts the cookie consent.
- [ ] The CMS includes a functional dashboard view displaying the recorded traffic data.

## Follow-up — 2026-07-09T08:45:08Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Refactor the Next.js workspace to align with native framework capabilities, focusing on structural compression, Server Actions, and declarative UI patterns without breaking existing functionality.

Working directory: c:\Users\aarav\GitHub\self-proj
Integrity mode: development

## Requirements

### R1. Concise Database & Form Actions
- Scan form components (e.g., `contact/page.tsx`, `login/page.tsx`). 
- Replace verbose client-side `useState` loading/error cycles and try/catch fetch blocks with native Next.js Server Actions and React `useActionState` / `useTransition` hooks where applicable.

### R2. Routing & Middleware Simplification
- Scan for client-side `useEffect` loops checking for admin auth states or localStorage sessions in dashboard layouts.
- Ensure all authorization guards are consolidated into the existing `src/proxy.ts` (Next.js 16 standard), removing redundant client-side auth checks to keep individual page components entirely clean and decorative.

### R3. Tailwind & Logic Array Compression
- Locate massive structural layout chunks that use repeating blocks of identical Tailwind utility classes.
- Refactor repetitive UI blocks into concise, map-driven declarative arrays or shared layout constants.

### R4. Non-Destructive Refactoring & Safety Injections
- CRITICAL: Freeze all `<head>`, `Metadata` configurations, OpenGraph tags, and HTML layout structures created for "Atlas". Do not modify them.
- Do not alter any tracking keys, form names (`name="..."`), or ID/test-ID attributes verified by Playwright.
- Keep all Three.js / WebGL canvas components completely untouched.
- Do not run recursive loops. Execute this analysis and rewrite cleanly.

## Acceptance Criteria

### Verification & Testing
- [ ] `npm run build` completes successfully with no new linting or type errors.
- [ ] `npx playwright test --workers=1` passes all tier1 and tier2 tests, proving that CRUD, Auth, and Tracking flows still function correctly after migrating to Server Actions.
- [ ] No visual regressions in the 3D elements or repetitive UI blocks (e.g., Services list, Blog posts list).

## Follow-up — 2026-07-09T14:33:30Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Execute a single-pass architectural conciseness sweep across the codebase and output a flat, multi-file code diff plan for review. Do not execute the code changes.

Working directory: c:\Users\aarav\GitHub\self-proj
Integrity mode: development

## Requirements

### R1. Strict Constraints
- **CRITICAL**: Maximum agent allocation is locked at 1. Maximum execution steps is locked at 1.
- You are forbidden from spawning subagents, background tasks, or autonomous test verification loops.
- You must generate a single, flat, multi-file code diff plan for review and terminate immediately. Do not write changes to the codebase.

### R2. Preservation Injections (DO NOT ALTER)
- **SEO & METADATA**: Freeze all metadata configurations, layout headers, OpenGraph setups, and title strings rebranded for "Atlas".
- **REGRESSION PROTECTION**: Do not alter any tracking keys, form HTML `name` tags, or element `id` attributes verified by our Playwright tests.
- Keep all Three.js / WebGL canvas rendering blocks completely untouched.

### R3. Conciseness Refactoring
- Move redundant dashboard authorization checks into the centralized `src/proxy.ts` file (Next.js 16 standard).
- Compress repetitive UI layout rows and identical Tailwind string blocks into clean, map-driven declarative loops or constants.
- Swap verbose client-side fetch try/catch blocks with native Next.js Server Actions and `useActionState` hooks where possible.

## Acceptance Criteria

### Verification & Testing
- [ ] A single, flat, multi-file code diff plan is generated in the artifacts directory (e.g., `refactoring_diff_plan.md`).
- [ ] The plan adheres perfectly to the Preservation Injections (no metadata, IDs, tracking keys, or WebGL canvases are modified).
- [ ] The agent terminates immediately after generating the plan without running any subagents or executing the modifications.

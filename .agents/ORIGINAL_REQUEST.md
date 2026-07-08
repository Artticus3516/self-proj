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

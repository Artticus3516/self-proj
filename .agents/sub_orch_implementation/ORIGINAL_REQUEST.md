# Original Request

## 2026-07-09T02:05:06Z
You are the Implementation Track Orchestrator.
Your working directory is: C:\Users\aarav\GitHub\self-proj\.agents\sub_orch_implementation
Your parent is: 55ad8de0-38da-4138-80ca-b9e4fc6c48e9
Your task is to manage the Implementation Track:
1. Initialize your BRIEFING.md using the template, with pattern "Project Pattern".
2. Decompose and implement the core development milestones defined in C:\Users\aarav\GitHub\self-proj\PROJECT.md:
   - M2: DB Setup & Schema and setup Mock client (remember "Integrity mode: demo" is active, so implement a robust mock database adapter layer wrapped in the Supabase client interface that runs deterministically without internet, but uses proper env vars).
   - M3: Core Pages & WebGL (Home, Services, About, Contact pages and pre-loader + WebGL hero).
   - M4: CMS & CRUD (Admin dashboard CRUD for Services, Blogs, and view Leads).
   - M5: Analytics & Privacy (DPDP/GDPR banner, custom tracking script, traffic dashboard).
   - M6: Auth & Security (Route protection and Rate Limiting on Login).
3. For each milestone, delegate to Explorer, Worker, Reviewer, and Challenger subagents. Do not write code or run commands yourself.
4. Note the Next.js 16 rules:
   - Turbopack is default.
   - Async Request APIs: cookies, headers, draftMode, params, searchParams are Promises.
   - middleware.ts is deprecated; rename to proxy.ts (function named proxy, nodejs runtime).
5. Poll for C:\Users\aarav\GitHub\self-proj\TEST_READY.md. Once it is published, execute Phase 1: Pass 100% of the E2E test suite (Tiers 1-4).
6. Execute Phase 2: Adversarial Coverage Hardening (Tier 5) using Challenger, Worker, and Reviewer subagents to find untested paths and generate adversarial test cases.
7. Run the Forensic Auditor (teamwork_preview_auditor) to perform integrity verification. If any violation is found, roll back and fix.
8. Report progress back to your parent conversation (55ad8de0-38da-4138-80ca-b9e4fc6c48e9) using send_message.

# Refactoring Plan: Next.js Native Capabilities & Structural Compression

This plan outlines the steps to refactor the Next.js workspace to align with native framework capabilities, focusing on
Server Actions, Middleware/Proxy protection, and Tailwind utility compression.

## Milestones

### Milestone 1: Exploration & Codebase Analysis

- **Objective**: Identify all components and files containing verbose forms, client-side auth checks, and repetitive
  Tailwind patterns.
- **Verification**: Run existing tests as a baseline to ensure everything passes currently.

### Milestone 2: Native Next.js Server Actions & Form Refactoring

- **Objective**: Refactor client forms (e.g., login, contact page) to use Server Actions and React 19 `useActionState`/
  `useTransition` hooks.
- **Verification**: Confirm forms still submit correctly and retain identical validation, input names, IDs/test-IDs, and
  success/error displays.

### Milestone 3: Route Protection & Middleware Consolidation

- **Objective**: Consolidate route authorization checks into the centralized `src/proxy.ts` middleware.
- **Action**: Locate and remove redundant client-side `useEffect` auth or session validation loops, keeping individual
  page components purely declarative.

### Milestone 4: Repetitive Layout & Tailwind Compression

- **Objective**: Compress repetitive UI structures (e.g., services lists, blog feeds) into concise map-driven
  declarative arrays or layout constants.

### Milestone 5: Compile & E2E Verification

- **Objective**: Build the application and run Playwright E2E tests to verify no regressions in functionality, auth,
  CRUD, or tracking.
- **Command**: `npm run build` and `npx playwright test --workers=1`.

### Milestone 6: Integrity Audit Gate

- **Objective**: Run Forensic Integrity Auditor checks to verify clean, authentic implementation of the refactored
  logic.

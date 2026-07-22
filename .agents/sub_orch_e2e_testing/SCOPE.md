# Scope: E2E Test Suite

## Architecture

- Test Framework: Playwright (with TypeScript)
- Test Targets: Next.js dev or prod server running locally (usually port 3000)
- Config: `playwright.config.ts` starting Next.js local webServer on run.
- Directory Structure: `tests/` for E2E spec files.

## Milestones

| # | Name         | Scope                                                                                | Dependencies | Status                       |
|---|--------------|--------------------------------------------------------------------------------------|--------------|------------------------------|
| 1 | M1_E2E_INFRA | Install Playwright, configure `playwright.config.ts`, verify a basic navigation test | None         | DONE                         |
| 2 | M1_TIER_1    | Implement 20 Tier 1 E2E test cases (5 per feature across 4 features)                 | M1_E2E_INFRA | DONE                         |
| 3 | M1_TIER_2    | Implement 20 Tier 2 E2E test cases (5 per feature across 4 features)                 | M1_TIER_1    | DONE                         |
| 4 | M1_TIER_3    | Implement 4 Tier 3 E2E test cases (pairwise cross-feature combinations)              | M1_TIER_2    | IN_PROGRESS (Conv: 281b5e09) |
| 5 | M1_TIER_4    | Implement 5 Tier 4 E2E test cases (real-world workload scenarios)                    | M1_TIER_3    | PLANNED                      |

## Interface Contracts

- Tests must execute via `npx playwright test` or `npm run test:e2e`.
- Verification requires that the mock database client (for Supabase) is properly simulated and populated for test
  scenarios.

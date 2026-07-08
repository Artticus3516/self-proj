# Handoff Report - M2 DB Setup, Schema & Mock Client Investigation

## 1. Observation
I directly observed and examined the following files and directories in the workspace:
*   **`package.json`** (Lines 11-20): No database or Supabase client libraries (like `@supabase/supabase-js`) are currently listed in the dependencies. The runtime is Next.js 16.2.10.
*   **`PROJECT.md`** (Lines 5-7): Specifies that in `"demo" integrity mode, a mock database client layer will simulate Supabase API client-side and server-side using file-based storage or memory to support testing and deterministic execution.`
*   **`PROJECT.md`** (Lines 21-26): Declares the following database tables and schemas:
    *   `services`: `id` (uuid/serial), `title` (text), `description` (text), `created_at` (timestamp)
    *   `blog_posts`: `id` (uuid/serial), `title` (text), `content` (text), `created_at` (timestamp)
    *   `leads`: `id` (uuid/serial), `name` (text), `email` (text), `message` (text), `created_at` (timestamp)
    *   `traffic_logs`: `id` (uuid/serial), `path` (text), `timestamp` (timestamp), `user_agent` (text), `consent_granted` (boolean)
*   **`PROJECT.md`** (Lines 33-38): Outlines the project layout, specifying that `src/lib/` is the location for the `Database adapter (Supabase client/mock)` and `src/proxy.ts` is the middleware.
*   **`.gitignore`** (Lines 1-42): Currently contains no exclusion for local JSON files or a `.data/` directory where local file-based database backups might be persisted during testing.
*   **`src/` directory**: Currently contains only `app/` and `components/` folders. The `src/lib/` folder does not exist yet.

## 2. Logic Chain
1.  **Dependency Addition**: Since `@supabase/supabase-js` is required to communicate with Supabase in production (as per `PROJECT.md` § Architecture), it must be added to `package.json` dependencies.
2.  **Type Definitions**: To ensure static typing throughout the application (as Next.js 16/TypeScript is used), we must define TypeScript mappings for the database tables in `src/lib/database.types.ts` derived from `PROJECT.md` § Interface Contracts.
3.  **Cross-Context State Consistency**: Next.js separates client (browser) and server (Node.js) execution contexts. Simple in-memory variables will not persist database states between Route Handlers (which handle API requests) and Server Components (which render pages).
4.  **Local File Persistence**: To ensure offline deterministic execution and persist data across independent server requests, the mock database adapter must save data to a local file (e.g., `.data/db.json`). We place this file in `.data/` at the project root to prevent Next.js from rebuilding the application on every database mutation (updates in `src/` trigger live-reload rebuilds).
5.  **Browser Build Compilation Safety**: Because browser bundlers cannot resolve Node.js core modules (`fs`, `path`), we must dynamically `require` these modules inside a `typeof window === 'undefined'` guard. This prevents browser bundler compilation failures while allowing file access on the server-side.
6.  **Browser Context Fallback**: In browser contexts where file operations are impossible, the mock client must fallback to `localStorage` or page memory, ensuring the client-side code behaves safely without throwing runtime errors.
7.  **Auth Integration & Middleware Session Checks**: Since Next.js 16 uses async `cookies()` from `next/headers` to manage server sessions, the mock client's `auth.getSession()` and `auth.getUser()` must dynamically import `next/headers` and await `cookies()` to inspect the `admin_session` cookie. This links the mock client auth state with standard Next.js route protection.

## 3. Caveats
*   **Concurrency limits**: The mock file database uses synchronous operations (`fs.readFileSync`/`writeFileSync`). This is suitable for local development and E2E testing but not for high-concurrency multi-user production workloads.
*   **Client vs Server Isolation**: If direct client-side query methods (`supabase.from(...)`) are invoked on the browser without an API route middleman, changes will be persisted to browser `localStorage` instead of the server `.data/db.json` file. All database writes/queries should ideally be executed server-side via Server Components, Server Actions, or Route Handlers.
*   **Hardcoded Default Credentials**: By default, mock auth is configured to accept `admin@agency.com` / `adminpassword` as the credentials. If environment variables `ADMIN_EMAIL` and `ADMIN_PASSWORD` are defined, it will override them.

## 4. Conclusion
We propose the following plan to implement M2:
1.  **Add Dependencies**: Add `@supabase/supabase-js` to `package.json` dependencies.
2.  **Define TS Types**: Create `src/lib/database.types.ts` containing the schema declarations for `services`, `blog_posts`, `leads`, and `traffic_logs` (drafted in `proposed_database.types.ts`).
3.  **Implement Mock Client**: Create `src/lib/supabase-mock.ts` containing the mock query builder and mock auth adapter, mapping mutations to `.data/db.json` on the server and `localStorage` on the client (drafted in `proposed_supabase-mock.ts`).
4.  **Create Client Factory**: Create `src/lib/supabase.ts` which exports the singleton `supabase` client instance, wrapping either the real `@supabase/supabase-js` client or the mock client based on `process.env.NEXT_PUBLIC_INTEGRITY_MODE === 'demo'` (drafted in `proposed_supabase.ts`).
5.  **Exclusions**: Append `/.data/` to `.gitignore` to prevent committing mock database states.
6.  **Production SQL Schema**: Create `supabase/migrations/schema.sql` with table creation statements and RLS policies for production deployment (drafted in `proposed_schema.sql`).

## 5. Verification Method
*   **Compilation check**: Execute `npm run build` after implementing files. It must build without any "module not found" or compilation errors regarding `fs` or `path` in browser bundles.
*   **CRUD flow check**: Run a node script that imports the client factory in demo mode and runs:
    ```typescript
    import { supabase } from './src/lib/supabase';
    // 1. Insert
    const { data: inserted } = await supabase.from('services').insert({ title: 'Test Service', description: 'Testing mock db' });
    // 2. Select
    const { data: list } = await supabase.from('services').select('*');
    // 3. Update
    const { data: updated } = await supabase.from('services').update({ title: 'Updated Test' }).eq('id', inserted[0].id);
    // 4. Delete
    await supabase.from('services').delete().eq('id', inserted[0].id);
    ```
    Verify that `.data/db.json` is created at the project root, populated with default seed data, and modified correctly at each step.
*   **Auth check**: Verify `await supabase.auth.getSession()` correctly reads the `admin_session` cookie inside Next.js 16 Route Handlers and returns the mock session token `mock-session-token-xyz-9876`.

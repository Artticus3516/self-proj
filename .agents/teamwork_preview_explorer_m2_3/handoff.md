# Handoff Report - M2 Database Setup, Schema & Mock Client Plan

## 1. Observation

During my read-only investigation, I observed and analyzed the following files:

1. **`package.json`** (Lines 11-20): No database libraries, `@supabase/supabase-js`, or `@supabase/ssr` are currently
   listed under dependencies. The project utilizes Next.js version `16.2.10` and React version `19.2.4`.
2. **`PROJECT.md`** (Lines 5-7): Specifies:
   > "In "demo" integrity mode, a mock database client layer will simulate Supabase API client-side and server-side
   using file-based storage or memory to support testing and deterministic execution."
3. **`PROJECT.md`** (Lines 20-26): Defines the database schema requirements:
    - `services`: `id` (uuid/serial), `title` (text), `description` (text), `created_at` (timestamp)
    - `blog_posts`: `id` (uuid/serial), `title` (text), `content` (text), `created_at` (timestamp)
    - `leads`: `id` (uuid/serial), `name` (text), `email` (text), `message` (text), `created_at` (timestamp)
    - `traffic_logs`: `id` (uuid/serial), `path` (text), `timestamp` (timestamp), `user_agent` (text),
      `consent_granted` (boolean)
4. **`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`** (Lines 11-13 and Line 774):
   Explains that Next.js 16 deprecates the `middleware` file convention in favor of `proxy.ts|js`:
   > "The `middleware` file convention is deprecated and has been renamed to `proxy`."
   > "v16.0.0 | Middleware is deprecated and renamed to Proxy. Proxy defaults to the Node.js runtime"
5. **`.agents/teamwork_preview_explorer_m2_1/`**: Contains proposed draft files for the DB setup created by Explorer 1:
    - `proposed_database.types.ts`: TypeScript mappings matching the required database schema.
    - `proposed_schema.sql`: SQL tables creation and Row Level Security (RLS) policies.
    - `proposed_supabase-mock.ts`: Mock DB implementation persisting to `.data/db.json` on the server and `localStorage`
      on the client, with helper class `MockDatabase` and query builder `MockQueryBuilder`.
    - `proposed_supabase.ts`: Database client routing singleton wrapping either the real client or mock client based on
      the integrity mode environment variable.

---

## 2. Logic Chain

1. **NPM Dependencies (Reference: Observation 1)**: Since `@supabase/supabase-js` is required for live production BaaS
   operations, we must add it as a dependency. Additionally, standard Next.js App Router applications require cookie
   handling and client creation, so we should add `@supabase/ssr` to `package.json`.
2. **Database Types & SQL Migration (Reference: Observation 3, 5)**: To ensure full static type safety, we need the
   database types defined in `src/lib/database.types.ts` matching the four specified tables (`services`, `blog_posts`,
   `leads`, `traffic_logs`). We should also provide `supabase/migrations/schema.sql` for real Supabase schema creation.
3. **Execution Runtime Contexts (Reference: Observation 2, 4)**: Next.js has distinct client (browser) and server (
   Node.js) runtimes. An in-memory mock client will lose state across API requests or page refreshes.
4. **Server-Side File Persistence**: To ensure deterministic execution offline, the mock client should persist
   server-side writes to a local file. The file should be stored outside the `src/` directory (e.g. `.data/db.json` in
   the project root) so that database mutations do not trigger Next.js development hot-reload cycles.
5. **Compilation Safety for Browser Bundles (Reference: Observation 5)**: Because browser environments cannot resolve
   Node.js modules like `fs` and `path`, imports of these modules must be handled dynamically inside a runtime
   environment check (`typeof window === 'undefined'`) to prevent Next.js bundle compilation failures.
6. **Browser Context Fallback**: In browser contexts, the mock client should fallback to storing state in `localStorage`
   or memory, preventing crashes on the client.
7. **Next.js 16 Proxy Execution Compatibility (Reference: Observation 4, 5)**: In Next.js 16, request interception
   happens in `proxy.ts`, which defaults to the Node.js runtime. This is crucial because it allows the proxy function to
   successfully read the local JSON file (`.data/db.json`) using standard filesystem operations during request
   processing—something that was impossible in earlier Next.js versions running exclusively in the Edge runtime.
8. **Auth & Cookies Synchronization**: To ensure security and admin route protection, authentication must be tracked
   using cookies (e.g., `admin_session`). The server-side mock client's `auth.getSession()` should use async `cookies()`
   from `next/headers` to check for this token, synchronizing auth state across Next.js API route handlers, Server
   Components, and the `proxy.ts` middleware.

---

## 3. Caveats

* **File locking and concurrency**: The local file database uses synchronous operations (`fs.readFileSync` and
  `fs.writeFileSync`). This is intended for offline deterministic execution and testing, and is not suitable for
  high-concurrency production setups.
* **Storage Isolation**: Browser mutations and server mutations run in separate environments. If a component makes a
  direct client-side client write (`supabase.from('services').insert(...)`), it will persist only to that browser's
  `localStorage` and not to `.data/db.json`. Therefore, all DB mutations and fetches should be routed through Next.js
  Server Components, Server Actions, or API Route Handlers.
* **Credentials Overrides**: Mock credentials default to `admin@agency.com` / `adminpassword` but can be overridden by
  `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` files.

---

## 4. Conclusion

I propose the following actionable plan to implement M2:

1. **Update `package.json`**:
   Add dependencies for `@supabase/supabase-js` and `@supabase/ssr` (for production integration).
2. **Define Database Types**:
   Write `src/lib/database.types.ts` containing the TypeScript types for the four tables.
3. **Implement Mock Supabase Client**:
   Write `src/lib/supabase-mock.ts` with a mock client matching the `@supabase/supabase-js` client API.
    - Use dynamic imports for Node modules (`fs`, `path`, `next/headers`) to ensure browser bundle safety.
    - Implement the chainable query builder supporting `.select()`, `.insert()`, `.update()`, `.delete()`, `.eq()`,
      `.order()`, `.limit()`, and `.single()`.
    - Incorporate cookie-based session verification inside `auth.getSession()` by awaiting Next.js 16's async
      `cookies()` API.
4. **Create Client Factory (`src/lib/supabase.ts`)**:
    - Provide a factory that dynamically instantiates the mock client when
      `process.env.NEXT_PUBLIC_INTEGRITY_MODE === 'demo'` or when Supabase environment variables are missing, and falls
      back to standard Supabase clients when running in production mode.
5. **Git Ignored Storage**:
   Add `/.data/` to `.gitignore` to prevent database mock state check-ins.
6. **SQL Script**:
   Create `supabase/migrations/schema.sql` defining database tables and RLS policies (e.g., read policies for public,
   modify policies for authenticated admin users) for production deploy.

---

## 5. Verification Method

1. **Build Check**:
   Execute `npm run build` after setup. Verify it compiles cleanly without compilation errors regarding Node.js core
   modules.
2. **E2E Test Suite**:
   Once the testing framework is initialized, execute the project E2E test command `npx playwright test` to verify
   database queries and updates succeed.
3. **Local Testing Script**:
   Create a temporary Node.js test script `scripts/test-db.ts` to verify the client behaves deterministically:
   ```typescript
   import { supabase } from '../src/lib/supabase';
   
   async function runTest() {
     // 1. Insert service
     const { data: insertData } = await supabase.from('services').insert({
       title: 'Digital Marketing',
       description: 'Custom organic traffic campaigns'
     });
     console.log('Inserted:', insertData);
     
     // 2. Select services
     const { data: selectData } = await supabase.from('services').select('*').eq('title', 'Digital Marketing');
     console.log('Selected:', selectData);
     
     // 3. Update service
     const { data: updateData } = await supabase.from('services').update({ description: 'SEO Campaigns' }).eq('id', selectData[0].id);
     console.log('Updated:', updateData);
     
     // 4. Delete service
     await supabase.from('services').delete().eq('id', selectData[0].id);
     console.log('Deleted successfully.');
   }
   
   runTest();
   ```
   Execute using a tool like `tsx` or `node -r ts-node/register scripts/test-db.ts` and verify `.data/db.json` is
   correctly initialized, seed data exists, and state mutations reflect in the JSON file.
4. **Auth State Hook Check**:
   Write a temporary route handler in `src/app/api/auth/test/route.ts` checking `await supabase.auth.getSession()` and
   verify that when the request contains the cookie `admin_session=mock-session-token-xyz-9876`, it correctly identifies
   the authenticated admin user.

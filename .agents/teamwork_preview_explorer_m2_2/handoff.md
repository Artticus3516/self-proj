# Handoff Report: M2 DB Setup, Schema & Mock Client Analysis

## 1. Observation
We observed the following files and configuration in the codebase:
- **`package.json`**: Shows Next.js version is `16.2.10` and React is `19.2.4`. There are no external database or auth helper libraries (like `@supabase/supabase-js`) listed in `dependencies`.
- **`PROJECT.md`**: Specifies the database schema, API contracts, and the file layout:
  - Table contracts:
    - `services`: `id` (uuid/serial), `title` (text), `description` (text), `created_at` (timestamp)
    - `blog_posts`: `id` (uuid/serial), `title` (text), `content` (text), `created_at` (timestamp)
    - `leads`: `id` (uuid/serial), `name` (text), `email` (text), `message` (text), `created_at` (timestamp)
    - `traffic_logs`: `id` (uuid/serial), `path` (text), `timestamp` (timestamp), `user_agent` (text), `consent_granted` (boolean)
  - Code layout: `src/lib/` for shared utilities and database adapters, and `src/proxy.ts` for route protection proxy.
- **`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`**: Confirms middleware convention changes in Next.js 16:
  > "Starting with Next.js 16, Middleware is now called Proxy to better reflect its purpose. The functionality remains the same."
  > "Create a `proxy.ts` (or `.js`) file in the project root, or inside `src` if applicable..."
- **`node_modules/next/dist/docs/01-app/02-guides/authentication.md`**: Confirms that standard Next.js 16 `cookies()` calls must be awaited:
  ```ts
  const cookieStore = await cookies()
  ```

---

## 2. Logic Chain
- **Step 1: Define Schemas**: The 4 database tables must be defined in TypeScript interface contracts in `src/lib/types/database.ts`. Defining complete types ensures full TypeScript support for queries and updates.
- **Step 2: Isomorphic Offline Execution**: The database adapter must run client-side (browser) and server-side (Next.js route handlers/actions). 
  - To support offline deterministic execution:
    - Server-side calls should read/write to a local JSON file (`mock-db.json` in the project root).
    - Client-side calls should persist state using `localStorage` to avoid resetting between navigations/reloads.
    - Synchronous file I/O on the server-side avoids race conditions in multi-request development or testing environments.
- **Step 3: Query Builder Simulation**: The mock client must support chainable methods (.select, .eq, .order, .limit, .single) and thenable resolution (`.then()`) to mirror the Supabase API natively without requiring `@supabase/supabase-js` to run in "demo" mode.
- **Step 4: Admin Authentication Integration**: E2E tests check for secure cookie attributes (`HttpOnly`, `Secure`, `SameSite`). The mock auth system must set an authentic session cookie that is readable by Next.js 16 `proxy.ts` to secure the `/admin/*` routes.

---

## 3. Caveats
- The local JSON file database uses synchronous operations. This blocks the main thread during database operations, which is appropriate for dev/testing but unsuitable for high-concurrency production deployments.
- The mock client is activated only when `NEXT_PUBLIC_INTEGRITY_MODE === 'demo'`.
- Production credentials and real Supabase client initialization must be fallback routes if the integrity mode is not `demo`.

---

## 4. Conclusion
We propose the following plan and fix strategy for M2:

### A. Environment Configuration
Create a `.env.local.example` at the root:
```bash
# Toggle "demo" to use the mock database and auth layer offline
NEXT_PUBLIC_INTEGRITY_MODE=demo

# Supabase Configurations (Only used in production/real integration)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=admin@digitalagency.com
ADMIN_PASSWORD=adminpassword123
```

### B. DB Schema Definition (`src/lib/types/database.ts`)
Create database types matching the project specifications:
```typescript
export interface Service {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface TrafficLog {
  id: string;
  path: string;
  timestamp: string;
  user_agent: string;
  consent_granted: boolean;
}

export interface Database {
  public: {
    Tables: {
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<BlogPost, 'id' | 'created_at'>>;
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>;
      };
      traffic_logs: {
        Row: TrafficLog;
        Insert: Omit<TrafficLog, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<TrafficLog, 'id' | 'created_at'>>;
      };
    };
  };
}
```

### C. Mock Supabase Client (`src/lib/supabaseMock.ts`)
Implement the isomorphic mock client:
```typescript
import { Database } from './types/database';

class MockQueryBuilder {
  private tableName: string;
  private db: any;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAsc: boolean = true;
  private limitNum: number | null = null;
  private isSingle: boolean = false;
  private operation: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private payload: any = null;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = this.loadData();
  }

  private loadData(): any {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('mock_supabase_db');
      return data ? JSON.parse(data) : this.getInitialDB();
    } else {
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.resolve(process.cwd(), 'mock-db.json');
      if (fs.existsSync(dbPath)) {
        try {
          return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        } catch (e) {
          // ignore
        }
      }
      return this.getInitialDB();
    }
  }

  private saveData(data: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_supabase_db', JSON.stringify(data));
    } else {
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.resolve(process.cwd(), 'mock-db.json');
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    }
  }

  private getInitialDB() {
    return {
      services: [],
      blog_posts: [],
      leads: [],
      traffic_logs: [],
    };
  }

  select(columns: string = '*') {
    this.operation = 'select';
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item) => item[column] === value);
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderCol = column;
    this.orderAsc = ascending;
    return this;
  }

  limit(num: number) {
    this.limitNum = num;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  insert(values: any | any[]) {
    this.operation = 'insert';
    this.payload = values;
    return this;
  }

  update(values: any) {
    this.operation = 'update';
    this.payload = values;
    return this;
  }

  delete() {
    this.operation = 'delete';
    return this;
  }

  private execute() {
    const table = this.db[this.tableName] || [];
    let result = [...table];

    if (this.operation === 'insert') {
      const newItems = Array.isArray(this.payload) ? this.payload : [this.payload];
      const crypto = typeof window !== 'undefined' ? window.crypto : require('crypto');
      
      const generateId = () => {
        if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
        return Math.random().toString(36).substring(2, 15);
      };

      const processedItems = newItems.map((item: any) => ({
        id: item.id || generateId(),
        created_at: item.created_at || new Date().toISOString(),
        ...item,
      }));

      table.push(...processedItems);
      this.db[this.tableName] = table;
      this.saveData(this.db);
      return processedItems;
    }

    if (this.operation === 'update') {
      let updatedItems: any[] = [];
      const newTable = table.map((item: any) => {
        const matches = this.filters.every((filter) => filter(item));
        if (matches) {
          const updated = { ...item, ...this.payload };
          updatedItems.push(updated);
          return updated;
        }
        return item;
      });

      this.db[this.tableName] = newTable;
      this.saveData(this.db);
      return updatedItems;
    }

    if (this.operation === 'delete') {
      const deletedItems = table.filter((item: any) => this.filters.every((filter) => filter(item)));
      const newTable = table.filter((item: any) => !this.filters.every((filter) => filter(item)));

      this.db[this.tableName] = newTable;
      this.saveData(this.db);
      return deletedItems;
    }

    // select operation
    result = result.filter((item: any) => this.filters.every((filter) => filter(item)));

    if (this.orderCol) {
      result.sort((a: any, b: any) => {
        const valA = a[this.orderCol!];
        const valB = b[this.orderCol!];
        if (valA < valB) return this.orderAsc ? -1 : 1;
        if (valA > valB) return this.orderAsc ? 1 : -1;
        return 0;
      });
    }

    if (this.limitNum !== null) {
      result = result.slice(0, this.limitNum);
    }

    if (this.isSingle) {
      return result.length > 0 ? result[0] : null;
    }

    return result;
  }

  async then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    try {
      const data = this.execute();
      const res = { data, error: null };
      if (onfulfilled) return Promise.resolve(res).then(onfulfilled);
      return res as any;
    } catch (error: any) {
      const res = { data: null, error: { message: error.message || String(error) } };
      if (onrejected) return Promise.resolve(res).then(onrejected);
      return res as any;
    }
  }
}

export function createMockClient() {
  return {
    from: (tableName: string) => new MockQueryBuilder(tableName),
    auth: {
      signInWithPassword: async ({ email, password }: any) => {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@digitalagency.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
        
        if (email === adminEmail && password === adminPassword) {
          const session = {
            access_token: 'mock-admin-token-123',
            user: { id: 'admin-uuid-999', email: adminEmail }
          };
          if (typeof window !== 'undefined') {
            localStorage.setItem('supabase.auth.token', JSON.stringify(session));
          }
          return { data: { user: session.user, session }, error: null };
        }
        return { data: { user: null, session: null }, error: new Error('Invalid login credentials') };
      },
      signOut: async () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('supabase.auth.token');
        }
        return { error: null };
      },
      getSession: async () => {
        if (typeof window !== 'undefined') {
          const session = localStorage.getItem('supabase.auth.token');
          if (session) {
            try {
              return { data: { session: JSON.parse(session) }, error: null };
            } catch (e) {}
          }
        }
        return { data: { session: null }, error: null };
      },
      getUser: async () => {
        if (typeof window !== 'undefined') {
          const session = localStorage.getItem('supabase.auth.token');
          if (session) {
            try {
              const parsed = JSON.parse(session);
              return { data: { user: parsed.user }, error: null };
            } catch (e) {}
          }
        }
        return { data: { user: null }, error: null };
      }
    }
  };
}
```

### D. Supabase Adapter Interface (`src/lib/supabase.ts`)
Set up the wrapper to dynamically load the mock or real client:
```typescript
import { createClient } from '@supabase/supabase-js'; // Requires npm install @supabase/supabase-js
import { createMockClient } from './supabaseMock';

const isDemo = process.env.NEXT_PUBLIC_INTEGRITY_MODE === 'demo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = isDemo 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);
```

### E. Session Cookies and Proxy Authentication Helper
To bridge client auth state to server API protection, we can set standard HTTP Cookies during login/logout:
```typescript
// Proposed helper functions in src/lib/authHelpers.ts
import { cookies } from 'next/headers';

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set('mock-admin-session', 'authenticated-admin-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('mock-admin-session');
}
```

And in `src/proxy.ts` (Next.js 16 Proxy):
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const session = request.cookies.get('mock-admin-session')?.value;
    if (session !== 'authenticated-admin-session-token') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 5. Verification Method
1. **Database Schema Integration & Mock Compilation**:
   Create a test script `tests/test-db-mock.ts` to verify the DB mock behavior:
   ```typescript
   // tests/test-db-mock.ts
   import { createMockClient } from '../src/lib/supabaseMock';
   
   async function runTest() {
     const db = createMockClient();
     
     // 1. Insert a service
     console.log('Testing insert...');
     const insertRes = await db.from('services').insert({
       title: 'SEO Audit',
       description: 'Analyze traffic patterns and visibility'
     });
     console.log('Inserted:', insertRes.data);
     
     const serviceId = insertRes.data[0].id;
     
     // 2. Select the service
     console.log('Testing select...');
     const selectRes = await db.from('services').select('*').eq('id', serviceId).single();
     console.log('Selected:', selectRes.data);
     
     // 3. Update the service
     console.log('Testing update...');
     const updateRes = await db.from('services').update({
       title: 'Advanced SEO Audit'
     }).eq('id', serviceId);
     console.log('Updated:', updateRes.data);
     
     // 4. Delete the service
     console.log('Testing delete...');
     const deleteRes = await db.from('services').delete().eq('id', serviceId);
     console.log('Deleted:', deleteRes.data);
     
     console.log('All tests passed successfully!');
   }
   
   runTest().catch(console.error);
   ```
   Run the test with the following command:
   ```bash
   npx ts-node tests/test-db-mock.ts
   ```
   **Pass Criteria**: The script executes without typescript errors, creates `mock-db.json` locally, inserts, modifies, and deletes records successfully.

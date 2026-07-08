import { Database } from "./database.types";

// Dynamic imports helper to prevent Webpack/Turbopack issues in Next.js browser builds
let fs: any = null;
let path: any = null;
let nextHeaders: any = null;

if (typeof window === "undefined") {
  try {
    fs = require("fs");
    path = require("path");
    nextHeaders = require("next/headers");
  } catch (e) {
    // Gracefully handle require failures in different environments
  }
}

const BROWSER_STORAGE_KEY = "mock_supabase_db";

// Types helper for mock database schema
type TableNames = keyof Database["public"]["Tables"];

interface SeedData {
  services: Array<Database["public"]["Tables"]["services"]["Row"]>;
  blog_posts: Array<Database["public"]["Tables"]["blog_posts"]["Row"]>;
  leads: Array<Database["public"]["Tables"]["leads"]["Row"]>;
  traffic_logs: Array<Database["public"]["Tables"]["traffic_logs"]["Row"]>;
}

const getInitialSeed = (): SeedData => ({
  services: [
    {
      id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      title: "Web Development",
      description: "Building high-performance, responsive web applications using modern React, Next.js, and Server Components.",
      created_at: new Date().toISOString(),
    },
    {
      id: "b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e",
      title: "UI/UX Design & Branding",
      description: "Designing intuitive, user-centered digital interfaces and cohesive brand identities that captivate users.",
      created_at: new Date().toISOString(),
    },
    {
      id: "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
      title: "WebGL & 3D Interactive Design",
      description: "Crafting immersive, interactive 3D web experiences with Custom Shaders, Three.js, and React Three Fiber.",
      created_at: new Date().toISOString(),
    },
  ],
  blog_posts: [
    {
      id: "d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
      title: "The Future of Web Performance with Next.js 16",
      content: "Next.js 16 and React 19 introduce revolutionary rendering and data-loading paradigms. Learn how to optimize your web application for instant, sub-second load times.",
      created_at: new Date().toISOString(),
    },
    {
      id: "e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
      title: "Designing for the Spatial Web: Incorporating 3D/WebGL Elements",
      content: "As 3D elements become more common, incorporating WebGL and interactive canvas animations without killing performance is a critical skill for modern digital agency websites.",
      created_at: new Date().toISOString(),
    },
  ],
  leads: [],
  traffic_logs: [],
});

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Database helper that handles reading and writing
class MockDatabase {
  private getDbFilePath(): string {
    if (!path) return "";
    const dir = path.join(process.cwd(), ".data");
    if (fs && !fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (e) {
        // Fallback or permission check
      }
    }
    return path.join(dir, "db.json");
  }

  read(): SeedData {
    if (typeof window !== "undefined") {
      // Browser environment
      const content = localStorage.getItem(BROWSER_STORAGE_KEY);
      if (!content) {
        const initial = getInitialSeed();
        localStorage.setItem(BROWSER_STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      try {
        return JSON.parse(content);
      } catch (e) {
        return getInitialSeed();
      }
    } else {
      // Node/Server environment
      if (!fs) return getInitialSeed();
      const filePath = this.getDbFilePath();
      if (!fs.existsSync(filePath)) {
        const initial = getInitialSeed();
        try {
          fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), "utf-8");
        } catch (e) {
          // Ignore write failure in read-only environment
        }
        return initial;
      }
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content);
      } catch (e) {
        return getInitialSeed();
      }
    }
  }

  write(data: SeedData) {
    if (typeof window !== "undefined") {
      localStorage.setItem(BROWSER_STORAGE_KEY, JSON.stringify(data));
    } else {
      if (!fs) return;
      const filePath = this.getDbFilePath();
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      } catch (e) {
        console.error("Failed to write to mock database file:", e);
      }
    }
  }

  select(
    table: TableNames,
    filters: Array<(item: any) => boolean>,
    options: {
      orderCol: string | null;
      orderAscending: boolean;
      limitCount: number | null;
      isSingle: boolean;
      isMaybeSingle: boolean;
    }
  ) {
    const db = this.read();
    let records = [...(db[table] || [])];

    // Apply filters
    if (filters.length > 0) {
      records = records.filter((item) => filters.every((filter) => filter(item)));
    }

    // Apply sorting
    if (options.orderCol) {
      const col = options.orderCol;
      const asc = options.orderAscending;
      records.sort((a: any, b: any) => {
        const valA = a[col];
        const valB = b[col];
        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
      });
    }

    // Apply limit
    if (options.limitCount !== null) {
      records = records.slice(0, options.limitCount);
    }

    if (options.isSingle) {
      if (records.length === 0) {
        throw new Error("No rows found matching query");
      }
      return records[0];
    }

    if (options.isMaybeSingle) {
      return records.length === 0 ? null : records[0];
    }

    return records;
  }

  insert(table: TableNames, values: any[]) {
    const db = this.read();
    const newRecords = values.map((val) => ({
      id: generateUUID(),
      created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(), // for traffic logs
      ...val,
    }));

    db[table] = [...(db[table] || []), ...newRecords] as any;
    this.write(db);
    return newRecords;
  }

  update(table: TableNames, filters: Array<(item: any) => boolean>, values: any) {
    const db = this.read();
    const records = db[table] || [];
    const updatedRecords: any[] = [];

    const newRecords = records.map((item: any) => {
      if (filters.every((filter) => filter(item))) {
        const updatedItem = { ...item, ...values };
        updatedRecords.push(updatedItem);
        return updatedItem;
      }
      return item;
    });

    db[table] = newRecords as any;
    this.write(db);
    return updatedRecords;
  }

  delete(table: TableNames, filters: Array<(item: any) => boolean>) {
    const db = this.read();
    const records = db[table] || [];
    
    const keptRecords = records.filter((item: any) => !filters.every((filter) => filter(item)));
    db[table] = keptRecords as any;
    this.write(db);
    return null;
  }
}

const mockDb = new MockDatabase();

class MockResponsePromise<T> {
  private data: T;
  private error: any;

  constructor(data: T, error: any = null) {
    this.data = data;
    this.error = error;
  }

  select() {
    return this;
  }

  async then(onfulfilled?: (value: { data: T; error: any }) => any) {
    const result = { data: this.data, error: this.error };
    if (onfulfilled) return onfulfilled(result);
    return result;
  }
}

class MockQueryBuilder {
  private tableName: TableNames;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private isSingle = false;
  private isMaybeSingle = false;
  private isUpdate = false;
  private isDelete = false;
  private updateValues: any = null;

  constructor(tableName: TableNames) {
    this.tableName = tableName;
  }

  select(columns?: string) {
    return this;
  }

  insert(values: any | any[]) {
    const records = Array.isArray(values) ? values : [values];
    try {
      const data = mockDb.insert(this.tableName, records);
      return new MockResponsePromise(data);
    } catch (e: any) {
      return new MockResponsePromise(null, { message: e.message });
    }
  }

  update(values: any) {
    this.isUpdate = true;
    this.updateValues = values;
    return this;
  }

  delete() {
    this.isDelete = true;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item) => item[column] === value);
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderCol = column;
    this.orderAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  async then(onfulfilled?: (value: { data: any; error: any }) => any) {
    try {
      let data: any;
      if (this.isUpdate) {
        data = mockDb.update(this.tableName, this.filters, this.updateValues);
      } else if (this.isDelete) {
        data = mockDb.delete(this.tableName, this.filters);
      } else {
        data = mockDb.select(this.tableName, this.filters, {
          orderCol: this.orderCol,
          orderAscending: this.orderAscending,
          limitCount: this.limitCount,
          isSingle: this.isSingle,
          isMaybeSingle: this.isMaybeSingle,
        });
      }
      const result = { data, error: null };
      if (onfulfilled) return onfulfilled(result);
      return result;
    } catch (err: any) {
      const result = { data: null, error: { message: err.message } };
      if (onfulfilled) return onfulfilled(result);
      return result;
    }
  }
}

export function createMockClient() {
  return {
    from(table: TableNames) {
      return new MockQueryBuilder(table);
    },
    auth: {
      async signInWithPassword({ email, password }: any) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@agency.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword";

        if (email === adminEmail && password === adminPassword) {
          return {
            data: {
              user: { id: "admin-uuid-1234", email },
              session: {
                access_token: "mock-session-token-xyz-9876",
                user: { id: "admin-uuid-1234", email },
                expires_in: 3600,
              },
            },
            error: null,
          };
        }
        return {
          data: { user: null, session: null },
          error: { message: "Invalid login credentials" },
        };
      },

      async signOut() {
        return { error: null };
      },

      async getSession() {
        if (typeof window === "undefined") {
          // Server-side: read cookies via Next.js 16 cookies() API
          if (nextHeaders && nextHeaders.cookies) {
            try {
              const cookieStore = await nextHeaders.cookies();
              const token = cookieStore.get("admin_session")?.value;
              if (token === "mock-session-token-xyz-9876") {
                return {
                  data: {
                    session: {
                      access_token: token,
                      user: { id: "admin-uuid-1234", email: process.env.ADMIN_EMAIL || "admin@agency.com" },
                    },
                  },
                  error: null,
                };
              }
            } catch (e) {
              // Ignore cookie read failures in server contexts where request is unavailable
            }
          }
        } else {
          // Client-side: read cookies from document.cookie
          const match = document.cookie.match(/(^|;)\s*admin_session\s*=\s*([^;]+)/);
          if (match && match[2] === "mock-session-token-xyz-9876") {
            return {
              data: {
                session: {
                  access_token: match[2],
                  user: { id: "admin-uuid-1234", email: "admin@agency.com" },
                },
              },
              error: null,
            };
          }
        }
        return { data: { session: null }, error: null };
      },

      async getUser() {
        const { data, error } = await this.getSession();
        return { data: { user: data.session?.user ?? null }, error };
      },
    },
  };
}

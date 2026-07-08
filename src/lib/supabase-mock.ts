import { Database } from "./database.types";

// Types helper for mock database schema
type TableNames = keyof Database["public"]["Tables"];
type TableRow<T extends TableNames> = Database["public"]["Tables"][T]["Row"];
type TableInsert<T extends TableNames> = Database["public"]["Tables"][T]["Insert"];
type TableUpdate<T extends TableNames> = Database["public"]["Tables"][T]["Update"];

interface SeedData {
  services: TableRow<"services">[];
  blog_posts: TableRow<"blog_posts">[];
  leads: TableRow<"leads">[];
  traffic_logs: TableRow<"traffic_logs">[];
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
    if (typeof window !== "undefined") return "";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    const dir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch {
        // Fallback or permission check
      }
    }
    return path.join(dir, "db.json");
  }

  read(): SeedData {
    if (typeof window !== "undefined") {
      // Browser environment
      const content = localStorage.getItem("mock_supabase_db");
      if (!content) {
        const initial = getInitialSeed();
        localStorage.setItem("mock_supabase_db", JSON.stringify(initial));
        return initial;
      }
      try {
        return JSON.parse(content);
      } catch {
        return getInitialSeed();
      }
    } else {
      // Node/Server environment
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      const filePath = this.getDbFilePath();
      if (!filePath || !fs.existsSync(filePath)) {
        const initial = getInitialSeed();
        if (filePath) {
          try {
            fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), "utf-8");
          } catch {
            // Ignore write failure
          }
        }
        return initial;
      }
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content);
      } catch {
        return getInitialSeed();
      }
    }
  }

  write(data: SeedData) {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_supabase_db", JSON.stringify(data));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      const filePath = this.getDbFilePath();
      if (!filePath) return;
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      } catch (e) {
        console.error("Failed to write to mock database file:", e);
      }
    }
  }

  select<T extends TableNames>(
    table: T,
    filters: Array<(item: TableRow<T>) => boolean>,
    options: {
      orderCol: string | null;
      orderAscending: boolean;
      limitCount: number | null;
      isSingle: boolean;
      isMaybeSingle: boolean;
    }
  ): TableRow<T>[] | TableRow<T> | null {
    const db = this.read();
    let records = [...(db[table] || [])] as TableRow<T>[];

    // Apply filters
    if (filters.length > 0) {
      records = records.filter((item) => filters.every((filter) => filter(item)));
    }

    // Apply sorting
    if (options.orderCol) {
      const col = options.orderCol as keyof TableRow<T>;
      const asc = options.orderAscending;
      records.sort((a, b) => {
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
      if (records.length > 1) {
        throw new Error("JSON object requested, multiple rows returned");
      }
      return records[0];
    }

    if (options.isMaybeSingle) {
      return records.length === 0 ? null : records[0];
    }

    return records;
  }

  insert<T extends TableNames>(table: T, values: TableInsert<T>[]): TableRow<T>[] {
    const db = this.read();
    const newRecords = values.map((val) => {
      const record: any = {
        id: generateUUID(),
        ...val,
      };
      if (table === "traffic_logs") {
        if (!("timestamp" in record)) {
          record.timestamp = new Date().toISOString();
        }
      } else {
        if (!("created_at" in record)) {
          record.created_at = new Date().toISOString();
        }
      }
      return record;
    }) as unknown as TableRow<T>[];

    db[table] = [...(db[table] || []), ...newRecords] as unknown as SeedData[T];
    this.write(db);
    return newRecords;
  }

  update<T extends TableNames>(
    table: T,
    filters: Array<(item: TableRow<T>) => boolean>,
    values: TableUpdate<T>
  ): TableRow<T>[] {
    const db = this.read();
    const records = (db[table] || []) as TableRow<T>[];
    const updatedRecords: TableRow<T>[] = [];

    const newRecords = records.map((item) => {
      if (filters.every((filter) => filter(item))) {
        const updatedItem = { ...item, ...values } as TableRow<T>;
        updatedRecords.push(updatedItem);
        return updatedItem;
      }
      return item;
    });

    db[table] = newRecords as unknown as SeedData[T];
    this.write(db);
    return updatedRecords;
  }

  delete<T extends TableNames>(table: T, filters: Array<(item: TableRow<T>) => boolean>): TableRow<T>[] {
    const db = this.read();
    const records = (db[table] || []) as TableRow<T>[];
    const deletedRecords = records.filter((item) => filters.every((filter) => filter(item)));
    const keptRecords = records.filter((item) => !filters.every((filter) => filter(item)));
    db[table] = keptRecords as unknown as SeedData[T];
    this.write(db);
    return deletedRecords;
  }
}

const mockDb = new MockDatabase();

class MockResponsePromise<T> {
  private data: T;
  private error: { message: string } | null;
  private hasSelect = false;

  constructor(data: T, error: { message: string } | null = null, hasSelect = false) {
    this.data = data;
    this.error = error;
    this.hasSelect = hasSelect;
  }

  select() {
    this.hasSelect = true;
    return this;
  }

  single() {
    let singleData: any = this.data;
    let err = this.error;
    if (Array.isArray(this.data)) {
      if (this.data.length === 0) {
        err = { message: "No rows found matching query" };
        singleData = null;
      } else if (this.data.length > 1) {
        err = { message: "JSON object requested, multiple rows returned" };
        singleData = null;
      } else {
        singleData = this.data[0];
      }
    }
    return new MockResponsePromise<typeof singleData>(singleData, err, this.hasSelect);
  }

  maybeSingle() {
    const singleData = Array.isArray(this.data) ? (this.data.length === 0 ? null : this.data[0]) : this.data;
    return new MockResponsePromise<typeof singleData>(singleData, this.error, this.hasSelect);
  }

  async then<TResult1 = { data: T | null; error: { message: string } | null }, TResult2 = never>(
    onfulfilled?: ((value: { data: T | null; error: { message: string } | null }) => TResult1 | PromiseLike<TResult1>) | null
  ): Promise<TResult1 | TResult2> {
    const result = { data: this.hasSelect ? this.data : null, error: this.error };
    if (onfulfilled) return Promise.resolve(result).then(onfulfilled);
    return result as unknown as TResult1;
  }
}

class MockQueryBuilder<T extends TableNames> {
  private tableName: T;
  private filters: Array<(item: TableRow<T>) => boolean> = [];
  private orderCol: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private isSingle = false;
  private isMaybeSingle = false;
  private isUpdate = false;
  private isDelete = false;
  private hasSelect = false;
  private updateValues: TableUpdate<T> | null = null;

  constructor(tableName: T) {
    this.tableName = tableName;
  }

  select(columns?: string) {
    if (columns) {
      // no-op to avoid unused var
    }
    this.hasSelect = true;
    return this;
  }

  insert(values: TableInsert<T> | TableInsert<T>[]) {
    const records = Array.isArray(values) ? values : [values];
    try {
      const data = mockDb.insert(this.tableName, records);
      return new MockResponsePromise<TableRow<T>[]>(data, null, this.hasSelect);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      return new MockResponsePromise<TableRow<T>[] | null>(null, { message: errMsg }, this.hasSelect) as unknown as MockResponsePromise<TableRow<T>[]>;
    }
  }

  update(values: TableUpdate<T>) {
    this.isUpdate = true;
    this.updateValues = values;
    return this;
  }

  delete() {
    this.isDelete = true;
    return this;
  }

  eq(column: keyof TableRow<T> & string, value: unknown) {
    this.filters.push((item) => item[column] === value);
    return this;
  }

  order(column: keyof TableRow<T> & string, options?: { ascending?: boolean }) {
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

  async then<TResult1 = { data: TableRow<T>[] | TableRow<T> | null; error: { message: string } | null }, TResult2 = never>(
    onfulfilled?: ((value: { data: TableRow<T>[] | TableRow<T> | null; error: { message: string } | null }) => TResult1 | PromiseLike<TResult1>) | null
  ): Promise<TResult1 | TResult2> {
    try {
      let data: TableRow<T>[] | TableRow<T> | null;
      if (this.isUpdate) {
        if (this.updateValues) {
          data = mockDb.update(this.tableName, this.filters, this.updateValues);
        } else {
          data = [];
        }
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

      if ((this.isUpdate || this.isDelete) && !this.hasSelect) {
        data = null;
      } else if ((this.isUpdate || this.isDelete) && this.hasSelect) {
        if (this.isSingle) {
          if (!data || (Array.isArray(data) && data.length === 0)) {
            throw new Error("No rows found matching query");
          }
          if (Array.isArray(data) && data.length > 1) {
            throw new Error("JSON object requested, multiple rows returned");
          }
          data = Array.isArray(data) ? data[0] : data;
        } else if (this.isMaybeSingle) {
          if (!data || (Array.isArray(data) && data.length === 0)) {
            data = null;
          } else {
            data = Array.isArray(data) ? data[0] : data;
          }
        }
      }

      const result = { data, error: null };
      if (onfulfilled) return Promise.resolve(result).then(onfulfilled);
      return result as unknown as TResult1;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const result = { data: null, error: { message: errMsg } };
      if (onfulfilled) return Promise.resolve(result).then(onfulfilled);
      return result as unknown as TResult1;
    }
  }
}

export function createMockClient() {
  return {
    from<T extends TableNames>(table: T) {
      return new MockQueryBuilder<T>(table);
    },
    auth: {
      async signInWithPassword({ email, password }: Record<string, string>) {
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
          try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
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
          } catch {
            // Ignore cookie read failures in server contexts where request is unavailable
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

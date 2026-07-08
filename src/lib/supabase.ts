import { createClient as createRealClient } from "@supabase/supabase-js";
import { createMockClient } from "./supabase-mock";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isDemo =
  process.env.NEXT_PUBLIC_INTEGRITY_MODE === "demo" ||
  !supabaseUrl ||
  !supabaseAnonKey ||
  process.env.NODE_ENV === "test";

// Export a single supabase client instance
// If in demo mode or test mode, use the mock client adapter
// Else, initialize the standard @supabase/supabase-js client
export const supabase = isDemo
  ? (createMockClient() as unknown as ReturnType<typeof createRealClient<Database>>)
  : createRealClient<Database>(supabaseUrl!, supabaseAnonKey!);

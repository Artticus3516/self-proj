"use server";
import { supabaseAdmin } from "@/lib/supabase";

export async function getTrafficLogsAction() {
  const { data } = await supabaseAdmin
    .from("traffic_logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(200);
  return data;
}

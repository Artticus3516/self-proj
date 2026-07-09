"use server";
import { supabase } from "@/lib/supabase";

export async function getLeadsAction() {
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  return data;
}

"use server";
import {supabaseAdmin} from "@/lib/supabase";

export async function getLeadsAction() {
    const {data} = await supabaseAdmin
        .from("leads")
        .select("*")
        .order("created_at", {ascending: false})
        .limit(500);
    return data;
}

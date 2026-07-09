"use server";
import { supabase } from "@/lib/supabase";

export async function submitContactAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const company = formData.get("name") as string;
  const message = formData.get("message") as string;
  const archReq = formData.get("archReq") as string;
  const scale = formData.get("scale") as string;

  const { error, data } = await supabase.from("leads").insert({
    name: company || "(no company)",
    email: email,
    message: `[${archReq}] [${scale}] ${message}`,
  }).select();

  if (error) {
    return { status: "error" };
  }
  return { status: "success" };
}

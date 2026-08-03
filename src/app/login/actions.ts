'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";


export async function login(clientData: FormData) {
    const supabase = await createClient()
    const data = {
        email: clientData.get("email") as string,
        password: clientData.get("password") as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        return{error: error.message}
    }
    revalidatePath("/","layout")
}
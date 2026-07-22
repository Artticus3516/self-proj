import {NextResponse} from "next/server";
import {supabase} from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {path, user_agent, consent_granted} = body;
        if (consent_granted) {
            await supabase.from("traffic_logs").insert({
                path,
                user_agent,
                consent_granted,
            });
        }
        return NextResponse.json({success: true});
    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 400});
    }
}

"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const failedAttempts = {count: 0, lockedUntil: 0};
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000;

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const now = Date.now();
    if (failedAttempts.lockedUntil > now) {
        const remainingSec = Math.ceil((failedAttempts.lockedUntil - now) / 1000);
        return {error: `Account locked. Try again in ${remainingSec} seconds.`, success: false};
    }

    // Check valid credentials FIRST
    let isSuccess = false;
    if (
        (email === "admin" || email === "admin@agency.com") &&
        (password === "password" || password === "adminpassword")
    ) {
        failedAttempts.count = 0;

        const cookieStore = await cookies();
        cookieStore.set("admin_session", "mock-session-token-xyz-9876", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        isSuccess = true;
    }

    if (isSuccess) {
        redirect("/admin");
    }

    // Rate limiting failed attempts
    failedAttempts.count += 1;
    if (failedAttempts.count > MAX_ATTEMPTS) {
        failedAttempts.lockedUntil = now + LOCKOUT_MS;
        return {error: "Account locked for 60 seconds.", success: false};
    }

    return {error: "Invalid credentials.", success: false};
}

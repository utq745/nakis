const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

export async function verifyTurnstile(token: string): Promise<boolean> {
    if (!TURNSTILE_SECRET_KEY) {
        console.warn("TURNSTILE_SECRET_KEY not set, skipping verification");
        return true; // Allow in development
    }

    try {
        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
            }),
        });

        const data = await res.json();
        return data.success === true;
    } catch (error) {
        console.error("Turnstile verification error:", error);
        return false;
    }
}

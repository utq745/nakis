const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

export async function verifyTurnstile(token: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development' || !TURNSTILE_SECRET_KEY) {
        console.warn("Skipping Turnstile verification in development or if secret key is missing");
        return true; 
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

import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { success: false, error: "Turnstile token gerekli" },
                { status: 400 }
            );
        }

        const isValid = await verifyTurnstile(token);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: "Bot doğrulaması başarısız" },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Turnstile verify error:", error);
        return NextResponse.json(
            { success: false, error: "Doğrulama hatası" },
            { status: 500 }
        );
    }
}

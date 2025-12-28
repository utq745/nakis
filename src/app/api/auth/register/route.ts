import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { registerRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";
import { translations, Locale } from "@/lib/dictionary";

const registerSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    name: z.string().min(2, "İsim en az 2 karakter olmalı"),
    language: z.enum(["en", "tr"]).optional(),
});

export async function POST(request: Request) {
    let selectedLanguage: Locale = "en";

    try {
        // Rate limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(registerRateLimiter, clientIP);

        const body = await request.json();
        selectedLanguage = body.language || "en";
        const t = translations[selectedLanguage];

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: t.auth.errors.tooManyAttempts },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) }
                }
            );
        }

        const validatedData = registerSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: t.auth.errors.alreadyRegistered },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(validatedData.password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
                role: "CUSTOMER",
                emailVerified: new Date(), // Auto-verify for now
                language: selectedLanguage,
            },
        });

        return NextResponse.json(
            {
                message: selectedLanguage === "tr" ? "Kayıt başarılı" : "Registration successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        const t = translations[selectedLanguage];

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        // Detailed error logging for VPS troubleshooting
        console.error("Registration error FULL DETAILS:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined,
            raw: error
        });

        return NextResponse.json(
            { error: t.auth.errors.registrationError },
            { status: 500 }
        );
    }
}

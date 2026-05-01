import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { registerRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";
import { translations, Locale } from "@/lib/dictionary";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
    let selectedLanguage: Locale = "en";

    try {
        const body = await request.json();
        selectedLanguage = body.language || "en";
        const t = translations[selectedLanguage];

        const registerSchema = z.object({
            email: z.string().email(t.auth.validation.emailInvalid),
            password: z
                .string()
                .min(8, t.auth.validation.passwordMin)
                .regex(/[^A-Za-z0-9]/, t.auth.validation.passwordSpecial),
            name: z.string().min(2, t.auth.validation.nameMin),
            language: z.enum(["en", "tr"]).optional(),
            timezone: z.string().optional(),
            turnstileToken: z.string().min(1, t.auth.validation.botCheck),
        });

        // Rate limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(registerRateLimiter, clientIP);

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

        // Verify Turnstile token
        const isTurnstileValid = await verifyTurnstile(validatedData.turnstileToken);
        if (!isTurnstileValid) {
            return NextResponse.json(
                { error: t.auth.validation.botFailed },
                { status: 400 }
            );
        }

        const timezone = validatedData.timezone || "Europe/Istanbul";
        let validTimezone = "Europe/Istanbul";
        try {
            Intl.DateTimeFormat("en-US", { timeZone: timezone });
            validTimezone = timezone;
        } catch {
            validTimezone = "Europe/Istanbul";
        }

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

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Create user
        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
                role: "CUSTOMER",
                emailVerified: null, // Require verification
                language: selectedLanguage,
                timezone: validTimezone,
                emailVerificationToken: verificationToken,
                emailVerificationTokenExpires: verificationTokenExpires,
            },
        });

        // Send verification email & Notify Admins
        import("@/lib/mail").then(async ({ sendVerificationEmail, sendNewUserAdminNotification }) => {
            // 1. Notify User (Verification)
            sendVerificationEmail(user.email!, user.name || "User", verificationToken, selectedLanguage).catch((err) =>
                console.error("Verification email failed:", err)
            );

            // 2. Notify Admins (always in Turkish)
            try {
                const admins = await prisma.user.findMany({
                    where: { role: "ADMIN" },
                    select: { email: true }
                });

                for (const admin of admins) {
                    if (admin.email) {
                        await sendNewUserAdminNotification(
                            admin.email,
                            user.name || "User",
                            user.email!,
                        ).catch((err) => console.error(`Failed to notify admin ${admin.email}:`, err));
                    }
                }
            } catch (adminErr) {
                console.error("Failed to fetch admins for registration notification:", adminErr);
            }
        });

        return NextResponse.json(
            {
                message: t.auth.messages.registrationSuccess,
                requiresVerification: true,
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

        if (process.env.NODE_ENV === "production") {
            console.error("Registration error:", error instanceof Error ? error.message : "Unknown error");
        } else {
            console.error("Registration error FULL DETAILS:", {
                message: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined,
                raw: error,
            });
        }

        return NextResponse.json(
            { error: t.auth.errors.registrationError },
            { status: 500 }
        );
    }
}

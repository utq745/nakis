import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { registerRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";

const registerSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    name: z.string().min(2, "İsim en az 2 karakter olmalı"),
});

export async function POST(request: Request) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(registerRateLimiter, clientIP);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many registration attempts. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) }
                }
            );
        }

        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Bu e-posta adresi zaten kayıtlı" },
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
            },
        });

        return NextResponse.json(
            {
                message: "Kayıt başarılı",
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
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Kayıt sırasında bir hata oluştu" },
            { status: 500 }
        );
    }
}

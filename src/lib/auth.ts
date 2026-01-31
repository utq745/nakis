import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import type { Role } from "@/types";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            role: Role;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        image?: string | null;
        role: Role;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        id: string;
        role: Role;
        image?: string | null;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as any,
    trustHost: process.env.AUTH_TRUST_HOST === 'true',
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user || user.password === null) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role as Role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "CUSTOMER";
                token.image = user.image;
            }
            if (trigger === "update" && session) {
                if (session.role) token.role = session.role;
                if (session.image !== undefined) token.image = session.image;
                if (session.name !== undefined) token.name = session.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as Role;
                session.user.image = token.image as string | null;
            }
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            // New OAuth users: sync profile data and set CUSTOMER role
            if (user.id) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        role: "CUSTOMER",
                        // Sync name and email from OAuth profile
                        ...(user.name && { name: user.name }),
                        ...(user.email && { email: user.email }),
                        ...(user.image && { image: user.image }),
                    }
                });
            }
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
});

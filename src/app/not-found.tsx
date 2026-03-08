"use client";

import { LanguageProvider } from "@/components/providers/language-provider";
import { Providers } from "@/components/providers";
import { geistSans, geistMono, inter } from "./fonts";
import { NotFoundContent } from "@/components/not-found-content";

export default function NotFound() {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans`}>
                <Providers>
                    <LanguageProvider initialLang="en">
                        <NotFoundContent />
                    </LanguageProvider>
                </Providers>
            </body>
        </html>
    );
}

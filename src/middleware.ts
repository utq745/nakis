import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'tr'];
const defaultLocale = 'en';

// Get locale from pathname
function getLocale(pathname: string): string | undefined {
    // Check for /tr prefix
    if (pathname.startsWith('/tr/') || pathname === '/tr') {
        return 'tr';
    }
    // Everything else is English (default)
    return 'en';
}

// Allowed origins for CSRF protection
const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'http://localhost:3000',
];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    // Add security headers to all responses
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // CSRF protection for API routes (POST, PUT, PATCH, DELETE)
    if (pathname.startsWith('/api/')) {
        const method = request.method;

        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            const origin = request.headers.get('origin');
            const referer = request.headers.get('referer');

            // Check origin or referer for state-changing requests
            if (origin) {
                const isAllowed = allowedOrigins.some(allowed =>
                    origin === allowed || origin.startsWith(allowed)
                );
                if (!isAllowed) {
                    return NextResponse.json(
                        { error: 'Forbidden - Invalid origin' },
                        { status: 403 }
                    );
                }
            } else if (referer) {
                const isAllowed = allowedOrigins.some(allowed =>
                    referer.startsWith(allowed)
                );
                if (!isAllowed) {
                    return NextResponse.json(
                        { error: 'Forbidden - Invalid referer' },
                        { status: 403 }
                    );
                }
            }
            // If no origin/referer, allow (could be server-to-server or same-origin fetch)
        }

        return response;
    }

    // Skip static files
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return response;
    }

    // If path starts with /tr, let it through
    if (pathname.startsWith('/tr')) {
        return response;
    }

    // For all other paths, they're English (no redirect needed)
    return response;
}

export const config = {
    matcher: [
        // Match all paths except static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};

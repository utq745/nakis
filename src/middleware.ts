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
    // HSTS - Strict Transport Security (1 year, include subdomains)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // HTTPS Enforcement in production
    const isProduction = process.env.NODE_ENV === 'production';
    const proto = request.headers.get('x-forwarded-proto');
    if (isProduction && proto === 'http') {
        const httpsUrl = request.url.replace('http://', 'https://');
        return NextResponse.redirect(httpsUrl, 301);
    }

    // CSRF protection for API routes (POST, PUT, PATCH, DELETE)
    if (pathname.startsWith('/api/')) {
        // Skip manual CSRF check for Auth.js routes as it has its own CSRF protection
        if (pathname.startsWith('/api/auth/')) {
            return response;
        }

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
            } else {
                // If no origin OR referer, reject for security (prevent CSRF bypass)
                return NextResponse.json(
                    { error: 'Forbidden - Missing Origin or Referer' },
                    { status: 403 }
                );
            }

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

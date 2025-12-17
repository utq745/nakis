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

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip API routes, static files, etc.
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return;
    }

    // If path starts with /tr, let it through
    if (pathname.startsWith('/tr')) {
        return;
    }

    // For all other paths, they're English (no redirect needed)
    // Just let them through
    return;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, etc.)
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};

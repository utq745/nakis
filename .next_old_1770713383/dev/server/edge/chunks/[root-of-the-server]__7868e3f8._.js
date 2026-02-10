(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__7868e3f8._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Documents/nakis/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const locales = [
    'en',
    'tr'
];
const defaultLocale = 'en';
// Get locale from pathname
function getLocale(pathname) {
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
    'http://localhost:3000'
];
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Add security headers to all responses
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // HSTS - Strict Transport Security (1 year, include subdomains)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    // HTTPS enforcement is handled by Cloudflare proxy
    /*
    const isProduction = process.env.NODE_ENV === 'production';
    const proto = request.headers.get('x-forwarded-proto');
    if (isProduction && proto === 'http') {
        const httpsUrl = request.url.replace('http://', 'https://');
        return NextResponse.redirect(httpsUrl, 301);
    }
    */ // CSRF protection for API routes (POST, PUT, PATCH, DELETE)
    if (pathname.startsWith('/api/')) {
        // Skip manual CSRF check for Auth.js routes as it has its own CSRF protection
        if (pathname.startsWith('/api/auth/')) {
            return response;
        }
        const method = request.method;
        if ([
            'POST',
            'PUT',
            'PATCH',
            'DELETE'
        ].includes(method)) {
            const origin = request.headers.get('origin');
            const referer = request.headers.get('referer');
            // Check origin or referer for state-changing requests
            if (origin) {
                const isAllowed = allowedOrigins.some((allowed)=>origin === allowed || origin.startsWith(allowed));
                if (!isAllowed) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Forbidden - Invalid origin'
                    }, {
                        status: 403
                    });
                }
            } else if (referer) {
                const isAllowed = allowedOrigins.some((allowed)=>referer.startsWith(allowed));
                if (!isAllowed) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Forbidden - Invalid referer'
                    }, {
                        status: 403
                    });
                }
            } else {
                // If no origin OR referer, reject for security (prevent CSRF bypass)
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Forbidden - Missing Origin or Referer'
                }, {
                    status: 403
                });
            }
        }
        return response;
    }
    // Skip static files
    if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico') || pathname.includes('.')) {
        return response;
    }
    // If path starts with /tr, let it through
    if (pathname.startsWith('/tr')) {
        return response;
    }
    // For all other paths, they're English (no redirect needed)
    return response;
}
const config = {
    matcher: [
        // Match all paths except static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__7868e3f8._.js.map
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limiters for different endpoints
// Login: 5 attempts per 15 minutes per IP
export const loginRateLimiter = new RateLimiterMemory({
    points: 5, // 5 attempts
    duration: 60 * 15, // per 15 minutes
    blockDuration: 60 * 15, // Block for 15 minutes
});

// Register: Relaxed for testing (100 attempts per hour per IP)
export const registerRateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 60 * 60, // per hour
    blockDuration: 60 * 60,
});

// Password Reset: 3 attempts per hour per IP
export const passwordResetRateLimiter = new RateLimiterMemory({
    points: 3,
    duration: 60 * 60,
    blockDuration: 60 * 60,
});

// API General: 100 requests per minute per IP
export const apiRateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 60,
    blockDuration: 60,
});

// File Upload: 20 uploads per hour per user
export const uploadRateLimiter = new RateLimiterMemory({
    points: 20,
    duration: 60 * 60,
    blockDuration: 60 * 30,
});

// Helper function to get client IP
export function getClientIP(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }
    const realIP = request.headers.get("x-real-ip");
    if (realIP) {
        return realIP;
    }
    return "unknown";
}

// Check rate limit and return error response if exceeded
export async function checkRateLimit(
    limiter: RateLimiterMemory,
    key: string
): Promise<{ success: boolean; retryAfter?: number }> {
    try {
        await limiter.consume(key);
        return { success: true };
    } catch (rejRes: unknown) {
        const result = rejRes as { msBeforeNext?: number };
        return {
            success: false,
            retryAfter: Math.ceil((result.msBeforeNext || 60000) / 1000),
        };
    }
}

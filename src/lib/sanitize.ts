// Input sanitization utilities

/**
 * Sanitize a string to prevent XSS attacks
 * Removes or escapes potentially dangerous HTML/script content
 */
export function sanitizeString(input: string): string {
    if (!input || typeof input !== "string") return "";

    return input
        // Remove null bytes
        .replace(/\0/g, "")
        // Escape HTML entities
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        // Remove javascript: and data: protocols
        .replace(/javascript:/gi, "")
        .replace(/data:/gi, "")
        // Remove on* event handlers
        .replace(/on\w+\s*=/gi, "");
}

/**
 * Sanitize HTML content (more permissive, allows some HTML)
 * Use this for rich text content that needs to preserve some formatting
 */
export function sanitizeHTML(input: string): string {
    if (!input || typeof input !== "string") return "";

    return input
        // Remove null bytes
        .replace(/\0/g, "")
        // Remove script tags and their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        // Remove style tags and their content
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        // Remove on* event handlers
        .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\bon\w+\s*=\s*[^\s>]+/gi, "")
        // Remove javascript: and data: protocols
        .replace(/javascript:/gi, "")
        .replace(/data:/gi, "")
        // Remove iframe, object, embed, form tags
        .replace(/<(iframe|object|embed|form)[^>]*>.*?<\/\1>/gi, "")
        .replace(/<(iframe|object|embed|form)[^>]*\/?>/gi, "");
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
    if (!email || typeof email !== "string") return "";

    // Basic email sanitization - lowercase and trim
    return email.toLowerCase().trim().slice(0, 254);
}

/**
 * Sanitize filename to prevent path traversal attacks
 */
export function sanitizeFileName(filename: string): string {
    if (!filename || typeof filename !== "string") return "file";

    return filename
        // Remove path traversal attempts
        .replace(/\.\./g, "")
        .replace(/\//g, "")
        .replace(/\\/g, "")
        // Remove null bytes
        .replace(/\0/g, "")
        // Keep only safe characters
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        // Limit length
        .slice(0, 255);
}

/**
 * Sanitize a generic object by sanitizing all string values
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized = { ...obj };

    for (const key in sanitized) {
        const value = sanitized[key];
        if (typeof value === "string") {
            (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
        } else if (value && typeof value === "object" && !Array.isArray(value)) {
            (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
        }
    }

    return sanitized;
}

/**
 * Validate and sanitize a numeric ID
 */
export function sanitizeId(id: string): string | null {
    if (!id || typeof id !== "string") return null;

    // CUID format validation (Prisma default)
    const cuidRegex = /^c[a-z0-9]{24,}$/i;
    if (cuidRegex.test(id)) {
        return id;
    }

    // UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) {
        return id;
    }

    return null;
}

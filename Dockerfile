# Base stage for dependencies
FROM node:20-slim AS base

# Install system dependencies needed for both build and runtime
RUN apt-get update && apt-get install -y \
    openssl \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxkbcommon0 \
    libxshmfence1 \
    python3 \
    python3-pip \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies globally
RUN pip3 install --no-cache-dir pymupdf pillow --break-system-packages

# --- Dependencies Stage ---
FROM base AS deps
WORKDIR /app

# Copy lockfiles and install dependencies
COPY package*.json ./
# Use npm ci for faster, more reliable installs in CI/Docker
RUN npm ci

# --- Builder Stage ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy prisma folder and generate client FIRST for better caching
COPY prisma ./prisma/
RUN npx prisma generate
# Now copy the rest of the files
COPY . .

# Build Next.js
# Note: Ensure next.config.ts has output: 'standalone' for best results
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# --- Runner Stage ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
# Copy node_modules FIRST (before standalone overwrites it)
COPY --from=builder /app/node_modules ./node_modules/
# We use standalone mode to only include what's needed for runtime
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy prisma folder for migrations and scripts for admin tools
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/
COPY --from=builder /app/scripts ./scripts/

# Install bcryptjs for password scripts (standalone doesn't include it)
RUN npm install --omit=dev bcryptjs@3.0.3

# Ensure the uploads directory exists and has correct permissions
RUN mkdir -p uploads && chown nextjs:nodejs uploads

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start server using the standalone server.js
CMD ["node", "server.js"]

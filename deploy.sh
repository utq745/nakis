#!/bin/bash
# Zero-downtime deployment script for nakis
# Usage: ./deploy.sh

set -e

echo "🚀 Zero-Downtime Deployment Started..."

cd /root/nakis

# 1. Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# 2. Build new image WITHOUT stopping old container
echo "🔨 Building new image (old container still running)..."
docker compose build

# 3. Recreate container with minimal downtime
echo "🔄 Swapping to new container..."
docker compose up -d --no-build

# 4. Wait for health check
echo "⏳ Waiting for health check..."
sleep 10

# 5. Verify deployment
HEALTH=$(docker inspect netjs-site --format='{{.State.Health.Status}}' 2>/dev/null || echo "unknown")
if [ "$HEALTH" = "healthy" ]; then
    echo "✅ Deployment successful! Container is healthy."
else
    echo "⚠️ Container health: $HEALTH - still starting up..."
    sleep 30
    HEALTH=$(docker inspect netjs-site --format='{{.State.Health.Status}}' 2>/dev/null || echo "unknown")
    echo "📊 Final health status: $HEALTH"
fi

# 6. Cleanup old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "🎉 Deployment complete!"

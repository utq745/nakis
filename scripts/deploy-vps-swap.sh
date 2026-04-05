#!/bin/bash

# Configuration
PROJECT_DIR="/root/nakis"
NGINX_CONF="${PROJECT_DIR}/nginx.conf"
CONTAINER_PROXY="nakis-proxy"

echo "=== Starting Blue/Green Swap Deployment ==="
cd $PROJECT_DIR

# 1. Pull latest code
git pull origin main

# 2. Determine currently active slot from nginx.conf
if grep -q "http://blue:3000" "$NGINX_CONF"; then
    CURRENT="blue"
    NEXT="green"
    NEXT_CONTAINER="nakis-green"
else
    CURRENT="green"
    NEXT="blue"
    NEXT_CONTAINER="nakis-blue"
fi

echo "Current active slot: $CURRENT"
echo "Deploying to slot: $NEXT"

# 3. Build and Start the NEXT slot
docker compose build $NEXT
docker compose up -d $NEXT

# 4. Wait for NEXT slot to be healthy
echo "Waiting for $NEXT_CONTAINER to become healthy..."
MAX_RETRIES=30
RETRY_COUNT=0
HEALTHY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$NEXT_CONTAINER" 2>/dev/null)
    if [ "$STATUS" == "healthy" ]; then
        HEALTHY=true
        break
    fi
    echo -n "."
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

echo ""

if [ "$HEALTHY" == "true" ]; then
    echo "$NEXT is healthy! Swapping traffic..."
    
    # 5. Swap nginx config
    if [ "$NEXT" == "blue" ]; then
        sed -i 's/http:\/\/green:3000/http:\/\/blue:3000/g' "$NGINX_CONF"
    else
        sed -i 's/http:\/\/blue:3000/http:\/\/green:3000/g' "$NGINX_CONF"
    fi
    
    # Reload Nginx
    docker exec $CONTAINER_PROXY nginx -s reload
    
    echo "=== Swap Complete! Traffic is now on $NEXT ==="
    
    # Optional: Stop old container after some time
    echo "Stopping old container $CURRENT..."
    docker compose stop $CURRENT
else
    echo "ERROR: $NEXT failed to become healthy. Aborting swap."
    docker compose stop $NEXT
    exit 1
fi

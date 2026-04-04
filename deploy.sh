#!/bin/bash
set -e

IMAGE=$1
PREV_TAG=$2
CONTAINER_NAME="be-book-finder"
PORT=4000
ENV_FILE="/opt/be-book-finder/.env"

echo ">>> Pulling image: $IMAGE"
docker pull "$IMAGE"

echo ">>> Stopping old container..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo ">>> Starting new container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "$PORT:4000" \
  --env-file "$ENV_FILE" \
  "$IMAGE"

echo ">>> Waiting for health check..."
sleep 5

if ! docker ps | grep -q "$CONTAINER_NAME"; then
  echo "!!! Container failed to start. Rolling back to $PREV_TAG..."
  docker stop "$CONTAINER_NAME" 2>/dev/null || true
  docker rm "$CONTAINER_NAME" 2>/dev/null || true
  docker run -d \
    --name "$CONTAINER_NAME" \
    --restart unless-stopped \
    -p "$PORT:4000" \
    --env-file "$ENV_FILE" \
    "$PREV_TAG"
  echo "<<< Rollback complete."
  exit 1
fi

echo ">>> Cleaning up old images..."
docker image prune -f

echo "<<< Deploy complete!"

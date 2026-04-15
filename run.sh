#!/bin/bash

echo "======================================================="
echo "   Starting Ensolvers Full Stack Notes App...          "
echo "======================================================="

# Exit immediately if a command exits with a non-zero status
set -e

# Get the directory where the script is located (works on Mac and Linux)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# ==========================================
# 1. Backend Setup
# ==========================================
printf "\n[1/4] Setting up Backend...\n"
cd "$SCRIPT_DIR/backend"

# Install dependencies
npm install

# Copy .env if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating backend .env file from .env.example..."
  cp .env.example .env
fi

# Run Prisma schema push (Creates SQLite DB if not exists)
echo "Generating Prisma client and syncing database schema..."
npx prisma generate
npx prisma db push

# ==========================================
# 2. Frontend Setup
# ==========================================
printf "\n[2/4] Setting up Frontend...\n"
cd "$SCRIPT_DIR/frontend"

# Install dependencies
npm install

# Copy .env if it doesn't exist
if [ ! -f .env ] && [ -f .env.example ]; then
  echo "Creating frontend .env file from .env.example..."
  cp .env.example .env
fi

# ==========================================
# 3. Running Applications
# ==========================================
printf "\n[3/4] Starting the applications...\n"

# Trap CTRL+C to kill background processes gracefully
cleanup() {
  echo ""
  echo "Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM

cd "$SCRIPT_DIR/backend"
echo "Starting Backend on http://localhost:3001..."
npm run start &
BACKEND_PID=$!

cd "$SCRIPT_DIR/frontend"
echo "Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

printf "\n[4/4] Validation...\n"
echo "App is successfully running!"
echo "  Frontend should be accessible at: http://localhost:5173"
echo "  Backend API is listening at: http://localhost:3001"
echo "Press Ctrl+C to stop both servers."

# Wait for background processes to keep script running
wait $BACKEND_PID $FRONTEND_PID

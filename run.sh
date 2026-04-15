#!/bin/bash

echo "======================================================="
echo "   Starting Ensolvers Full Stack Notes App...          "
echo "======================================================="

# Exit immediately if a command exits with a non-zero status
set -e

# ==========================================
# 1. Backend Setup
# ==========================================
echo -e "\n[1/4] Setting up Backend..."
cd backend

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

cd ..

# ==========================================
# 2. Frontend Setup
# ==========================================
echo -e "\n[2/4] Setting up Frontend..."
cd frontend

# Install dependencies
npm install

# Copy .env if it doesn't exist
if [ ! -f .env ] && [ -f .env.example ]; then
  echo "Creating frontend .env file from .env.example..."
  cp .env.example .env
fi

cd ..

# ==========================================
# 3. Running Applications
# ==========================================
echo -e "\n[3/4] Starting the applications..."

# Trap CTRL+C to kill background processes gracefully
trap 'echo -e "\nStopping servers..."; kill $BACKEND_PID $FRONTEND_PID; exit' SIGINT SIGTERM

cd backend
echo "Starting Backend on http://localhost:3001..."
npm run start &
BACKEND_PID=$!
cd ..

cd frontend
echo "Starting Frontend..."
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "\n[4/4] Validation..."
echo "✅ App is successfully running!"
echo "➡️  Frontend should be accessible at: http://localhost:5173"
echo "➡️  Backend API is listening at: http://localhost:3001"
echo "Press Ctrl+C to stop both servers."

# Wait for background processes to keep script running
wait $BACKEND_PID $FRONTEND_PID

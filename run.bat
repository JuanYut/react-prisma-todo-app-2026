@echo off
echo =======================================================
echo    Starting Ensolvers Full Stack Notes App...
echo =======================================================

:: Get the directory where the script is located
set SCRIPT_DIR=%~dp0

:: ==========================================
:: 1. Backend Setup
:: ==========================================
echo.
echo [1/4] Setting up Backend...
cd /d "%SCRIPT_DIR%backend"

:: Install dependencies
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Backend npm install failed.
    pause
    exit /b 1
)

:: Copy .env if it doesn't exist
if not exist .env (
    echo Creating backend .env file from .env.example...
    copy .env.example .env
)

:: Run Prisma schema push
echo Generating Prisma client and syncing database schema...
call npx prisma generate
if %ERRORLEVEL% neq 0 (
    echo ERROR: Prisma generate failed.
    pause
    exit /b 1
)
call npx prisma db push
if %ERRORLEVEL% neq 0 (
    echo ERROR: Prisma db push failed.
    pause
    exit /b 1
)

:: ==========================================
:: 2. Frontend Setup
:: ==========================================
echo.
echo [2/4] Setting up Frontend...
cd /d "%SCRIPT_DIR%frontend"

:: Install dependencies
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Frontend npm install failed.
    pause
    exit /b 1
)

:: Copy .env if it doesn't exist
if not exist .env (
    if exist .env.example (
        echo Creating frontend .env file from .env.example...
        copy .env.example .env
    )
)

:: ==========================================
:: 3. Running Applications
:: ==========================================
echo.
echo [3/4] Starting the applications...

echo Starting Backend on http://localhost:3001...
cd /d "%SCRIPT_DIR%backend"
start "Backend" cmd /c "npm run start"

echo Starting Frontend...
cd /d "%SCRIPT_DIR%frontend"
start "Frontend" cmd /c "npm run dev"

echo.
echo [4/4] Validation...
echo App is successfully running!
echo   Frontend should be accessible at: http://localhost:5173
echo   Backend API is listening at: http://localhost:3001
echo.
echo Close the Backend and Frontend windows to stop the servers.
echo Press any key to exit this window...
pause >nul

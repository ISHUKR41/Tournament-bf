@echo off
echo ========================================
echo   Tournament Registration Website
echo   Quick Start Script
echo ========================================
echo.

cd /d "%~dp0"

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo.
echo Starting development server...
echo.
echo Your website will be available at:
echo http://localhost:3000
echo.
echo Home Page:     http://localhost:3000
echo PUBG Page:     http://localhost:3000/pubg
echo Free Fire:     http://localhost:3000/freefire
echo Admin Panel:   http://localhost:3000/admin
echo.
echo Admin Login: admin / admin123
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev

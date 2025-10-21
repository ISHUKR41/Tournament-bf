@echo off
echo ========================================
echo   TOURNAMENT PLATFORM - VERCEL DEPLOY
echo ========================================
echo.

echo [1/5] Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Vercel CLI not found!
    echo.
    echo Please install it first:
    echo   npm install -g vercel
    echo.
    pause
    exit /b 1
)
echo [OK] Vercel CLI found!
echo.

echo [2/5] Running lint check...
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Lint failed! Fix errors first.
    pause
    exit /b 1
)
echo [OK] Lint passed!
echo.

echo [3/5] Building production version...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Check errors above.
    pause
    exit /b 1
)
echo [OK] Build successful!
echo.

echo [4/5] Deploying to Vercel...
echo.
echo Choose deployment type:
echo   1. Production deploy (recommended)
echo   2. Preview deploy (testing)
echo.
set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo Deploying to PRODUCTION...
    vercel --prod
) else if "%choice%"=="2" (
    echo.
    echo Deploying to PREVIEW...
    vercel
) else (
    echo Invalid choice!
    pause
    exit /b 1
)

echo.
echo [5/5] Deployment complete!
echo.
echo ========================================
echo   DEPLOYMENT SUCCESSFUL! 
echo ========================================
echo.
echo Your tournament platform is now LIVE!
echo.
echo Next steps:
echo   1. Test the live URL provided above
echo   2. Login to admin panel
echo   3. Test PUBG registration
echo   4. Test Free Fire registration
echo   5. Share with players!
echo.
pause

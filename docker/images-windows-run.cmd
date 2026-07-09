@echo off
setlocal

cd /d "%~dp0.."

net session >nul 2>&1
if not "%errorlevel%"=="0" (
  echo Solicitando permissao de Administrador para acessar o Docker Desktop...
  powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

:menu
echo.
echo ========================================
echo  SURB/SUTB Imagens Docker - Windows
echo ========================================
echo  1. Ver configuracao atual
echo  2. Build desenvolvimento completo (plataforma unica)
echo  3. Build producao completa (multiplataforma)
echo  4. Criar imagem frontend
echo  5. Criar imagem backend
echo  6. Criar imagem auth
echo  7. Criar imagens APIs backend + auth
echo  8. Exportar frontend .tar.gz
echo  9. Exportar APIs .tar.gz
echo  A. Exportar APIs + Postgres + Redis .tar.gz
echo  B. Exportar todas as imagens proprias .tar.gz
echo  C. Exportar somente Postgres + Redis .tar.gz
echo  D. Gerar frontend VPS ARM64 surb/frontend:production
echo  E. Carregar imagens de .tar.gz
echo  F. Listar imagens locais
echo  G. Escolher formato de imagem
echo  0. Sair
echo.
choice /C 123456789ABCDEFG0 /N /M "Escolha uma opcao: "
set "MENU_OPTION=%errorlevel%"

if "%MENU_OPTION%"=="1" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" info
  pause
  goto menu
)

if "%MENU_OPTION%"=="2" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" build
  pause
  goto menu
)

if "%MENU_OPTION%"=="3" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" multi-oci-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="4" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" build-frontend
  pause
  goto menu
)

if "%MENU_OPTION%"=="5" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" build-backend
  pause
  goto menu
)

if "%MENU_OPTION%"=="6" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" build-auth
  pause
  goto menu
)

if "%MENU_OPTION%"=="7" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" build-api
  pause
  goto menu
)

if "%MENU_OPTION%"=="8" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" tar-frontend-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="9" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" tar-api-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="10" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" tar-api-deps-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="11" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" tar-all-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="12" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" tar-runtime-deps-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="13" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-frontend-arm64-tar
  pause
  goto menu
)

if "%MENU_OPTION%"=="14" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" load-gzip
  pause
  goto menu
)

if "%MENU_OPTION%"=="15" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" list
  pause
  goto menu
)

if "%MENU_OPTION%"=="16" (
  goto format_menu
)

echo Saindo.
exit /b 0

:format_menu
echo.
echo ========================================
echo  SURB/SUTB - Formato ARM64 para VPS
echo ========================================
echo  1. Gerar frontend .tar ARM64
echo     Gera: surb/frontend:production
echo.
echo  2. Gerar backend .tar ARM64
echo     Gera: surb/backend:production
echo.
echo  3. Gerar auth .tar ARM64
echo     Gera: surb/auth:production
echo.
echo  4. Converter frontend .tar em .tar.gz
echo     Usa: surb-frontend-production-arm64.tar
echo.
echo  5. Converter backend .tar em .tar.gz
echo     Usa: surb-backend-production-arm64.tar
echo.
echo  6. Converter auth .tar em .tar.gz
echo     Usa: surb-auth-production-arm64.tar
echo.
echo  7. Voltar
echo.
choice /C 1234567 /N /M "Escolha o formato: "
set "FORMAT_OPTION=%errorlevel%"

if "%FORMAT_OPTION%"=="1" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-frontend-arm64-tar
  pause
  goto format_menu
)

if "%FORMAT_OPTION%"=="2" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-backend-arm64-tar
  pause
  goto format_menu
)

if "%FORMAT_OPTION%"=="3" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-auth-arm64-tar
  pause
  goto format_menu
)

if "%FORMAT_OPTION%"=="4" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-frontend-arm64-gzip
  pause
  goto format_menu
)

if "%FORMAT_OPTION%"=="5" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-backend-arm64-gzip
  pause
  goto format_menu
)

if "%FORMAT_OPTION%"=="6" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0images-windows.ps1" vps-auth-arm64-gzip
  pause
  goto format_menu
)

goto menu

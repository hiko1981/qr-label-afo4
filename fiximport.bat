@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo --------------------------------------------
echo FIXER: Import-stier fra "@/lib/" til "../../lib/"
echo --------------------------------------------

REM Gennemgår alle .ts og .tsx filer i hele projektet
for /r %%f in (*.ts *.tsx) do (
  echo Retter: %%f
  powershell -Command "(Get-Content \"%%f\" -Raw) `
    -replace 'from \"@/lib/', 'from \"../../lib/' `
    -replace \"from '@/lib/\", \"from '../../lib/\" `
    | Set-Content \"%%f\""
)

echo --------------------------------------------
echo ✅ Alle '@/lib/' import-stier er nu opdateret.
echo Du kan nu køre: npm run build
echo --------------------------------------------

pause

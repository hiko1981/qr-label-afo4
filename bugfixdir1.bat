@echo off
echo Retter alle '@/lib/...' imports til '../../lib/...'

for /r %%f in (*.ts *.tsx) do (
  powershell -Command "(Get-Content \"%%f\") -replace 'from \"@/lib/', 'from \"../../lib/' | Set-Content \"%%f\""
  powershell -Command "(Get-Content \"%%f\") -replace \"from '@/lib/\", \"from '../../lib/\" | Set-Content \"%%f\""
)

echo Færdig. Du kan nu køre: npm run build
pause

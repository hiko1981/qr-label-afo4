@echo off
echo Rydder cache og moduler...

rd /s /q ".next"
rd /s /q "node_modules"
del package-lock.json

echo Installerer afhængigheder på ny...
call npm install

echo Retter importstier i filer...
powershell -Command "(Get-ChildItem -Recurse -Include *.ts,*.tsx) | ForEach-Object { (Get-Content $_.FullName) -replace '@\/lib\/', '../../lib/' | Set-Content $_.FullName }"

echo Kontrollerer TypeScript-fejl...
call npx tsc --noEmit

echo Starter nyt build...
call npm run build

echo === FÆRDIG ===
pause

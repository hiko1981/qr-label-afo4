@echo off
echo [QR LABEL INSTALLATION STARTER...]

:: Skift til projektmappe
cd /d %~dp0

:: Installér nødvendige pakker og typer
echo [Installerer afhængigheder...]
call npm install

echo [Tilføjer manglende devDependencies for Vercel:]
call npm install --save-dev @types/node

:: Fjern evt. fejlagtige @-aliaser ved at bruge relative imports i koden (hvis relevant)

:: Start dev-server lokalt
echo [Starter lokal udviklingsserver...]
call npm run dev

:: Klar
echo.
echo ✅ Færdig. Hvis du vil bygge til produktion, brug: npm run build
pause

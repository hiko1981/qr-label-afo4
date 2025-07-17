@echo off
echo Retter imports i kun relevante mapper...

for %%d in (pages components lib styles) do (
  if exist "%%d" (
    for /r %%d %%f in (*.ts *.tsx) do (
      powershell -Command "(Get-Content \"%%f\") -replace '@/lib/', '../../lib/' -replace '@/components/', '../../components/' -replace '@/styles/', '../../styles/' | Set-Content \"%%f\""
    )
  )
)

echo Færdig! Kun relevante mapper er rettet.
pause

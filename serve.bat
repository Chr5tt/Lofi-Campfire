@echo off
cd /d "%~dp0"
echo Buka http://localhost:8000
python -m http.server 8000

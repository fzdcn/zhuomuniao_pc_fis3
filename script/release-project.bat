@echo off
cd ../
if exist %cd%\dist rd /s /q %cd%\dist
call fis3 release production -d  %cd%\dist
pause

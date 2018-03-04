@echo off
cd ../
set DIR_FIS=%cd%

cd ../zhuomuniao/frontend/web
set DIR_PHP=%cd%

rd /s /q components
rd /s /q static
rd /s /q wx
del /q *.*

cd %DIR_FIS%
call fis3 release production -d %DIR_PHP%

cd %DIR_PHP%
git add .

pause

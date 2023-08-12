@echo off
REM npm install 실행
echo Running "npm install"...
call npm install 

REM npm run build 실행
echo Running "npm run build"...
call npm run build

REM _deploy 폴더 삭제
if exist _deploy rmdir /s /q _deploy
echo Deleted _deploy folder...

REM deploy 폴더 이름을 _deploy로 변경
if exist deploy rename deploy _deploy
echo Renamed deploy to _deploy...

REM build 폴더 이름을 deploy로 변경
if exist build rename build deploy
echo Renamed build to deploy...

git add _deploy
git add deploy

git commit -m "auto deploy"

git push

echo Done!
pause
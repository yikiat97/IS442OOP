@echo off;

cd frontend
call npm i
start npm start

cd backend
cd project
call mvnw clean package
cd bin
start java -jar finalisedProject.jar
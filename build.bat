@echo off;

cd frontend
call npm --force i
start npm start

cd backend
cd project
call mvnw clean package
cd bin
start java -jar finalisedProject.jar
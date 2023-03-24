@echo off;

cd frontend
call npm i
start npm start

cd ../backend
cd project
call mvnw clean install
cd bin
start java -jar project-0.0.1-SNAPSHOT.jar
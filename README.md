# IS442OOP G1T7

Batch Script to run both Frontend and Backend in one command:
1. Set JAVA_HOME environment variable if not set, recommended to set to java version 17. Example: C:\Program Files\Java\jdk-17.0.5
2. Install node.js if not yet installed
3. Run this code in cmd from base directory: build.bat
4. Wait till scripts are done running, 2 additional command prompts will be open: 1. to run the frontend server, 2. to run the backend server

Frontend:
1. npm install -> npm start
2. npm install @mui/material @emotion/react @emotion/styled
3. npm install @mui/x-date-pickers
4. npm install @mui/icons-material

Backend:
1. Install spring boot extension from Visual Studio
2. run and initalise spring boot
3. port 8080 test connection: http://localhost:8080/hello
4. created 2 folder model (classes) and controller (path connection)


Database:
1. Install MongoDB extension
2. connect with strings
3. paste this in the command Palette" mongodb+srv://IS442OOP:IS442OOP@cluster0.nnayelz.mongodb.net/test "
4. https://www.mongodb.com/docs/mongodb-vscode/playgrounds/ Documentation here
5. if wan to use own local mongoBD, change to link In resource folder, application.properties "mongodb+srv://<name>:<password><cluster>.mongodb.net/test "
6. to test insert database function. enter link http://localhost:8080/hello

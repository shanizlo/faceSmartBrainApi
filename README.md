This is the backend part of the project.

The project quick video demo is here: https://www.youtube.com/watch?v=n8vUdQlrNrI

The project frontend part is here: https://github.com/shanizlo/faceSmartBrain

Frontend made with:
* React
* Clarifai API for face recognition
* Particles package for background animation

Backend made with:
* Nodejs
* express, cors for apis and endpoints
* bcrypt for password hashing
* postgresql for database
* knex for db queries

In order to have the backend of this project running, you need to have PostgreSQL installed.
Steps involved are as follows:
1. Clone this repository
2. Run npm install
3. Now download & install PostgreSQL  (for example with brew)
4. First create a DB using the command createdb smart-brain;.
5. You will have to create two tables one for user & the other is login.
- CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
- CREATE TABLE login (id serial PRIMARY KEY, hash VARCHAR(100) NOT NULL, email text UNIQUE NOT NULL);
6. Run npm start.
This also assumes that your frontend, i.e., faceSmartBrain is running simultaneously.

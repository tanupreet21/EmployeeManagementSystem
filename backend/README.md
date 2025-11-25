# COMP3123 Assignment 1 - Backend 

## Overview
RESTful API using Node.js, Express, and MongoDB for managing users and employees.

- User signup/login with **bcrypt** and **JWT** authentication
- Employee CRUD operations
- Input validation with **express-validator**
- Protected routes with JWT middleware

## Tech Stack
- Node.js, Express.js
- MongoDB & Mongoose
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- express-validator (input validation)

## Setup

### 1. Clone repository

***git clone <your-repo-url>***
***cd <repo-folder>***

### 2. Install dependencies
***npm install***

### 3. Create .env in project root
***PORT=3000***
***DB_URL=<your-mongodb-connection-string>***
***JWT_SECRET=<your-jwt-secret-key>***

### 4. run the project
***npm run dev***

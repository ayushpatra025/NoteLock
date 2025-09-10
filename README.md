NoteLock - Secure Notes & Password Manager
NoteLock is a full-stack web application designed to provide users with a secure and private space to store their personal notes and manage passwords. With a clean and intuitive interface, users can easily register, log in, and manage their sensitive information with confidence.

(Note: You should replace this link with a direct link to a screenshot of your project. You can upload one of your screenshots to GitHub or a service like Imgur to get a link.)

Table of Contents
Features

Tech Stack

Getting Started

Prerequisites

Installation & Setup

Usage

API Endpoints

Features
Secure User Authentication: Safe and secure user registration and login system.

JWT-Based Authentication: Uses JSON Web Tokens (JWT) for stateless and secure session management.

Password Hashing: Employs bcrypt to hash and salt user passwords, ensuring they are never stored in plain text.

Note Management: Users can create, view, and delete their personal notes.

Password Manager: Securely store and manage passwords for various accounts with custom labels.

Responsive Design: A clean and simple user interface that works on various screen sizes.

Tech Stack
Frontend
HTML5

CSS3

JavaScript (Vanilla JS) - For handling client-side logic and DOM manipulation.

Backend
Node.js: JavaScript runtime for the server.

Express.js: Web application framework for building the RESTful API.

MongoDB: NoSQL database for storing user data, notes, and passwords.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

JSON Web Token (JWT): For secure user authentication.

Bcrypt.js: For hashing passwords.

Dotenv: For managing environment variables.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (which includes npm)

MongoDB (or a MongoDB Atlas account)

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/ayushpatra025/NoteLock.git
cd NoteLock
Install server dependencies:

Bash

npm install
Set up environment variables:
Create a file named .env in the root of the project and add the following variables. Replace the placeholder values with your own.

Code snippet

PORT=3000
MONGODB_URI=mongodb://localhost:27017/notelockdb
JWT_SECRET=your_super_secret_key_here
PORT: The port on which the server will run.

MONGODB_URI: Your MongoDB connection string.

JWT_SECRET: A secret key for signing JWTs.

Usage
Start the server:

Bash

node server.js
Or if you have a start script in your package.json:
<img width="1919" height="1094" alt="Screenshot 2025-09-10 154858" src="https://github.com/user-attachments/assets/bc5968f2-0ddf-469b-b570-e31cc4c0bbee" />

Bash

npm start
Open your browser:
Navigate to http://localhost:3000 (or the port you specified in your .env file).

API Endpoints
The application uses the following API endpoints to manage data:

Method	Endpoint	Description
POST	/register	Register a new user.
POST	/login	Log in a user and return a JWT.
POST	/api/notes	Create a new note.
GET	/api/notes	Fetch all notes for the logged-in user.
DELETE	/api/notes/:id	Delete a specific note.
POST	/api/passwords	Save a new password.<img width="1912" height="1093" alt="Screenshot 2025-09-10 155108" src="https://github.com/user-attachments/assets/7dcd66e9-c05b-4ed1-bc95-3e8b8c02acac" />
<img width="1919" height="1094" alt="Screenshot 2025-09-10 154858" src="https://github.com/user-attachments/assets/9f5bc77c-bd07-44ca-a7d0-19c1f88e2572" />
<img width="1919" height="1094" alt="Screenshot 2025-09-10 154858" src="https://github.com/user-attachments/assets/d130a7ba-32f9-40cd-8c16-28825a9a097f" />

GET	/api/passwords	Fetch all passwords for the user.
DELETE	/api/passwords/:id	Delete a specific password.

Export to Sheets
(Note: The API routes starting with /api/ are protected and require a valid JWT in the Authorization header.)

# NoteLock - Secure Notes & Password Manager

NoteLock is a full-stack web application designed to provide users with a secure and private space to store their personal notes and manage passwords. With a clean and intuitive interface, users can easily register, log in, and manage their sensitive information with confidence.

![NoteLock Screenshot](https://i.imgur.com/7bE9x0j.png)
*(**Note:** To make this image work, replace the link above with a direct link to a screenshot of your project. You can upload one of your screenshots to your GitHub repository and use that link.)*

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Secure User Authentication:** Safe and secure user registration and login system.
- **JWT-Based Authentication:** Uses JSON Web Tokens (JWT) for stateless and secure session management.
- **Password Hashing:** Employs `bcrypt` to hash and salt user passwords, ensuring they are never stored in plain text.
- **Note Management:** Users can create, view, and delete their personal notes.
- **Password Manager:** Securely store and manage passwords for various accounts with custom labels.
- **Responsive Design:** A clean and simple user interface that works on various screen sizes.

## Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)** - For handling client-side logic and DOM manipulation.

### Backend
- **Node.js:** JavaScript runtime for the server.
- **Express.js:** Web application framework for building the RESTful API.
- **MongoDB:** NoSQL database for storing user data, notes, and passwords.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Token (JWT):** For secure user authentication.
- **Bcrypt.js:** For hashing passwords.
- **Dotenv:** For managing environment variables.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ayushpatra025/NoteLock.git](https://github.com/ayushpatra025/NoteLock.git)
    cd NoteLock
    ```

2.  **Install server dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add the following variables. Replace the placeholder values with your own.

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/notelockdb
    JWT_SECRET=your_super_secret_key_here
    ```
    - `PORT`: The port on which the server will run.
    - `MONGODB_URI`: Your MongoDB connection string.
    - `JWT_SECRET`: A secret key for signing JWTs.

## Usage

1.  **Start the server:**
    ```bash
    node server.js
    ```
    Or if you have a `start` script in your `package.json`:
    ```bash
    npm start
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:3000` (or the port you specified in your `.env` file).

## API Endpoints

The application uses the following API endpoints to manage data:

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| `POST` | `/register`            | Register a new user.                |
| `POST` | `/login`               | Log in a user and return a JWT.     |
| `POST` | `/api/notes`           | Create a new note.                  |
| `GET`  | `/api/notes`           | Fetch all notes for the logged-in user. |
| `DELETE` | `/api/notes/:id`     | Delete a specific note.             |
| `POST` | `/api/passwords`       | Save a new password.                |
| `GET`  | `/api/passwords`       | Fetch all passwords for the user.   |
| `DELETE` | `/api/passwords/:id` | Delete a specific password.         |

*(Note: The API routes starting with `/api/` are protected and require a valid JWT in the Authorization header.)*<img width="1912" height="1093" alt="Screenshot 2025-09-10 155108" src="https://github.com/user-attachments/assets/3973d6ae-7283-456a-94cc-f0b067250dc5" />
<img width="1919" height="1094" alt="Screenshot 2025-09-10 154858" src="https://github.com/user-attachments/assets/8bfbc773-c7a3-4679-a0a0-1a64a04b37a6" />

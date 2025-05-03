Task Management Application
A simple task management application built with Node.js, Express.js, MongoDB, and React. This application allows users to manage tasks, authenticate, and track their progress in an intuitive and user-friendly dashboard.

Features
User Authentication: Register, Login, and Protected Routes.

Task Management: Add, Edit, Delete, and View Tasks.

Real-time Updates: Get updates on task status and details.

Dashboard: Overview of all tasks and task details.

Validation: Input validation for task and user data.

Tech Stack
Backend
Node.js: JavaScript runtime for the server.

Express.js: Web framework for routing and handling API requests.

MongoDB: NoSQL database to store task and user data.

JWT: JSON Web Tokens for authentication.

Frontend
React.js: JavaScript library for building user interfaces.

TypeScript: Type-safe JavaScript for the frontend.

Vite: Fast build tool for React applications.

Installation
Backend Setup
Clone the repository:

bash
Copy
Edit
git clone <repo-url>
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend folder and add the necessary environment variables:

env
Copy
Edit
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>
Run the server:

bash
Copy
Edit
npm start
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Open the application in your browser at http://localhost:3000.

Usage
User Registration and Login: Users can register and log in via the authentication pages.

Dashboard: After logging in, users can view all tasks, add new ones, and manage existing tasks.

Task Management: Tasks can be added, updated, and deleted.

StudyFlow - Student Task Manager

A simple task management web app made for students to manage their daily tasks.

About

StudyFlow helps students keep track of their tasks in one place. Users can add tasks, mark them as completed, undo completed tasks, and delete tasks.

I built this project to practise React, backend development, APIs, and database operations.

Features

- Add new tasks
- Mark tasks as completed
- Undo completed tasks
- Delete tasks
- View total, pending, and completed tasks
- Save tasks using SQLite
- Simple and responsive UI

Tech Stack

- React
- Vite
- JavaScript
- CSS
- Node.js
- Express.js
- SQLite
- Git and GitHub
- Vercel (Frontend)
- Render (Backend)

Live Demo

"StudyFlow" (https://student-task-manager-gray.vercel.app)

API Endpoints

Method| Endpoint| Purpose
GET| "/api/tasks"| Get all tasks
POST| "/api/tasks"| Add a task
PUT| "/api/tasks/:id"| Update task status
DELETE| "/api/tasks/:id"| Delete a task

Run Locally

Frontend

npm install
npm run dev

Backend

cd backend
npm install
node server.js

Make sure the frontend API URL points to the correct backend.

Author

Divyanshu Kumar
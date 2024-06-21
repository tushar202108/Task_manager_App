# Task Management Application

This is a Task Management Application built with HTML, CSS, JavaScript for the front-end and Express.js for the back-end. It provides basic CRUD functionalities for managing tasks through a simple user interface.

## Features

- View a list of tasks with options to add, view details, edit, and delete tasks.
- Responsive design ensures usability across desktop and mobile devices.
- RESTful API backend supports CRUD operations for tasks.

## Technologies Used

- **Front-end**:
  - HTML5
  - CSS3 (with Flexbox for layout)
  - Vanilla JavaScript

- **Back-end**:
  - Node.js
  - Express.js
  - No database (uses an in-memory array for storing tasks)

## Installation

1. Clone the repository:
  git clone <repository_url>
  cd task-management-app
2. Install dependencies: npm install
3. Start server : node Server.js
4. Open HTML file then click on "Go live" to use the Task Management Application.

## API Endpoints

- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.
- `GET /tasks/:id`: Retrieve a single task by ID.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task by ID.

## Folder Structure

task-management-app/
├── public/ # Static files (HTML, CSS, client-side JavaScript)
├── routes/ # Express.js route handlers
│ └── tasks.js
├── views/ # HTML views (if using server-side rendering)
│ ├── index.html
│ ├── task.html
│ └── ...
├── app.js # Express application setup
├── package.json
└── README.md

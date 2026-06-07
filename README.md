# Task Manager

Task Management Web Application built with the MERN stack featuring JWT authentication, task CRUD operations, status tracking, search, filtering, and secure user management.

## Features

- **Authentication** — Register, login, and JWT-protected profile
- **Task management** — Create, update, delete, and toggle task status
- **Organization** — Priority levels (Low, Medium, High), due dates, and descriptions
- **Search & filters** — Find tasks by keyword, status, or priority
- **User-scoped tasks** — Each user sees only their own tasks

## Tech Stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React 19, React Router, Vite          |
| Backend  | Node.js, Express, MongoDB, Mongoose   |
| Auth     | JWT, bcryptjs                         |

## Project Structure

```
TODO/
├── Backend/
│   ├── auth/          # Auth routes, controller, middleware, services
│   ├── Task/          # Task module
│   ├── User/          # User module
│   ├── config/        # Database connection
│   ├── server.js      # Express entry point
│   └── .env           # Environment variables (not committed)
│
└── Fronted/
    ├── src/
    │   ├── api/       # API client (auth, tasks)
    │   ├── components/
    │   ├── context/   # Auth state
    │   └── pages/     # Login, Register, Dashboard
    └── vite.config.js
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nitish-Maddy/Task-Manager.git
cd Task-Manager
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_change_in_production
```

Start the API server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend runs at **http://localhost:5000**.

### 3. Frontend setup

Open a new terminal:

```bash
cd Fronted
npm install
npm run dev
```

The frontend runs at **http://localhost:5173** and proxies API requests to the backend.

### 4. Use the app

1. Open http://localhost:5173
2. Register a new account or sign in
3. Create and manage tasks from the dashboard

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint           | Auth | Description        |
| ------ | ------------------ | ---- | ------------------ |
| POST   | `/auth/register`   | No   | Register a user    |
| POST   | `/auth/login`      | No   | Login and get JWT  |
| GET    | `/auth/profile`    | Yes  | Get current user   |

### Tasks

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/tasks`                    | Create a task            |
| GET    | `/tasks`                    | Get all tasks            |
| GET    | `/tasks/:id`                | Get task by ID           |
| GET    | `/tasks/user/:userId`       | Get tasks for a user     |
| PUT    | `/tasks/:id`                | Update a task            |
| PATCH  | `/tasks/:id/status`         | Toggle Pending/Completed |
| DELETE | `/tasks/:id`                | Delete a task            |
| GET    | `/tasks/search?keyword=&userId=` | Search tasks        |
| GET    | `/tasks/status/:status?userId=`  | Filter by status    |
| GET    | `/tasks/priority/:priority?userId=` | Filter by priority |

Protected routes require a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

### Users

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | `/users`      | Create user   |
| GET    | `/users`      | List users    |
| GET    | `/users/:id`  | Get user      |
| PUT    | `/users/:id`  | Update user   |
| DELETE | `/users/:id`  | Delete user   |

## Task Model

| Field         | Type     | Notes                              |
| ------------- | -------- | ---------------------------------- |
| `title`       | String   | Required, 3–100 characters         |
| `description` | String   | Optional, max 500 characters       |
| `status`      | String   | `Pending` or `Completed`           |
| `priority`    | String   | `Low`, `Medium`, or `High`         |
| `dueDate`     | Date     | Optional                           |
| `userId`      | ObjectId | Owner of the task                  |

## Scripts

### Backend

| Command       | Description              |
| ------------- | ------------------------ |
| `npm start`   | Start production server  |
| `npm run dev` | Start with nodemon       |

### Frontend

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run preview` | Preview production build |

## Environment Variables

| Variable     | Description                    | Example                              |
| ------------ | ------------------------------ | ------------------------------------ |
| `PORT`       | Backend server port            | `5000`                               |
| `MONGO_URI`  | MongoDB connection string      | `mongodb://localhost:27017/task-manager` |
| `JWT_SECRET` | Secret for signing JWT tokens  | Use a strong random string in production |

> **Note:** Do not commit `.env` files or real secrets to GitHub.

## License

MIT

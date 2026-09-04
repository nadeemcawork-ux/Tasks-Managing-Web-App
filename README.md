# Task Manager App (MERN)

A full-stack task manager built with MongoDB, Express, React, and Node.js. Users register, log in, and manage their own private tasks — create, edit, delete, mark complete, filter by status, search by title, and track overall progress.

## Features

- **Authentication** — JWT-based signup/login with bcrypt password hashing
- **Task CRUD** — create, edit, delete tasks (title, description, status, priority, due date)
- **Task ownership** — each task is scoped to the logged-in user
- **Filter** — All / Pending / Completed
- **Search** — search tasks by title
- **Pagination** — server-side, 10 tasks per page
- **Completed percentage progress bar**
- **Priority levels** — low / medium / high
- **Due dates**
- **Dark / light mode toggle**

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Auth/Security:** JWT, bcrypt, dotenv

## Project Structure

```
.
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/          # axios instance
    │   ├── components/   # reusable UI
    │   ├── context/      # Auth & Theme context
    │   ├── pages/         # Login, Register, Dashboard
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev
```

Backend runs at `http://localhost:4000`.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Fill in `.env`:

```
VITE_API_URL=http://localhost:4000/api
```

Run it:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint    | Description         |
|--------|-------------|----------------------|
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Log in, returns JWT  |

### Tasks (`/api/tasks`) — all require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get tasks — supports `?status=all\|pending\|completed`, `?search=`, `?page=`, `?limit=` |
| POST   | `/`      | Create a task |
| PUT    | `/:id`   | Update a task |
| DELETE | `/:id`   | Delete a task |

## Deployment

- **Backend:** Render
- **Frontend:** Vercel

See deployment steps below. Once deployed, update:
- Backend `CLIENT_URL` env var → your Vercel URL (for CORS)
- Frontend `VITE_API_URL` env var → your Render URL + `/api`

## Demo Links

- Frontend: _add after deploying_
- Backend: _add after deploying_


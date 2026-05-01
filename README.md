# Task Manager

Complete project using **React Vite, Tailwind CSS, Express.js, MongoDB, JWT Authentication, Role-Based Access Control, Task CRUD APIs, and Postman collection**.

---

# Deployment Links

Deployed on Render:

```bash
https://task-manger-frontend-ek4u.onrender.com


## Project Structure

```bash
primetrade-complete-esm/
├── backend/
├── frontend/
├── postman_collection.json
├── SCALABILITY.md
└── README.md
```

## Features

### Backend

- User registration and login
- Password hashing using bcryptjs
- JWT authentication
- Role-based access: user and admin
- Task CRUD APIs
- Admin routes for users and dashboard stats
- API versioning: `/api/v1`
- Validation using express-validator
- Error handling middleware
- Security middleware: helmet, cors, mongo sanitize, rate limiting
- MongoDB schema using Mongoose
- Modern ES module syntax: `import/export`
- Postman collection included, no Swagger

### Frontend

- React + Vite
- Tailwind CSS
- Login/Register pages
- Protected dashboard
- Task create/read/update/delete UI
- Admin dashboard UI
- Success/error messages from API responses

---

# How to Run

## 1. Backend Setup

Open terminal:

```bash
cd backend
npm install
```

Create `.env` file inside `backend` by copying `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/primetrade_assignment
JWT_SECRET=replace_with_a_long_secure_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Backend URL:

```bash
http://localhost:5000
```

Health check:

```bash
http://localhost:5000/api/v1/health
```

---

## 2. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env` file inside `frontend` by copying `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

# Dependencies

## Backend

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan express-validator express-mongo-sanitize express-rate-limit
npm install -D nodemon
```

## Frontend

```bash
npm install
```

Main frontend packages:

```bash
npm install react react-dom react-router-dom axios lucide-react
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

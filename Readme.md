# 🚀 Team Task Manager (Full-Stack)

A full-stack web application to manage projects, assign tasks, and track progress with role-based access control (Admin / Member).

---

## 🌐 Live Demo

- 🔗 Frontend: https://your-vercel-link.vercel.app
- 🔗 Backend API: https://team-task-manager-production-85c7.up.railway.app

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Secure password hashing (bcrypt)

### 👥 Role-Based Access Control (RBAC)
- Admin:
  - Create projects & tasks
  - Assign tasks
  - Update task status
- Member:
  - View assigned tasks
  - Track progress

### 📂 Project & Task Management
- Create and manage projects
- Assign tasks to users
- Update task status (Pending / In Progress / Completed)

### 📊 Dashboard
- View all tasks
- Track status distribution
- Simple and clean UI

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Deployment
- Backend: Railway
- Frontend: Vercel

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/nishanttcse/team-task-manager.git
cd team-task-manager
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run backend:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔗 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
Projects
GET /api/projects
POST /api/projects (Admin only)
Tasks
GET /api/tasks
POST /api/tasks (Admin only)
PUT /api/tasks/:id (Admin only)
🔐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret for JWT tokens
🚀 Deployment
Backend (Railway)
Connected GitHub repo
Added environment variables
Auto-deployed on push
Frontend (Vercel)
Root directory: frontend
Connected to backend API




📦 Submission Includes
✅ Live URL
✅ GitHub Repository
✅ README
✅ Demo Video
👨‍💻 Author

Nishant Srivastava

⭐ Future Improvements
Team collaboration system
Notifications
Advanced analytics dashboard
Drag-and-drop task board
📌 Conclusion

This project demonstrates a full-stack application with authentication, role-based authorization, and scalable architecture suitable for real-world task management systems.


---

# 🔥 What you should do now

1. Create file:
```bash
README.md


team-task-manager-sand.vercel.app
nishanttcse
Push:
git add README.md
git commit -m "added professional README"
git push

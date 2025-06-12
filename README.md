# 💼 Job Platform - Real-time Interview Request System

A modern job platform with real-time interview request features for both applicants and recruiters. Built with **React, Vite, Node.js, Express, MongoDB**, and **Socket.IO**.

---

## 🚀 Features

### Applicant Features
- Submit interview requests with live feedback
- Choose from job titles or enter custom ones
- Form validation with error messages
- Responsive and mobile-friendly UI

### Recruiter Features
- Real-time dashboard updates (no refresh needed)
- Accept interview requests in one click
- Visual connection status indicators

### Technical Highlights
- WebSocket-powered updates using **Socket.IO**
- RESTful API built with **Express.js**
- Database with **MongoDB + Mongoose**
- Clean and professional UI using plain CSS
- Responsive breakpoints and animations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **React Router DOM**
- **Socket.IO Client**
- **Plain CSS**
- **Fetch API**
- **Lucide React** (optional icons)

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Socket.IO Server**
- **CORS & Dotenv**

---

## 📁 Project Structure

### Frontend (`job-platform-frontend`)
```
src/
├── components/
├── pages/
├── services/
├── App.jsx
├── App.css
└── main.jsx
```

### Backend (`job-platform-backend`)
```
.
├── controllers/
├── models/
├── routes/
├── server.js
└── .env
```

---

## ⚙️ Setup Instructions

### 🔹 Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### 🔹 Frontend Setup

```bash
git clone <frontend-repo-url>
cd job-platform-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

### 🔹 Backend Setup

```bash
git clone <backend-repo-url>
cd job-platform-backend
npm install
cp .env.example .env
# Edit .env with Mongo URI and Frontend URL
npm run dev
```

Backend runs at: `http://localhost:5000`

---

## 🔌 API & Socket.IO Integration

### REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/interview-requests` | Fetch all requests (supports ?status=pending) |
| `POST` | `/api/interview-requests` | Submit new interview request |
| `PUT` | `/api/interview-requests/:id/accept` | Accept an interview request |
| `GET` | `/api/health` | Health check |

### Data Schema

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "jobTitle": "string",
  "status": "pending | accepted",
  "createdAt": "date"
}
```

### Socket.IO Events

| Event | Description |
|-------|-------------|
| `newInterviewRequest` | Emitted on new submission |
| `requestAccepted` | Emitted when accepted |
| `connect` / `disconnect` | Socket connection status |

---

## 🌐 Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Backend (`.env`)
```env
MONGODB_URI=mongodb://localhost:27017/job-platform
PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 Testing & Deployment

### Scripts

Frontend:
```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview build
```

Backend:
```bash
npm run dev       # Development server with nodemon
npm start         # Production server
```

### Deployment Options

#### Frontend
- **Vercel**: `vercel`
- **Netlify**: Drag and drop `dist`

#### Backend
- **Render / Railway / Heroku**
- Use MongoDB Atlas for cloud DB

---

## 🧰 Troubleshooting

- **CORS or 404 Errors**: Check backend URL & CORS config
- **Socket.IO Not Working**: Ensure server emits correct events
- **Build Errors**: Clear cache and reinstall

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature-name`
3. Commit & push: `git commit -m "Add feature"`
4. Open a Pull Request

---

## 📄 License

MIT License. See `LICENSE` file.

---

**Built with ❤️ using React, Vite, Express, MongoDB & Socket.IO**
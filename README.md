# 🚀 Codingo Forge — Frontend

Frontend application for **Codingo Forge**, an MVP studio platform that converts startup ideas into structured projects with AI-powered intake, payment flow, and public tracking.

---

## 🧠 Overview

This frontend enables:

* AI-based startup idea submission
* Structured inquiry confirmation flow
* Admin dashboard for managing inquiries & projects
* Public ticket tracker for founders

Built for **speed, clarity, and scalability**.

---

## ⚙️ Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **API Client:** Axios
* **Routing:** React Router

---

## 📁 Project Structure

```
src/
├── api/            # API calls (axios instance + modules)
├── components/     # Reusable UI + feature components
├── hooks/          # Custom hooks (auth, data fetching)
├── pages/          # Public + Admin pages
├── store/          # Zustand state stores
├── utils/          # Helpers (formatting, constants)
├── App.jsx         # Routes & guards
└── main.jsx
```

---

## 🔐 Authentication (Current Status)

* Firebase Authentication integrated (Login / Signup)
* Session handled via Firebase SDK
* UI for authentication flows implemented

> ⚠️ Note: Will be migrated to JWT-based auth (httpOnly cookies) in backend integration phase

---

## 🌐 Features Implemented

### 1. Home Page

* Landing UI for Codingo Forge
* Entry point for users

### 2. Authentication UI

* Login / Signup interface
* Firebase auth integration

---

## 🧩 Planned Features (Next Phase)

* AI Prompt Box (Gemini integration)
* Inquiry confirmation modal
* Admin dashboard (inquiries & projects)
* Public ticket tracker
* Protected routes (RBAC-based)

---

## 🔌 API Integration

Base URL configured via environment:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Axios instance uses:

* `withCredentials: true`
* Centralized error handling (planned)

---

## 📦 Setup & Installation

```bash
# Clone repo
git clone <repo-url>

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 🌱 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Codingo Forge
```

---

## 📱 Responsiveness

Designed for:

* Mobile (375px)
* Tablet (768px)
* Desktop (1280px)

---

## 🧪 Development Status

* ✅ Initial UI setup complete
* ✅ Firebase auth integrated
* 🚧 Backend API integration pending
* 🚧 Admin dashboard pending
* 🚧 AI intake flow pending

---

## 🎯 Next Steps

* Integrate backend APIs (Node + Express)
* Replace Firebase auth with JWT system
* Build AI intake flow (Gemini)
* Implement admin panel
* Add ticket tracking UI

---

## 👨‍💻 Author

**Dhawal**
Backend Developer Intern — Codingo Forge

---

## ⚠️ Note

This is an internal project under active development.
Not intended for public distribution.


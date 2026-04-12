# 🚀 Codingo Forge Platform Website

A full fledged web application for **Codingo Forge**, a platform that transforms startup ideas into structured projects with AI-powered intake, role-based dashboards, and real-time tracking.

---

## 🧠 Overview

This frontend is designed to:

* Capture startup ideas using AI-assisted input
* Provide a structured submission flow
* Enable clients to track their projects
* Allow admins and employees to manage the full lifecycle

The system is built with a focus on **clarity, scalability, and real-world usability**.

---

## ⚙️ Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Routing:** React Router
* **Auth:** Clerk (planned)

---

## 🔐 Authentication

Authentication will be handled using **Clerk**, enabling:

* Email/password login
* Social logins (Google, etc.)
* Secure session handling

### Role-based behavior:

* **Admin** → Redirected to Admin Dashboard

* **Client** → Redirected to Client Dashboard

* **Employee** → Access to both dashboards

* If employee is removed:

  * Admin access revoked
  * Client access retained (if applicable)

---

## 📄 Pages & Features

### 1. Home Page

* Landing page of the platform
* Entry point for idea submission
* AI prompt box for startup idea input

---

### 2. Authentication Page

* Unified login/signup interface
* Supports:

  * Email login
  * Social login via Clerk

---

### 3. Client Dashboard

**Sidebar:**

* Projects
* Profile

**Features:**

* View all projects
* Open individual project to:

  * Track progress (stage-wise)
  * View admin comments
* Perform actions:

  * Request additional services (website/app/etc.)
  * Make payments
  * Receive delivered products

---

### 🔁 Feature Request System

* Clients can request **new features within existing projects**

**Flow:**

1. Request submitted
2. Admin review
3. Accept / Reject

If accepted:

* Cost assigned
* Payment made
* Development starts
* Delivered within same project

**Tracking stages:**

* Requested
* Under Review
* Accepted
* In Development
* Delivered

---

### 4. Admin Dashboard

Accessible to:

* Admin
* Employees

**Capabilities:**

* Manage inquiries
* Manage projects
* Update tracking stages
* Add comments
* Set pricing
* Assign/remove employees

---

## 🧩 Project Structure

```
src/
├── api/            # API layer (axios setup)
├── components/     # Reusable UI components
├── hooks/          # Custom hooks
├── pages/          # All pages (public + dashboards)
├── store/          # Zustand state
├── utils/          # Helpers/constants
├── App.jsx         # Routes + guards
└── main.jsx
```

---

## 🔌 API Integration

Base URL configured via environment:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

* Axios instance with credentials support
* Modular API structure planned

---

## 📦 Setup

```bash
# Install dependencies
npm install

# Run development server
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

* ✅ Home page UI implemented
* ✅ Authentication UI created
* ✅ Firebase auth setup (temporary)
* 🚧 Clerk integration (planned)
* 🚧 Dashboards (in progress)
* 🚧 API integration (pending)

---

## 🎯 Next Steps

* Integrate Clerk authentication
* Build client dashboard
* Build admin dashboard
* Integrate backend APIs
* Implement tracking system UI

---

## 👨‍💻 Author

**Dhawal**
Backend Developer Intern — Codingo Forge

---

## ⚠️ Note

This project is under active development and part of an internal system.

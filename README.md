
# MERN Authentication App

A full-stack MERN (MongoDB, Express, React, Node.js) authentication app with email verification using Brevo SMTP.

---

## 📁 Project Structure

```
.
├── client (React Frontend)
└── server (Node.js Backend)
```

---

## 🌐 Live Demo

**Frontend:** [Live Site Link](https://mern-auth-frontend-3j6s.onrender.com)  
**Backend:** Hosted separately (e.g., Render / Railway / Localhost)

---

## 🚀 Features

- User registration & login with JWT authentication
- Email verification using Brevo SMTP
- Protected routes
- Token-based auth with cookie-parser
- Redux Toolkit integration (if applicable)
- Toast notifications
- MongoDB-based user management

---

## 🔧 Server Setup (`/server`)

### 1. Initialize and Install Dependencies

```bash
npm init -y
npm i express dotenv cookie-parser nodemailer jsonwebtoken cors bcryptjs mongoose
npm i -D nodemon
```

### 2. Folder Structure

```
server/
├── config/
│   ├── mongodb.js
│   └── nodemail.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── .env
└── server.js
```

### 3. Environment Variables (`.env`)

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_USER=your_brevo_email
SMTP_PASS=your_brevo_smtp_password
```

### 4. Run Server

```bash
npm run server
```

---

## 🎨 Client Setup (`/client`)

### 1. Create App Using Vite

```bash
npm create vite@latest
```

Choose React + JavaScript.

### 2. Install Dependencies

```bash
npm install
npm i axios react-router-dom react-toastify
```

### 3. Tailwind CSS Setup

Follow official Tailwind docs for Vite:  
https://tailwindcss.com/docs/guides/vite

### 4. Run Development Server

```bash
npm run dev
```

---

## 🧪 API Testing

Use tools like Postman or Thunder Client:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/user` (Protected route with middleware)

---

## 📫 Email Verification

- Uses Brevo SMTP for sending verification emails.
- Configured via `nodemail.js` in the config folder.

---

## ✅ Status

- Backend Auth APIs fully working ✅  
- Frontend integrated with backend ✅  
- Backend tested with Postman ✅  
- Production may have minor bugs, but works smoothly in development ✅

---

## 💡 How to Run Locally

### Backend

```bash
cd server
npm install
npm run server
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧑‍💻 Author

**Abhishek Giri**  
[GitHub Profile](https://github.com/abhishekgiri013)

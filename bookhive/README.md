# BookHive – Online Book Store Platform

BookHive is a premium, modern full-stack online bookstore application built with the MERN stack (MongoDB, Express, React, Node.js). It features a sleek UI with glassmorphism, Framer Motion animations, and a fully functional backend.

## 🚀 Features

- **User Authentication**: JWT-based secure login and registration with Role-Based Access Control (User/Admin).
- **Product Catalog**: Browse and search for books with a modern layout.
- **Shopping Cart**: Add books to the cart and view order summary.
- **Admin Dashboard**: Manage users, orders, and books (Backend prepared).
- **Responsive UI**: Built with Tailwind CSS for mobile, tablet, and desktop viewing.
- **State Management**: Redux Toolkit used for managing global states like Auth, Cart, and Products.

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Framer Motion
- React Hot Toast

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## 📦 Installation

1. **Clone the repository** (if not done already)
   ```bash
   git clone <repo-url>
   cd bookhive
   ```

2. **Install Dependencies**
   Run the following command at the root to install dependencies for both client and server:
   ```bash
   npm run install-all
   ```

3. **Environment Variables**
   Create a `.env` file in the `server` directory with the following:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/bookhive
   JWT_SECRET=yoursupersecretkey
   ```

4. **Seed Database (Optional)**
   To populate the database with initial books and an admin user, run:
   ```bash
   cd server
   npm run seed
   ```

5. **Run the Application**
   From the root directory, run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 🌐 API Routes

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get logged in user profile

### Books
- `GET /api/books` - Fetch all books
- `GET /api/books/:id` - Fetch single book
- `POST /api/books` - Create a book (Admin)
- `PUT /api/books/:id` - Update a book (Admin)
- `DELETE /api/books/:id` - Delete a book (Admin)

### Orders
- `POST /api/orders` - Place an order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete a user

## 🚢 Deployment

### Frontend (Vercel)
- The root contains a `vercel.json` file configured to deploy the Vite React app from the `client/` directory.

### Backend (Render)
- A `render.yaml` file is provided in the `server/` directory for deploying the Node/Express backend to Render.com. Ensure you set the environment variables in your Render dashboard.

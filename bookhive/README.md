# BookHive - Online Book Store

BookHive is a complete, production-ready full-stack MERN (MongoDB, Express, React, Node.js) ecommerce application for an online book store. 

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing.
- **Role-Based Access**: Separation of User and Admin roles.
- **Product Catalog**: Browse, search, and filter books.
- **Shopping Cart**: Add/remove items, update quantities.
- **Checkout Flow**: Complete shipping and payment simulation to place orders.
- **User Profile**: Order history and profile management.
- **Admin Dashboard**: Analytics, revenue tracking, user management, order processing, and book inventory management.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for premium aesthetics.

## Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Redux Toolkit, Framer Motion, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas, Mongoose.
- **Deployment**: Vercel (Frontend), Render (Backend).

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Environment Variables
You will need to configure environment variables.

**Backend (`server/.env`)**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend** 
Update the `baseURL` in `client/src/features/api.js` if running in production.
```javascript
baseURL: 'https://your-backend-url.onrender.com'
```

### Installation

1. **Clone the repository and install dependencies**
```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

2. **Seed the Database** (Optional, for demo data)
```bash
cd server
npm run seed
```

3. **Run the Application Locally**

*Run Backend:*
```bash
cd server
npm run dev
```

*Run Frontend:*
```bash
cd client
npm run dev
```

---

## Deployment

### Frontend (Vercel)
The `client` directory is pre-configured for Vercel deployment.
1. Create a new project on Vercel and import the repository.
2. Set the Root Directory to `client`.
3. Vercel will automatically detect Vite and use `npm run build`.
4. Ensure the backend URL is updated in your `api.js` file before deploying.

### Backend (Render)
The `server` directory contains a `render.yaml` for easy deployment on Render.
1. Create a new Web Service on Render.
2. Set the Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add your `.env` variables (MONGO_URI, JWT_SECRET) in the Render dashboard.

## API Documentation

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/auth/register` | POST | Public | Register new user |
| `/api/auth/login` | POST | Public | Authenticate user & get token |
| `/api/auth/profile` | GET/PUT | Private | Get/Update user profile |
| `/api/books` | GET | Public | Fetch all books |
| `/api/books/:id` | GET | Public | Fetch single book |
| `/api/books` | POST | Admin | Create a new book |
| `/api/books/:id` | PUT/DELETE | Admin | Update/Delete a book |
| `/api/orders` | POST | Private | Create new order |
| `/api/orders/myorders` | GET | Private | Get user orders |
| `/api/orders/:id/deliver` | PUT | Admin | Update order to delivered |
| `/api/admin/stats` | GET | Admin | Get dashboard statistics |
| `/api/admin/users` | GET | Admin | Get all users |

---
**Developed for production scale.**

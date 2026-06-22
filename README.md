# 🛒 E-Commerce Web Application

A full-stack E-Commerce Web Application built using React.js, Node.js, Express.js, and MongoDB Atlas. The platform provides product browsing, shopping cart functionality, secure authentication, order management, and an admin dashboard for managing products and orders.

---

## 🚀 Features

### User Features

- User Registration & Login
- JWT Authentication
- Browse Products
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Checkout Orders
- View Order History
- Order Tracking

### Admin Features

- Admin Login
- Dashboard Overview
- Product Management
- Order Management
- User Management
- Inventory Tracking

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcryptjs

---

## 📂 Project Structure

```text
ecommerce-web-application/
│
├── backend/
├── frontend/
├── Screenshots/
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/ecommerce-web-application.git
cd ecommerce-web-application
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm start
```

or

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run Frontend:

```bash
npm start
```

---

## 🌱 Seed Database

To populate sample users and products:

```bash
cd backend
node seed.js
```

### Demo Credentials

#### Admin

```text
Email: admin@example.com
Password: admin123
```

#### User

```text
Email: user@example.com
Password: user123
```

---

## 📸 Screenshots

### Home Page

![Home](Screenshots/home-page.png)

### Products Page

![Products](Screenshots/products-page.png)

### Product Details

![Product Details](Screenshots/product-details.png)

### Shopping Cart

![Cart](Screenshots/cart-page.png)

### Admin Dashboard

![Admin Dashboard](Screenshots/admin-dashboard.png)

---

## 🔐 Authentication & Security

- Password Hashing using bcryptjs
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Secure API Access

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Orders

```http
POST /api/orders
GET /api/orders
GET /api/orders/:id
PUT /api/orders/:id/status
```

### Cart

```http
POST /api/cart/add
GET /api/cart
PUT /api/cart/update
DELETE /api/cart/remove
```

---

## 🎯 Learning Outcomes

- Full-Stack Development
- REST API Development
- MongoDB Database Design
- Authentication & Authorization
- React State Management
- E-Commerce Workflow Implementation
- Real-World Project Architecture

---

## 👨‍💻 Author
Built as part of a Full-Stack Development learning project focusing on modern web application architecture and e-commerce workflows.

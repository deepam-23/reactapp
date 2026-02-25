# Backend - Analytics Dashboard API

Node.js and Express.js backend for the Data Analytics Dashboard application.

## 🚀 Features

- RESTful APIs for analytics data
- JWT-based authentication
- MongoDB data storage with Mongoose ODM
- Data aggregation for complex analytics queries
- CORS support for frontend integration
- Environment-based configuration

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema and model
│   ├── Sale.js          # Sales transaction schema
│   └── Product.js       # Product inventory schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   └── analytics.js     # Analytics data endpoints
├── server.js            # Main server file
├── seed.js              # Database seeding script
├── package.json
├── .env                 # Environment variables
└── .gitignore
```

## 🛠 Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/analytics_dashboard
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. Seed the database:
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Analytics
- `GET /api/analytics/summary` - Dashboard summary
- `GET /api/analytics/sales` - Sales data with filters
- `GET /api/analytics/sales-by-category` - Sales by category
- `GET /api/analytics/monthly-sales` - Monthly sales trends
- `GET /api/analytics/sales-by-region` - Sales by region
- `GET /api/analytics/top-products` - Top products
- `GET /api/analytics/sales-status` - Sales status distribution
- `GET /api/analytics/products-stats` - Product statistics

## 🔐 Demo User

After seeding the database, you can use these credentials:
- Email: `admin@example.com`
- Password: `password123`

## 🗄 Database Models

### User
- username: String
- email: String (unique)
- password: String (hashed)
- role: String (admin/user)

### Sale
- product: String
- category: String
- amount: Number
- quantity: Number
- date: Date
- status: String (completed/pending/cancelled)
- region: String

### Product
- name: String
- category: String
- price: Number
- stock: Number
- rating: Number (0-5)
- brand: String

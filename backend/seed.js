const mongoose = require('mongoose');
const Sale = require('./models/Sale');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Sample data
const products = [
    { name: 'Laptop Pro', category: 'Electronics', price: 1200, stock: 50, rating: 4.5, brand: 'TechCorp' },
    { name: 'Wireless Mouse', category: 'Electronics', price: 25, stock: 200, rating: 4.2, brand: 'TechCorp' },
    { name: 'T-Shirt', category: 'Clothing', price: 20, stock: 150, rating: 4.0, brand: 'FashionHub' },
    { name: 'Jeans', category: 'Clothing', price: 60, stock: 100, rating: 4.3, brand: 'FashionHub' },
    { name: 'Coffee Beans', category: 'Food', price: 15, stock: 300, rating: 4.7, brand: 'CoffeeCo' },
    { name: 'Chocolate Bar', category: 'Food', price: 3, stock: 500, rating: 4.1, brand: 'SweetTreats' },
    { name: 'Programming Book', category: 'Books', price: 45, stock: 80, rating: 4.6, brand: 'TechBooks' },
    { name: 'Novel', category: 'Books', price: 15, stock: 120, rating: 4.4, brand: 'BookWorld' },
    { name: 'Garden Set', category: 'Home & Garden', price: 150, stock: 30, rating: 4.3, brand: 'GreenLife' },
    { name: 'Tennis Racket', category: 'Sports', price: 80, stock: 60, rating: 4.5, brand: 'SportsPro' }
];

const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden', 'Sports'];
const regions = ['North', 'South', 'East', 'West', 'Central'];
const statuses = ['completed', 'pending', 'cancelled'];

function generateRandomSales() {
    const sales = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 500; i++) {
        const randomDate = new Date(currentDate);
        randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365));
        
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 10) + 1;
        
        sales.push({
            product: randomProduct.name,
            category: randomProduct.category,
            amount: randomProduct.price * quantity,
            quantity: quantity,
            date: randomDate,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            region: regions[Math.floor(Math.random() * regions.length)]
        });
    }
    
    return sales;
}

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Sale.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create demo user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        const demoUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        await demoUser.save();
        console.log('Created demo user: admin@example.com / password123');

        // Insert products
        await Product.insertMany(products);
        console.log('Inserted products');

        // Insert sales
        const sales = generateRandomSales();
        await Sale.insertMany(sales);
        console.log('Inserted sales data');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();

const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

const router = express.Router();

// Get sales data with filters
router.get('/sales', async (req, res) => {
    try {
        const { startDate, endDate, category, status, region } = req.query;
        let filter = {};

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        if (category) filter.category = category;
        if (status) filter.status = status;
        if (region) filter.region = region;

        const sales = await Sale.find(filter).sort({ date: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get sales by category (for pie chart)
router.get('/sales-by-category', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let matchStage = {};

        if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(endDate);
        }

        const salesByCategory = await Sale.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: '$quantity' }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.json(salesByCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get monthly sales trend (for line chart)
router.get('/monthly-sales', async (req, res) => {
    try {
        const { year } = req.query;
        const currentYear = year || new Date().getFullYear();

        const monthlySales = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$date' },
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: '$quantity' }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        // Fill in missing months with 0
        const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
        const result = allMonths.map(month => {
            const found = monthlySales.find(sale => sale._id === month);
            return {
                month,
                totalAmount: found ? found.totalAmount : 0,
                count: found ? found.count : 0
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get sales by region (for bar chart)
router.get('/sales-by-region', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let matchStage = {};

        if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(endDate);
        }

        const salesByRegion = await Sale.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$region',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: '$quantity' }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.json(salesByRegion);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get top products (for horizontal bar chart)
router.get('/top-products', async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const topProducts = await Sale.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalAmount: { $sum: '$amount' },
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            { $sort: { totalAmount: -1 } },
            { $limit: parseInt(limit) }
        ]);

        res.json(topProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get sales status distribution (for doughnut chart)
router.get('/sales-status', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let matchStage = {};

        if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(endDate);
        }

        const salesStatus = await Sale.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        res.json(salesStatus);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get product statistics
router.get('/products-stats', async (req, res) => {
    try {
        const products = await Product.find();
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
        const avgRating = products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;

        const productsByCategory = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    totalStock: { $sum: '$stock' }
                }
            }
        ]);

        res.json({
            totalProducts,
            totalStock,
            avgRating: avgRating.toFixed(2),
            productsByCategory
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get dashboard summary
router.get('/summary', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let matchStage = {};

        if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(endDate);
        }

        const totalSales = await Sale.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    totalQuantity: { $sum: '$quantity' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const summary = totalSales[0] || { totalAmount: 0, totalQuantity: 0, count: 0 };

        res.json({
            totalRevenue: summary.totalAmount,
            totalSales: summary.count,
            totalItemsSold: summary.totalQuantity,
            averageOrderValue: summary.count > 0 ? (summary.totalAmount / summary.count).toFixed(2) : 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;

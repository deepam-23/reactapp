const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden', 'Sports']
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'cancelled'],
        default: 'completed'
    },
    region: {
        type: String,
        required: true,
        enum: ['North', 'South', 'East', 'West', 'Central']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: String, // Optional
    category: { type: String, enum: ['clothes', 'vehicles', 'other'], default: 'other' },
    sold: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);

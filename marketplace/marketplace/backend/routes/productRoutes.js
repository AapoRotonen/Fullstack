const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ sold: { $ne: true } }); // Exclude sold products
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product');
    }
});

module.exports = router;

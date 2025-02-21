const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get products with optional category filtering
router.get('/', async (req, res) => {
    try {
        let filter = { sold: { $ne: true } }; // Exclude sold products

        const products = await Product.find(filter);

        // Categorize products
        let categorizedProducts = {
            featured: [], // Default category for items without a category
        };

        products.forEach(product => {
            const category = product.category ? product.category.toLowerCase() : "featured";
            if (!categorizedProducts[category]) {
                categorizedProducts[category] = [];
            }
            categorizedProducts[category].push(product);
        });

        console.log("Categorized Products:", categorizedProducts); // Debugging log
        res.json(categorizedProducts);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = new Product({
            name,
            description,
            price,
            image: image || '', // Ensure an empty string if no image
            category: category || 'other' // Default to 'other' if no category is provided
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Error adding product');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Checkout Route: Process purchase and clear cart
router.post('/checkout', async (req, res) => {
    try {
        // Fetch all cart items
        const cartItems = await Cart.find();

        // Mark products as sold
        for (const item of cartItems) {
            await Product.findByIdAndUpdate(item.productId, { sold: true });
        }

        // Clear the cart
        await Cart.deleteMany();

        res.status(200).json({ message: 'Checkout successful!' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Error during checkout' });
    }
});

module.exports = router;

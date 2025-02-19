const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Replace with the correct path to your Cart model
const Product = require('../models/Product'); // Import Product model


// Cart Route (server-side)
router.get('/cart', async (req, res) => {
    try {
      const cartItems = await Cart.find()
        .populate('productId'); // Populate product details
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ message: 'Error fetching cart items' });
    }
  });
  

// Add item to cart
router.post('/', async (req, res) => {
    const { productId } = req.body; // Expecting only productId from the frontend

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        // Create a new cart item with the productId
        const cartItem = new Cart({ productId });
        await cartItem.save();

        // Populate the product details of the cart item
        const populatedCartItem = await cartItem.populate('productId');

        // Log the populated cart item for debugging
        console.log('Populated Cart Item:', populatedCartItem);

        res.status(201).json(populatedCartItem); // Send populated cart item as the response
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
});


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
  


// Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Error removing cart item' });
    }
});

module.exports = router;

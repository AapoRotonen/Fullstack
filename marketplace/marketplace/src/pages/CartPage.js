import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const purchaseItems = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            await Promise.all(cart.map(item =>
                fetch(`http://localhost:5000/products/${item._id}`, {
                    method: 'PATCH', // Update instead of delete
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sold: true }) // Mark as sold
                })
            ));

            localStorage.removeItem('cart');
            setCart([]);
            alert('Purchase successful! Items marked as sold.');
            navigate('/'); // Redirect to homepage
            window.location.reload(); // Refresh to remove sold products
        } catch (error) {
            console.error('Error purchasing items:', error);
            alert('Error completing purchase.');
        }
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
                <div className="cart-grid">
                    {cart.map(product => (
                        <div key={product._id} className="cart-item">
                            <img src={product.image || 'placeholder.jpg'} alt={product.name} className="cart-image" />
                            <h3 className="cart-name">{product.name}</h3>
                            <p className="cart-description">{product.description}</p>
                            <p className="cart-price">${product.price}</p>
                            <button className="btn" onClick={() => removeFromCart(product._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
            {cart.length > 0 && (
                <button className="btn purchase-btn" onClick={purchaseItems}>Proceed to Purchase</button>
            )}
        </div>
    );
};

export default CartPage;

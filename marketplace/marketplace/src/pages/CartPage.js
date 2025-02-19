import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css'; // Import the CSS file for styling

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    axios.get('http://localhost:5000/cart')
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, []);

  const handlePurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cart/checkout');
      if (response.status === 200) {
        setCart([]);
        alert('Purchase successful!');
      } else {
        alert('Failed to complete the purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.productId.image} alt={item.productId.name} className="cart-image" />
            <h2 className="cart-name">{item.productId.name}</h2>
            <p className="cart-description">{item.productId.description}</p>
            <p className="cart-price">Price: ${item.productId.price}</p>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <button className="btn" onClick={handlePurchase}>Proceed to Buy</button>
      )}
    </div>
  );
};

export default CartPage;
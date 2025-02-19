import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'user@example.com' });
    }

    axios.get('http://localhost:5000/products')
      .then((response) => {
        const availableProducts = response.data.filter(product => !product.sold);
        setProducts(availableProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:5000/cart')
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add products to your cart');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/cart', { productId: product._id });
      console.log('Cart item added:', response.data);
      setCart([...cart, response.data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Try again later.');
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cart/checkout');
      if (response.status === 200) {
        setCart([]);
        alert('Purchase successful!');
        axios.get('http://localhost:5000/products')
          .then((response) => {
            const availableProducts = response.data.filter(product => !product.sold);
            setProducts(availableProducts);
          })
          .catch((error) => {
            console.error('Error fetching updated products:', error);
          });
      } else {
        alert('Failed to complete the purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="homepage">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)} className="btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        <div className="product-grid">
          {cart.map((item) => (
            <div className="product-card" key={item._id}>
              <img src={item.productId.image} alt={item.productId.name} className="product-image" />
              <h2 className="product-name">{item.productId.name}</h2>
              <p className="product-description">{item.productId.description}</p>
              <p className="product-price">Price: ${item.productId.price}</p>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <button className="btn" onClick={handlePurchase}>Proceed to Buy</button>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 Marketplace, All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
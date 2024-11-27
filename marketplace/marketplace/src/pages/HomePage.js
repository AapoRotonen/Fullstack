import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

    // Fetch products (filter out sold products)
    axios.get('http://localhost:5000/products')
      .then((response) => {
        const availableProducts = response.data.filter(product => !product.sold);
        setProducts(availableProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    // Fetch cart items and populate the productId with product details
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
        // Re-fetch products after purchase to reflect the change
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
    <div>
      <header>
        <nav>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px'}}>Random marketplace</h1>

            <div style={{ display: 'flex', flexDirection: 'column'}}>
              {/* Add Product Button: Only visible to logged-in users */}
              {user && (
                <Link to="/add-product">
                  <button className="btn-submit" style={{ marginBottom: '10px' }}>Add Product</button>
                </Link>
              )}

              {/* Logout Button: Only visible to logged-in users */}
              {user && (
                <button onClick={handleLogout} className="btn-submit">Logout</button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <h2>Featured Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2>Your Cart</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cart.map((item) => (
            <div className="product-card" key={item._id}>
              <img src={item.productId.image} alt={item.productId.name} />
              <h2>{item.productId.name}</h2>
              <p>{item.productId.description}</p>
              <p>Price: ${item.productId.price}</p>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <button className="btn-submit" onClick={handlePurchase}>
            Proceed to Buy
          </button>
        )}
      </div>

      <footer>
        <p>&copy; 2024 Marketplace, All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

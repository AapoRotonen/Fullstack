import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products`);
            const data = await response.json();
            const filteredProducts = data.filter(product => !product.sold); // Exclude sold products

            // If category is selected, filter by category; otherwise, show all (or featured if no category)
            const categorizedProducts = category && category !== 'all'
                ? filteredProducts.filter(product => product.category === category)
                : filteredProducts;

            setProducts(categorizedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category]); // Re-run when category changes

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="homepage-container">
            <h2 className="homepage-title">
          {category ? `Category: ${category}` : 'Featured Products'}
      </h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image || 'placeholder.jpg'} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="product-price">${product.price}</p>
                                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products-message">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;

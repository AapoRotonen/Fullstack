import React, { useState } from 'react';
import './AddProductPage.css'; // CSS file for custom styles

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // Add image field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError('');
    setSuccess('');

    // Basic validation
    if (!product.name || !product.description || !product.price || !product.image) {
      setError('All fields are required.');
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added:', data);
        setSuccess('Product added successfully!');
        // Optionally, clear form after submission
        setProduct({
          name: '',
          description: '',
          price: '',
          image: '',
        });
      } else {
        console.error('Failed to add product. Status:', response.status);
        setError('Failed to add product. Please try again.');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product for Sale</h2>

      {/* Show success or error message */}
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            placeholder="Enter product description"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            placeholder="Enter product price"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" className="btn-submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;

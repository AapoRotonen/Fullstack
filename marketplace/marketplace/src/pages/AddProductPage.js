import React, { useState } from 'react';
import './AddProductPage.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    forSale: false 
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!product.name || !product.description || !product.price) {
      setError('Name, description, and price are required.');
      return;
    }

    const productData = { ...product };
    if (!product.image) delete productData.image; 

    try {
      const response = await axios.post('http://localhost:5000/products', productData);
      if (response.status === 201) {
        setSuccess('Product added successfully!');
        setProduct({ name: '', description: '', price: '', image: '', forSale: false });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (err) {
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <motion.div 
      className="add-product-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Add New Product</h2>
      {success && <motion.div className="success-message" animate={{ scale: 1.1 }}>{success}</motion.div>}
      {error && <motion.div className="error-message" animate={{ scale: 1.1 }}>{error}</motion.div>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Leave empty if no image" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="forSale" checked={product.forSale} onChange={handleChange} />
            Available for Sale
          </label>
        </div>
        <motion.button 
          type="submit" 
          className="btn-submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Product
        </motion.button>
      </form>

      {showPopup && (
        <motion.div className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <p>✅ Your product has been added successfully!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddProductPage;
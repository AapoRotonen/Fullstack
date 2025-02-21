import React, { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'clothes' // Default category
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/products', product);
      if (response.status === 201) {
        setMessage('✅ Product added successfully!');
        setProduct({ name: '', description: '', price: '', image: '', category: 'clothes' });
      }
    } catch (err) {
      setMessage('❌ Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL (Optional):</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="clothes">Clothes</option>
            <option value="vehicles">Vehicles</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;

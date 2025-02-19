import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import './App.css'; // Import the CSS file for styling

function App() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <h1>Marketplace</h1>
                    <div className="nav-buttons">
                        <a href="/">Home</a>
                        <a href="/add-product">Add Product</a>
                        <a href="/cart">Cart</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                        <button onClick={handleLogout} className="btn">Logout</button>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
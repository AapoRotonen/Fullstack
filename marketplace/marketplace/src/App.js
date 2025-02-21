import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <div className="logo-container">
                        <h1 className="logo">VibeCart</h1>
                        <p className="subtext">Good vibes. Great finds.</p>
                    </div>
                    <div className="nav-buttons">
                        <a href="/">Home</a>
                        <a href="/add-product">Add Product</a>
                        <a href="/cart">Cart</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                        {isLoggedIn && <button onClick={handleLogout} className="btn">Logout</button>}
                    </div>
                </nav>
                <div className="sidebar">
                    <a href="/category/all">All</a>
                    <a href="/category/clothes">Clothes</a>
                    <a href="/category/vehicles">Vehicles</a>
                    <a href="/category/other">Other</a>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/category/:category" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/add-product" element={<AddProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

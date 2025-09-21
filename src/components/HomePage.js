import React from "react";
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Blue border outline */}
      <div className="blue-border-top"></div>
      <div className="blue-border-left"></div>
      
      {/* Header with Navigation */}
      <header className="header">
        <div className="header-left">
          {/* Hamburger Menu */}
          <div className="hamburger-menu">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          
          {/* Navigation Links - Horizontal */}
          <nav className="navigation">
            <a href="/home" className="nav-link">Home</a>
            <a href="/patches" className="nav-link">Patches</a>
            <a href="/shop" className="nav-link">Shop</a>
          </nav>
        </div>
        
        {/* Shopping Cart */}
        <div className="cart-icon">
          🛒
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="main-layout">
        {/* Left Content Section */}
        <div className="left-content">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input"
              />
            </div>
          </div>

          {/* Brand Name */}
          <div className="brand-section">
            <h1 className="brand-title">
              INK &<br />THREADS
            </h1>
          </div>
        </div>

        {/* Right Hero Image Section */}
        <div className="right-content">
          <div className="image-container">
            {/* White L-shaped brackets */}
            <div className="bracket bracket-top-right"></div>
            <div className="bracket bracket-bottom-left"></div>
            
            {/* Hero Image */}
            <img
              src={modelImage}
              alt="Models wearing embroidered caps"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      {/* Bottom Description - Full Width */}
      <div className="description-section">
        <p className="description-text">
          "Discover premium embroidered caps designed for style, comfort, and durability. 
          From custom designs to timeless classics, our caps let you wear your personality 
          with every stitch."
        </p>
      </div>
    </div>
  );
};

export default Homepage;
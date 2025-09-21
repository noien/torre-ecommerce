import React from "react";
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const Homepage = () => {
  return (
    <div className="homepage">
      
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
          {/* Brand Name */}
          <div className="brand-section">
            <h1 className="brand-title">
              INK &<br />THREADS
            </h1>
          </div>
          
          {/* Additional Content Below Logo */}
          <div className="logo-content">
            <p className="tagline">Premium Embroidered Caps</p>
            <div className="cta-buttons">
              <button className="btn-primary">Shop Collection</button>
              <button className="btn-secondary">Custom Design</button>
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="image-container">
            <div className="bracket bracket-top-right"></div>
            <div className="bracket bracket-bottom-left"></div>
            
            <img
              src={modelImage}
              alt="Models wearing embroidered caps"
              className="hero-image"
            />
          </div>
          
          {/* Description Section - Inside Right Content */}
          <div className="description-section">
            <p className="description-text">
              "Discover premium embroidered caps designed for style, comfort, and durability. 
              From custom designs to timeless classics, our caps let you wear your personality 
              with every stitch."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
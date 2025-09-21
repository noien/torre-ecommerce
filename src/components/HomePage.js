import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const ShopCollectionButton = () => {
  const navigate = useNavigate();
  return (
    <button className="btn-primary" onClick={() => navigate("/shop")}>
      SHOP COLLECTION
    </button>
  );
};

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
            
          </nav>
        </div>
        
        {/* Shopping Cart */}
        <div className="cart-icon">
          🛒
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="main-layout">
        <section className="left-content">
          <div className="brand-section">
            <h1 className="brand-title">
              INK & THREADS
            </h1>
            
            <div className="tagline">Premium Embroidered Caps</div>
            
            <div className="cta-buttons flex flex-col gap-4 mt-6">
              <ShopCollectionButton />
              <button className="btn-secondary">CUSTOM DESIGN</button>
            </div>
          </div>
        </section>

        <section className="right-content">
          <div className="image-container">
            <img
              src={modelImage}
              alt="Model"
              className="hero-image"
            />
            
            <div className="bracket bracket-top-right"></div>
            <div className="bracket bracket-bottom-left"></div>
          </div>
          
          <div className="description-section">
            <p className="description-text">
              "Discover premium embroidered caps designed for style, comfort, and durability. 
              From custom designs to timeless classics, our caps let you wear your personality 
              with every stitch."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
import React from "react";
import { useNavigate, Link } from "react-router-dom"; // ADDED Link
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const ShopCollectionButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4">
      <button className="btn-primary" onClick={() => navigate("/caps")}>
        Premium Caps
      </button>
      <button className="btn-secondary" onClick={() => navigate("/patches")}>
        Patches
      </button>
    </div>
  );
};

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="header-left">        
        </div>

        {/* UPDATED: Cart icon is now a Link to the /cart route */}
        <Link to="/cart" className="cart-icon">
          🛒
        </Link>
      </header>

      <div className="main-layout">
        <section className="left-content">
          <div className="brand-section">
            <h1 className="brand-title">INK & THREADS</h1>

            <div className="tagline">Premium Embroidered</div>

            <div className="cta-buttons">
              <ShopCollectionButton />
            </div>
          </div>
        </section>

        <section className="right-content">
          <div className="image-container">
            <img src={modelImage} alt="Model" className="hero-image" />
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

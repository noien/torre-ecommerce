import React from "react";
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const Homepage = () => {
  return (
    <section className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/patches">Patches</a>
          <a href="/shop">Shop</a>
        </nav>

        <div className="cart">🛒</div>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>

      {/* Hero Content */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            INK & <br />
            THREADS
          </h1>
          <p>
            "Discover premium embroidered caps designed for style, comfort, and
            durability. From custom designs to timeless classics, our caps let
            you wear your personality with every stitch."
          </p>
        </div>

        <div className="hero-image">
          <img src={modelImage} alt="Model" />
        </div>
      </div>
    </section>
  );
};

export default Homepage;

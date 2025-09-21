import React from "react";
import "../styles/Homepage.css";
import modelImage from "../assets/model.png";

const Homepage = () => {
  return (
    <section className="homepage">
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

     
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "250px",
            padding: "8px",
            fontSize: "14px",
          }}
        />
        <button style={{ fontSize: "14px" }}>Search</button>
      </div>

      <div
        className="model"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="model-text" style={{ flex: "1" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
            }}
          >
            INK & <br />
            THREADS
          </h1>
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "500px",
              lineHeight: "1.6",
              fontStyle: "italic",
              color: "#e0e0e0",
            }}
          >
            "Discover premium embroidered caps designed for style, comfort, and
            durability. From custom designs to timeless classics, our caps let
            you wear your personality with every stitch."
          </p>
        </div>

        <div
          className="model-image"
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <img
            src={modelImage}
            alt="Model"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
              border: "2px solid #666",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Homepage;

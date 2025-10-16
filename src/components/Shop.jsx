import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Shoppage.css";
import {allProducts} from "../routes/Products";

const Shop = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    const min = priceMin === "" ? null : Number(priceMin);
    const max = priceMax === "" ? null : Number(priceMax);

    return allProducts.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (selectedCategory !== "All" && p.category !== selectedCategory)
        return false;
      if (min !== null && p.priceMax < min) return false;
      if (max !== null && p.priceMin > max) return false;
      return true;
    });
  }, [search, selectedCategory, priceMin, priceMax]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  const handleScroll = () => {
    const mainContent = document.querySelector(".products-scroll-area");
    if (!mainContent) return;
    if (
      mainContent.scrollHeight - mainContent.scrollTop <=
      mainContent.clientHeight + 200
    ) {
      if (displayCount < filteredProducts.length) {
        setDisplayCount((prev) => Math.min(prev + 3, filteredProducts.length));
      }
    }
  };

  useEffect(() => {
    const mainContent = document.querySelector(".products-scroll-area");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
      return () => mainContent.removeEventListener("scroll", handleScroll);
    }
  }, [displayCount, filteredProducts.length]);

  useEffect(() => {
    setDisplayCount(9);
    const mainContent = document.querySelector(".products-scroll-area");
    if (mainContent) mainContent.scrollTop = 0;
  }, [search, selectedCategory, priceMin, priceMax]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? "star-filled" : "star-empty"}`}
      >
        ★
      </span>
    ));

  return (
    <div className="shop-container">
      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="shop-nav-content">
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button onClick={() => navigate("/")} className="shop-nav-link">
              Home
            </button>
            <button onClick={() => navigate("/patches")} className="shop-nav-link">
              Patches
            </button>
            <button onClick={() => navigate("/shop")} className="shop-nav-link">
              Caps
            </button>
          </div>
          <div className="shop-cart" title="Cart">
            🛒
          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="shop-main-layout">
        {/* Sidebar */}
        <aside className="shop-sidebar" aria-label="Filters sidebar">
          <div className="sidebar-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-container">
              <h3 className="filters-title">Filters</h3>

              <div className="filter-sections">
                {/* Category */}
                <div className="filter-section">
                  <div className="filter-header border-top">
                    <span>Category</span>
                    <ChevronDown size={16} className="chevron-icon" />
                  </div>
                  <div className="filter-options">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        color: "#d1d5db",
                        border: "1px solid #4b5563",
                        padding: "0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="filter-section">
                  <div className="filter-header border-top">
                    <span>Price Range</span>
                    <ChevronDown size={16} className="chevron-icon" />
                  </div>
                  <div className="filter-options">
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        style={{
                          flex: 1,
                          background: "transparent",
                          color: "#d1d5db",
                          border: "1px solid #4b5563",
                          padding: "0.45rem",
                          borderRadius: "4px",
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        style={{
                          flex: 1,
                          background: "transparent",
                          color: "#d1d5db",
                          border: "1px solid #4b5563",
                          padding: "0.45rem",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <button
                        onClick={() => {
                          setPriceMin("");
                          setPriceMax("");
                        }}
                        style={{
                          flex: 1,
                          background: "#374151",
                          color: "#fff",
                          padding: "0.45rem",
                          borderRadius: "4px",
                          border: "none",
                        }}
                      >
                        Reset
                      </button>
                      <button
                        style={{
                          flex: 1,
                          background: "#4b5563",
                          color: "#fff",
                          padding: "0.45rem",
                          borderRadius: "4px",
                          border: "none",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="brand-section">
              <h1 className="brand-name">INK & THREADS</h1>
            </div>
          </div>
        </aside>

        {/* Products */}
        <main className="products-scroll-area">
          <div className="products-container">
            <h2 className="products-title">PRODUCTS</h2>

            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-stars">{renderStars(product.rating)}</div>
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <button
                    className="product-button"
                    onClick={() => alert(`${product.name} added (demo)`)}
                  >
                    Add
                  </button>
                  <p className="product-price">{product.priceLabel}</p>
                </div>
              ))}
            </div>

            {displayCount < filteredProducts.length && (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <p style={{ color: "#9ca3af" }}>Scroll for more products...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;

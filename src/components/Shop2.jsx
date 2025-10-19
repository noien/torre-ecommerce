// Shop2.jsx — Final Integrated Version
import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shoppage.css";
import { allPatchProducts } from "../routes/Products2";

const Shop2 = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [priceSort, setPriceSort] = useState(null);
  const [minRating, setMinRating] = useState(0);

  const categories = useMemo(() => {
    const set = new Set(allPatchProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const togglePriceSort = () => {
    setPriceSort((prev) => (prev === "desc" ? "asc" : "desc"));
    setPriceExpanded(true);
  };

  const filteredProducts = useMemo(() => {
    let results = allPatchProducts.filter((p) => {
      const prodRating = Number(p.rating || 0);
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (minRating > 0 && prodRating !== Number(minRating)) return false;
      return true;
    });

    if (priceSort === "asc") results = results.slice().sort((a, b) => a.priceMin - b.priceMin);
    if (priceSort === "desc") results = results.slice().sort((a, b) => b.priceMin - a.priceMin);

    return results;
  }, [search, selectedCategory, minRating, priceSort]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? "star-filled" : "star-empty"}`}>★</span>
    ));

  const handleRatingFilter = (rating) => {
    const num = Number(rating);
    setMinRating((prev) => (prev === num ? 0 : num));
  };

  const visibleProducts = filteredProducts.slice(0, displayCount);

  const handleScroll = () => {
    const mainContent = document.querySelector(".products-scroll-area");
    if (!mainContent) return;
    if (mainContent.scrollHeight - mainContent.scrollTop <= mainContent.clientHeight + 200) {
      if (displayCount < filteredProducts.length)
        setDisplayCount((prev) => Math.min(prev + 3, filteredProducts.length));
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
  }, [search, selectedCategory, minRating, priceSort]);

  // ✅ Add to Cart (Shared with Cartpage)
  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(i => i.id === product.id && i.source === "patches");
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ ...product, qty: 1, source: "patches" });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="shop-container">
      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="shop-nav-content">
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <div className="hamburger-menu" aria-hidden="true">
              <div className="hamburger-line" />
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <button onClick={() => navigate("/")} className="shop-nav-link">
              Home
            </button>
            <button onClick={() => navigate("/patches")} className="shop-nav-link">
              Patches
            </button>
            <button onClick={() => navigate("/caps")} className="shop-nav-link">
              Caps
            </button>
          </div>

          <Link to="/cart" className="shop-cart cart-icon" title="Cart">
            🛒
          </Link>
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
                placeholder="Search patches..."
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
                      className="category-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Sort */}
                <div className="filter-section">
                  <div
                    className="filter-header border-top"
                    onClick={togglePriceSort}
                    role="button"
                    aria-pressed={priceSort !== null}
                  >
                    <span>Price Range</span>
                    <ChevronDown
                      size={16}
                      className="chevron-icon"
                      style={{
                        transform: priceSort === "desc" ? "rotate(180deg)" : "none",
                        transition: "transform .18s",
                      }}
                    />
                  </div>
                  {priceExpanded && (
                    <div className="filter-options" style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
                      Sorted: {priceSort === "desc" ? "High → Low" : priceSort === "asc" ? "Low → High" : "Default"}
                    </div>
                  )}
                </div>

                {/* Ratings */}
                <div className="filter-section">
                  <div className="filter-header border-top">
                    <span>Ratings</span>
                    <ChevronDown size={16} className="chevron-icon" />
                  </div>
                  <div className="filter-options" style={{ marginTop: "0.5rem", gap: "0.25rem" }}>
                    <button
                      className={`filter-option ${minRating === 0 ? "active-filter" : ""}`}
                      onClick={() => setMinRating(0)}
                    >
                      All Ratings
                    </button>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <button
                        key={r}
                        className={`filter-option ${minRating === r ? "active-filter" : ""}`}
                        onClick={() => handleRatingFilter(r)}
                      >
                        <span style={{ display: "inline-flex", gap: 4, marginRight: 8 }}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`star ${i < r ? "star-filled" : "star-empty"}`}
                              style={{ fontSize: 14 }}
                            >
                              ★
                            </span>
                          ))}
                        </span>
                        <span className="rating-label">{r}+ Stars</span>
                      </button>
                    ))}
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
            <h2 className="products-title">PATCHES</h2>

            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-stars">{renderStars(product.rating)}</div>
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <button className="product-button" onClick={() => addToCart(product)}>
                    Add to Cart
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

export default Shop2;

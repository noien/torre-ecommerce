import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shoppage.css";
import { allProducts } from "../routes/Products";

const Shop = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(9);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [priceSort, setPriceSort] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [ratingOpen, setRatingOpen] = useState(false); 

  const togglePriceSort = () => {
    setPriceSort((prev) => (prev === "desc" ? "asc" : "desc"));
    setPriceExpanded(true);
  };

  const filteredProducts = useMemo(() => {
    let results = allProducts.filter((p) => {
      const prodRating = Number(p.rating || 0);
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (minRating > 0 && prodRating !== Number(minRating)) return false;
      return true;
    });

    if (priceSort === "asc") results = results.sort((a, b) => a.priceMin - b.priceMin);
    if (priceSort === "desc") results = results.sort((a, b) => b.priceMin - a.priceMin);

    return results;
  }, [allProducts, search, minRating, priceSort]);

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((i) => i.id === product.id && i.source === "caps");
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ ...product, qty: 1, source: "caps" });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
      >
        ★
      </span>
    ));

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
  }, [search, minRating, priceSort]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  return (
    <div className="shop-container">
      {/* Navigation */}
      <nav className="shop-navbar">
        <div className="shop-nav-content">
          <div className="flex items-center gap-6">
            <div className="hamburger-menu">
              <div className="hamburger-line" />
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>
            <button onClick={() => navigate("/")} className="shop-nav-link">Home</button>
            <button onClick={() => navigate("/patches")} className="shop-nav-link">Patches</button>
            <button onClick={() => navigate("/caps")} className="shop-nav-link">Caps</button>
          </div>
          <Link to="/cart" className="cart-icon" title="Cart">🛒</Link>
        </div>
      </nav>

      <div className="shop-main-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="sidebar-content space-y-4">
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filters */}
            <div className="filters-container">
              <h3 className="filters-title">Filters</h3>

              <div className="filter-sections">
                {/* ⭐ Rating Dropdown Filter */}
                <div className="filter-section relative">
                  <div
                    className="filter-header border-top flex justify-between items-center cursor-pointer"
                    onClick={() => setRatingOpen(!ratingOpen)}
                  >
                    <span>Rating</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${ratingOpen ? "rotate-180" : ""}`}
                    />
                  </div>

                  {ratingOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      <ul className="divide-y divide-gray-700">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <li
                            key={num}
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-700 ${
                              minRating === num ? "bg-blue-600 text-white" : "text-gray-300"
                            }`}
                            onClick={() => {
                              setMinRating(num);
                              setRatingOpen(false);
                            }}
                          >
                            {num === 0 ? (
                              "All Ratings"
                            ) : (
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-sm ${
                                      i < num ? "text-yellow-400" : "text-gray-600"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price Sort */}
                <div className="filter-section">
                  <div className="filter-header border-top" onClick={togglePriceSort}>
                    <span>Price Range</span>
                    <ChevronDown
                      size={16}
                      className={`chevron-icon transition-transform ${
                        priceSort === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {priceExpanded && (
                    <div className="filter-options text-gray-400 mt-1">
                      Sorted:{" "}
                      {priceSort === "desc"
                        ? "High → Low"
                        : priceSort === "asc"
                        ? "Low → High"
                        : "Default"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="brand-section mt-auto pt-6">
              <h1 className="brand-name">INK & THREADS</h1>
            </div>
          </div>
        </aside>

        {/* Main Products Section */}
        <main className="products-scroll-area">
          <div className="products-container">
            <h2 className="products-title">PRODUCTS</h2>
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-2">{renderStars(product.rating)}</div>
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.priceLabel}</p>
                  <button
                    className="product-button mt-3"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
              {visibleProducts.length === 0 && (
                <p className="text-center text-gray-400 col-span-full">
                  No products match your filters.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;

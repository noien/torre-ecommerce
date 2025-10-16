import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "../styles/Shoppage.css";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(9);

  const allProducts = [
    { id: 1, name: "Trucker", rating: 4, price: "₱ 899 - 1099", image: "/src/images/product1.jpg" },
    { id: 2, name: "Fitted", rating: 3, price: "₱ 1149 - 1299", image: "/src/images/product2.jpg" },
    { id: 3, name: "Baseball Cap", rating: 5, price: "₱ 1249 - 1499", image: "/src/images/product3.jpg" },
    { id: 4, name: "Snapback", rating: 4, price: "₱ 999 - 1199", image: "/src/images/product4.jpg" },
    { id: 5, name: "Dad Hat", rating: 5, price: "₱ 849 - 1049", image: "/src/images/product5.jpg" },
    { id: 6, name: "Bucket Hat", rating: 4, price: "₱ 799 - 999", image: "/src/images/product6.jpg" },
    { id: 7, name: "Beanie", rating: 3, price: "₱ 699 - 899", image: "/src/images/product7.jpg" },
    { id: 8, name: "Visor", rating: 4, price: "₱ 749 - 949", image: "/src/images/product8.jpg" },
    { id: 9, name: "5-Panel", rating: 5, price: "₱ 1099 - 1299", image: "/src/images/product9.jpg" },
    { id: 10, name: "Snapback Pro", rating: 4, price: "₱ 1199 - 1399", image: "/src/images/product10.jpg" },
    { id: 11, name: "Classic Cap", rating: 5, price: "₱ 949 - 1149", image: "/src/images/product11.jpg" },
    { id: 12, name: "Sport Cap", rating: 3, price: "₱ 899 - 1099", image: "/src/images/product12.jpg" },
  ];

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const visibleProducts = filteredProducts.slice(0, displayCount);

  const handleScroll = () => {
    const mainContent = document.querySelector('.products-scroll-area');
    if (!mainContent) return;
    
    if (mainContent.scrollHeight - mainContent.scrollTop <= mainContent.clientHeight + 200) {
      if (displayCount < filteredProducts.length) {
        setDisplayCount((prev) => Math.min(prev + 3, filteredProducts.length));
      }
    }
  };

  useEffect(() => {
    const mainContent = document.querySelector('.products-scroll-area');
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
      return () => mainContent.removeEventListener("scroll", handleScroll);
    }
  }, [displayCount, filteredProducts.length]);

  return (
    <div className="shop-container">
      {/* Navigation Bar */}
      <nav className="shop-navbar">
        <div className="shop-nav-content">
          <div className="shop-nav-links">
            <a href="/" className="shop-nav-link">Home</a>
            <a href="/patches" className="shop-nav-link">Patches</a>
            <a href="/caps" className="shop-nav-link">Caps</a>
          </div>
          <div className="shop-cart">🛒</div>
        </div>
      </nav>

      {/* Main Layout Container */}
      <div className="shop-main-layout">
        {/* Fixed Sidebar */}
        <aside className="shop-sidebar">
          <div className="sidebar-content">
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filters */}
            <div className="filters-container">
              <h3 className="filters-title">FILTERS</h3>
              
              {/* Filter Sections */}
              <div className="filter-sections">
                <div className="filter-section">
                  <div className="filter-header">
                    <span>Availability</span>
                    <ChevronDown size={16} className="chevron-icon" />
                  </div>
                  <div className="filter-options">
                    <label className="filter-option">
                      <input type="checkbox" className="shop-checkbox" />
                      <span>Availability</span>
                    </label>
                    <label className="filter-option">
                      <input type="checkbox" className="shop-checkbox" />
                      <span>Out Of Stock</span>
                    </label>
                  </div>
                </div>

                {['Category', 'Colors', 'Price Range', 'Collections', 'Ratings'].map((filter) => (
                  <div key={filter} className="filter-section">
                    <div className="filter-header border-top">
                      <span>{filter}</span>
                      <ChevronDown size={16} className="chevron-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="brand-section">
              <h1 className="brand-name">INK & THREADS</h1>
            </div>
          </div>
        </aside>

        {/* Products Area - Scrollable */}
        <main className="products-scroll-area">
          <div className="products-container">
            <h2 className="products-title">PRODUCTS</h2>

            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < product.rating ? 'star-filled' : 'star-empty'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Product Image */}
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>

                  <h3 className="product-name">{product.name}</h3>
                  <button className="product-button">Add</button>
                  <p className="product-price">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;

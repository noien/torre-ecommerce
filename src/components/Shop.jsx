import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Shoppage.css";

const Shop = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const products = [
    // Your product data here
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#1f2937]">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#1a1a1a] p-6 overflow-y-auto">
        <nav className="mb-8">
          <div className="hamburger-menu mb-6">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          <div className="space-y-4">
            <a href="/" className="nav-link">Home</a>
            <a href="/patches" className="nav-link">Patches</a>
            <a href="/shop" className="nav-link">Caps</a>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="search-container mb-8">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-gray-600 rounded px-4 py-2"
          />
        </div>

        {/* Filters */}
        <div className="filters space-y-6">
          <div className="filter-section">
            <h3 className="text-white mb-2">Availability</h3>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>In Stock</span>
            </label>
          </div>
          {/* Add more filter sections */}
        </div>

        {/* Brand Logo */}
        <div className="mt-auto pt-8">
          <h1 className="text-4xl font-light">INK & THREADS</h1>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">PRODUCTS</h2>
          <div className="cart-icon">🛒</div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="flex justify-center mb-2">
                {renderStars(product.rating)}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              <button className="w-full py-2 border border-gray-400 rounded hover:bg-gray-700 transition">
                Add
              </button>
              <p className="text-sm text-gray-400 mt-2">{product.price}</p>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="text-center mt-12">
          <button className="text-white text-lg hover:underline">More</button>
        </div>

        {/* Approach Section */}
        <section className="mt-16 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            OUR APPROACH TO FASHION DESIGN
          </h2>
          <p className="text-gray-300">
            At Ink & Threads, we combine creativity and craftsmanship to deliver timeless styles. 
            Each piece is thoughtfully designed and carefully made to ensure lasting quality, 
            comfort, and a refined finish.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Shop;
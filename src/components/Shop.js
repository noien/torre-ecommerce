import React, { useState } from "react";
import bonet from "../assets/bonet.png";
import trucker from "../assets/trucker.png";
import hat1 from "../assets/hat1.png";
import dadcap from "../assets/dadcap.png";
import closed from "../assets/closed.png";

export default function ShopPage() {
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Trucker", price: "₱ 899 - 1099", image: trucker, rating: 4 },
    { id: 2, name: "Fitted", price: "₱ P149 - 1299", image: bonet, rating: 3 },
    { id: 3, name: "Baseball Cap", price: "₱ P1249 - 1499", image: dadcap, rating: 5 },
    { id: 4, name: "Cargo Hat", price: "₱ P1299 - 1499", image: hat1, rating: 4 },
    { id: 5, name: "Closed", price: "₱ P1299 - 1499", image: closed, rating: 5 },
    { id: 6, name: "Visor", price: "₱ P1699 - 1699", image: hat1, rating: 2 },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-neutral-800 p-6 flex flex-col h-screen sticky top-0">
        {/* Navigation */}
        <nav className="flex gap-6 mb-8 pt-4">
          <a href="#" className="text-white text-sm hover:text-gray-300">Home</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">Patches</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">Caps</a>
        </nav>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-neutral-900 border border-neutral-600 text-white px-3 py-2 rounded text-sm flex-1 placeholder-gray-400"
          />
          <button className="bg-neutral-700 text-white px-4 py-2 rounded text-sm hover:bg-neutral-600">
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-4">Filters</h3>
          
          <div className="mb-5">
            <label className="block text-white text-sm mb-2">Availability</label>
            <div className="space-y-2">
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-white">Availability</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-white">Out Of Stock</span>
              </label>
            </div>
          </div>

          {["Category", "Colors", "Price Range", "Collections", "Ratings"].map((filter) => (
            <div key={filter} className="mb-5">
              <label className="block text-white text-sm mb-2">{filter}</label>
              <select className="w-full bg-neutral-900 border border-neutral-600 text-white px-3 py-2 rounded text-sm">
                <option>Select</option>
              </select>
            </div>
          ))}
        </div>

        {/* Brand Logo at Bottom */}
        <div className="mt-auto">
          <div className="text-white text-3xl font-bold leading-tight tracking-tight">
            INK &<br />
            THREADS
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 bg-black p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold tracking-wide">PRODUCTS</h2>
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
            🛒
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="shop-product-card w-full">
              {/* Stars at top */}
              <div className="mb-2 flex justify-center">{renderStars(product.rating)}</div>
              {/* Product Image - smaller, card style */}
              <div className="shop-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '4rem', height: '4rem', objectFit: 'contain' }}
                />
              </div>
              {/* Product Name */}
              <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
              {/* Add Button */}
              <button className="bg-neutral-600 text-white px-4 py-1 rounded text-xs hover:bg-neutral-500 mb-1 w-full">
                Add
              </button>
              {/* Price at bottom */}
              <p className="text-gray-400 text-xs">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import React, { useState, useEffect } from "react";

const ProductGrid = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(6); // first 6 products

  // infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        setVisibleProducts((prev) => prev + 6);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-6 sticky top-0 h-screen border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Availability</h3>
            <label className="block">
              <input type="checkbox" /> Available
            </label>
            <label className="block">
              <input type="checkbox" /> Out of Stock
            </label>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">INK & THREADS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, visibleProducts).map((product, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-contain mb-4 rounded-xl"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-2">
                ₱ {product.price_min} - {product.price_max}
              </p>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">
                Add
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;

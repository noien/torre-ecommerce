import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.priceMin) || 0) * (item.qty || 1),
    0
  );

  const handleCheckout = () => {
    alert("✅ Order placed successfully! Thank you for shopping with Ink & Threads.");
    localStorage.removeItem("cart");
    navigate("/caps");
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-sans pb-20">
      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#121212]/90 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
            </div>
            <button onClick={() => navigate("/")} className="hover:text-blue-400">
              Home
            </button>
            <button onClick={() => navigate("/caps")} className="hover:text-blue-400">
              Caps
            </button>
            <button onClick={() => navigate("/patches")} className="hover:text-blue-400">
              Patches
            </button>
          </div>

          <Link to="/cart" className="text-2xl hover:text-blue-400" title="Cart">
            🛒
          </Link>
        </div>
      </nav>

      {/* 🧾 MAIN CONTENT */}
      <div className="pt-32 px-4 sm:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout Summary</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle size={80} className="text-green-500 mb-4" />
            <p className="text-gray-300 mb-4">Your cart is empty. Add items before checking out!</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate("/caps")}
                className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                Shop Caps
              </button>
              <button
                onClick={() => navigate("/patches")}
                className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                Shop Patches
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 🛍 ITEMS LIST */}
            <div className="flex-1 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex flex-col sm:flex-row items-center bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 gap-4 hover:shadow-lg transition"
                >
                  <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">Category: {item.category}</p>
                    <p className="text-gray-200 font-medium">
                      ₱{Number(item.priceMin).toLocaleString()} × {item.qty || 1}
                    </p>
                  </div>

                  <div className="text-gray-100 font-semibold text-lg">
                    ₱{(Number(item.priceMin) * (item.qty || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 🧮 ORDER SUMMARY */}
            <aside className="w-full lg:w-96 bg-[#242424] border border-gray-700 rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between py-2 text-gray-300">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="border-t border-gray-700 mt-3 mb-4"></div>
              <div className="flex justify-between text-xl font-bold text-white mb-6">
                <span>Total</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleCheckout}
                  className="w-56 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Place Order
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

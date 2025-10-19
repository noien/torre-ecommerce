import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, User, CreditCard, CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.priceMin || 0) * (item.qty || 1),
    0
  );
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    localStorage.removeItem("cart");
    localStorage.setItem("showSplashAfterCheckout", "true");

    // Show success message
    setShowSuccess(true);

    // Delay navigation for animation
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    
    <div
      className="min-h-screen text-white font-sans relative overflow-hidden"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#2a2a2a",
        opacity: 0.9,
      }}
    >
      {/* Back Button */}
        <button
          onClick={() => navigate("/cart")}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-violet-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Cart</span>
        </button>


      {/* Checkout Content */}
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-semibold text-center mb-10">Checkout</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-gray-400 mb-4 text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate("/caps")}
              className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg transition"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT — FORM */}
            <form
              onSubmit={handlePlaceOrder}
              className="bg-gray-800/70 p-8 rounded-2xl shadow-lg space-y-6"
              style={{
                backgroundColor: "#2a2a2a",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
              }}
            >
              <h2 className="text-2xl font-semibold mb-2">Billing Details</h2>

              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-300">
                  <User size={18} /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Juan Dela Cruz"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-300">
                  <Phone size={18} /> Contact Number
                </label>
                <input
                  type="tel"
                  required
                  pattern="09[0-9]{9}"
                  placeholder="09123456789"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-300">
                  <MapPin size={18} /> Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Mabini St, San Pablo, Laguna"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="flex items-center gap-2 mb-1 text-gray-300">
                  <CreditCard size={18} /> Payment Method
                </label>
                <select
                  required
                  defaultValue="cod"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="gcash">GCash</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>

              <button
                  type="submit"
                  className="w-full mt-4 font-semibold py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition border-none cursor-pointer"
                >
                  Place Order
                </button>
            </form>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg"
              style={{
                backgroundColor: "#2a2a2a",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",       
              }}
            >
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="divide-y divide-gray-700 mb-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 space-x-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.qty} × ₱{item.priceMin}
                      </p>
                    </div>
                    <p className="font-semibold text-violet-400">
                      ₱{(item.priceMin * item.qty).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `₱${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-violet-400 border-t border-gray-700 pt-2">
                  <span>Total:</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS PROMPT MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl text-center transform transition-all scale-100 animate-scaleUp">
            <CheckCircle className="mx-auto mb-4 text-green-400" size={60} />
            <h2 className="text-2xl font-bold mb-2">Order Successful!</h2>
            <p className="text-gray-300 mb-4">
              Thank you for your purchase. Redirecting to homepage...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

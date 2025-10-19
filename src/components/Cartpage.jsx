import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cartpage.css";
import emptyCartImg from "../assets/cat-cart.png";
import { MinusCircle } from "lucide-react"; // 


const Cartpage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id, source) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.source === source)));
  };

  const updateQuantity = (id, source, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.source === source) {
            const nextQty = Math.max(0, (item.qty || 1) + delta);
            return { ...item, qty: nextQty };
          }
          return item;
        })
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.priceMin || 0) * (item.qty || 1),
    0
  );

  return (
    <div className="cart-page-container">
      {/* 🔝 Navigation Bar */}
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
            <button onClick={() => navigate("/caps")} className="shop-nav-link">
              Caps
            </button>
            <button onClick={() => navigate("/patches")} className="shop-nav-link">
              Patches
            </button>
          </div>

          <Link to="/cart" className="shop-cart cart-icon" title="Cart">
            🛒
          </Link>
        </div>
      </nav>

      {/* 🧺 Main Cart Section */}
      <div style={{ paddingTop: "7rem" }}>
        <h1 className="cart-title">Your Cart</h1>

        {/* 🕳️ Empty Cart State */}
        {cart.length === 0 && (
          <div className="cart-empty">
            <img
              src={emptyCartImg}
              alt="Empty Cart"
              className="cart-empty-image"
              onClick={() => navigate("/caps")}
            />
            <p className="cart-empty-text">
              Your cart is currently empty. Start shopping now!
            </p>
            <div className="cart-empty-actions">
              <button className="btn-primary" onClick={() => navigate("/caps")}>
                Shop Caps
              </button>
              <button className="btn-secondary" onClick={() => navigate("/patches")}>
                Shop Patches
              </button>
            </div>
          </div>
        )}

        {/* 🧾 Cart With Items */}
        {cart.length > 0 && (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div
                  key={`${item.source}-${item.id}-${index}`}
                  className="cart-item-card"
                >
                  <div className="cart-item-image-wrapper-with-remove">
                    <div className="cart-item-image-link">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>

                    {/* ✅ Changed remove button to MinusCircle icon */}
                    <button
                      className="cart-image-remove-btn"
                      onClick={() => removeItem(item.id, item.source)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <MinusCircle size={20} />
                    </button>
                  </div>

                  <div className="cart-item-details-container">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-details">Category: {item.category}</p>
                    <p className="cart-item-price-small">{item.priceLabel}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-adjuster">
                      <button
                        onClick={() => updateQuantity(item.id, item.source, -1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-value">{item.qty || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.source, +1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Item Total: ₱
                      {(Number(item.priceMin || 0) * (item.qty || 1)).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="order-summary">
              <h2>Order Summary</h2>
              <hr />
              <div className="summary-row">
                <span>Subtotal ({cart.length} items):</span>
                <span>₱ {subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping Estimate:</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="summary-total">
                <span>Order Total:</span>
                <span>₱ {subtotal.toLocaleString()}</span>
              </div>

              {/* ✅ Centered Checkout Button */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartpage;

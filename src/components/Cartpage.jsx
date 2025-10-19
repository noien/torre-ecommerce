import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cartpage.css";
import emptyCartImg from "../assets/cat-cart.png"; // adjusted import
import { X } from "lucide-react";

import { allProducts } from "../routes/Products.jsx";
import { allPatchProducts } from "../routes/Products2.jsx";

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
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const removeItem = (id, source) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.source === source)));
  };

  const updateQuantity = (id, source, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (!(item.id === id && item.source === source)) return item;
          const nextQty = Math.max(0, (item.qty || 1) + delta);
          return { ...item, qty: nextQty };
        })
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.priceMin || 0) * (item.qty || 1),
    0
  );

  // fallback sample patches for empty cart
  const showcasePatches = allPatchProducts.slice(0, 4);

  const ShowcaseItem = ({ product }) => (
    <div
      className="product-card"
      onClick={() => navigate(`/patches/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.priceLabel}</p>
    </div>
  );

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Cart</h1>

      {/* --- EMPTY CART --- */}
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

      {/* --- CART WITH ITEMS --- */}
      {cart.length > 0 && (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.map((item, index) => (
              <div key={`${item.source}-${item.id}-${index}`} className="cart-item-card">
                <div className="cart-item-image-wrapper-with-remove">
                  <div className="cart-item-image-link">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                  </div>
                  <button
                    className="cart-image-remove-btn"
                    onClick={() => removeItem(item.id, item.source)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={16} />
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
            <hr />
            <div className="summary-total">
              <span>Order Total:</span>
              <span>₱ {subtotal.toLocaleString()}</span>
            </div>
            <button
              className="btn-primary"
              onClick={() => alert("Proceed to checkout (demo)")}
            >
              PROCEED TO CHECKOUT
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cartpage;

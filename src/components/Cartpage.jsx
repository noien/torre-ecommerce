import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cartpage.css";
import emptyCartImg from "../assets/cat-cart.png";
import { X } from "lucide-react"; // Import a removal icon

// Load products for the empty cart showcase
import { allProducts } from '../routes/Products.jsx'; 
import { allPatchProducts } from '../routes/Products2.jsx'; 

const Cartpage = () => {
  const navigate = useNavigate();

  // load cart from localStorage (structure: [{ id, name, priceMin, priceMax, priceLabel, image, qty }])
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // persist cart changes
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // KEEP: This function is still needed for removing items via the new button.
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  
  // KEEP: The user explicitly requested to keep the emptyCart function
  const clearCart = () => setCart([]);
  // const emptyCart = clearCart; // Alias for clarity/legacy (optional)

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = Math.max(0, (item.qty || 1) + delta);
          return { ...item, qty: nextQty };
        })
        .filter((i) => i.qty > 0) // remove items with qty 0
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.priceMin || 0) * (item.qty || 1),
    0
  );

  // For the empty cart showcase section (using the provided logic)
  const showcasePatches = allPatchProducts.slice(0, 4);

  const ShowcaseItem = ({ product }) => (
    <div className="product-card" onClick={() => navigate(`/patches/${product.id}`)}>
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

      {/* RENDER WHEN CART IS EMPTY */}
      {cart.length === 0 && (
        <div className="cart-empty">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            className="cart-empty-image"
            onClick={() => navigate("/shop")} // Makes the image clickable to shop
          />
          <p className="cart-empty-text">
            Your cart is currently empty. Start shopping now!
          </p>
          <div className="cart-empty-actions">
            <button className="btn-primary" onClick={() => navigate("/shop")}>
              Shop Caps
            </button>
            <button className="btn-secondary" onClick={() => navigate("/patches")}>
              Shop Patches
            </button>
          </div>

        </div>
      )}

      {/* RENDER WHEN CART HAS ITEMS (AND SUMMARY) */}
      {cart.length > 0 && (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                
                {/* MODIFIED: Image container now has the absolute-positioned remove button */}
                <div className="cart-item-image-wrapper-with-remove">
                    {/* The link to item details is on the image */}
                    <Link to={`/shop/${item.id}`} className="cart-item-image-link"> 
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                    </Link>
                    {/* The remove button at the image container card of the item */}
                    <button 
                        className="cart-image-remove-btn" 
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                    >
                        <X size={16} /> {/* Using the imported X icon */}
                    </button>
                </div>

                <div className="cart-item-details-container">
                  <Link to={`/shop/${item.id}`} className="cart-item-name-link">
                    <h3 className="cart-item-name">{item.name}</h3>
                  </Link>
                  <p className="cart-item-details">Size: One Size</p>
                  <p className="cart-item-price-small">{item.priceLabel}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-adjuster">
                    <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn" aria-label="Decrease quantity">
                      -
                    </button>
                    <span className="qty-value">{item.qty || 1}</span>
                    <button onClick={() => updateQuantity(item.id, +1)} className="qty-btn" aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  {/* Removed the original "Remove" button here */}
                  <div className="cart-item-total">
                    Item Total: ₱ {(Number(item.priceMin || 0) * (item.qty || 1)).toLocaleString()}
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
            <button className="btn-primary" onClick={() => alert("Proceed to checkout (demo)")}>
              PROCEED TO CHECKOUT
            </button>
            {/* REMOVED: Clear Cart button as requested */}
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cartpage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { allProducts } from '../routes/Products.jsx'; 
import { allPatchProducts } from '../routes/Products2.jsx'; 
import '../styles/Cartpage.css'; 

// Helper function to mock a cart item component
const CartItem = ({ item, updateQuantity, removeItem }) => (
    <div className="cart-item-card">
        <img 
            src={item.image} 
            alt={item.name} 
            className="cart-item-image"
        />
        
        {/* Item Details */}
        <div className="flex-grow">
            <h3 className="cart-item-name">{item.name}</h3>
            {/* Added a remove button for a common design pattern */}
            <button 
                className="text-red-400 text-sm mt-1 hover:text-red-500 transition"
                onClick={() => removeItem(item.id)}
            >
                Remove
            </button>
        </div>

        {/* Quantity and Price section is aligned right */}
        <div className="flex flex-col items-end justify-center gap-2 ml-auto">
            <p className="cart-item-price">₱ {item.priceMin.toLocaleString()}</p>
            
            {/* Quantity Adjuster */}
            <div className="quantity-adjuster">
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span className="text-white font-semibold">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            
            <p className="text-sm text-gray-400 mt-1">Item Total: ₱ {(item.priceMin * item.quantity).toLocaleString()}</p>
        </div>
    </div>
);

const Cartpage = () => {
    const navigate = useNavigate();

    // Mock cart items data (using your existing product structures)
    const [cartItems, setCartItems] = useState([
        { ...allProducts.find(p => p.id === 1) || { id: 1, name: "Trucker Cap", priceMin: 899, image: "" }, quantity: 2 }, 
        { ...allProducts.find(p => p.id === 2) || { id: 2, name: "Fitted Cap", priceMin: 1149, image: "" }, quantity: 1 }, 
        { ...allPatchProducts.find(p => p.id === 1) || { id: 3, name: "Cartoon Cat Patch", priceMin: 299, image: "" }, quantity: 3 }, 
    ]);

    // Mock cart functionality
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate Subtotal and Total
    const subtotal = cartItems.reduce((sum, item) => 
        sum + (item.priceMin * item.quantity), 0
    );
    const shipping = subtotal > 0 ? 250 : 0; 
    const total = subtotal + shipping;

    return (
        <div className="cart-page-container">
            {/* Header/Navbar structure mimicking Shop.jsx for consistency */}
            <nav className="shop-navbar">
                <div className="shop-nav-content">
                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                        <div className="hamburger-menu" aria-hidden="true" onClick={() => navigate("/")}>
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                        </div>
                        <button onClick={() => navigate("/")} className="shop-nav-link">Home</button>
                        <button onClick={() => navigate("/patches")} className="shop-nav-link">Patches</button>
                        <button onClick={() => navigate("/shop")} className="shop-nav-link">Caps</button>
                    </div>

                    <Link to="/cart" className="shop-cart cart-icon" title="Cart">
                        🛒
                    </Link>
                </div>
            </nav>

            <h1 className="cart-title">Your Cart</h1>
            
            <div className="cart-main-content">
                {/* Left Column: Cart Items List */}
                <div className="cart-items-list">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem 
                                key={item.id} 
                                item={item} 
                                updateQuantity={updateQuantity} 
                                removeItem={removeItem} 
                            />
                        ))
                    ) : (
                        <div className="text-center p-10 bg-[#1a232f] border-2 border-white/10 rounded-xl">
                            <p className="text-xl text-gray-400">Your cart is empty. Start shopping now!</p>
                            <button className="btn-checkout w-auto mt-6" onClick={() => navigate("/shop")}>Go to Shop</button>
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary (Discards Payment) */}
                <div className="order-summary-panel">
                    <h2 className="summary-title">Order Summary</h2>
                    
                    <div>
                        <div className="summary-line">
                            <span>Subtotal ({cartItems.length} items):</span>
                            <span>₱ {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping Estimate:</span>
                            <span className={shipping > 0 ? "text-green-400" : ""}>
                                {shipping > 0 ? `₱ ${shipping.toLocaleString()}` : "FREE"}
                            </span>
                        </div>
                        <div className="summary-total summary-line">
                            <span>Order Total:</span>
                            <span>₱ {total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Button for next step: Proceed to Checkout */}
                    <button 
                        className="btn-checkout"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                    
                    <p className="text-sm text-gray-400 mt-4 text-center">Shipping and taxes calculated at checkout.</p>
                </div>
            </div>
        </div>
    );
};

export default Cartpage;
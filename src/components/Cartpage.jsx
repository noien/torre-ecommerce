import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CORRECTED PATHS: Using '../routes/' prefix as seen in Shop.jsx imports
import { allProducts } from '../routes/Products.jsx'; 
import { allPatchProducts } from '../routes/Products2.jsx'; 
// CORRECTED PATH: Matching CSS import style from other pages
import '../styles/Cartpage.css'; 

// Helper function to mock a cart item component
const CartItem = ({ item, updateQuantity, removeItem }) => (
    <div className="cart-item-card transition duration-300 hover:shadow-xl hover:scale-[1.01]">
        <img 
            // NOTE: Product 1 and 2 image paths are available via the imported product objects
            src={item.image} 
            alt={item.name} 
            className="cart-item-image"
        />
        
        <div className="flex-grow">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-details">Color: Black | Size: One Size</p>
            <p className="cart-item-details">Stock: In Stock</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
            <p className="cart-item-price">{item.priceLabel}</p>
            <div className="quantity-adjuster">
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span className="text-white font-semibold">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button 
                className="text-red-400 text-sm mt-1 hover:text-red-500 transition"
                onClick={() => removeItem(item.id)}
            >
                Remove
            </button>
        </div>
    </div>
);

// Helper function to mock a showcase card (reusing product card style)
const ShowcaseItem = ({ product }) => (
    <div className="product-card p-4 flex flex-col items-center bg-[#1a232f] border-2 border-white/10 rounded-xl transition duration-300 hover:border-blue-500 hover:shadow-lg">
        <div className="product-image-wrapper w-full aspect-square mb-3 bg-gray-200 rounded-lg p-2 overflow-hidden">
             <img 
                src={product.image || product.name} 
                alt={product.name} 
                className="w-full h-full object-contain"
            />
        </div>
        <h4 className="product-name text-center text-lg">{product.name}</h4>
        <p className="text-gray-400 text-sm mb-4">{product.priceLabel}</p>
        <button className="product-button w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
            Add to Cart
        </button>
    </div>
);

const Cartpage = () => {
    const navigate = useNavigate();

    // Mock the state for the cart items
    const [cartItems, setCartItems] = useState([
        // Product 1: Trucker Cap (id: 1)
        { ...allProducts.find(p => p.id === 1), quantity: 1, priceMin: 899 }, 
        // Product 2: Fitted Cap (id: 2)
        { ...allProducts.find(p => p.id === 2), quantity: 1, priceMin: 1149 }, 
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

    // Calculate Subtotal
    const subtotal = cartItems.reduce((sum, item) => 
        sum + (item.priceMin * item.quantity), 0
    );
    const shipping = 250; 
    const total = subtotal + shipping;

    // Showcase products (Patches that pair well with the caps)
    const showcasePatches = [
        allPatchProducts.find(p => p.id === 1), // Custom Patch
        allPatchProducts.find(p => p.id === 5), // Logo Patch
    ].filter(p => p); 

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

                    {/* Cart icon is active page, so no link needed here, or link to self */}
                    <div className="shop-cart cart-icon" title="Cart">
                        🛒
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <h1 className="cart-title">Your Shopping Cart ({cartItems.length} Items)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Cart Items List (2/3 width) */}
                    <div className="lg:col-span-2">
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
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary (1/3 width) */}
                    <div className="lg:col-span-1 bg-[#1a232f] border-2 border-white/10 p-6 rounded-xl shadow-xl h-fit sticky top-24">
                        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Order Summary</h2>
                        
                        <div className="space-y-3 text-lg">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₱ {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Estimate:</span>
                                <span className="text-green-400">₱ {shipping.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-700 text-2xl font-bold">
                                <span>Order Total:</span>
                                <span>₱ {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="btn-checkout mt-8">
                            Proceed to Checkout
                        </button>
                        
                        <p className="text-sm text-gray-400 mt-4 text-center">Shipping and taxes calculated at checkout.</p>
                    </div>
                </div>

                {/* Showcase Section for Products 1 & 2 Related Items */}
                <h2 className="showcase-header">Complete Your Cap Look</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {showcasePatches.map(product => (
                        <ShowcaseItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cartpage;
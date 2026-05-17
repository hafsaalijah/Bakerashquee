/* eslint-disable */
import React, { useState } from "react";
import { categories, menuItems } from "../data/menuData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("brownies");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number!");
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          items: cart,
          totalPrice: total
        })
      });
      await res.json();
      toast.success("Order placed! We'll contact you soon 🎉");
      setCart([]);
      setCheckout(false);
      setShowCart(false);
      setForm({ name: "", phone: "" });
    } catch (err) {
      toast.error("Something went wrong, please try again!");
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu 🍫</h1>
        <p>All baked fresh to order with love</p>
        <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
        </button>
      </div>

      <div className="category-tabs">
        {categories.filter(c => c.id !== "customCakes").map(cat => (
          <button
            key={cat.id}
            className={`cat-tab ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
        <Link to="/custom-order" className="cat-tab custom-tab">Custom Cakes 🎂</Link>
      </div>

      <div className="menu-grid">
        {menuItems[activeCategory].map(item => (
          <div key={item.id} className="menu-card">
            {/* REPLACED EMOJI WITH IMAGE HERE */}
            <div className="menu-card-image">
              <img src="/item.png" alt={item.name} />
            </div>
            {item.bestseller && <span className="bestseller-tag">⭐ Bestseller</span>}
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="menu-card-footer">
              <span className="price">Rs {item.price}</span>
              <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-overlay">
          <div className="cart-panel">
            <button className="close-cart" onClick={() => { setShowCart(false); setCheckout(false); }}>✕</button>
            <h2>Your Cart 🛒</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty!</p>
            ) : (
              <>
                {!checkout ? (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div>
                          <strong>{item.name}</strong> x{item.quantity}
                        </div>
                        <div>
                          Rs {item.price * item.quantity}
                          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                        </div>
                      </div>
                    ))}
                    <div className="cart-total">Total: <strong>Rs {total}</strong></div>
                    <button className="checkout-btn" onClick={() => setCheckout(true)}>Checkout →</button>
                  </>
                ) : (
                  <div className="checkout-form">
                    <h3>Your Details</h3>
                    <input
                      placeholder="Your Name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                    <div className="cart-total">Total: <strong>Rs {total}</strong></div>
                    <button className="checkout-btn" onClick={placeOrder}>Place Order 🎉</button>
                    <button className="back-btn" onClick={() => setCheckout(false)}>← Back</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
import React from "react";
import { Link } from "react-router-dom";
import { bestsellers } from "../data/menuData";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">Freshly Made with Love 🩷</p>
          <h1>Handcrafted Bakes<br />Delivered to Your Door</h1>
          <p className="hero-sub">Brownies, cookies, cinnamon rolls, custom cakes and more — all made fresh in Lahore.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
            <Link to="/custom-order" className="btn-secondary">Request Custom Cake</Link>
          </div>
        </div>
      </section>

      <section className="bestsellers">
        <h2>Our Bestsellers ⭐</h2>
        <p className="section-sub">The ones everyone keeps coming back for</p>
        <div className="bestsellers-grid">
          {bestsellers.map(item => (
            <div key={item.id} className="bestseller-card">
              <div className="card-emoji">
                <img src="/item.png" alt={item.name} /> 
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">Rs {item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <h2>Made with Love in Lahore 🩷</h2>
          <p>Bakerashque is a home bakery crafting fresh brownies, brookies, cookies, cinnamon rolls, bento cakes and custom cakes. Every order is made fresh with quality ingredients and a whole lot of love. DM us on Instagram or WhatsApp to place your order!</p>
          <a href="https://www.instagram.com/bakerashque" target="_blank" rel="noopener noreferrer" className="btn-instagram">Follow on Instagram</a>
        </div>
      </section>

      <section className="contact-strip">
        <h2>Ready to Order? 🎂</h2>
        <p>Place a regular order from our menu or request a custom cake!</p>
        <div className="contact-buttons">
          <Link to="/menu" className="btn-primary">Order Now</Link>
          <a href="https://www.instagram.com/direct/t/17842896446789984/" target="_blank" rel="noreferrer" className="btn-instagram">DM Us</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
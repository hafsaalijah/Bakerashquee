import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
function Navbar(){
    const [menuOpen, setMenuOpen]=useState(false);
    return(
        <nav className="navbar">
            <div className="navbar-container">
              <Link to="/" className="navbar-logo">
                🎂 Bakerashque
              </Link>
              <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={()=> setMenuOpen(false)}>Home</Link>
                <Link to="/menu" onClick={()=> setMenuOpen(false)}>Menu</Link>
                <Link to="/custom-order" onClick={()=>setMenuOpen(false)}>Custom Order</Link> 
                <a href="https://www.instagram.com/direct/t/17842896446789984/" target="_blank" rel="noreferrer" className="instagram-btn">DM Us 😋</a>
              </div>
              <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
                {menuOpen ? "X" : "☰"}
              </button>
            </div>
        </nav>
    );
}
export default Navbar;
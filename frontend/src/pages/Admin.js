/* eslint-disable */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Admin.css";

function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  const login = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        toast.success("Welcome back! 🎂");
      } else {
        toast.error("Wrong password!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then(r => r.json()).then(setOrders).catch(console.log);
    fetch(`${process.env.REACT_APP_API_URL}/api/quotes`)
      .then(r => r.json()).then(setQuotes).catch(console.log);
  }, [token]);

  if (!token) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>🎂 Admin Login</h2>
          <p>Bakerashque Dashboard</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
          />
          <button onClick={login}>Login →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎂 Bakerashque Dashboard</h1>
        <button className="logout-btn" onClick={() => { localStorage.removeItem("adminToken"); setToken(""); }}>Logout</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h3>{quotes.length}</h3>
          <p>Quote Requests</p>
        </div>
        <div className="stat-card">
          <h3>Rs {orders.reduce((s, o) => s + o.totalPrice, 0).toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>Orders ({orders.length})</button>
        <button className={activeTab === "quotes" ? "active" : ""} onClick={() => setActiveTab("quotes")}>Quote Requests ({quotes.length})</button>
      </div>

      {activeTab === "orders" && (
        <div className="admin-table-container">
          {orders.length === 0 ? <p className="empty">No orders yet!</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>
                    <td>{order.phone}</td>
                    <td>{order.items.map(i => `${i.name} x${i.quantity}`).join(", ")}</td>
                    <td>Rs {order.totalPrice}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "quotes" && (
        <div className="admin-table-container">
          {quotes.length === 0 ? <p className="empty">No quote requests yet!</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Cake Type</th>
                  <th>Size</th>
                  <th>Flavour</th>
                  <th>Occasion</th>
                  <th>Budget</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(quote => (
                  <tr key={quote._id}>
                    <td>{quote.customerName}</td>
                    <td>{quote.phone}</td>
                    <td>{quote.cakeType}</td>
                    <td>{quote.size}</td>
                    <td>{quote.flavour}</td>
                    <td>{quote.occasion}</td>
                    <td>{quote.budget}</td>
                    <td>{quote.designDescription}</td>
                    <td>{new Date(quote.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Admin.css";

function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [orders, setOrders] = useState([]);
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
    
    // Fetch orders from your existing endpoint
    fetch(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then(r => r.json())
      .then(setOrders)
      .catch(console.log);
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
          <h3>Rs {orders.reduce((s, o) => s + o.totalPrice, 0).toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="admin-table-container">
        {orders.length === 0 ? (
          <p className="empty">No orders yet! 🍰</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
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
                  <td>
                    <span className={`status-badge status-${order.status || "pending"}`}>
                      {order.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
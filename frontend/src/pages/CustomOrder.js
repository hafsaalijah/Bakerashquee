import React, { useState } from "react";
import { toast } from "react-toastify";
import "./CustomOrder.css";

function CustomOrder() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    cakeType: "",
    size: "",
    flavour: "",
    designDescription: "",
    occasion: "",
    budget: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.phone || !form.cakeType) {
      toast.error("Please fill in your name, phone, and cake type!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (image) formData.append("image", image);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/quotes`, {
        method: "POST",
        body: formData
      });
      await res.json();
      toast.success("Quote request sent! We'll get back to you soon 🎂");
      setForm({ customerName: "", phone: "", cakeType: "", size: "", flavour: "", designDescription: "", occasion: "", budget: "" });
      setImage(null);
    } catch (err) {
      toast.error("Something went wrong, please try again!");
    }
    setLoading(false);
  };

  return (
    <div className="custom-page">
      <div className="custom-header">
        <h1>Custom Cake Order 🎂</h1>
        <p>Fill in the details and we'll get back to you with a quote!</p>
      </div>

      <div className="custom-form-container">
        <div className="form-group">
          <label>Your Name *</label>
          <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="e.g. Hafsa" />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 03001234567" />
        </div>
        <div className="form-group">
          <label>Cake Type *</label>
          <select name="cakeType" value={form.cakeType} onChange={handleChange}>
            <option value="">Select cake type</option>
            <option value="Bento Cake">Bento Cake</option>
            <option value="Birthday Cake">Birthday Cake</option>
            <option value="Wedding Cake">Wedding Cake</option>
            <option value="Anniversary Cake">Anniversary Cake</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Size / Servings</label>
          <select name="size" value={form.size} onChange={handleChange}>
            <option value="">Select size</option>
            <option value="Mini (1-2 people)">Mini (1-2 people)</option>
            <option value="Small (4-6 people)">Small (4-6 people)</option>
            <option value="Medium (8-10 people)">Medium (8-10 people)</option>
            <option value="Large (12+ people)">Large (12+ people)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Flavour</label>
          <input name="flavour" value={form.flavour} onChange={handleChange} placeholder="e.g. Chocolate, Red Velvet, Vanilla" />
        </div>
        <div className="form-group">
          <label>Occasion</label>
          <input name="occasion" value={form.occasion} onChange={handleChange} placeholder="e.g. Birthday, Anniversary, Just Because" />
        </div>
        <div className="form-group">
          <label>Budget (Rs)</label>
          <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 2000-3000" />
        </div>
        <div className="form-group">
          <label>Design Description</label>
          <textarea name="designDescription" value={form.designDescription} onChange={handleChange} placeholder="Describe your dream cake! Colors, theme, any specific decorations..." rows={4} />
        </div>
        <div className="form-group">
          <label>Inspo Photo (optional)</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
          {image && <p className="file-name">📎 {image.name}</p>}
        </div>
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send Quote Request 🎂"}
        </button>
      </div>
    </div>
  );
}

export default CustomOrder;
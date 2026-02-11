import { useState } from "react";

const EditBillingAddress = () => {
  const [form, setForm] = useState({
    firstName: "aMANNNNNNN BHAI",
    lastName: "Tripathi",
    company: "",
    country: "India",
    address1: "30 West Rocky Oak Lane",
    address2: "Velit nostrum labor",
    city: "Saepe non sunt libe",
    state: "Maharashtra",
    pincode: "400058",
    phone: "7045300606",
    email: "intern@spay.live",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing Address Saved:", form);
  };

  return (
    <div className="account-content">
      <h1>Billing Address</h1>

      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-row">
          <div className="form-group">
            <label>First name *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last name *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Company name (optional)</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Country / Region *</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option>India</option>
          </select>
        </div>

        <div className="form-group">
          <label>Street address *</label>
          <input
            name="address1"
            value={form.address1}
            onChange={handleChange}
          />
          <input
            name="address2"
            value={form.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Town / City *</label>
          <input name="city" value={form.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>State *</label>
          <select name="state" value={form.state} onChange={handleChange}>
            <option>Maharashtra</option>
          </select>
        </div>

        <div className="form-group">
          <label>PIN Code *</label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email address *</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <button type="submit" className="save-btn">
          SAVE ADDRESS
        </button>
      </form>
    </div>
  );
};

export default EditBillingAddress;

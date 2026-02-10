export default function EditShippingAddress() {
  return (
    <div className="address-form-wrapper">
     <h1
  className="account-title"
  style={{
    fontFamily: '"Playfair Display", serif',
    fontSize: "44px",
    fontWeight: 700,
    lineHeight: "1.2",
    color: "#0f172a",
    marginBottom: "36px",
  }}
>
  Shipping Address
</h1>


      <form className="address-form">

        {/* NAME */}
        <div className="form-row">
          <div className="form-group">
            <label>First name *</label>
            <input type="text" defaultValue="aMANNNNNN BHAI" />
          </div>

          <div className="form-group">
            <label>Last name *</label>
            <input type="text" defaultValue="Tripathi" />
          </div>
        </div>

        {/* COMPANY */}
        <div className="form-group">
          <label>Company name (optional)</label>
          <input type="text" />
        </div>

        {/* COUNTRY */}
        <div className="form-group">
          <label>Country / Region *</label>
          <select>
            <option>India</option>
          </select>
        </div>

        {/* STREET */}
        <div className="form-group">
          <label>Street address *</label>
          <input type="text" defaultValue="30 West Rocky Oak Lane" />
          <input type="text" defaultValue="Velit nostrum labor" />
        </div>

        {/* CITY */}
        <div className="form-group">
          <label>Town / City *</label>
          <input type="text" defaultValue="Saepe non sunt libe" />
        </div>

        {/* STATE */}
        <div className="form-group">
          <label>State *</label>
          <select>
            <option>Maharashtra</option>
          </select>
        </div>

        {/* PIN */}
        <div className="form-group">
          <label>PIN Code *</label>
          <input type="text" defaultValue="400058" />
        </div>

        <button type="submit" className="save-btn">
          SAVE ADDRESS
        </button>

      </form>
    </div>
  );
}

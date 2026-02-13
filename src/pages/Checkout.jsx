import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const orderItems = cart.map((item) => ({
    id: item.id,
    name: item.title,
    price: Number(item.price),
    image: item.image || "/placeholder.png",
  }));

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* PAGE TITLE */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-2">Checkout</h1>
        <p className="text-gray-500">
          Complete your purchase securely in just a few steps
        </p>
      </div>

      {/* ===== OUTER CARD (BACKGROUND LAYER) ===== */}
      <div className="bg-[#FAFAFA] rounded-3xl mt-0 p-8 lg:p-14 shadow-sm">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_410px] gap-16">

          {/* ================= LEFT : FORM ================= */}
          <div className="space-y-14">

            {/* CONTACT */}
            <section className="max-w-xl">
              <h2 className="section-title">Contact</h2>
              <input type="email" placeholder="Email address" className="input" />
            </section>

            {/* BILLING */}
            <section className="max-w-xl">
              <h2 className="section-title">Billing Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input" placeholder="First name" />
                <input className="input" placeholder="Last name" />
              </div>

              <select className="input mt-4">
                <option>India</option>
              </select>

              <input className="input mt-4" placeholder="Street address" />
              <input className="input mt-4" placeholder="Apartment (optional)" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input className="input" placeholder="City" />
                <select className="input">
                  <option>Maharashtra</option>
                </select>
                <input className="input" placeholder="ZIP Code" />
              </div>

              <input className="input mt-4" placeholder="Phone number" />
              <textarea className="input mt-6" placeholder="Order notes (optional)" />
            </section>

            {/* SHIPPING */}
            <section className="max-w-xl">
              <h2 className="section-title">Shipping</h2>
              <div className="soft-box">
                🚚 Free shipping across India
              </div>
            </section>

            {/* PAYMENT */}
            <section className="max-w-xl">
              <h2 className="section-title">Payment Method</h2>

              <div className="card divide-y">
                {[
                  { key: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                  { key: "razorpay", label: "Card / NetBanking" },
                  { key: "airpay", label: "Airpay" },
                  { key: "sabpaisa", label: "Sabpaisa" },
                ].map((p) => (
                  <label
                    key={p.key}
                    className="flex gap-3 p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === p.key}
                      onChange={() => setPaymentMethod(p.key)}
                    />
                    <div>
                      <p className="font-medium">{p.label}</p>
                      {p.desc && (
                        <p className="text-sm text-gray-500">{p.desc}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <input type="checkbox" />
                <p className="text-sm text-gray-600">
                  I agree to the terms & conditions
                </p>
              </div>

              <button className="cta-btn">
                🔒 Place Order • ₹{subtotal.toLocaleString()}
              </button>
            </section>
          </div>

          {/* ================= RIGHT : ORDER SUMMARY ================= */}
          <aside className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {orderItems.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Your cart is empty
              </p>
            )}

            {orderItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} className="summary-img" />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug">
                    {item.name}
                  </p>
                </div>
                <p className="text-sm font-semibold text-red-500">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            ))}

            <div className="summary-totals">
              <div className="row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="row total">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 13px 14px;
          border-radius: 10px;
          font-size: 14px;
          background: white;
        }

        .section-title {
          font-size: 1.3rem;
          font-family: serif;
          margin-bottom: 1rem;
        }

        .soft-box {
          background: white;
          border: 1px dashed #e5e5e5;
          padding: 14px;
          border-radius: 12px;
          font-size: 14px;
        }

        .card {
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          background: white;
        }

        .cta-btn {
          margin-top: 2.5rem;
          width: 100%;
          padding: 15px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(to right, #ec4899, #ef4444);
        }

        .summary-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          height: fit-content;
          position: sticky;
          top: 120px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        .summary-title {
          font-family: serif;
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
        }

        .summary-item {
          display: flex;
          gap: 12px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid #eee;
        }

        .summary-img {
          width: 44px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .summary-totals {
          margin-top: 1.5rem;
          font-size: 14px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .row.total {
          font-weight: 600;
          font-size: 16px;
          padding-top: 12px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </section>
  );
}
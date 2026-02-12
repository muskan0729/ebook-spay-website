import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";

export default function Checkout() {
  const { data, loading, error } = useGet("cart");

  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    if (data?.items?.length > 0) {
      const items = data.items.map((item) => ({
        id: item.id,
        name: item.ebook.title,
        price: Number(item.price),
        qty: Number(item.quantity),
        total: Number(item.price) * Number(item.quantity),
        image: item.ebook.image || "/placeholder.png",
      }));

      setOrderItems(items);
      setSubtotal(Number(data.subtotal));
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading checkout…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Failed to load checkout
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ================= LEFT : FORM ================= */}
        <div className="space-y-12">

          {/* CONTACT */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif">Contact</h2>
              <Link to="/login" className="text-sm underline">
                Log in
              </Link>
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="w-full border px-4 py-3 rounded"
            />
          </div>

          {/* BILLING */}
          <div>
            <h2 className="text-xl font-serif mb-6">
              Billing Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" placeholder="First name *" />
              <input className="input" placeholder="Last name *" />
            </div>

            <select className="input mt-4">
              <option>India</option>
            </select>

            <input
              className="input mt-4"
              placeholder="House number and street name *"
            />

            <input
              className="input mt-4"
              placeholder="Apartment, suite, unit etc. (optional)"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input className="input" placeholder="Town / City *" />
              <select className="input">
                <option>Maharashtra</option>
              </select>
              <input className="input" placeholder="Postcode / ZIP *" />
            </div>

            <input
              className="input mt-4"
              placeholder="Phone *"
            />

            <textarea
              className="input mt-6"
              placeholder="Notes about your order, e.g. special notes for delivery."
            />
          </div>

          {/* SHIPPING */}
          <div>
            <h2 className="text-xl font-serif mb-4">
              Shipping
            </h2>
            <div className="border rounded px-4 py-3">
              Free shipping
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-xl font-serif mb-4">
              Payment
            </h2>

            <div className="border rounded divide-y">

              {/* COD */}
              <label className="flex items-start gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div>
                  <p className="font-medium">Cash on delivery</p>
                  <p className="text-sm text-gray-600">
                    Pay with cash upon delivery.
                  </p>
                </div>
              </label>

              {/* AIRPAY */}
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "airpay"}
                  onChange={() => setPaymentMethod("airpay")}
                />
                <span>Airpay</span>
              </label>

              {/* RAZORPAY */}
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                <span>Credit Card / Debit Card / NetBanking</span>
              </label>

              {/* SABPAISA */}
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "sabpaisa"}
                  onChange={() => setPaymentMethod("sabpaisa")}
                />
                <span>Sabpaisa</span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Your personal data will be used to process your order and
              support your experience throughout this website.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <input type="checkbox" />
              <p className="text-sm">
                I have read and agree to the website terms and conditions
              </p>
            </div>

            {/* PLACE ORDER */}
            <button
              className="
                mt-8
                w-full
                py-4
                rounded
                text-white
                font-semibold
                bg-gradient-to-r from-pink-500 to-red-500
                hover:opacity-90
              "
            >
              🔒 PLACE ORDER ₹{subtotal.toLocaleString()}
            </button>
          </div>
        </div>

        {/* ================= RIGHT : SUMMARY ================= */}
        <div className="bg-[#FAFAFA] border rounded-lg p-6 h-fit sticky top-20">

          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 mb-6"
            >
              <div className="relative">
                <img
                  src={item.image}
                  className="w-16 h-20 object-cover border"
                />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {item.qty}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">
                  {item.name}
                </p>
              </div>

              <p className="text-red-500 font-semibold">
                ₹{item.total.toLocaleString()}
              </p>
            </div>
          ))}

          {/* COUPON */}
          <div className="flex gap-3 mb-6">
            <input
              className="flex-1 border px-3 py-2 rounded"
              placeholder="Coupon Code"
            />
            <button className="bg-black text-white px-6 rounded">
              APPLY
            </button>
          </div>
          
          {/* TOTALS */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-red-500">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free shipping</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span className="text-red-500">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #ddd;
            padding: 12px;
            border-radius: 4px;
          }
        `}
      </style>
    </section>
  );
}

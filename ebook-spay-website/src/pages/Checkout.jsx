import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import Loader from "../components/Loader";

const Checkout = () => {
  const navigate = useNavigate();
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const { data, loading, error } = useGet("cart");

  const { execute: initiatePaytm, loading: paytmLoading } =
    usePost("paytm/initiate");

  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");

  // CART MAP
  useEffect(() => {
    if (!data?.items) return;

    setCartId(data.id || null);
    setUserId(data.user_id || null);

    const items = data.items.map((item) => ({
      id: item.id,
      qty: item.quantity,
      name: item.ebook?.title || "Product",
      newPrice: Number(item.price || 0),
      oldPrice: Number(item.ebook?.price || 0),
      total: Number(item.price || 0) * Number(item.quantity || 1),
      desc: item.ebook?.description || "",
      img: item.ebook?.image?.split("/").pop() || "",
    }));

    setOrderItems(items);

    setSubtotal(
      items.reduce((sum, i) => sum + i.newPrice * i.qty, 0)
    );
  }, [data]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load checkout
      </div>
    );

  const validate = () => {
    if (!email || !phone || !address) {
      alert("Please fill required fields");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    try {
      const res = await initiatePaytm({
        user_id: userId,
        cart_id: cartId,
        amount: subtotal,
        phone_number: phone,
        address: `${address}, ${city}, ${state}`,
        pincode: pincode,
      });

      if (!res?.status) {
        alert(res?.message || "Payment failed");
        return;
      }

      // ✅ CLEAN STORE ONLY REQUIRED DATA
      sessionStorage.setItem(
        "orderData",
        JSON.stringify({
          orderId: res.orderId,
          txnToken: res.txnToken,
          mid: res.mid,
          amount: res.amount,
        })
      );
      navigate("/payment", {
        state: {
          orderId: res.orderId,
          txnToken: res.txnToken,
          mid: res.mid,
          amount: res.amount,
        },
      });
      //navigate("/payment");
      //navigate(`/payment-result?orderId=${res.orderId}`)
      //window.location.href = res.redirectUrl;
    } catch (err) {
      console.error("PAYTM ERROR:", err);

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT FORM */}
          <div className="lg:col-span-2">

            <h2 className="text-2xl font-semibold mb-2">
              Contact information
            </h2>

            <input
              className="w-full border px-4 py-3 rounded mt-2"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h2 className="text-2xl font-semibold mt-10 mb-2">
              Billing address
            </h2>

            <input
              className="w-full border px-4 py-3 rounded mt-2"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input className="border px-4 py-3 rounded" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
              <input className="border px-4 py-3 rounded" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            </div>

            <input className="w-full border px-4 py-3 rounded mt-4" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input className="border px-4 py-3 rounded" placeholder="City" onChange={(e) => setCity(e.target.value)} />
              <input className="border px-4 py-3 rounded" placeholder="State" onChange={(e) => setState(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input className="border px-4 py-3 rounded" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} />
              <input className="border px-4 py-3 rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between items-center mt-10">

              <Link to="/view-cart" className="text-sm underline">
                ← Return to Cart
              </Link>

              <button
                onClick={handlePlaceOrder}
                disabled={paytmLoading}
                className="bg-[#ed2c64] text-white px-8 py-3 rounded"
              >
                {paytmLoading ? "Processing..." : "PLACE ORDER"}
              </button>

            </div>

          </div>

          {/* RIGHT SUMMARY */}
          <div className="border rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
              Order summary
            </h2>

            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3 mb-5">

                <img
                  src={`${IMG_URL}/${item.img}`}
                  className="w-14 h-14 rounded border"
                />

                <div className="flex-1">

                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-orange-600">
                      ₹{item.newPrice * item.qty}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    Qty: {item.qty}
                  </p>

                </div>

              </div>
            ))}

            <hr />

            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
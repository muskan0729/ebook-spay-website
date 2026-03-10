import React, { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet";
import { useDelete } from "../hooks/useDelete";
import { Link } from "react-router-dom";
import Cartprocess from "../components/Cartprocess";

const ViewCart = () => {
  const { data, loading, error } = useGet("cart");
  const { executeDelete } = useDelete("cart/item");

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const cartData = data?.items || [];

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // 🔹 Map API → UI format
  useEffect(() => {
    if (data?.items?.length > 0) {
      const formattedItems = data.items.map((item) => ({
        id: item.id,
        name: item.ebook.title,
        description: item.ebook.description,
        oldPrice: Number(item.ebook.price),
        newPrice: Number(item.price),
        qty: Number(item.quantity),
        image: item.ebook.image,
      }));

      setCartItems(formattedItems);
    } else {
      setCartItems([]);
    }
  }, [data]);

  // 🔹 Remove single item
 const removeItem = async (itemId) => {
  try {
    setDeleteLoadingId(itemId);

    await executeDelete(`cart/item/${itemId}`);

    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

  } catch (err) {
    console.error("Failed to remove item", err);
  } finally {
    setDeleteLoadingId(null);
  }
};

  // 🔹 Calculate subtotal (use cartItems not cartData)
  const estimatedTotal = cartItems.reduce(
    (total, item) => total + item.newPrice * item.qty,
    0
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading Cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load cart
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-semibold text-gray-800 mb-12 tracking-tight">
          Your Cart
        </h1>

        {/* ================= EMPTY STATE ================= */}
        {cartItems.length === 0 && !loading && (
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg p-20 text-center">
            <div className="text-7xl mb-6">🛍️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your cart feels lonely
            </h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Discover premium ebooks and start building your digital library.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-black hover:bg-gray-800 transition text-white px-12 py-4 rounded-full font-medium tracking-wide"
            >
              Explore Books
            </Link>
          </div>
        )}

        {/* ================= CART ITEMS ================= */}
        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const imageName = item.image?.split("/").pop();

                return (
                  <div
                    key={item.id}
                    className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-6">
                      <img
                        src={`${IMG_URL}/${imageName}`}
                        alt={item.name}
                        className="w-24 h-32 object-cover rounded-xl shadow-sm"
                      />

                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-gray-500 mt-2 text-sm">
                          ₹{item.newPrice.toLocaleString()}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={deleteLoadingId === item.id}
                          className="mt-4 text-sm text-red-500 hover:underline"
                        >
                          {deleteLoadingId === item.id
                            ? "Removing..."
                            : "Remove item"}
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-800">
                        ₹{(item.newPrice * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE SUMMARY */}
            <div className="sticky top-24 h-fit">
              <div className="bg-black text-white rounded-3xl p-10 shadow-2xl">

                <h2 className="text-2xl font-semibold mb-8 tracking-wide">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-5 text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{estimatedTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between mb-5 text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>₹{estimatedTotal.toLocaleString()}</span>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center bg-white text-black font-medium py-4 rounded-full mt-10 hover:bg-gray-200 transition"
                >
                  Secure Checkout
                </Link>

                <p className="text-xs text-gray-400 mt-6 text-center">
                  Encrypted & Secure Payments
                </p>

              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default ViewCart;
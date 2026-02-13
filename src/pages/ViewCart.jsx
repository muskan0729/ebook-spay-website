import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { useEffect, useState } from "react";
import { useDelete } from "../hooks/useDelete";
import { toast } from "sonner";

export default function ViewCart() {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const { data, loading, refetch } = useGet("cart");
  const [cartData, setCartData] = useState([]);
  const { executeDelete } = useDelete();

  useEffect(() => {
    if (data?.items) setCartData(data.items);
  }, [data]);

  const subtotal = Number(data?.subtotal || 0);

  const handleRemoveItem = async (id) => {
    try {
      setDeleteLoadingId(id);
      await executeDelete(`cart/item/${id}`);
      toast.success("Item removed");
      refetch();
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-semibold text-gray-800 mb-12 tracking-tight">
          Your Cart
        </h1>

        {/* ================= EMPTY STATE ================= */}
        {cartData.length === 0 && !loading && (
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
        {cartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {cartData.map((item) => {
                const imageName = item.ebook.image?.split("/").pop();

                return (
                  <div
                    key={item.id}
                    className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-6">
                      <img
                        src={`${IMG_URL}${imageName}`}
                        alt={item.ebook.title}
                        className="w-24 h-32 object-cover rounded-xl shadow-sm"
                      />

                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.ebook.title}
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">
                          ₹{Number(item.price).toLocaleString()}
                        </p>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
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
                        ₹{(
                          Number(item.price) * Number(item.quantity)
                        ).toLocaleString()}
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
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between mb-5 text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
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
}

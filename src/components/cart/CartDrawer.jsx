import { FiX, FiTrash2 } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import EmptyCart from "./EmptyCart";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import { Link } from "react-router-dom";
import { useState } from "react";

const CartDrawer = ({ open, onClose, openLogin }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  const { data, loading, error } = useGet(
    open && isLoggedIn ? "cart" : null
  );

  const { executeDelete } = useDelete("cart/item");

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [removedIds, setRemovedIds] = useState([]);

  const cartItems =
    data?.items?.filter((item) => !removedIds.includes(item.id)) || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const removeItem = async (id) => {
    try {
      setDeleteLoadingId(id);

      await executeDelete(`cart/item/${id}`);

      setRemovedIds((prev) => [...prev, id]);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[998]"
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-[390px] bg-white z-[999] shadow-2xl animate-slideLeft flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="text-sm font-semibold tracking-wide">
            SHOPPING CART
          </h3>

          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm hover:opacity-70"
          >
            <FiX size={15} />
            CLOSE
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">

          {/* Login Required */}
          {!isLoggedIn && (
            <div className="p-8 text-center flex flex-col items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FiLock size={26} />
              </div>

              <p className="text-sm text-gray-500">
                Please login to view your cart
              </p>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => openLogin(), 0);
                }}
                className="w-full bg-black text-white py-3 rounded text-sm font-semibold"
              >
                LOGIN
              </button>
            </div>
          )}

          {/* Loading */}
          {isLoggedIn && loading && (
            <p className="p-6 text-sm text-gray-500">
              Loading cart...
            </p>
          )}

          {/* Error */}
          {isLoggedIn && error && (
            <p className="p-6 text-sm text-red-500">
              Failed to load cart
            </p>
          )}

          {/* Empty */}
          {isLoggedIn && !loading && cartItems.length === 0 && (
            <EmptyCart />
          )}

          {/* Items */}
          {isLoggedIn && !loading && cartItems.length > 0 && (
            <div className="p-5 space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-5"
                >
                  {/* Image */}
                  <img
                    src={item.ebook?.image}
                    alt={item.ebook?.title}
                    className="w-20 h-28 object-cover rounded-lg border"
                  />

                  {/* Content */}
                  <div className="flex-1">

                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.ebook?.title}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm font-semibold mt-2">
                      ₹{Number(item.price).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={deleteLoadingId === item.id}
                      className="mt-3 text-xs text-red-500 flex items-center gap-1 hover:underline"
                    >
                      <FiTrash2 size={13} />

                      {deleteLoadingId === item.id
                        ? "Removing..."
                        : "Remove"}
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Footer */}
        {isLoggedIn && cartItems.length > 0 && !loading && (
          <div className="border-t p-6 space-y-4">

            <div className="flex justify-between text-sm font-semibold">
              <span>SUBTOTAL</span>
              <span>
                ₹{Number(subtotal).toLocaleString()}
              </span>
            </div>

            <Link
              to="/view-cart"
              onClick={onClose}
              className="block text-center bg-black text-white py-3 rounded text-sm font-semibold"
            >
              VIEW CART
            </Link>
          </div>
        )}

      </aside>
    </>
  );
};

export default CartDrawer;
import { FiX, FiTrash2 } from "react-icons/fi";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";

const CartDrawer = ({ open, onClose, openLogin }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch cart
  const { data, loading, error, refetch } = useGet(
    open && isLoggedIn ? "cart" : null
  );

  // Remove API
  const { execute: removeItem, loading: removing } =
    usePost("remove-from-cart");

  const cartItems = Array.isArray(data?.items) ? data.items : [];
  const subtotal = data?.subtotal || 0;
  const isEmpty = cartItems.length === 0;

  if (!open) return null;

  // 🔥 Remove Item Handler
  const handleRemove = async (id) => {
    try {
      await removeItem({ cart_item_id: id });
      refetch(); // reload cart
    } catch (err) {
      console.error("Remove failed");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[998]"
      />

      {/* DRAWER */}
      <aside className="fixed top-0 right-0 h-full w-[380px] bg-white z-[999] shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-sm font-semibold tracking-wide">
            SHOPPING CART
          </h3>

          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm font-medium hover:opacity-60"
          >
            <FiX size={16} /> CLOSE
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">

          {/* NOT LOGGED IN */}
          {!isLoggedIn && (
            <div className="p-6 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Please login to view your cart.
              </p>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => openLogin(), 0);
                }}
                className="bg-[#123099] text-white px-6 py-3 rounded text-sm font-semibold"
              >
                LOGIN TO VIEW CART
              </button>
            </div>
          )}

          {/* LOADING */}
          {isLoggedIn && loading && (
            <p className="p-6 text-sm text-gray-500">
              Loading cart...
            </p>
          )}

          {/* ERROR */}
          {isLoggedIn && error && (
            <p className="p-6 text-sm text-red-500">
              Failed to load cart.
            </p>
          )}

          {/* EMPTY */}
          {isLoggedIn && !loading && isEmpty && (
            <EmptyCart onClose={onClose} />
          )}

          {/* ITEMS */}
          {isLoggedIn && !loading && !isEmpty && (
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-4 relative"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      ₹{Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={removing}
                    className="text-red-500 hover:opacity-60"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {isLoggedIn && !isEmpty && !loading && (
          <div className="border-t p-6 space-y-4">

            <div className="flex justify-between font-semibold text-sm">
              <span>SUBTOTAL:</span>
              <span>₹{Number(subtotal).toFixed(2)}</span>
            </div>

            <Link
              to="/view-cart"
              onClick={onClose}
              className="block w-full text-center bg-black text-white py-3 rounded text-sm font-semibold hover:opacity-90"
            >
              VIEW CART
            </Link>

            <button
              className="w-full bg-[#B98B5E] text-white py-3 rounded text-sm font-semibold hover:opacity-90"
            >
              CHECKOUT
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPopup() {
  const {
    cart,
    subtotal,
    showCartPopup,
    setShowCartPopup,
    removeItem,
  } = useCart();

  if (!showCartPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#B455A0] w-[430px] max-h-[90vh] overflow-hidden text-white relative">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/20">
          <h3 className="font-semibold">
            SHOPPING CART ({cart.length})
          </h3>
          <button
            onClick={() => setShowCartPopup(false)}
            className="text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[360px]">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white text-black p-4 flex gap-4 rounded-lg relative group"
            >
              {/* ❌ REMOVE BUTTON */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
              >
                ×
              </button>

              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-20 object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-sm leading-snug pr-5">
                  {item.title}
                </p>
                <p className="text-red-500 mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-center text-white/80">
              Your cart is empty
            </p>
          )}
        </div>

        {/* TOTAL */}
        <div className="px-5 py-4 border-t border-white/20">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex gap-3">
            <Link
                to="/view-cart"
                onClick={() => setShowCartPopup(false)}
                className="flex-1 text-center py-2 font-medium border border-white text-[#B455A0] bg-white transition hover:bg-transparent hover:text-white"
            >
                CART
            </Link>

            <Link
                to="/checkout"
                onClick={() => setShowCartPopup(false)}
                className="flex-1 text-center py-2 font-medium border border-white text-[#B455A0] bg-white transition hover:bg-transparent hover:text-white"
            >
                CHECKOUT
            </Link>
            </div>

          <button
            onClick={() => setShowCartPopup(false)}
            className="block w-full text-center mt-4 underline cursor-pointer"
          >
            CONTINUE SHOPPING ?
          </button>
        </div>
      </div>
    </div>
  );
}

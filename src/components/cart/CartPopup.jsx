  import { Link } from "react-router-dom";
  import { useGet } from "../../hooks/useGet";
  import { removeFromCartManager } from "../../utils/cartManager";
  import { getCartDB } from "../../indexeddb/cartDB"; // IndexedDB fetch
  import { useEffect, useState } from "react";

  export default function CartPopup({ open, setOpen }) {
      const IMG_URL = import.meta.env.VITE_IMG_URL;

    const isLoggedIn = !!localStorage.getItem("token");
    const { data,loading, } = useGet(open && isLoggedIn ? "cart" : null);
  console.log("cart fasat",data);
    const [cart, setCart] = useState([]);

    // Load cart data
    useEffect(() => {
      if (!open) return;

      const fetchCart = async () => {
        if (isLoggedIn) {
          setCart(data?.items || []);
        } else {
          const guestCart = await getCartDB();
          setCart(guestCart || []);
        }
      };

      fetchCart();
    }, [open, isLoggedIn, data]);

    // Calculate subtotal
    const subtotal = cart.reduce(
      (sum, item) => sum + Number(item.price) * (item.qty || 1),
      0
    );

    // Remove item
    const handleRemoveItem = async (id) => {
      await removeFromCartManager(id); // will handle API or IndexedDB automatically

      // Refresh cart
      if (!isLoggedIn) {
        const updatedCart = await getCartDB();
        setCart(updatedCart);
      } else {
        // for logged in users, refetch can be done via your useGet hook or API call
        setCart(cart.filter(item => item.id !== id));
      }
    };

    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-[#B455A0] w-[550px]  overflow-hidden text-white relative">

          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-white/20">
            <h3 className="font-semibold">SHOPPING CART ({cart.length})</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-xl cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* CART ITEMS */}
<div className="p-4 space-y-4 overflow-y-auto max-h-[360px]">

  {!isLoggedIn ? (
    <p className="text-center text-white/80 font-medium">
      Please login to view your cart
    </p>
  ) : loading ? (
    <p className="text-center text-white/80">Loading cart...</p>
  ) : cart.length === 0 ? (
    <p className="text-center text-white/80">Your cart is empty</p>
  ) : (
    cart.map((item) => {
      const imageName = item.ebook.image?.split("/").pop();

      return (
        <div
          key={item.id}
          className="bg-white text-black p-4 flex gap-4 rounded-lg relative group"
        >
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
          >
            ×
          </button>

          <img
            src={`${IMG_URL}${imageName}`}
            alt={item.ebook.title}
            className="w-14 h-20 object-cover"
          />

          <div className="flex-1">
            <p className="font-medium text-sm leading-snug pr-5">
              {item.title}
            </p>
            <p className="text-red-500 mt-1">
              ₹{Number(item.price).toLocaleString()}
            </p>
          </div>
        </div>
      );
    })
  )}
</div>



          {/* TOTAL */}
          <div className="px-5 py-4 border-t border-white/20">
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

<div className="flex gap-3">
  {isLoggedIn ? (
    <Link
      to="/view-cart"
      onClick={() => setOpen(false)}
      className="flex-1 text-center py-2 font-medium border border-white text-[#B455A0] bg-white transition hover:bg-transparent hover:text-white"
    >
      CART
    </Link>
  ) : (
    <button
      disabled
      className="flex-1 text-center py-2 font-medium border border-white bg-gray-300 text-gray-600 cursor-not-allowed"
    >
      CART
    </button>
  )}

  {isLoggedIn ? (
    <Link
      to="/checkout"
      onClick={() => setOpen(false)}
      className="flex-1 text-center py-2 font-medium border border-white text-[#B455A0] bg-white transition hover:bg-transparent hover:text-white"
    >
      CHECKOUT
    </Link>
  ) : (
    <button
      disabled
      className="flex-1 text-center py-2 font-medium border border-white bg-gray-300 text-gray-600 cursor-not-allowed"
    >
      CHECKOUT
    </button>
  )}
</div>


            <button
              onClick={() => setOpen(false)}
              className="block w-full text-center mt-4 underline cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
          </div>

          
        </div>
      </div>
    );
  }

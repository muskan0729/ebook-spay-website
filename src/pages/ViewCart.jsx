import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ViewCart() {
  const { cart, removeItem, subtotal } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif mb-10">Cart</h1>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg mb-6">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-[#FF2C55] text-white px-8 py-3 rounded-full"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      )}

      {/* CART TABLE */}
      {cart.length > 0 && (
        <>
          <div className="border border-[#F3B3A6]">
            <table className="w-full text-left">
              <thead className="border-b border-[#F3B3A6]">
                <tr className="text-sm font-semibold">
                  <th className="p-4">Product</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#F3B3A6]"
                  >
                    <td className="flex items-center gap-4 p-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 border rounded-full text-sm"
                      >
                        ×
                      </button>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover"
                      />

                      <span className="text-red-500">
                        {item.title}
                      </span>
                    </td>

                    <td className="text-red-500">
                      ₹{item.price.toLocaleString()}
                    </td>

                    <td className="text-red-500">
                      ₹{item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* COUPON ROW (OPTIONAL UI) */}
            <div className="flex flex-wrap justify-between items-center p-4 gap-4">

            </div>
          </div>

          {/* TOTALS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-16">
            <div />

            <div className="border border-[#F3B3A6] p-10">
              <h2 className="text-3xl font-serif mb-8">
                Cart Totals
              </h2>

              <div className="flex justify-between py-4 border-b">
                <span>Subtotal</span>
                <span className="text-red-500">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="py-5 border-b text-sm">
                <p className="font-medium mb-1">Shipping</p>
                <p>Free shipping</p>
                <p className="font-semibold mt-2">
                  Shipping to 30 West Rocky Oak Lane, Velit
                  nostrud labor, Saepe non sunt libe
                  400058, Maharashtra.
                </p>

                <Link
                  to="/my-account/addresses"
                  className="text-red-500 mt-2 inline-block"
                >
                  Change address
                </Link>
              </div>

              <div className="flex justify-between py-5">
                <span>Total</span>
                <span className="text-red-500 text-lg">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block text-center bg-[#FF2C55] text-white py-4 rounded-full font-semibold mt-4"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

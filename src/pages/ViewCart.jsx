import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { useEffect, useState } from "react";
import { useDelete } from "../hooks/useDelete";
import { toast } from "sonner";

export default function ViewCart() {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);


  const {data,loading,refetch } = useGet("cart");
 const [cartData, setcartData] = useState([]);

  useEffect(() => {
    if(data?.items){
      setcartData(data?.items);
    }
  }, [data]);
  // console.log("vartggggdas",cartData);
const subtotal_p = Number(data?.subtotal || 0);
const { executeDelete } = useDelete();
  // ✅ remove cart item function
const handleRemoveItem = async (id) => {
  try {
     setDeleteLoadingId(id);
    await executeDelete(`cart/item/${id}`);
    toast.success("Item removed");
    refetch();
  } catch (error) {
    toast.error("Failed to remove item");
  }finally {
    setDeleteLoadingId(null);
  }
};


  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif mb-10">Cart</h1>
{/* EMPTY CART */}
{cartData.length === 0 && !loading && (
  <div className="text-center py-20">
    <p className="text-lg mb-6">Your cart is empty</p>

    <Link
      to="/"
      className="inline-block bg-[#FF2C55] text-white px-8 py-3 rounded-full font-semibold"
    >
      CONTINUE SHOPPING
    </Link>
  </div>
)}

{cartData.length > 0 && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

    {/* LEFT SIDE (PRODUCT DETAILS) */}
    <div className="lg:col-span-2 border border-[#F3B3A6]">
      <table className="w-full text-left">
        <thead className="border-b border-[#F3B3A6]">
          <tr className="text-sm font-semibold">
            <th className="p-4">Product</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cartData.map((item) => {
            const imageName = item.ebook.image?.split("/").pop();

            return (
          <tr key={item.id} className="border-b border-[#F3B3A6]">
  <td className="p-4">
    <div className="flex items-center gap-4 max-w-[350px]">
<button
  onClick={() => handleRemoveItem(item.id)}
  disabled={deleteLoadingId === item.id}
  className="w-6 h-6 border rounded-full text-sm flex-shrink-0 flex items-center justify-center"
>
  {deleteLoadingId === item.id ? (
    <span className="w-4 h-4 border-2 border-gray-400 border-t-red-500 rounded-full animate-spin"></span>
  ) : (
    "×"
  )}
</button>


      <img
        src={`${IMG_URL}${imageName}`}
        alt={item.ebook.title}
        className="w-16 h-20 object-cover flex-shrink-0"
      />

      <span className="text-red-500  px-2 py-1 truncate">
        {item.ebook.title}
      </span>
    </div>
  </td>

  <td className="text-red-500 whitespace-nowrap">
    ₹{Number(item.price).toLocaleString()}
  </td>

  <td className="text-red-500 whitespace-nowrap">
    ₹{(Number(item.price) * Number(item.quantity)).toLocaleString()}
  </td>
</tr>

            );
          })}
        </tbody>
      </table>

    </div>

    {/* RIGHT SIDE (TOTAL CARD) */}
    <div className="border border-[#F3B3A6] p-10 h-fit">
      <h2 className="text-3xl font-serif mb-8">
        Cart Totals
      </h2>

      <div className="flex justify-between py-4 border-b">
        <span>Subtotal</span>
        <span className="text-red-500">
          ₹{subtotal_p.toLocaleString()}
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
          ₹{subtotal_p.toLocaleString()}
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
)}

    </section>
  );
}

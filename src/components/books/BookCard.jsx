import { Link } from "react-router-dom";
import {usePost} from "../../hooks/usePost";
import { addToCartManager } from "../../utils/cartManager";
import { toast } from "sonner";
import CartPopup from "../cart/CartPopup";
import { useState } from "react";


const BookCard = ({ book }) => {
  const {execute: cartExecute } =  usePost("cart/add");
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  // const [showpop,setshowpop] = useState(false);
    const [open, setOpen] = useState(false); 


  const handleAddToCart = async (book, qty = 1) => {
    const cartItem = {
      id:book.id,
      product_id: book.id,
      title: book.title,
      price: book.price,
      quantity: qty,
      image: book.image,
    };

    try {
      // Assuming addToCartManager returns a Promise
      await addToCartManager(cartItem, cartExecute);
      // toast.success("Added to cart");
      setOpen(true);
    } catch (err) {
      toast.error("Failed to add to cart");
    } 
  };
  // Safe fallback handling
  const id = book?.id;
  const title = book?.title || "Untitled";

  const imageName = book?.image?.split("/").pop();
  const image = imageName
    ? `${IMG_URL}${imageName}`
    : "/placeholder.png";

  const price = Number(book?.price || 0);
  const oldPrice = book?.oldPrice ? Number(book.oldPrice) : null;
  const rating = book?.rating ?? 4;

  return (
    <> 
      {open && <CartPopup open={open} setOpen={setOpen} />}
    <div
      className="
        group
        bg-white
        rounded-2xl
        border border-[#E9E4DA]
        shadow-[0_8px_20px_rgba(0,0,0,0.06)]
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-[0_18px_40px_rgba(184,150,78,0.25)]
      "
    >
      {/* IMAGE */}
      <Link to={`/books/${id}`}>
        <div className="h-72 bg-[#F5F3EF] flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 text-center space-y-2">

        {/* TITLE */}
        <Link
          to={`/books/${id}`}
          className="
            block
            text-sm
            font-medium
            text-[#2E2E2E]
            transition-colors
            group-hover:text-[#B8964E]
          "
        >
          {title}
        </Link>

        {/* RATING */}
        <div className="text-sm text-[#B8964E]">
          {"★".repeat(Math.round(rating))}
          <span className="text-gray-400 text-xs ml-1">
            ({rating})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex justify-center items-center gap-2 pt-1">
          {oldPrice && oldPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{oldPrice.toLocaleString()}
            </span>
          )}

          <span className="text-lg font-semibold text-[#2E2E2E]">
            ₹{price.toLocaleString()}
          </span>
        </div>

        {/* ADD TO CART */}
        <button
 onClick={() => handleAddToCart(book, 1)}
          className="
            mt-4
            w-full
            py-2
            text-sm
            tracking-wide
            rounded-lg
            bg-[#F6C6C6]
            text-[#A30000]
            transition
            duration-300
            hover:bg-[#B8964E]
            hover:text-white
          "
        >
          ADD TO CART
        </button>

      </div>
    </div>
    </>
  );
};

export default BookCard;

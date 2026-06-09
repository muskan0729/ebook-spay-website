import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  if (!product) return null;

  const {
    id,
    title = "Untitled",
    image,
    price,
    oldPrice,
    rating = 4,
  } = product;

  const imageName = image?.split("/").pop();
  const productImage = imageName
    ? `${IMG_URL}${imageName}`
    : "/placeholder.png";

  const numericPrice = Number(price || 0);
  const numericOldPrice =
    oldPrice && Number(oldPrice) > numericPrice
      ? Number(oldPrice)
      : null;

  return (
    <div
      className="
        group
        bg-white
        rounded-xl
        border border-[#E9E4DA]
        shadow-[0_6px_16px_rgba(0,0,0,0.06)]
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:scale-[1.015]
        hover:shadow-[0_14px_30px_rgba(184,150,78,0.22)]
      "
    >
      {/* IMAGE */}
      <Link to={`/books/${id}`}>
        <div className="h-56 bg-[#F5F3EF] flex items-center justify-center overflow-hidden">
          <img
            src={productImage}
            alt={title}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 text-center space-y-1.5">

        {/* TITLE */}
        <Link
          to={`/books/${id}`}
          className="
            block
            text-[13px]
            font-medium
            text-[#2E2E2E]
            leading-snug
            transition-colors
            group-hover:text-[#B8964E]
          "
        >
          {title}
        </Link>

        {/* RATING */}
        <div className="text-xs text-[#B8964E]">
          {"★".repeat(Math.round(rating))}
          <span className="text-gray-400 text-[11px] ml-1">
            ({rating})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex justify-center items-center gap-2 pt-0.5">
          {numericOldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{numericOldPrice.toLocaleString()}
            </span>
          )}

          <span className="text-base font-semibold text-[#2E2E2E]">
            ₹{numericPrice.toLocaleString()}
          </span>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={() =>
            addToCart({
              id,
              title,
              price: numericPrice,
              image: productImage,
            })
          }
          className="
            mt-3
            w-full
            py-2
            text-xs
            tracking-wide
            rounded-md
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
  );
};

export default ProductCard;
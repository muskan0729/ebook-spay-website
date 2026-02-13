import { useParams, Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { useCart } from "../context/CartContext";
import { usePost } from "../hooks/usePost";

import visa from "../assets/images/details/visa.png";
import mastercard from "../assets/images/details/mastercard.jpg";
import amex from "../assets/images/details/americanexpress.png";
import discover from "../assets/images/details/discovercard.png";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // ✅ GET product details
  const {
    data,
    loading: productLoading,
    error: productError,
  } = useGet(`products/${id}`);

  // ✅ POST cart/add API
  const {
    execute: addToCartApi,
    loading: cartLoading,
    error: cartError,
  } = usePost("cart/add");

  const product = data?.data;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  if (productLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading product…
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  // Safe destructuring
  const {
    title,
    image: rawImage,
    description,
    price,
    categories = [],
  } = product;

  // Normalize image
  const imageName = rawImage?.split("/").pop();
  const image = imageName ? `${IMG_URL}${imageName}` : "/placeholder.png";

  const formattedPrice = Number(price || 0).toLocaleString();
  const oldPrice = (Number(price || 0) * 1.4).toLocaleString();

  // ✅ HANDLE ADD TO CART
  const handleAddToCart = async () => {
    const payload = {
      product_id: product.id,
      quantity: 1,
    };

    try {
      const response = await addToCartApi(payload);
      console.log("API Response:", response);

      // 🔥 SUCCESS CONDITION FIXED
      if (response?.id && response?.status === "ACTIVE") {
        // Update local cart context
        addToCart({
          id: product.id,
          title,
          price: Number(price || 0),
          image,
        });

        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* BREADCRUMB */}
      <div className="text-sm mb-8 text-gray-600">
        <Link to="/" className="text-red-500">
          Home
        </Link>{" "}
        &nbsp;»&nbsp;
        <Link to="/" className="text-red-500">
          Products
        </Link>{" "}
        &nbsp;»&nbsp;
        <span className="text-black font-medium">{title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* IMAGE SECTION */}
        <div className="bg-[#FAFAFA] rounded-2xl p-10 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-[520px] object-contain"
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col">
          {/* CATEGORY */}
          {categories.length > 0 && (
            <p className="text-xs uppercase tracking-widest text-red-400 mb-3">
              {categories.map((c) => c.name).join(", ")}
            </p>
          )}

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-serif text-[#1F1F1F] leading-snug">
            {title}
          </h1>

          {/* PRICE */}
          <div className="flex items-end gap-4 mt-6">
            <span className="text-3xl font-semibold text-[#1F1F1F]">
              ₹{formattedPrice}
            </span>
            <span className="text-sm line-through text-gray-400">
              ₹{oldPrice}
            </span>
            <span className="text-xs text-gray-500">Free Shipping</span>
          </div>

          <div className="h-px bg-gray-200 my-8" />

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed max-w-xl">
            {description}
          </p>

          {/* ADD TO CART */}
          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="
                w-full md:w-auto
                px-14 py-4
                bg-[#FB2C36]
                text-white
                text-sm
                tracking-widest
                rounded-full
                hover:bg-black
                transition
                cursor-pointer
                disabled:opacity-50
              "
            >
              {cartLoading ? "Adding..." : "ADD TO CART"}
            </button>

            {cartError && (
              <p className="text-red-500 text-sm mt-3">
                Failed to add to cart.
              </p>
            )}
          </div>

          {/* SAFE CHECKOUT */}
          <div className="mt-12 border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-center mb-5">
              Guaranteed Safe Checkout
            </p>

            <div className="flex justify-center items-center gap-6 opacity-80">
              <img src={visa} alt="Visa" className="h-7" />
              <img src={mastercard} alt="Mastercard" className="h-7" />
              <img src={amex} alt="American Express" className="h-7" />
              <img src={discover} alt="Discover" className="h-7" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

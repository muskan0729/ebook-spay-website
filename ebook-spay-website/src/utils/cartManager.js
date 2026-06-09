import { toast } from "sonner";
import { addToCartDB } from "../indexeddb/cartDB";
import { addToWishlistDB } from "../indexeddb/wishlistDB";

export const addToCartManager = async (product, execute) => {

  const token = localStorage.getItem("token");

  const isLoggedIn =
    token &&
    token !== "undefined" &&
    token !== "null";

  try {

    if (isLoggedIn) {

      // API
      await execute(product);

      toast.success("Added to cart");

    } else {

      // IndexedDB
      await addToCartDB(product);

      toast.success("Added to cart (Saved in browser)");

      console.log(product);
    }

  } catch (err) {

    // remove invalid token
    if (err?.response?.status === 401) {

      localStorage.removeItem("token");

      window.dispatchEvent(
        new Event("storage")
      );
    }

    toast.error("Failed to add cart");

    console.log(err);
  }
};

export const removeFromCartManager = async (
  productId,
  executeRemove
) => {

  const token = localStorage.getItem("token");

  const isLoggedIn =
    token &&
    token !== "undefined" &&
    token !== "null";

  try {

    if (isLoggedIn) {

      // API remove
      if (executeRemove) {
        await executeRemove(productId);
      }

      toast.success("Removed from cart");

    } else {

      // IndexedDB remove
      await removeFromCartDB(productId);

      toast.success(
        "Removed from cart (Saved in browser)"
      );

      console.log(
        "Removed product ID:",
        productId
      );
    }

  } catch (err) {

    if (err?.response?.status === 401) {

      localStorage.removeItem("token");

      window.dispatchEvent(
        new Event("storage")
      );
    }

    toast.error("Failed to remove cart item");

    console.log(err);
  }
};

export const addToWishlistManager = async (
  product,
  execute
) => {

  const token = localStorage.getItem("token");

  const isLoggedIn =
    token &&
    token !== "undefined" &&
    token !== "null";

  try {

    if (isLoggedIn) {

      // API
      await execute(product);

      toast.success("Added to wishlist");

    } else {

      // IndexedDB
      await addToWishlistDB(product);

      toast.success(
        "Added to wishlist (Saved in browser)"
      );
    }

  } catch (err) {

    if (err?.response?.status === 401) {

      localStorage.removeItem("token");

      window.dispatchEvent(
        new Event("storage")
      );
    }

    toast.error("Failed to add wishlist");

    console.log(err);
  }
};
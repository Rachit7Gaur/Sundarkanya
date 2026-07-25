import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

import {
  getCart,
  addToCart as addCartAPI,
  removeFromCart as removeCartAPI,
  clearCart as clearCartAPI,
  updateCartQuantity,
} from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart({ items: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();

      setCart(data || { items: [] });
    } catch (error) {
      console.log(error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart({ items: [] });
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login first");
      return false;
    }

    try {
      await addCartAPI(productId, quantity);

      await loadCart();

      toast.success("Added to cart");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add to cart"
      );

      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeCartAPI(productId);

      await loadCart();

      toast.success("Removed from cart");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove item"
      );

      return false;
    }
  };

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    try {
      await updateCartQuantity(productId, quantity);

      await loadCart();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update quantity"
      );

      return false;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();

      setCart({
        items: [],
      });

      toast.success("Cart cleared");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to clear cart"
      );

      return false;
    }
  };

  const cartCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotal = cart.items.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartSubtotal,
        loadCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
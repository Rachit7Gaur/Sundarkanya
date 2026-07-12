import { createContext, useEffect, useState ,useContext } from "react";
import {AuthContext}  from "./AuthContext";
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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useContext(AuthContext);

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const data = await getCart();
      setCart(data.items || []);
    } catch (error) {
      console.log(error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (user) {
    loadCart();
  } else {
    setCart([]);
  }
}, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await addCartAPI(productId, quantity);
      await loadCart();
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to add to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeCartAPI(productId);
      await loadCart();
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Unable to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCart([]);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Unable to clear cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await updateCartQuantity(productId, quantity);
      await loadCart();
    } catch (error) {
      toast.error("Unable to update quantity");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        loadCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
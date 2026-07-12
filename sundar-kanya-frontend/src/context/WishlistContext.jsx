import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import * as wishlistService from "../services/wishlistService";
import { useAuth } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    try {
      const data = await wishlistService.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = async (productId) => {
    try {
      const res = await wishlistService.toggleWishlist(productId);

      toast.success(res.message);

      await loadWishlist();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item._id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggle,
        isWishlisted,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);
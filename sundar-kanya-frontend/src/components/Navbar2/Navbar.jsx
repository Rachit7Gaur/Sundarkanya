import { useContext, useEffect, useState } from "react";

import "./Navbar.css";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import TopAnnouncement from "./TopAnnouncement";
import TopUtilityBar from "./TopUtilityBar";

import DesktopNavbar from "./desktop/DesktopNavbar";

import MobileNavbar from "./mobile/MobileNavbar";
import MobileMenu from "./mobile/MobileMenu";

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const wishlistCount = wishlist.length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };


    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  
    useEffect(() => {
    if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return () => {
        document.body.style.overflow = "auto";
    };
}, [mobileMenuOpen]);

  return (
    <>

      <TopAnnouncement scrolled={scrolled} />

      <TopUtilityBar scrolled={scrolled} />

      <DesktopNavbar
        scrolled={scrolled}
        user={user}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <MobileNavbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        user={user}
        logout={logout}
      />

    </>
  );

}

export default Navbar;
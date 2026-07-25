import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiUser,
} from "react-icons/fi";

import "./Navbar.css";

import NavLinks from "./Navlinks";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import TopAnnouncement from "./TopAnnouncement";
import TopUtilityBar from "./TopUtilityBar";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const { cartCount } = useContext(CartContext);

  const { wishlist } = useContext(WishlistContext);

  const wishlistCount = wishlist.length;

  const [mobileMenu, setMobileMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopAnnouncement />

      <TopUtilityBar />

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
      >
        {/* LEFT */}

        <div className="navbar-left">
          <div className="logo">
            <Link to="/">
              <h2>Sundar Kanya</h2>

              <span>JEWELLERY</span>
            </Link>
          </div>
        </div>

        {/* CENTER */}

        <div className="navbar-center">
          <div className="desktop-nav">
            <NavLinks />
          </div>
        </div>

        {/* RIGHT */}

        <div className="navbar-right">
          <div className="desktop-search">
            <SearchBar />
          </div>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="admin-btn"
            >
              👑 Admin Panel
            </Link>
          )}

          <Link
            to="/wishlist"
            className="icon"
          >
            <FiHeart />

            {wishlistCount > 0 && (
              <span className="badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="icon"
          >
            <FiShoppingCart />

            {cartCount > 0 && (
              <span className="badge">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/profile" : "/login"}
            className="icon account-icon"
          >
            <FiUser />
          </Link>

          <button
            className="menu-btn"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {mobileMenu && (
        <MobileMenu
          isLoggedIn={!!user}
          user={user}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          logout={logout}
          closeMenu={() =>
            setMobileMenu(false)
          }
        />
      )}
    </>
  );
}

export default Navbar;
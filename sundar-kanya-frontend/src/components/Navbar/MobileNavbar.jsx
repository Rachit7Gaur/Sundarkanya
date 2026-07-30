import { Link } from "react-router-dom";
import { FiMenu, FiHeart, FiShoppingCart } from "react-icons/fi";

import MobileSearchBar from "./MobileSearchBar";

import "./mobile-navbar.css";

function MobileNavbar({
  scrolled,
  mobileMenu,
  setMobileMenu,
  cartCount,
  wishlistCount,
}) {
  return (
    <nav
      className={`mobile-navbar ${
        scrolled ? "mobile-navbar-scrolled" : ""
      }`}
    >
      {/* Top Row */}

      <div className="mobile-navbar-top">

        {/* Menu */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <FiMenu />
        </button>

        {/* Logo */}

        <Link
          to="/"
          className="mobile-logo"
        >
          <h2 className="mobile-logo-title">
            Sundar Kanya
          </h2>

          <span className="mobile-logo-subtitle">
            JEWELLERY
          </span>
        </Link>

        {/* Icons */}

        <div className="mobile-navbar-icons">

          <Link
            to="/wishlist"
            className="mobile-navbar-icon"
          >
            <FiHeart />

            {wishlistCount > 0 && (
              <span className="mobile-navbar-badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="mobile-navbar-icon"
          >
            <FiShoppingCart />

            {cartCount > 0 && (
              <span className="mobile-navbar-badge">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>

      {/* Search */}

      <MobileSearchBar />

    </nav>
  );
}

export default MobileNavbar;
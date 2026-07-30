import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

import "./desktop-navbar.css";
import "./desktop-navlinks.css";
import "./desktop-responsive.css";


import NavLinks from "./NavLinks";
import DesktopSearchBar from "./DesktopSearchBar";

function DesktopNavbar({
  scrolled,
  user,
  cartCount,
  wishlistCount,
}) {
  return (
    <nav
      className={`desktop-navbar ${
        scrolled ? "desktop-navbar-scrolled" : ""
      }`}
    >
      {/* LEFT */}

      <div className="desktop-navbar-left">

        <div className="desktop-logo">

          <Link to="/">

            <h2 className="desktop-logo-title">
              Sundar Kanya
            </h2>

            <span className="desktop-logo-subtitle">
              JEWELLERY
            </span>

          </Link>

        </div>

      </div>

      {/* CENTER */}

      <div className="desktop-navbar-center">

        <div className="desktop-nav-links">

          <NavLinks />

        </div>

      </div>

      {/* RIGHT */}

      <div className="desktop-navbar-right">

        <div className="desktop-search">

          <DesktopSearchBar />

        </div>

        {user?.role === "admin" && (

          <div className="desktop-admin">

            <Link
              to="/admin"
              className="desktop-admin-btn"
            >
              👑 Admin Panel
            </Link>

          </div>

        )}

        <Link
          to="/wishlist"
          className="desktop-navbar-icon"
        >
          <FiHeart />

          {wishlistCount > 0 && (
            <span className="desktop-navbar-badge">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="desktop-navbar-icon"
        >
          <FiShoppingCart />

          {cartCount > 0 && (
            <span className="desktop-navbar-badge">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to={user ? "/profile" : "/login"}
          className="desktop-navbar-icon desktop-account-icon"
        >
          <FiUser />
        </Link>

      </div>

    </nav>
  );
}

export default DesktopNavbar;
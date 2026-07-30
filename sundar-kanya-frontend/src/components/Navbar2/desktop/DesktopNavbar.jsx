import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

import DesktopNavLinks from "./DesktopNavLinks";
import DesktopSearchBar from "./DesktopSearchBar";

function DesktopNavbar({
  scrolled,
  user,
  cartCount,
  wishlistCount,
}) {
  return (
    <header className={`desktop-navbar ${scrolled ? "scrolled" : ""}`}>

      {/* Logo */}
      <div className="desktop-logo">
        <Link to="/">
          <h2>Sundar Kanya</h2>
          <span>JEWELLERY</span>
        </Link>
      </div>

      {/* Navigation */}
      <DesktopNavLinks />

      {/* Right Section */}
      <div className="desktop-right">

        <DesktopSearchBar />

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="desktop-admin-btn"
          >
            Admin
          </Link>
        )}

        <Link
          to="/wishlist"
          className="desktop-icon"
        >
          <FiHeart />

          {wishlistCount > 0 && (
            <span className="desktop-badge">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="desktop-icon"
        >
          <FiShoppingCart />

          {cartCount > 0 && (
            <span className="desktop-badge">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to={user ? "/profile" : "/login"}
          className="desktop-icon"
        >
          <FiUser />
        </Link>

      </div>

    </header>
  );
}

export default DesktopNavbar;
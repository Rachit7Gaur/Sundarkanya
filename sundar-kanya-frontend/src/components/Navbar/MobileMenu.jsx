import { Link } from "react-router-dom";
import {
  FiX,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiChevronRight,
} from "react-icons/fi";

function MobileMenu({
  isLoggedIn,
  user,
  cartCount,
  wishlistCount,
  logout,
  closeMenu,
}) {
  return (
    <div className="mobile-overlay" onClick={closeMenu}>
      <div
        className="mobile-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-header">
          <div className="mobile-logo">
            <h2>Sundar Kanya</h2>
            <span>JEWELLERY</span>
          </div>

          <button
            className="close-btn"
            onClick={closeMenu}
          >
            <FiX />
          </button>
        </div>

        <nav className="mobile-links">

          <Link to="/" onClick={closeMenu}>
            HOME
            <FiChevronRight />
          </Link>

          <Link
            to="/products/category/earrings"
            onClick={closeMenu}
          >
            EARRINGS
            <FiChevronRight />
          </Link>

          <Link
            to="/products/category/pendant"
            onClick={closeMenu}
          >
            PENDANTS
            <FiChevronRight />
          </Link>

          <Link
            to="/products/category/bracelet"
            onClick={closeMenu}
          >
            BRACELETS
            <FiChevronRight />
          </Link>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            COLLECTIONS
            <FiChevronRight />
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
          >
            ABOUT
            <FiChevronRight />
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
          >
            CONTACT
            <FiChevronRight />
          </Link>

        </nav>

        <div className="mobile-icons">

          <Link to="/wishlist" onClick={closeMenu}>
            <FiHeart />
            Wishlist ({wishlistCount})
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            <FiShoppingCart />
            Cart ({cartCount})
          </Link>

        </div>

        <div className="mobile-account">

          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={closeMenu}>
                <FiUser />
                My Profile
              </Link>

              {user?.role === "admin" && (
                <Link to="/admin" onClick={closeMenu}>
                  Admin Panel
                </Link>
              )}

              <button
                className="mobile-logout"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="mobile-login"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                className="mobile-register"
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
import { Link } from "react-router-dom";

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
          <h2>Sundarkanya</h2>

          <button
            className="close-btn"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        <Link to="/" onClick={closeMenu}>🏠 Home</Link>

        <Link to="/products/category/earrings" onClick={closeMenu}>
          ✨ Earrings
        </Link>

        <Link to="/products/category/pendant" onClick={closeMenu}>
          💎 Pendants
        </Link>

        <Link to="/products/category/bracelet" onClick={closeMenu}>
          🌸 Bracelets
        </Link>

        <Link to="/wishlist" onClick={closeMenu}>
          ❤️ Wishlist ({wishlistCount})
        </Link>

        <Link to="/cart" onClick={closeMenu}>
          🛒 Cart ({cartCount})
        </Link>

        <Link to="/about" onClick={closeMenu}>
          ℹ️ About
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          📞 Contact
        </Link>

        <hr />

        {isLoggedIn ? (
          <>

            {user?.role === "admin" && (
              <Link to="/admin" onClick={closeMenu}>
                👑 Admin Panel
              </Link>
            )}

            <Link to="/profile" onClick={closeMenu}>
              👤 My Profile
            </Link>

            <Link to="/orders" onClick={closeMenu}>
              📦 My Orders
            </Link>

            <Link to="/settings" onClick={closeMenu}>
              ⚙️ Settings
            </Link>

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
  );
}

export default MobileMenu;

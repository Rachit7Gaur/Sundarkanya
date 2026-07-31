import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiChevronDown } from "react-icons/fi";

function MobileMenu({
  isOpen,
  closeMenu,
  user,
  logout,
}) {

  const [openJewellery, setOpenJewellery] = useState(false);

  return (

    <div
      className={`mobile-overlay ${isOpen ? "show" : ""}`}
      onClick={closeMenu}
    >

      <aside
        className={`mobile-menu ${isOpen ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="mobile-menu-header">

          <div>

            <h2 className="mobile-menu-logo">
              Sundar Kanya
            </h2>

            <span className="mobile-menu-subtitle">
              JEWELLERY
            </span>

          </div>

          <button
            className="mobile-close-btn"
            onClick={closeMenu}
          >
            <FiX />
          </button>

        </div>

        {/* Navigation */}

        <nav className="mobile-menu-links">

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <button
            className="mobile-dropdown-btn"
            onClick={() =>
              setOpenJewellery(!openJewellery)
            }
          >
            <span>Jewellery</span>

            <FiChevronDown
              className={`dropdown-icon ${
                openJewellery ? "rotate" : ""
              }`}
            />
          </button>

          {openJewellery && (

            <div className="mobile-submenu">

              <Link
                to="/products/category/earrings"
                onClick={closeMenu}
              >
                Earrings
              </Link>

              <Link
                to="/products/category/pendant"
                onClick={closeMenu}
              >
                Pendants
              </Link>

              <Link
                to="/products/category/bracelet"
                onClick={closeMenu}
              >
                Bracelets
              </Link>

            </div>

          )}

          <Link
            to="/products"
            onClick={closeMenu}
          >
            Collections
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </Link>

        </nav>

        {/* Footer */}

        <div className="mobile-menu-footer">

          {user ? (

            <>
              <Link
                  to="/profile"
                  className="mobile-menu-account-link"
                  onClick={closeMenu}
              >
                  My Profile
              </Link>

              {user.role === "admin" && (

                <Link
                    to="/admin"
                    className="mobile-menu-account-link"
                    onClick={closeMenu}
                >
                    👑 Admin Panel
                </Link>

              )}

              <button
                className="mobile-logout-btn"
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
                to="/mobile-login"
                className="mobile-login-btn"
                onClick={closeMenu}
              >
                Login / Sign Up
              </Link>
            </>

          )}

        </div>

      </aside>

    </div>

  );
}

export default MobileMenu;
import { Link } from "react-router-dom";
import { FiMenu, FiHeart, FiShoppingCart } from "react-icons/fi";

import MobileSearchBar from "./MobileSearchBar";

function MobileNavbar({
  setMobileMenuOpen,
  cartCount,
  wishlistCount,
}) {
  return (
    <header className="mobile-navbar">

      <div className="mobile-navbar-top">

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>

        <Link
          to="/"
          className="mobile-logo"
        >
          <h2>Sundar Kanya</h2>
          <span>JEWELLERY</span>
        </Link>

        <div className="mobile-icons">

          <Link to="/wishlist" className="mobile-icon">
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="mobile-badge">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="mobile-icon">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="mobile-badge">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>
     
     <MobileSearchBar />

    </header>
  );
}

export default MobileNavbar;
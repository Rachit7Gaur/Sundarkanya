import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import "./Navbar.css";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import AccountMenu from "./AccountMenu.jsx";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const cartCount = cart.reduce(
    (total,item)=>total + item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Sundarkanya</Link>
      </div>

      <div className="desktop-nav">
        <NavLinks />
      </div>

      <div className="navbar-right">
        <SearchBar />

        {user?.role === "admin" && (
          <Link className="admin-btn" to="/admin">
            👑 Admin Panel
          </Link>
        )}

        <Link className="icon" to="/wishlist">
          ❤ <span className="badge">{wishlistCount}</span>
        </Link>

        <Link className="icon" to="/cart">
          🛒 <span className="badge">{cartCount}</span>
        </Link>

        <AccountMenu isLoggedIn={!!user} logout={logout} />
      </div>

      <button
        className="menu-btn"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </button>

      {mobileMenu && (
        <MobileMenu
          isLoggedIn={!!user}
          user={user}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          logout={logout}
          closeMenu={() => setMobileMenu(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;

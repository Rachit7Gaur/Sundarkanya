import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function AccountMenu({ isLoggedIn, logout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="account" ref={dropdownRef}>
      <button className="account-btn" onClick={toggleDropdown}>
        👤 Account
      </button>

      {open && (
        <div className="account-dropdown">
          {isLoggedIn ? (
            <>
              <div className="user-info">
                <h4>Welcome</h4>
                <p>Beautiful Shopper ❤️</p>
              </div>

              <Link to="/profile">👤 My Profile</Link>
              <Link to="/orders">📦 My Orders</Link>
              <Link to="/wishlist">❤️ Wishlist</Link>
              <Link to="/cart">🛒 Cart</Link>
              <Link to="/settings">⚙️ Settings</Link>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <div className="guest-box">
              <h4>Welcome to Sundarkanya</h4>
              <p>Login to continue shopping.</p>
              <Link className="login-link" to="/login">Login</Link>
              <Link className="register-link" to="/register">Register</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountMenu;

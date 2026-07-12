import { Link } from "react-router-dom";
import { useState } from "react";

function NavLinks() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <ul className="nav-links">

      <li>
        <Link to="/">Home</Link>
      </li>

      <li
        className="dropdown"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <span className="shop-link">
          Shop ▾
        </span>

        {showDropdown && (
          <div className="dropdown-menu">

            <Link to="/products/category/earrings">
             ✨ Earrings
            </Link>

            <Link to="/products/category/pendant">
             💎 Pendants
            </Link>

            <Link to="/products/category/bracelet">
             🌸 Bracelets
            </Link>

            {/* <Link to="/new-arrivals">🆕 New Arrivals</Link> */}

          </div>
        )}
      </li>

      <li>
        <Link to="/about">About</Link>
      </li>

      <li>
        <Link to="/contact">Contact</Link>
      </li>

    </ul>
  );
}

export default NavLinks;
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function DesktopNavLinks() {
  return (
    <ul className="desktop-nav-links">

      <li>
        <Link to="/">Home</Link>
      </li>

      <li className="desktop-dropdown">
        <button
          type="button"
          className="desktop-dropdown-btn"
        >
          Jewellery
          <FiChevronDown className="desktop-dropdown-icon" />
        </button>

        <div className="desktop-dropdown-menu">
          <Link to="/products/category/earrings">
            Earrings
          </Link>

          <Link to="/products/category/pendant">
            Pendants
          </Link>

          <Link to="/products/category/bracelet">
            Bracelets
          </Link>
        </div>
      </li>

      <li>
        <Link to="/products">
          Collections
        </Link>
      </li>

      <li>
        <Link to="/about">
          About
        </Link>
      </li>

      <li>
        <Link to="/contact">
          Contact
        </Link>
      </li>

    </ul>
  );
}

export default DesktopNavLinks;
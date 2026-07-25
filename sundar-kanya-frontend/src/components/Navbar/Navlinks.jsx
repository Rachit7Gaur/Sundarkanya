import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function NavLinks() {

  return (
    <ul className="nav-links">

      <li>
        <Link to="/">HOME</Link>
      </li>

       <li className="nav-item-has-dropdown">
        <button type="button" className="nav-dropdown-btn">
          JEWELLERY
          <FiChevronDown className="dropdown-icon" />
        </button>

        <div className="nav-dropdown">
          <Link to="/products/category/earrings">Earrings</Link>
          <Link to="/products/category/pendant">Pendants</Link>
          <Link to="/products/category/bracelet">Bracelets</Link>
        </div>
      </li>

      <li>
        <Link to="/products">
          COLLECTIONS
        </Link>
      </li>

      <li>
        <Link to="/about">
          ABOUT
        </Link>
      </li>

      <li>
        <Link to="/contact">
          CONTACT
        </Link>
      </li>

    </ul>
  );
}

export default NavLinks;
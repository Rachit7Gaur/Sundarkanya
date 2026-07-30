import { Link } from "react-router-dom";
import "./desktop-top-utility.css";

function TopUtilityBar({ scrolled }) {
  return (
    <div
      className={`desktop-top-utility-bar ${
        scrolled ? "desktop-hide-bar" : ""
      }`}
    >
      <div className="desktop-utility-left">
        <span>📞 +91 94560 46007</span>
      </div>

      <div className="desktop-utility-right">
        <Link to="/orders">Track Order</Link>

        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default TopUtilityBar;
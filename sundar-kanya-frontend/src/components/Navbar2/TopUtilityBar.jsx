import { Link } from "react-router-dom";
import "./topbars.css";

function TopUtilityBar({scrolled}) {
  return (
    <div className={`top-utility-bar ${scrolled ? "hide-bar" : ""}`}>

      <div className="utility-left">
        <span>📞 +91 94560 46007</span>
      </div>

      <div className="utility-right">

        <Link to="/orders">
          Track Order
        </Link>

        <Link to="/contact">
          Contact Us
        </Link>

      </div>

    </div>
  );
}

export default TopUtilityBar;
import { Link } from "react-router-dom";

function TopUtilityBar() {
  return (
    <div className="top-utility-bar">

      <div className="utility-left">
        <span>📞 +91 94560 46007</span>

        {/* <Link to="/stores">
          📍 Find a Store
        </Link> */}
      </div>

      <div className="utility-right">
        <Link to="/orders">
          Track Order
        </Link>

        {/* <Link to="/gold-rate">
          Gold Rate Today
        </Link> */}

        <Link to="/contact">
          Contact Us
        </Link>
      </div>

    </div>
  );
}

export default TopUtilityBar;
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaEnvelope,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaGlobe
} from "react-icons/fa";
import toast from "react-hot-toast";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  toast.success("Logged out successfully");
  navigate("/login");
};
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        <h2>
          Sundar<span>Kanya</span>
        </h2>

        <p>Admin Panel</p>
      </div>

      <nav className="admin-nav">

        <NavLink to="/admin" end>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink to="/admin/orders">
          <FaShoppingBag />
          Orders
        </NavLink>

        <NavLink to="/admin/customers">
          <FaUsers />
          Customers
        </NavLink>

        <NavLink to="/admin/newsletter">
          <FaEnvelope />
          Newsletter
        </NavLink>

        <NavLink to="/admin/analytics">
          <FaChartBar />
          Analytics
        </NavLink>

        {/* <NavLink to="/admin/settings">
          <FaCog />
          Settings
        </NavLink> */}

      </nav>

      <a
        href="http://localhost:5173"
        target="_blank"
        rel="noopener noreferrer"
        className="admin-view-site"
      >
        <FaGlobe />
        View Website
      </a>

      <button
        className="admin-logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;
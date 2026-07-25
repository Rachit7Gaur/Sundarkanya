import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Topbar.css";
import { useState , useEffect } from "react";
import {
  searchAdmin,
  getNotifications,
} from "../services/adminService";

function Topbar() {
  const location = useLocation();
const navigate = useNavigate();;

  const [search, setSearch] = useState("");
 const [results, setResults] = useState(null);

 const [notifications, setNotifications] = useState([]);

const [showNotifications, setShowNotifications] = useState(false);

const [loadingNotifications, setLoadingNotifications] = useState(false);

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/products": "Products",
    "/admin/products/add": "Add Product",
    "/admin/orders": "Orders",
    "/admin/customers": "Customers",
    "/admin/newsletter": "Newsletter",
    "/admin/analytics": "Analytics",
    "/admin/settings": "Settings",
  };

 const handleSearch = async (value) => {
  setSearch(value);

  if (!value.trim()) {
    setResults(null);
    return;
  }

  try {
    const data = await searchAdmin(value);
    setResults(data);
  } catch (error) {
    console.log(error);
  }
};

const loadNotifications = async () => {
  try {
    setLoadingNotifications(true);

    const data = await getNotifications();

    setNotifications(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingNotifications(false);
  }
};

useEffect(() => {
  loadNotifications();
}, []);

  let title = "Admin Panel";

  if (location.pathname.startsWith("/admin/products/edit/")) {
    title = "Edit Product";
  } else {
    title = pageTitles[location.pathname] || "Admin Panel";
  }

  return (
    <header className="admin-topbar">

      <div className="topbar-left">
        <h2>{title}</h2>
      </div>

      <div className="topbar-right">

        <div className="topbar-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {results &&
            (results.products.length > 0 ||
              results.customers.length > 0 ||
              results.orders.length > 0 ||
              results.subscribers.length > 0) && (
          <div className="search-results">

            {results.products.length > 0 && (
              <>
                <h4>Products</h4>
                {results.products.map((product) => (
                  <div
                    key={product._id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/admin/products/edit/${product._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                  >
                    📦 {product.name}
                  </div>
                ))}
              </>
            )}

            {results.customers.length > 0 && (
              <>
                <h4>Customers</h4>
                {results.customers.map((customer) => (
                  <div
                    key={customer._id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/admin/customers/${customer._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                  >
                    👤 {customer.name}
                  </div>
                ))}
              </>
            )}

            {results.orders.length > 0 && (
              <>
                <h4>Orders</h4>
                {results.orders.map((order) => (
                  <div
                    key={order._id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/admin/orders/${order._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                  >
                    🛒 {order._id}
                  </div>
                ))}
              </>
            )}

            {results.subscribers.length > 0 && (
              <>
                <h4>Newsletter</h4>
                {results.subscribers.map((subscriber) => (
                  <div
                    key={subscriber._id}
                    className="search-item"
                  >
                    ✉️ {subscriber.email}
                  </div>
                ))}
              </>
            )}

          </div>
        )}
      
        </div>

        <button className="notification-btn" onClick={() =>
    setShowNotifications(!showNotifications)
  }>
          <FaBell />
          <span className="notification-badge">
  {notifications.length}
</span>
        </button>

        {showNotifications && (
  <div className="notification-dropdown">

    <h4>Notifications</h4>

    {loadingNotifications ? (

      <p className="notification-empty">
        Loading...
      </p>

    ) : notifications.length === 0 ? (

      <p className="notification-empty">
        No notifications
      </p>

    ) : (

      notifications.map((item, index) => (

        <div
  key={index}
  className="notification-item"
  onClick={() => {
    navigate(item.link);
    setShowNotifications(false);
  }}
>

          <p>{item.message}</p>

          <span>
            {new Date(item.createdAt).toLocaleString()}
          </span>

        </div>

      ))

    )}

  </div>
)}

        <div className="admin-profile">
          <div className="admin-avatar">
            A
          </div>

          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Topbar;
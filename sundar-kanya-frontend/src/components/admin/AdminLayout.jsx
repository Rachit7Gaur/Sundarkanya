import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminLayout.css";

function AdminLayout() {
  const { logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUnreadMessages();
  }, []);

  const loadUnreadMessages = async () => {
    try {
      const res = await api.get("/contact");
      const unread = res.data.filter((msg) => !msg.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>SundarKanya</h2>

        <Link to="/admin">📊 Dashboard</Link>

        <Link to="/admin/products">📦 Products</Link>

        <Link to="/admin/products/add">➕ Add Product</Link>

        <Link to="/admin/orders">📋 Orders</Link>

        <Link to="/admin/customers">
          👥 Customers
        </Link>

        <Link to="/admin/messages" className="message-link">
          💬 Messages
          {unreadCount > 0 && (
            <span className="message-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link to="/">🏠 Visit Website</Link>

        <button onClick={logout}>🚪 Logout</button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
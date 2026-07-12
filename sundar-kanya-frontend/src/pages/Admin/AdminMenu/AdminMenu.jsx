import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaEnvelope,
} from "react-icons/fa";

import Loader from "../../../components/Loader/Loader";
import { getDashboardStats } from "../../../services/adminService";

import "./AdminMenu.css";

const AdminMenu = () => {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load dashboard");

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <Loader />;

  return (

    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <FaBoxOpen />
          <h2>{stats.totalProducts}</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <FaUsers />
          <h2>{stats.totalUsers}</h2>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <FaShoppingCart />
          <h2>{stats.totalOrders}</h2>
          <p>Orders</p>
        </div>

        <div className="stat-card">
          <FaRupeeSign />
          <h2>₹{stats.totalRevenue}</h2>
          <p>Revenue</p>
        </div>

        <Link to="/admin/messages" className="dashboard-link">
          <div className="stat-card">
            <FaEnvelope />
            <h2>{stats.unreadMessages}</h2>
            <p>Unread Messages</p>
          </div>
        </Link>

      </div>

      <div className="recent-orders">

        <h2>Recent Orders</h2>

        <table>

          <thead>

            <tr>

              <th>Customer</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {stats.recentOrders.map((order) => (

              <tr key={order._id}>

                <td>{order.user?.name}</td>

                <td>₹{order.totalAmount}</td>

                <td>{order.orderStatus}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminMenu;
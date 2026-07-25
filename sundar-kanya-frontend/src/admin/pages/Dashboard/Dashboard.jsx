import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";

import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState(null);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getDashboardStats();
    setStats(data);
  } catch (err) {
    console.log(err);
  }
};

if (!stats) {
  return <h2>Loading...</h2>;
}

  return (

    <div className="dashboard-page">

      <h1>Welcome Back, Admin 👋</h1>

      <p className="dashboard-subtitle">
        Here's what's happening in your store today.
      </p>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaBoxOpen />
          </div>

          <div>
            <h2>{stats.totalProducts}</h2>
            <p>Total Products</p>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaShoppingBag />
          </div>

          <div>
            <h2>{stats.totalOrders}</h2>
            <p>Total Orders</p>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaUsers />
          </div>

          <div>
            <h2>{stats.totalCustomers}</h2>
            <p>Total Customers</p>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-icon">
            <FaRupeeSign />
          </div>

          <div>
            <h2>₹{stats.totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>

        </div>

      </div>

      <div className="analytics-grid">

          <div className="analytics-card">
            <h3>Pending Orders</h3>
            <h1>{stats.pendingOrders}</h1>
            <p>Need attention</p>
          </div>

          <div className="analytics-card">
            <h3>Delivered Orders</h3>
            <h1>{stats.deliveredOrders}</h1>
            <p>Successfully delivered</p>
          </div>

          <div className="analytics-card">
            <h3>Low Stock Products</h3>
            <h1>{stats.lowStockProducts}</h1>
            <p>Products running low</p>
          </div>

        </div>

      <div className="recent-orders-card">

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
                <td>
                  <span
                    className={`status ${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
      <div className="top-products-card">

  <h2>Top Selling Products</h2>

  {stats.topSellingProducts.length === 0 ? (

    <p>No sales yet.</p>

  ) : (

    <div className="top-products-list">

      {stats.topSellingProducts.map((product, index) => (

        <div
          className="top-product-item"
          key={index}
        >

          <img
            src={product.image}
            alt={product.name}
          />

          <div className="top-product-info">

            <h4>{product.name}</h4>

            <p>Sold: {product.totalSold}</p>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

    </div>

  );

}

export default Dashboard;
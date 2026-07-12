import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../services/adminService";
import "./Dashboard.css";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Customers</h3>
          <h2>{stats.totalCustomers}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue}</h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
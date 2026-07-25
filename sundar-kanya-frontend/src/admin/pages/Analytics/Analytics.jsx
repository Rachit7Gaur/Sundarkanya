import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import "./Analytics.css";

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLORS = [
  "#D4AF37",
  "#111827",
  "#8B5CF6",
  "#10B981",
  "#EF4444",
];

function Analytics() {

  const [analytics, setAnalytics] = useState([]);
const [categoryData, setCategoryData] = useState([]);
const [customerData, setCustomerData] = useState([]);
const [statusData, setStatusData] = useState([]);
const [range, setRange] = useState("30");

useEffect(() => {
  loadAnalytics();
}, [range]);


  const loadAnalytics = async () => {
  try {

    const data = await getAnalytics(range);

    const formatted = data.monthlyData.map((item) => ({
      month: monthNames[item._id],
      revenue: item.revenue,
      orders: item.orders,
    }));

    setAnalytics(formatted);

    const categories = data.categorySales.map((item) => ({
      name: item._id,
      value: item.totalSold,
    }));

    setCategoryData(categories);

    const customers = data.customerGrowth.map((item) => ({
  month: monthNames[item._id],
  customers: item.customers,
}));

setCustomerData(customers);

const status = data.orderStatusData.map((item) => ({
  name: item._id,
  value: item.value,
}));

setStatusData(status);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="analytics-page">

      <h1>Analytics</h1>

      <div className="analytics-header">

    <h1>Analytics</h1>

    <select
        value={range}
        onChange={(e)=>setRange(e.target.value)}
    >

        <option value="7">Last 7 Days</option>

        <option value="30">Last 30 Days</option>

        <option value="365">This Year</option>

    </select>

</div>

      <div className="chart-card">

        <h2>Monthly Revenue</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart data={analytics}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#D4AF37"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

  <h2>Monthly Orders</h2>

  <ResponsiveContainer
    width="100%"
    height={350}
  >

    <LineChart data={analytics}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="orders"
        stroke="#111827"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="chart-card">

  <h2>Category Sales</h2>

  <ResponsiveContainer width="100%" height={400}>

    <PieChart>

      <Pie
        data={categoryData}
        dataKey="value"
        nameKey="name"
        outerRadius={140}
        label
      >

        {categoryData.map((entry, index) => (

          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />

        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

<div className="chart-card">

  <h2>Customer Growth</h2>

  <ResponsiveContainer width="100%" height={350}>

    <LineChart data={customerData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="customers"
        stroke="#10B981"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="chart-card">

  <h2>Order Status Distribution</h2>

  <ResponsiveContainer width="100%" height={400}>

    <PieChart>

      <Pie
        data={statusData}
        dataKey="value"
        nameKey="name"
        outerRadius={140}
        label
      >

        {statusData.map((entry, index) => (

          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />

        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

    </div>
  );
}

export default Analytics;
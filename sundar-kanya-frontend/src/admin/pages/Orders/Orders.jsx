import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-header">
        <h1>Orders</h1>
        <p>Manage customer orders.</p>
      </div>

      <div className="admin-orders-table-container">

        <table className="admin-orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="7">
                  No Orders Found
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order._id}>

                  <td>{order._id}</td>

                  <td>{order.user?.name}</td>

                  <td>₹{order.totalAmount}</td>

                  <td>{order.paymentStatus}</td>

                  <td>{order.orderStatus}</td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <button
                        className="admin-view-btn"
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                        View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;
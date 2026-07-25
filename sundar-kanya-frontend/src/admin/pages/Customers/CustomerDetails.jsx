import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCustomerById } from "../../services/adminService";
import "./CustomerDetails.css";

function CustomerDetails() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const response = await getCustomerById(id);
      setData(response);
    } catch (error) {
      toast.error("Failed to load customer");
    }
  };

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="admin-customer-details">

      <h1>Customer Details</h1>

      <div className="customer-card">

        <h2>{data.customer.name}</h2>

        <p>
          <strong>Email:</strong> {data.customer.email}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(data.customer.createdAt).toLocaleDateString()}
        </p>

        <p>
          <strong>Total Orders:</strong> {data.totalOrders}
        </p>

        <p>
          <strong>Total Spent:</strong> ₹{data.totalSpent}
        </p>

      </div>

      <div className="customer-orders">

        <h2>Order History</h2>

        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {data.orders.map((order) => (

              <tr key={order._id}>

                <td>{order._id}</td>

                <td>₹{order.totalAmount}</td>

                <td>{order.paymentStatus}</td>

                <td>{order.orderStatus}</td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerDetails;
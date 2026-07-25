import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCustomers } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCustomers(filtered);
  }, [search, customers]);

  return (
    <div className="admin-customers-page">

      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage all registered customers.</p>
        </div>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customers-table-container">

        <table className="customers-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="5">No Customers Found</td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.totalOrders}</td>
                  <td>₹{customer.totalSpent}</td>
                  <td>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="customer-view-btn"
                      onClick={() => navigate(`/admin/customers/${customer._id}`)}
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

export default Customers;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data);
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  return (
    <div className="customers-page">
      <h1>Customers</h1>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
import { useEffect, useState } from "react";
import { FaEnvelope, FaSearch , FaTrash } from "react-icons/fa";
import {
  getSubscribers,
  deleteSubscriber,
} from "../../services/adminService";
import "./Newsletter.css";
import toast from "react-hot-toast";

function Newsletter() {

  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
      setFilteredSubscribers(data);
    } catch (err) {
      console.log(err);
    }
  };

 const handleDelete = (id) => {
  setSelectedSubscriber(id);
  setShowModal(true);
};

const confirmDelete = async () => {
  try {
    await deleteSubscriber(selectedSubscriber);

    toast.success("Subscriber deleted successfully");

    setShowModal(false);
    setSelectedSubscriber(null);

    loadSubscribers();

  } catch (error) {

    toast.error("Delete failed");

  }
};

  useEffect(() => {

    const filtered = subscribers.filter((item) =>
      item.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredSubscribers(filtered);

  }, [search, subscribers]);

  const handleExport = () => {
  if (subscribers.length === 0) {
    toast.error("No subscribers to export");
    return;
  }

  const csv = [
    ["Email", "Subscribed On"],
    ...subscribers.map((subscriber) => [
      subscriber.email,
      new Date(subscriber.createdAt).toLocaleDateString(),
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "newsletter-subscribers.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);

  toast.success("CSV exported successfully");
};

 return (
  <div className="newsletter-page">

    <div className="newsletter-header">

      <div>
        <h1>Newsletter</h1>
        <p>Manage all newsletter subscribers.</p>
      </div>

      <div className="newsletter-actions">

        <button
          className="export-btn"
          onClick={handleExport}
        >
          Export CSV
        </button>

        <div className="subscriber-card">
          <FaEnvelope />
          <div>
            <h2>{subscribers.length}</h2>
            <span>Total Subscribers</span>
          </div>
        </div>

      </div>

    </div>

    <div className="newsletter-search">

      <FaSearch />

      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

    <div className="newsletter-table">

      <table>

        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed On</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredSubscribers.length === 0 ? (

            <tr>
              <td colSpan="3">
                No Subscribers Found
              </td>
            </tr>

          ) : (

            filteredSubscribers.map((subscriber) => (

              <tr key={subscriber._id}>

                <td>{subscriber.email}</td>

                <td>
                  {new Date(
                    subscriber.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(subscriber._id)
                    }
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

    {showModal && (

      <div className="delete-modal-overlay">

        <div className="delete-modal">

          <h2>Delete Subscriber</h2>

          <p>
            Are you sure you want to delete this
            subscriber?
          </p>

          <div className="delete-modal-buttons">

            <button
              className="cancel-btn"
              onClick={() => {
                setShowModal(false);
                setSelectedSubscriber(null);
              }}
            >
              Cancel
            </button>

            <button
              className="confirm-btn"
              onClick={confirmDelete}
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    )}

  </div>
);
}

export default Newsletter;
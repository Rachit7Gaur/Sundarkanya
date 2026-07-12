import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const res = await api.get("/contact");
      setMessages(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      toast.success("Marked as read");

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/${id}`);

      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );

      toast.success("Message deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="messages-page">

      <h1>Customer Messages</h1>

      {messages.length === 0 ? (
        <h3>No messages found.</h3>
      ) : (
        messages.map((msg) => (
          <div className="message-card" key={msg._id}>

            <div className="message-header">

              <div>
                <h3>{msg.name}</h3>
                <p>{msg.email}</p>
              </div>

              <span
                className={
                  msg.isRead
                    ? "status read"
                    : "status unread"
                }
              >
                {msg.isRead ? "Read" : "Unread"}
              </span>

            </div>

            <h4>{msg.subject}</h4>

            <p>{msg.message}</p>

            <small>
              {new Date(msg.createdAt).toLocaleString()}
            </small>

            <div className="message-actions">

              {!msg.isRead && (
                <button
                  className="read-btn"
                  onClick={() => markAsRead(msg._id)}
                >
                  Mark as Read
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteMessage(msg._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default Messages;
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Topbar />

        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;
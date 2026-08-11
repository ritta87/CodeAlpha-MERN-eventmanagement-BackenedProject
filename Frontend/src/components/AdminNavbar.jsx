import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/admin/login")
  };

  return (
    <nav className="admin-navbar">

      <div className="nav-brand">
        Event Hub
      </div>

      <div className="nav-links">

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/registeredevents">
          Registered Events
        </Link>

        <button type="button"
        onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  )
}

export default AdminNavbar;
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Task Manager
        </Link>
        {user && (
          <div className="header-right">
            <span className="user-name">Hi, {user.name}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

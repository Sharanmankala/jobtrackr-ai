import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">JobTrackr AI</p>
          <h1>Track your job search with less chaos.</h1>
        </div>
        <nav className="nav-links">
          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
            Dashboard
          </Link>
          <Link className={location.pathname === "/applications" ? "active" : ""} to="/applications">
            Applications
          </Link>
        </nav>
        <div className="sidebar-footer">
          <p>{user?.name}</p>
          <button className="secondary-button" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;

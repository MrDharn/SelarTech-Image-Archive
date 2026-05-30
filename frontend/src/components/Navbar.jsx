import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
          className="logo"
        />

        <h2 className="logo-title">SELARTECH ARCHIVE</h2>
      </div>

      <div className="nav-right">
        <div className="user-badge">{user?.email}</div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

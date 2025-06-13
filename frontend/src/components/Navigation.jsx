import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "../styles/navigation.css";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [redirectToHome, setRedirectToHome] = useState(false);
  function handleLogout() {
    logout();
    navigate("/");
  }
  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }
  // console.log(token)
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          JobPlatform
        </Link>
        <ul className="nav-links">
          <li
            style={{
              display:
                token == "admin-token" || token == null || token == ""
                  ? "none"
                  : "",
            }}
          >
            <Link
              to="/apply"
              className={`nav-link ${
                location.pathname === "/apply" ? "active" : ""
              }`}
            >
              Apply for Job
            </Link>
          </li>

          <li style={{ display: token == "admin-token" ? "" : "none" }}>
            <Link
              to="/recruiter"
              className={`nav-link ${
                location.pathname === "/recruiter" ? "active" : ""
              }`}
            >
              Recruiter Dashboard
            </Link>
          </li>
          <li>
            <button
              className="nav-link"
              style={{
                fontSize: "2rem",
                padding: "0",
                border: "none",
                backgroundColor: "white",
                display: "flex",
              }}
              onClick={handleLogout}
            >
              {token && token != "" && <IoMdLogIn />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

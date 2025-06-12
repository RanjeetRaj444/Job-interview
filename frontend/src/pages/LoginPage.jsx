import React, { useState } from "react";
import "../styles/login.css";
import Toast from "../components/Toast";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [isLoginState, setIsLoginState] = useState(false);
  const {
    formData,
    closeToast,
    handleSignUp,
    handleLogin,
    handleInputChange,
    loading,
    toast,
  } = useAuth();

  return (
    <div className="form-container">
      <h1 className="form-title">{isLoginState ? "Sign Up" : "Login"}</h1>

      <form onSubmit={isLoginState ? handleSignUp : handleLogin}>
        {isLoginState && (
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Username *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="form-button">
          {loading ? "Loading..." : isLoginState ? "Sign Up" : "Login"}
        </button>
      </form>

      <p>
        {isLoginState ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLoginState(!isLoginState)}
          className="toggle-auth-btn"
          disabled={loading}
        >
          {isLoginState ? "Login" : "Sign Up"}
        </button>
      </p>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
};

export default LoginPage;

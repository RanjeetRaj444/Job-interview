import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [toast, setToast] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("job-user-token"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://job-interview-sm41.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("job-user-token", data.token);
        localStorage.setItem("job-user-data", JSON.stringify(data.user));
        setToken(localStorage.getItem("job-user-token"));
        showToast(data.message, "success");
        setTimeout(() => setRedirectToHome(true), 1000); // allow toast to show
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong!", "error");
    }

    // console.log("Clicked Signup", formData);
    showToast("Signup success! (not implemented)", "success");
    e.target.reset();
  }
  const showToast = (msg, type) => {
    setToast({ message: msg, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const logout = () => {
    localStorage.removeItem("job-user-token");
    localStorage.removeItem("job-user-data");
    // setUser(null);
    setToken(null);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://job-interview-sm41.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("job-user-token", data.token);
        localStorage.setItem("job-user-data", JSON.stringify(data.user));
        setToken(localStorage.getItem("job-user-token"));
        showToast(data.message, "success");
        setTimeout(() => setRedirectToHome(true), 1000); // allow toast to show
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong!", "error");
    }
    e.target.reset();
  }
  return (
    <AuthContext.Provider
      value={{
        redirectToHome,
        setFormData,
        formData,
        showToast,
        closeToast,
        handleSignUp,
        handleInputChange,
        setToken,
        token,
        handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

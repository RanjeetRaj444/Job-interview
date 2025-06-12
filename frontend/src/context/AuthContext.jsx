import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("job-user-token")
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://job-interview-sm41.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("job-user-token", data.token);
        localStorage.setItem("job-user-data", JSON.stringify(data.user));
        setToken(data.token);
        showToast(data.message, "success");
        navigate("/");
      } else {
        showToast(data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
      e.target.reset();
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://job-interview-sm41.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("job-user-token", data.token);
        localStorage.setItem("job-user-data", JSON.stringify(data.user));
        setToken(data.token);
        showToast(data.message, "success");
        navigate("/");
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
      e.target.reset();
    }
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
    setToken(null);
    showToast("Logout", "success");
  };

  return (
    <AuthContext.Provider
      value={{
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
        loading,
        toast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

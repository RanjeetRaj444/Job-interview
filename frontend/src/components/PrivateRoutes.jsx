import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("job-user-token");

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;

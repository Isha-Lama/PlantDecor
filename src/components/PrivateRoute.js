import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/auth" />; // Redirect to login if not authenticated
  }

  return children; // Render children if authenticated
};

export default PrivateRoute;

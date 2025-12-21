import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoutes = () => {
  const accessToken = sessionStorage.getItem("access");
  let isAuthenticated = null;
  isAuthenticated = !!accessToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

// src/pages/Authentication/PublicRoutes.js

import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isToken = localStorage.getItem("accessToken");

  if (isToken) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default PublicRoutes;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  // const { user } = useAppContext();
  const getLocalData = JSON.parse(localStorage.getItem("us_da_prv"));
  const user = getLocalData ? getLocalData.iduser : null;
  const Navigate = useNavigate();
  if (!user) {
    return (window.location = "/login");
  }
  return children;
};

export default ProtectedRoute;

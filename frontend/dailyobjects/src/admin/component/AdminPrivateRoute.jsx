import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.adminAuthReducer.isAuth);

  if (!isAuth) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default AdminPrivateRoute;

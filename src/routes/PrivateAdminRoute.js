import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import useAdmin from "../hooks/useAdmin";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [Admin, adminLoading] = useAdmin();
  const location = useLocation();
  if (loading && adminLoading) {
    return <Loader />;
  }
  if (user && Admin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateAdminRoute;

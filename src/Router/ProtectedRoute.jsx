import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import {
  getRoleFromLocalStorage,
  getTokenFromLocalStorage,
} from "../utils/Storage/StorageUtils";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const role = getRoleFromLocalStorage();
  const token = getTokenFromLocalStorage();

  return (auth?.token && auth?.role) || (role && token) ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

export const ProtectedLoginSignupRoute = ({ children }) => {
  const { auth } = useAuth();

  const role = getRoleFromLocalStorage();
  const token = getTokenFromLocalStorage();

  return (auth?.token && auth?.role) || (role && token) ? (
    <Navigate to="/" />
  ) : (
    children
  );
};

export const ProtectedAdminRoute = ({ children }) => {
  const { auth } = useAuth();

  const role = getRoleFromLocalStorage();

  return auth?.role === "admin" || (role && role === "admin") ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export const ProtectedBusinessRoute = ({ children }) => {
  const { auth } = useAuth();

  const role = getRoleFromLocalStorage();

  return auth?.role === "estimator" || (role && role === "estimator") ? (
    <Navigate to="/unauthorized" />
  ) : (
    children
  );
};

export const ProtectedClientRoute = ({ children }) => {
  const { auth } = useAuth();

  const role = getRoleFromLocalStorage();

  return auth?.role === "client" || (role && role === "client") ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export const ProtectedEstimatorRoute = ({ children }) => {
  const { auth } = useAuth();

  const role = getRoleFromLocalStorage();

  return auth?.role === "estimator" || (role && role === "estimator") ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

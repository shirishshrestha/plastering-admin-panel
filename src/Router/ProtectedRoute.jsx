import { Navigate } from "react-router-dom";
import App from "../App";
import {
  getRoleFromLocalStorage,
  getTokenFromLocalStorage,
} from "../utils/Storage/StorageUtils";

const ProtectedRoute = () => {
  const token = getTokenFromLocalStorage();
  const role = getRoleFromLocalStorage();
  return token && role ? <App /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

import { useContext } from "react";
import { AuthContext } from "../utils/Context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

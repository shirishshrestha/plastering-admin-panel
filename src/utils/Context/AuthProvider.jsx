import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [logoutConfirationShow, setLogoutConfirationShow] = useState(false);

  const [confirmationShow, setConfirmationShow] = useState(false);

  const [searchName, setSearchName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logoutConfirationShow,
        setLogoutConfirationShow,
        setConfirmationShow,
        confirmationShow,
        setSearchName,
        searchName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

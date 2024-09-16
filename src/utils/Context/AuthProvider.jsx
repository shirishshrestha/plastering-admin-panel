import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [logoutConfirationShow, setLogoutConfirationShow] = useState(false);

  const [confirmationShow, setConfirmationShow] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logoutConfirationShow,
        setLogoutConfirationShow,
        setConfirmationShow,
        confirmationShow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

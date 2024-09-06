import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [logoutConfirationShow, setLogoutConfirationShow] = useState(false);

  console.log(logoutConfirationShow);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logoutConfirationShow,
        setLogoutConfirationShow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

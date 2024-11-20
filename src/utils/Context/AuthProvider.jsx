import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [logoutConfirationShow, setLogoutConfirationShow] = useState(false);

  const [confirmationShow, setConfirmationShow] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logoutConfirationShow,
        setLogoutConfirationShow,
        setConfirmationShow,
        confirmationShow,
        isOpen,
        closeDrawer,
        openDrawer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

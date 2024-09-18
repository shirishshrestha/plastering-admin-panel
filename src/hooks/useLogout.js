import { useEffect } from "react";
/**
 * Custom hook for handling logout functionality by reloading the window when storage changes.
 */
const useLogout = () => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logoutSignal" && event.newValue === "true") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = (callback) => {
    localStorage.setItem("logoutSignal", "true");
    setTimeout(() => {
      localStorage.removeItem("logoutSignal");

      if (callback) callback();
    }, 1000);
  };

  return { logout };
};

export default useLogout;

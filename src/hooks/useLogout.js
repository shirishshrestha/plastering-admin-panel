import React, { useEffect } from "react";
/**
 * Custom hook for handling logout functionality by reloading the window when storage changes.
 */
const useLogout = () => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logoutSignal" && event.newValue === "true") {
        // Logout signal received from another tab
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = (callback) => {
    // Set a shared variable in the storage to signal other tabs to logout
    localStorage.setItem("logoutSignal", "true");
    // Perform local logout actions
    // Clear the logout signal after a short delay
    setTimeout(() => {
      localStorage.removeItem("logoutSignal");

      // Call the callback function after logout is complete
      if (callback) callback();
    }, 1000);
  };

  return { logout };
};

export default useLogout;

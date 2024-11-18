import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchName, setSearchName] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchName,
        setSearchName,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

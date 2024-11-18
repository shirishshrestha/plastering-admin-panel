import { useContext } from "react";
import { SearchContext } from "../utils/Context/SearchProvider";

export const useSearchContext = () => {
  return useContext(SearchContext);
};

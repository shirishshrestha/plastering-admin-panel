import { useQuery } from "@tanstack/react-query";
import { getProjectBooks } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

export const useGetProjectBooks = (
  key = "projectBooks",
  enabledPath = "/projectbooks",
  date = "",
  status = "",
  page = 1,
  search = ""
) => {
  const location = useLocation();

  const { data, error, isPending } = useQuery({
    queryKey: [key, date, status, page, search],
    queryFn: () => getProjectBooks(date, status, page, search),
    enabled: location.pathname === enabledPath,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};

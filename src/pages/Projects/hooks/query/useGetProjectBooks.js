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
    refetchOnWindowFocus: false,
    enabled: location.pathname === enabledPath,
  });

  return {
    data,
    error,
    isPending,
  };
};

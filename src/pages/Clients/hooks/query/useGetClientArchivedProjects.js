import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getClientArchivedProjects } from "../../../../api/Projects/ProjectsApiSlice";

export const useGetClientArchivedProjects = (
  key = "clientArchivedProjects",
  enabledPath = "/clientProjects/archivedClientProjects",
  page,
  search
) => {
  const location = useLocation();
  const { data, isPending, error } = useQuery({
    queryKey: [key, page, search],
    queryFn: () => getClientArchivedProjects(page, search),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: location.pathname.startsWith(enabledPath),
  });

  return { data, isPending, error };
};

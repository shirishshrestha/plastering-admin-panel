import { useLocation } from "react-router-dom";
import { getClientActiveProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetClientActiveProjects = (
  key = "clientActiveProjects",
  enabledPath = "/clientProjects/activeClientProjects",
  page,
  search
) => {
  const location = useLocation();
  const { data, isPending, error } = useQuery({
    queryKey: [key, page, search],
    queryFn: () => getClientActiveProjects(page, search),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: location.pathname.startsWith(enabledPath),
  });

  return { data, isPending, error };
};

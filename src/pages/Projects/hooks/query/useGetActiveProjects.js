import { useLocation } from "react-router-dom";
import { getActiveProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveProjects = (
  key = "activeProjects",
  enabledPath = "/projectbooks/activeProjects",
  page = 1,
  search = ""
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getActiveProjects(page, search),
    enabled: location.pathname.startsWith(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

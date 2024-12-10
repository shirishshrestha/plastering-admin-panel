import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

export const useGetProjects = (key, enabledPath, page, search) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getProjects(page, search),
    enabled: location.pathname === enabledPath,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

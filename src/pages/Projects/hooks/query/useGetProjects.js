import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

export const useGetProjects = (key, enabledPath) => {
  
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getProjects(),
    enabled: location.pathname === enabledPath,
    staleTime: 50 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return { data, error, isPending };
};

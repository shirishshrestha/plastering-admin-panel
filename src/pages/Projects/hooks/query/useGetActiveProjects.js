import { useLocation, useParams } from "react-router-dom";
import { getActiveProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveProjects = (
  key = "activeProjects",
  enabledPath = "/projectbooks/activeProjects",
  page = 1,
  search = "",
  projectType = "",
  date = ""
) => {
  const { id } = useParams();
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, id, page, search, projectType, date],
    queryFn: () => getActiveProjects(id, page, search, projectType, date),
    enabled: location.pathname.startsWith(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

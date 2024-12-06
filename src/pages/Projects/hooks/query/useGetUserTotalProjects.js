import { useLocation } from "react-router-dom";
import { getUserTotalProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetUserTotalProjects = (
  key = "userTotalProjects",
  enabledPath = "/projectbooks/projects",
  id,
  page = 1,
  search = "",
  projectType = "",
  date = ""
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, id, page, search, projectType, date],
    queryFn: () => getUserTotalProjects(id, page, search, projectType, date),
    enabled: location.pathname.includes(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

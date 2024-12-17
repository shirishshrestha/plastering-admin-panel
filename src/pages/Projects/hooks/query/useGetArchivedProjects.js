import { useLocation, useParams } from "react-router-dom";
import { getArchivedProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetArchivedProjects = (
  key = "archivedProjects",
  enabledPath = "/projectbooks/archivedProjects",
  page = 1,
  search = "",
  status = "",
  projectType = "",
  date = ""
) => {
  const { id } = useParams();
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, id, page, search, status, projectType, date],
    queryFn: () =>
      getArchivedProjects(id, page, search, status, projectType, date),
    enabled: location.pathname.startsWith(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

import { useLocation, useParams } from "react-router-dom";
import { getArchivedProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetArchivedProjects = (
  key = "archivedProjects",
  enabledPath = "/projectbooks/archivedProjects",
  page = 1,
  search = ""
) => {
  const { id } = useParams();
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, id, page, search],
    queryFn: () => getArchivedProjects(id, page, search),
    enabled: location.pathname.startsWith(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};
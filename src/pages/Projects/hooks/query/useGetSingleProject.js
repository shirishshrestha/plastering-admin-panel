import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../../../api/Projects/ProjectsApiSlice";

export const useGetSingleProject = (key = "singleProject", project_id) => {
  const { data, error, isPending } = useQuery({
    queryKey: [key, project_id],
    queryFn: () => getProjectById(project_id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};

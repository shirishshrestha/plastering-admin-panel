import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../../api/Projects/ProjectsApiSlice";

export const useGetProjects = (key) => {
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getProjects(),
  });
};

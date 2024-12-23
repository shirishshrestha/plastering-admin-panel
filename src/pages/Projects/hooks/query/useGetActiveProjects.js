import { useLocation, useParams } from "react-router-dom";
import { getActiveProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch active projects.
 *
 * @param {string} [key="activeProjects"] - The query key used for cache management in React Query.
 * @param {string} [enabledPath="/projectbooks/activeProjects"] - The path to match in `useLocation` to determine when to enable the query.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [search=""] - The search query to filter projects.
 * @param {string} [projectType=""] - The type of the project (e.g., 'commercial', 'residential').
 * @param {string} [date=""] - The date to filter projects by.
 *
 * @returns {Object} An object containing the following properties:
 * - `data`: The data returned from the API (active projects).
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
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

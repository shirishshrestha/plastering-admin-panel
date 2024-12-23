import { useLocation } from "react-router-dom";
import { getUserTotalProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch the total projects for a user.
 * It utilizes React Query for efficient data fetching and caching.
 *
 * @param {string} key - The query key used for cache management in React Query.
 * @param {string} enabledPath - The path that will enable the query to run (query only triggers if the path starts with this).
 * @param {string} id - The user ID for which to fetch the total projects.
 * @param {number} page - The page number for pagination (default is 1).
 * @param {string} search - The search term for filtering projects.
 * @param {string} projectType - The type of project to filter by (e.g., 'Commercial', 'Residential').
 * @param {string} date - The date filter for projects.
 * @param {string} status - The status filter for projects (e.g., 'Active', 'Completed').
 *
 * @returns {Object} An object containing:
 * - `data`: The fetched total projects data for the user.
 * - `error`: Any error encountered during the query.
 * - `isPending`: A boolean indicating if the query is still loading.
 */
export const useGetUserTotalProjects = (
  key = "userTotalProjects",
  enabledPath = "/projectbooks/projects",
  id,
  page = 1,
  search = "",
  projectType = "",
  date = "",
  status = ""
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, id, page, search, projectType, date, status],
    queryFn: () =>
      getUserTotalProjects(id, page, search, projectType, date, status),
    enabled: location.pathname.startsWith(enabledPath),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

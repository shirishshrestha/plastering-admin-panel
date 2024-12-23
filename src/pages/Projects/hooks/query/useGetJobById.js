import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../../../../api/Jobs/JobApiSlice";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to fetch a job by its ID.
 *
 * @param {string} [key="jobById"] - The query key used for cache management in React Query.
 * @param {string} job_id - The ID of the job to fetch.
 * @param {string} [pathName="/projectbooks"] - The path prefix to match in `useLocation` to determine when to enable the query.
 *
 * @returns {Object} An object containing the following properties:
 * - `data`: The data returned from the API (the job details).
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
export const useGetJobById = (
  key = "jobById",
  job_id,
  pathName = "/projectbooks"
) => {
  const { pathname } = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, job_id],
    queryFn: () => getJobById(job_id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: pathname.startsWith(pathName),
  });

  return { data, error, isPending };
};

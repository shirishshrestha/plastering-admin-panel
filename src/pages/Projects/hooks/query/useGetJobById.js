import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../../../../api/Jobs/JobApiSlice";
import { useLocation } from "react-router-dom";

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

import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../../../../api/Jobs/JobApiSlice";

export const useGetJobById = (key = "jobById", job_id) => {
  const { data, error, isPending } = useQuery({
    queryKey: [key, job_id],
    queryFn: () => getJobById(job_id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};

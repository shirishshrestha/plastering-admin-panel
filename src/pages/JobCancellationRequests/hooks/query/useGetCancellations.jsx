import { useQuery } from "@tanstack/react-query";
import { getJobCancellationRequests } from "../../../../api/Jobs/JobApiSlice";

export const useGetCancellations = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["job-cancellation-requests"],
    queryFn: getJobCancellationRequests,
  });

  return { data, error, isPending };
};

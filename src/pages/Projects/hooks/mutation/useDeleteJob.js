import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../utils/Query/Query";
import { notifyError, notifySuccess } from "../../../../components";
import { deleteJob } from "../../../../api/Jobs/JobApiSlice";
import { useSearchParams } from "react-router-dom";

export const useDeleteJob = (key, handleDeleteToggle, JobData, currentPage) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (job_id) => deleteJob(job_id),
    onSuccess: (response) => {
      console.log();
      notifySuccess("Job deleted successfully");
      if (JobData.length === 1 && currentPage > 1) {
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage - 1);
        setSearchParams(params);
      }
      queryClient.invalidateQueries(key);
      handleDeleteToggle();
    },
    onError: () => {
      notifyError("Failed to delete job! Please try again");
    },
  });

  return { mutate, isPending };
};

import { useMutation } from "@tanstack/react-query";
import { editJob } from "../../../../api/Jobs/JobApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useCallback } from "react";

export const useEditJob = (key = "userJob", project_id, setNewFiles) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const role = getRoleFromLocalStorage();

  const navigateAfterSuccess = useCallback(() => {
    navigate(`/projectbooks/jobBook/${project_id}`, { replace: true });
  }, [navigate, project_id]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (jobData) => editJob(id, jobData),
    onSuccess: () => {
      setNewFiles([]);
      notifySuccess("Job updated successfully");
      queryClient.invalidateQueries(key);
      setTimeout(() => {
        navigateAfterSuccess();
      }, 2000);
    },
    onError: (error) => {
      notifyError(
        error.response.data.details || "Error updating job! Please try again"
      );
    },
  });

  return { mutate, isPending, isSuccess };
};

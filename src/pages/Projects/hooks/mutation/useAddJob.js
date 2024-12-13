import { useMutation } from "@tanstack/react-query";
import { addJob } from "../../../../api/Jobs/JobApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";

export const useAddJob = (key, project_id, reset) => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => addJob(project_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Job added successfully");
      reset();
      setTimeout(() => {
        navigate(`/projectbooks/jobBook/${project_id}`);
      }, 2000);
    },
    onError: (error) =>
      notifyError(
        error.response.data.error || "Error adding job! Please try again"
      ),
  });
  return { mutate, isPending, isSuccess };
};

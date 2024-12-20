import { useMutation } from "@tanstack/react-query";
import { addJob } from "../../../../api/Jobs/JobApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";
import { useCallback } from "react";

export const useAddJob = (key, project_id, reset) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();

  const navigationPath = useCallback(() => {
    navigate(
      role === "admin"
        ? `/projectbooks/jobBook/${project_id}`
        : `/clientProjects/jobBook/${project_id}`,
      { replace: true }
    );
  }, [navigate, role, project_id]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => addJob(project_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Job added successfully");
      reset();
      setTimeout(() => {
        navigationPath();
      }, 2000);
    },
    onError: (error) =>
      notifyError(
        error.response.data.error || "Error adding job! Please try again"
      ),
  });
  return { mutate, isPending, isSuccess };
};

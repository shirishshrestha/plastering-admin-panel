import { useMutation } from "@tanstack/react-query";
import { editProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../utils/Query/Query";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";
import { useCallback } from "react";

export const useEditProject = (key = "userTotalProjects", id, user_id) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();

  const navigateAfterSuccess = useCallback(() => {
    navigate(
      role === "admin"
        ? `/projectbooks/projects/${user_id}`
        : `/clientProjects`,
      { replace: true }
    );
  }, [navigate, role, user_id]);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data) => editProject(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Project edited successfully");
      setTimeout(() => {
        navigateAfterSuccess();
      }, 2000);
    },
    onError: () => {
      notifyError("Error editing project! Please try again");
    },
  });

  return {
    mutate,
    isPending,
    error,
    isSuccess,
  };
};

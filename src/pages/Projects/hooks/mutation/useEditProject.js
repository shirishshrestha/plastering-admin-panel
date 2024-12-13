import { useMutation } from "@tanstack/react-query";
import { editProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../utils/Query/Query";

export const useEditProject = (key = "userTotalProjects", id, user_id) => {
  const navigate = useNavigate();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data) => editProject(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Project edited successfully");
      setTimeout(() => {
        navigate(`/projectbooks/projects/${user_id}`);
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

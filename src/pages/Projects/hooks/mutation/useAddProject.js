import { useMutation } from "@tanstack/react-query";
import { addProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";

export const useAddProject = (reset, key, user_id) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => addProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(key);
      notifySuccess("Project added successfully");
      reset({
        name: "",
        address: "",
        project_type: "",
        additional_requirements: "",
      });
      setTimeout(() => {
        role === "admin"
          ? navigate(`/projectbooks/projects/${user_id}`, { replace: true })
          : navigate(`/clientProjects`, { replace: true });
      }, 2000);
    },
    onError: (error) => {
      notifyError("Error adding project! Please try again");
    },
  });

  return { mutate, isPending, isSuccess };
};

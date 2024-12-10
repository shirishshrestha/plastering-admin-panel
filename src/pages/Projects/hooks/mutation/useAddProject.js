import { useMutation } from "@tanstack/react-query";
import { addProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";

export const useAddProject = (reset, key, user_id) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
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
        navigate(`/projectbooks/projects/${user_id}`);
      }, 2000);
    },
    onError: (error) => {
      notifyError("Error adding project! Please try again");
    },
  });

  return { mutate, isPending };
};

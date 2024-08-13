import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { Input, Model } from "../../components";

export const AddProject = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      projectName: "",
    },
  });

  const addProjectForm = (data) => {};
  const handleToast = () => {
    notifySuccess("Project added successfully");
    // notifyError("Project failed to add");
  };
  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1rem]">
        <div>
          <h2 className="font-bold text-[1.2rem]">Add Project</h2>
          <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
            <p>Project</p>
            <div className="rounded-[100%] w-[10px] h-[10px] bg-green-600 "></div>
            <p>Add new project</p>
          </div>
        </div>
        <div className="mt-[1rem]">
          <form
            onSubmit={handleSubmit(addProjectForm)}
            className="grid grid-cols-2 gap-x-[1.5rem] gap-y-2"
          >
            <div>
              <label htmlFor="project-name" className="">
                Project Name
              </label>
              <Input
                placeholder={Model.projectName.placeholder}
                type={Model.projectName.type}
                name={Model.projectName.name}
                register={register}
                errors={errors}
                minLength={Model.projectName.minLength.value}
                minMessage={Model.projectName.minLength.message}
                regValue={Model.projectName.pattern.value}
                message={Model.projectName.pattern.message}
                required={Model.projectName.required}
              />
            </div>
            <div>
              <label htmlFor="project-name">Project Name</label>
              <Input
                placeholder={Model.projectName.placeholder}
                type={Model.projectName.type}
                name={Model.projectName.name}
                register={register}
                errors={errors}
                minLength={Model.projectName.minLength.value}
                minMessage={Model.projectName.minLength.message}
                regValue={Model.projectName.pattern.value}
                message={Model.projectName.pattern.message}
                required={Model.projectName.required}
              />
            </div>
            <div>
              <label htmlFor="project-name">Project Name</label>
              <Input
                placeholder={Model.projectName.placeholder}
                type={Model.projectName.type}
                name={Model.projectName.name}
                register={register}
                errors={errors}
                minLength={Model.projectName.minLength.value}
                minMessage={Model.projectName.minLength.message}
                regValue={Model.projectName.pattern.value}
                message={Model.projectName.pattern.message}
                required={Model.projectName.required}
              />
            </div>
            <div>
              <label htmlFor="project-name">Project Name</label>
              <Input
                placeholder={Model.projectName.placeholder}
                type={Model.projectName.type}
                name={Model.projectName.name}
                register={register}
                errors={errors}
                minLength={Model.projectName.minLength.value}
                minMessage={Model.projectName.minLength.message}
                regValue={Model.projectName.pattern.value}
                message={Model.projectName.pattern.message}
                required={Model.projectName.required}
              />
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
        {<CustomToastContainer />}
      </section>
    </>
  );
};

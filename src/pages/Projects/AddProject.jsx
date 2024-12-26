import { useForm } from "react-hook-form";
import {
  Input,
  Loader,
  Model,
  CustomToastContainer,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useAddProject } from "./hooks/mutation/useAddProject";

/**
 * AddProject component allows users to create a new project.
 * It provides a form with fields for project details and handles submission to create the project.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const AddProject = () => {
  const { id: user_id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    // Add defaultValues to help track changes
    defaultValues: {
      project_name: "",
      address: "",
      project_type: "",
      additional_info: "",
      terms: false,
    },
  });

  // Mutation for adding a new project
  const {
    mutate: AddProject,
    isPending: addProjectPending,
    isSuccess: AddProjectSuccess,
  } = useAddProject(reset, "userTotalProjects", user_id);

  /**
   * Form submission handler for adding a new project.
   * Prepares the form data and calls the mutation to create the project.
   *
   * @param {Object} data - The form data collected from the input fields.
   */
  const addProjectForm = (data) => {
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("name", data.project_name);
    formData.append("address", data.address);
    formData.append("status", "pending");
    formData.append("project_type", data.project_type);
    formData.append("additional_requirements", data.additional_info || "");

    AddProject(formData);
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
        {addProjectPending && <Loader />}
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
            className="grid grid-cols-2 gap-[1.5rem] gap-y-[1rem]"
          >
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Project Name (Optional)</label>
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
                required={false}
              />
            </div>
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Project Location</label>
              <Input
                placeholder={Model.address.placeholder}
                type={Model.address.type}
                name={Model.address.name}
                register={register}
                errors={errors}
                minLength={Model.address.minLength.value}
                minMessage={Model.address.minLength.message}
                regValue={Model.address.pattern.value}
                message={Model.address.pattern.message}
                required={Model.address.required}
              />
            </div>

            <div className="flex flex-col gap-[1rem]">
              <div className=" bg-white flex flex-col gap-3  w-full">
                <legend className=" font-bold   select-none">
                  Project Type
                </legend>
                <div className="">
                  <label
                    htmlFor="commercial"
                    name="project_type"
                    className={`font-medium ring-1 ring-gray-300 py-2 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none ${
                      errors["project_type"] && "ring-red-500"
                    } `}
                  >
                    Commercial Project
                    <input
                      type="radio"
                      name="project_type"
                      className="peer/html w-4 h-4 absolute accent-current right-3"
                      id="commercial"
                      value="Commercial"
                      {...register("project_type", {
                        required: "Select a project type",
                      })}
                    />
                  </label>
                  <label
                    htmlFor="domestic"
                    className={`font-medium ring-1 ring-gray-300 mt-[0.5rem] py-2 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none  ${
                      errors["project_type"] && "ring-red-500"
                    } `}
                  >
                    Domestic Project
                    <input
                      type="radio"
                      name="project_type"
                      className="w-4 h-4 absolute accent-current right-3"
                      id="domestic"
                      value="Domestic"
                      {...register("project_type", {
                        required: "Select a project type",
                      })}
                    />
                  </label>
                  <ErrorMessage
                    errors={errors}
                    name="project_type"
                    render={() => (
                      <p
                        className="text-[12px] text-red-500  pt-[0.3rem]  pl-[0.5rem]"
                        key="registered-client"
                      >
                        Please select a project type
                      </p>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col  gap-[0.4rem]">
              <label htmlFor="additional-req" className="font-bold">
                Additional Requirements (Optional)
              </label>
              <textarea
                name="additional_info"
                id="additional-req"
                className="w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent min-h-[130px] max-h-[290px]"
                {...register("additional_info", {})}
              ></textarea>
            </div>

            <div className="w-full  col-span-2  ">
              <div className="mb-[0.5rem]">
                <div className="flex items-center gap-[0.5rem] justify-end  ">
                  <input
                    type="checkbox"
                    name="terms"
                    {...register("terms", {
                      required: true,
                    })}
                    className="cursor-pointer rounded-md !outline-none !ring-0   "
                  />
                  <a
                    href="https://www.plasteringestimatesinsights.com.au/terms%26conditions"
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <label
                      htmlFor="terms-conditions"
                      className={`font-semibold cursor-pointer text-[14px] text-secondary ${
                        errors["terms"] ? "text-delete" : ""
                      } `}
                    >
                      Terms & Conditions
                    </label>
                  </a>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="terms"
                  render={() => (
                    <p
                      className="text-[12px] text-red-500  pt-[0.1rem]  pl-[0.5rem] text-end"
                      key="terms"
                    >
                      You must agree to the terms and conditions before
                      proceeding.
                    </p>
                  )}
                />
              </div>
              <div className="flex gap-3 justify-end items-center mt-4">
                <button
                  className="bg-delete rounded-lg px-[30px] py-[10px] text-light disabled:cursor-not-allowed disabled:bg-gray-400 "
                  type="button"
                  disabled={AddProjectSuccess}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:cursor-not-allowed disabled:bg-gray-400 "
                  disabled={!isDirty || AddProjectSuccess}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <CustomToastContainer />
      </section>
    </>
  );
};

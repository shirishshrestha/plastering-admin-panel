import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import {
  EditInput,
  Loader,
  LogoutConfirmation,
  Model,
  CustomToastContainer,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editProject,
  getProjectById,
} from "../../api/Projects/ProjectsApiSlice";
import { queryClient } from "../../utils/Query/Query";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import { Document, TrashIcon } from "../../assets/icons/SvgIcons";
import { useGetSingleProject } from "./hooks/query/useGetSingleProject";
import { useEditProject } from "./hooks/mutation/useEditProject";

export const EditProject = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: SingleProjectData, isPending: viewProjectPending } =
    useGetSingleProject("singleProject", id);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (SingleProjectData) {
      reset({
        project_type: SingleProjectData?.project_type,
        additional_info: SingleProjectData?.additional_requirements,
        project_name: SingleProjectData?.name,
        address: SingleProjectData?.address,
      });
    }
  }, [SingleProjectData, reset]);

  const { logout } = useLogout();

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);

    logout(() => {
      navigate("/login");
    });
  };

  const { mutate: EditProject, isPending: editProjectPending } = useEditProject(
    "userTotalProjects",
    id
  );

  const editProjectForm = (data) => {
    EditProject(data);
  };

  const handleProjectCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
        {(editProjectPending || viewProjectPending) && <Loader />}

        {logoutConfirationShow && (
          <LogoutConfirmation
            handleLogoutClick={handleLogout}
            setLogoutConfirationShow={setLogoutConfirationShow}
          />
        )}
        <div>
          <h2 className="font-bold text-[1.2rem]">
            Edit Project - {SingleProjectData?.name}
          </h2>
          <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
            <p>Project</p>
            <div className="rounded-[100%] w-[10px] h-[10px] bg-[#8c62ff]"></div>
            <p>Edit project</p>
          </div>
        </div>
        <div className="mt-[1rem]">
          <form
            onSubmit={handleSubmit(editProjectForm)}
            className="grid grid-cols-2 gap-[1.5rem] gap-y-[1rem]"
          >
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Project Name (Optional)</label>
              <EditInput
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
              <EditInput
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
              <div className="flex gap-3 justify-end items-center mt-1">
                <button
                  className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                  type="button"
                  onClick={handleProjectCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:bg-gray-300 disabled:cursor-not-allowed "
                  disabled={!isDirty}
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

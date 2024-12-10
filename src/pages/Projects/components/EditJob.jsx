import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { addProject } from "../../../api/Projects/ProjectsApiSlice";
import { queryClient } from "../../../utils/Query/Query";
import { notifyError, notifySuccess } from "../../../components/Toast/Toast";
import {
  CustomToastContainer,
  Input,
  Loader,
  LogoutConfirmation,
  Model,
} from "../../../components";
import { Document, TrashIcon } from "../../../assets/icons/SvgIcons";

export const EditJob = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);

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

  const { mutate: AddProject, isPending: addJobPending } = useMutation({
    mutationFn: (data) => addProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("projects");
      notifySuccess("Project added successfully");
      reset();
      setTimeout(() => {
        navigate("/projectbooks/jobbook");
      }, 2000);
    },
    onError: (error) => {
      notifyError(error.response.data.error);
    },
  });

  const editProjectForm = (data) => {
    const formData = new FormData();

    formData.append("name", data.project_name);
    formData.append("address", data.address);
    formData.append("start_date", data.date);
    formData.append("project_type", data.project_type);
    formData.append("additional_requirements", data.additional_info || "");

    formData.append("_method", "PUT");
    Array.from(newFiles).forEach((file) => {
      formData.append("files[]", file);
    });

    Array.from(selectedFiles).forEach((file) => {
      formData.append("old_files[]", file);
    });

    Array.from(deletedFiles).forEach((file) => {
      formData.append("deleted_files[]", file);
    });

    EditProject(formData);
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
        {addJobPending && <Loader />}

        {logoutConfirationShow && (
          <LogoutConfirmation
            handleLogoutClick={handleLogout}
            setLogoutConfirationShow={setLogoutConfirationShow}
          />
        )}
        <div>
          <h2 className="font-bold text-[1.2rem]">Edit Job</h2>
          <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
            <p>Job</p>
            <div className="rounded-[100%] w-[10px] h-[10px] bg-[#8c62ff] "></div>
            <p>Edit existing Job</p>
          </div>
        </div>
        <div className="mt-[1rem]">
          <form
            onSubmit={handleSubmit(editProjectForm)}
            className="grid grid-cols-2 gap-[1.5rem] gap-y-[1rem]"
          >
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Job Name</label>
                <Input
                  placeholder="Eg. Kitchen Renovation, Living Room Extension, etc"
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

              <div className="flex flex-col ">
                <div className="flex flex-col gap-[0.4rem]">
                  <label className="font-bold">Required by date</label>
                  <input
                    type="date"
                    name="date"
                    className={`w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent ${
                      errors["date"] ? "focus:ring-red-500 border-red-500" : ""
                    }`}
                    {...register("date", {
                      required: "Please select the date",
                    })}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="date"
                  render={() => (
                    <p
                      className="text-[12px] text-red-500  pt-[0.3rem]  pl-[0.5rem]"
                      key="date"
                    >
                      Please select the date
                    </p>
                  )}
                />
              </div>

              <div className="flex flex-col gap-[0.4rem]  ">
                <label className="font-bold">Upload Files (Optional)</label>
                <input
                  type="file"
                  name="project_file"
                  {...register("project_file", {
                    onChange: (e) => {
                      const newFiles = Array.from(e.target.files);
                      const filteredFiles = newFiles.filter(
                        (newFile) =>
                          !selectedFiles.some(
                            (file) =>
                              file.name === newFile.name &&
                              file.lastModified === newFile.lastModified
                          )
                      );

                      setSelectedFiles([...selectedFiles, ...filteredFiles]);

                      e.target.value = null;
                    },
                  })}
                  id="fileInput"
                  className="hidden"
                  multiple
                />
                <label
                  htmlFor="fileInput"
                  className={` border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-primary hover:text-light text-gray-400 translation-all duration-300 ease-in-out text-[14px]  `}
                >
                  <label
                    className={`bg-primary px-[20px] py-[5px] rounded-lg text-light mr-[1rem] cursor-pointer`}
                    htmlFor="fileInput"
                  >
                    Upload
                  </label>
                  Select Files
                </label>

                <div className="flex flex-col gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                  <span>Uploaded Files:</span>
                  <div className="flex gap-x-7 gap-y-2 flex-wrap">
                    {selectedFiles.length > 0 &&
                      Array.from(selectedFiles).map((file, index) => (
                        <div
                          key={`${file.name}-${file.lastModified}`}
                          className="flex gap-[0.5rem] items-center text-[14px]"
                        >
                          <Document />
                          <p className="font-[500]">{file.name}</p>

                          <button
                            type="button"
                            className="flex items-center text-[12px] cursor-pointer font-[500] gap-[0.2rem] hover:underline"
                            onClick={() => {
                              setSelectedFiles(
                                selectedFiles.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Cloud Link (Optional)</label>
                <Input
                  placeholder={Model.cloudLink.placeholder}
                  type={Model.cloudLink.type}
                  name={Model.cloudLink.name}
                  register={register}
                  errors={errors}
                  required={false}
                />
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Registered Client</label>
                <select
                  name="status"
                  defaultValue={"select"}
                  className={`cursor-pointer p-[9px] focus:outline-none border border-gray-300 rounded-lg focus:ring-[0.4px] focus:ring-blue-600 focus:border-transparent text-[14px] ${
                    errors["status"] ? "focus:ring-red-500 !border-red-500" : ""
                  } `}
                  {...register("status", {
                    required: "Please select a registered client",
                  })}
                >
                  <option value="select" hidden>
                    Select a status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name="status"
                  render={() => (
                    <p
                      className="text-[12px] text-red-500  pt-[0.3rem]  pl-[0.5rem]"
                      key="registered-client"
                    >
                      Please select a client
                    </p>
                  )}
                />
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
            </div>

            <div className="w-full  col-span-2  ">
              <div className="flex gap-3 justify-end items-center mt-4">
                <button
                  className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button className="bg-primary rounded-lg px-[30px] py-[10px] text-light ">
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

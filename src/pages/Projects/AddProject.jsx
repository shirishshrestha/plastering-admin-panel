import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { Input, LogoutConfirmation, Model } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useRef, useState } from "react";
import {
  getIdFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/Register/RegisterApiSlice";
import { addProject } from "../../api/Projects/ProjectsApiSlice";
import { queryClient } from "../../utils/Query/Query";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

export const AddProject = () => {
  const navigate = useNavigate();
  const role = getRoleFromLocalStorage();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

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

  const {
    isPending: userPending,
    error,
    data: RegisteredClients,
  } = useQuery({
    queryKey: ["Registered Clients"],
    queryFn: getUsers,
    enabled: role === "admin",
  });

  const { mutate: AddProject, isPending: addProjectPending } = useMutation({
    mutationFn: (data) => addProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("projects");
      notifySuccess("Project added successfully");
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    },
    onError: (error) => {
      notifyError("Error adding project");
    },
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const addProjectForm = (data) => {
    const formData = new FormData();

    formData.append(
      "user_id",
      data.registered_client ? data.registered_client : getIdFromLocalStorage()
    );
    formData.append("name", data.project_name);
    formData.append("address", data.address);
    formData.append("cloud_link", data.cloud_link);
    formData.append("start_date", data.date);
    formData.append("status", "pending");
    // formData.append("project_type", data.project_type);
    formData.append("additional_requirements", data.additional_info || "");

    if (selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files[]", file);
      });
    }

    AddProject(formData);
  };

  const handleProjectCancel = () => {
    navigate("/projects");
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
        {addProjectPending && (
          <div className="h-full w-full bg-primary/80 fixed z-10 top-0 left-0 flex items-center justify-center">
            <DotLottieReact
              autoplay
              loop
              src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
              style={{ height: "300px", width: "300px" }}
            />
          </div>
        )}

        {logoutConfirationShow && (
          <LogoutConfirmation
            handleLogoutClick={handleLogout}
            setLogoutConfirationShow={setLogoutConfirationShow}
          />
        )}
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
            {role && role === "admin" && (
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Registered Client</label>
                <select
                  name="registered_client"
                  className={`cursor-pointer p-[9px] focus:outline-none border border-gray-300 rounded-lg focus:ring-[0.4px] focus:ring-blue-600 focus:border-transparent text-[14px] ${
                    errors["registered_client"]
                      ? "focus:ring-red-500 !border-red-500"
                      : ""
                  } `}
                  {...register("registered_client", {
                    required: "Please select a registered client",
                  })}
                >
                  <option value="" hidden selected>
                    Select a registered client
                  </option>
                  {userPending && <option disabled>Loading...</option>}
                  {error && <option disabled>Error Loading</option>}
                  {RegisteredClients?.filter(
                    (client) => client.role !== "admin"
                  ).length < 1 ? (
                    <option value="" disabled>
                      No data available
                    </option>
                  ) : (
                    RegisteredClients?.filter(
                      (client) => client.role !== "admin"
                    ).map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))
                  )}
                </select>
                <ErrorMessage
                  errors={errors}
                  name="registered_client"
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
            )}
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
            <div className="flex flex-col gap-[1rem]">
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
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 6))
                        .toISOString()
                        .split("T")[0]
                    }
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

              {role && role === "admin" && (
                <>
                  <div className="flex flex-col gap-[0.4rem] ">
                    <label className="font-bold">Upload Files (Optional)</label>
                    <input
                      type="file"
                      name="project_file"
                      {...register("project_file", {
                        onChange: (e) => {
                          setSelectedFiles(e.target.files);
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
                      Select Multiple Files at once
                    </label>

                    <div className="flex gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                      <span>Uploaded Files:</span>
                      {selectedFiles.length > 0 &&
                        Array.from(selectedFiles).map((file, index) => (
                          <p key={index}>{file.name}</p>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            {role && role === "client" && (
              <>
                <div className="flex flex-col gap-[0.4rem] ">
                  <label className="font-bold">Upload Files (Optional)</label>
                  <input
                    type="file"
                    name="project_file"
                    {...register("project_file", {
                      onChange: (e) => {
                        setSelectedFiles(e.target.files);
                      },
                    })}
                    id="fileInput"
                    className="hidden"
                    multiple
                  />
                  <label
                    htmlFor="fileInput"
                    className={` border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-primary hover:text-light text-gray-400 translation-all duration-300 ease-in-out text-[14px] `}
                  >
                    <label
                      className={`bg-primary px-[20px] py-[5px] rounded-lg text-light mr-[1rem] cursor-pointer`}
                      htmlFor="fileInput"
                    >
                      Upload
                    </label>
                    Select Multiple Files at once
                  </label>

                  <div className="flex gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                    <span>Uploaded Files:</span>
                    {selectedFiles.length > 0 &&
                      Array.from(selectedFiles).map((file, index) => (
                        <p key={index}>{file.name}</p>
                      ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col row-span-2 gap-[0.4rem]">
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

            <div class=" bg-white flex flex-col gap-3  w-full">
              <legend class=" font-bold   select-none">Project Type</legend>
              <div className="">
                <label
                  htmlFor="commercial"
                  name="project_type"
                  class={`font-medium ring-1 ring-gray-300 py-2 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none ${
                    errors["project_type"] && "ring-red-500"
                  } `}
                >
                  Commercial Project
                  <input
                    type="radio"
                    name="project_type"
                    class="peer/html w-4 h-4 absolute accent-current right-3"
                    id="commercial"
                    value="commercial"
                    {...register("project_type", {
                      required: "Select a project type",
                    })}
                  />
                </label>
                <label
                  htmlFor="domestic"
                  class={`font-medium ring-1 ring-gray-300 mt-[0.5rem] py-2 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none  ${
                    errors["project_type"] && "ring-red-500"
                  } `}
                >
                  Domestic Project
                  <input
                    type="radio"
                    name="project_type"
                    class="w-4 h-4 absolute accent-current right-3"
                    id="domestic"
                    value="domestic"
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

            <div className="w-full  col-span-2  ">
              <div className="mb-[0.5rem]">
                <div className="flex items-center gap-[0.5rem] justify-end  ">
                  <input
                    type="checkbox"
                    name="terms"
                    {...register("terms", {
                      required: true,
                    })}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="terms-conditions"
                    className={`font-semibold text-[14px] text-secondary ${
                      errors["terms"] ? "text-delete  " : ""
                    } `}
                  >
                    Terms & Conditions
                  </label>
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
              <div className="flex gap-3 justify-end items-center">
                <button
                  className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                  type="button"
                  onClick={handleProjectCancel}
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
        {<CustomToastContainer />}
      </section>
    </>
  );
};

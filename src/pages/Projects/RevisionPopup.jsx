import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { EditInput, Loader, Model } from "../../components";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProjectById,
  requestRevision,
} from "../../api/Projects/ProjectsApiSlice";
import { Document, TrashIcon } from "../../assets/icons/SvgIcons";

export const RevisionPopup = ({
  setRevisionFlag,
  setDisabledFlag,
  disabledFlag,
}) => {
  const { id } = useParams();

  const {
    isPending: RevProjectPending,
    error,
    data: SingleProjectData,
  } = useQuery({
    queryKey: ["singleProject", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
    staleTime: 6000,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    setValue("project_type", SingleProjectData?.project_type);
    setValue("date", SingleProjectData?.start_date);
    setValue("additional_info", SingleProjectData?.additional_requirements);
    setValue("project_name", SingleProjectData?.name);
    setValue("address", SingleProjectData?.address);
    setValue("cloud_link", SingleProjectData?.cloud_link);
    setValue("project_file", SingleProjectData?.files);
    setSelectedFiles(SingleProjectData?.files);
  }, [SingleProjectData, setValue]);

  const { mutate: RevisionProject, isPending: RevisionProjectPending } =
    useMutation({
      mutationFn: (data) => requestRevision(data, id),
      onSuccess: (data) => {
        notifySuccess("Revision request sent successfully");
        setTimeout(() => {
          setRevisionFlag(false);
          setDisabledFlag({ ...disabledFlag, revisionFlag: true });
          setDisabledSubmit(false);
        }, 2000);
      },
      onError: (error) => {
        notifyError("Something went wrong or the file is a duplicate.");
        setDisabledSubmit(false);
      },
    });

  const revisionProjectForm = (data) => {
    setDisabledSubmit(true);
    const formData = new FormData();

    formData.append("name", data.project_name);
    formData.append("address", data.address);
    formData.append("cloud_link", data.cloud_link);
    formData.append("start_date", data.date);
    formData.append("project_type", data.project_type);
    formData.append("additional_requirements", data.additional_info || "");

    Array.from(newFiles).forEach((file) => {
      formData.append("files[]", file);
    });

    Array.from(selectedFiles).forEach((file) => {
      formData.append("old_files[]", file);
    });

    Array.from(deletedFiles).forEach((file) => {
      formData.append("deleted_files[]", file);
    });

    RevisionProject(formData);
  };

  return (
    <div className="w-full h-screen fixed z-10 inset-0 bg-primary/80 flex items-center justify-center  ">
      <div className="bg-white shadow-lg rounded-lg p-[1.5rem] w-[70%] overflow-y-scroll h-[90%] admin__estimator">
        {(RevisionProjectPending || RevProjectPending) && <Loader />}

        <div>
          <h2 className="font-bold text-[1.2rem]">Request Edit</h2>
          <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
            <p>Project</p>
            <div className="rounded-[100%] w-[10px] h-[10px] bg-[#8c62ff]"></div>
            <p>Edit project</p>
          </div>
        </div>
        <div className="mt-[1rem]">
          <form
            onSubmit={handleSubmit(revisionProjectForm)}
            className="grid grid-cols-2 gap-[1.5rem] gap-y-[1rem]"
          >
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Project Name (Optional)</label>
              <EditInput
                defaultValue={SingleProjectData?.name}
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
                defaultValue={SingleProjectData?.address}
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
              <EditInput
                defaultValue={SingleProjectData?.cloud_link}
                placeholder={Model.cloudLink.placeholder}
                type={Model.cloudLink.type}
                name={Model.cloudLink.name}
                register={register}
                errors={errors}
                required={false}
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Required by date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={SingleProjectData?.start_date}
                  className={`w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent ${
                    errors["date"] ? "focus:ring-red-500 border-red-500" : ""
                  }`}
                  {...register("date", {
                    required: "Please select the date",
                    onChange: (e) => {
                      setValue("date", e.target.value);
                    },
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

            <div className="flex gap-[1rem] flex-col">
              <div class=" bg-white flex flex-col gap-[0.4rem] w-full">
                <legend class=" font-bold select-none">Project Type</legend>
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
                      className=" w-4 h-4 absolute accent-current right-3"
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
              <div className="flex flex-col gap-[0.4rem] ">
                <label className="font-bold">Upload New Files (Optional)</label>
                <input
                  type="file"
                  name="project_file"
                  {...register("project_file", {
                    onChange: (e) => {
                      const innerNewFiles = Array.from(e.target.files);
                      const filteredFiles = innerNewFiles.filter(
                        (newFile) =>
                          !newFiles.some(
                            (file) =>
                              file.name === newFile.name &&
                              file.lastModified === newFile.lastModified
                          )
                      );

                      setNewFiles([...newFiles, ...filteredFiles]);

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

                <div className="flex gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                  <span>Uploaded Files:</span>
                </div>
                <div className="flex flex-wrap  gap-x-7 gap-y-2">
                  {selectedFiles?.length < 1 ? (
                    <p className="font-[500] text-[14px] pl-[2rem]">
                      No previous files
                    </p>
                  ) : (
                    selectedFiles?.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex gap-[0.5rem] items-center text-[14px]"
                      >
                        <Document />
                        <p className="font-[500]">{file.split("/").pop()}</p>

                        <button
                          type="button"
                          className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                          onClick={() => {
                            setDeletedFiles([...deletedFiles, file]);
                            setSelectedFiles(
                              selectedFiles.filter((file, i) => i !== index)
                            );
                          }}
                        >
                          <TrashIcon />
                          {/* {fetchingFile && index === downloadId
                        ? "Loading"
                        : "Download"} */}
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex flex-col gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                  <span>New Files:</span>
                  <div className="flex gap-x-7 flex-wrap gap-y-2">
                    {newFiles?.length > 0 &&
                      Array.from(newFiles).map((file, index) => (
                        <div
                          key={file.id}
                          className="flex gap-[0.5rem] items-center text-[14px]"
                        >
                          <Document />
                          <p className="font-[500]">{file.name}</p>

                          <button
                            type="button"
                            className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                            onClick={() => {
                              setNewFiles(
                                newFiles.filter((file, i) => i !== index)
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

            <div className="flex flex-col  gap-[0.4rem]">
              <label htmlFor="additional-req" className="font-bold">
                Additional Requirements (Optional)
              </label>
              <textarea
                name="additional_info"
                id="additional-req"
                className="w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent min-h-[100px] max-h-[290px]"
                {...register("additional_info", {})}
              ></textarea>
            </div>

            <div className="flex gap-3 justify-end items-center col-span-2">
              <button
                className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                type="button"
                onClick={() => setRevisionFlag(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={disabledSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {<CustomToastContainer />}
      </div>
    </div>
  );
};

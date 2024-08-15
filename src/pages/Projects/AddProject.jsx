import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { Input, Model } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useRef, useState } from "react";

export const AddProject = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const addProjectForm = (data) => {
    console.log(data);
    notifySuccess("Project added successfully");
  };

  const handleToast = () => {};

  const handleProjectCancel = () => {
    navigate("/projects");
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
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
              <label className="font-bold">Registered Client</label>
              <select
                name="registered-client"
                className="cursor-pointer p-[9px] focus:outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-[14px]"
              >
                <option value="" hidden selected>
                  Select a registered client
                </option>
                <option value="Client 1">Client 1</option>
                <option value="Client 2">Client 2</option>
                <option value="Client 3">Client 3</option>
                <option value="Client 4">Client 4</option>
              </select>
            </div>
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Project Name</label>
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
            <div className="flex flex-col gap-[0.4rem]">
              <label className="font-bold">Address</label>
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
              <label className="font-bold">Cloud Link</label>
              <Input
                placeholder={Model.cloudLink.placeholder}
                type={Model.cloudLink.type}
                name={Model.cloudLink.name}
                register={register}
                errors={errors}
                required={Model.cloudLink.required}
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col ">
                <div className="flex flex-col gap-[0.4rem]">
                  <label className="font-bold">Start Date</label>
                  <input
                    type="date"
                    name="start-date"
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
              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold">Upload Files</label>
                <input
                  type="file"
                  name="project-file"
                  {...register("project-file", {
                    required: "Please select the date",
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
                  className={` border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-primary hover:text-light text-gray-400 translation-all duration-300 ease-in-out text-[14px] ${
                    errors["project-file"]
                      ? "focus:ring-red-500 !border-red-500"
                      : ""
                  } `}
                >
                  <label
                    className={`bg-primary px-[20px] py-[5px] rounded-lg text-light mr-[1rem] cursor-pointer`}
                    htmlFor="fileInput"
                  >
                    Upload
                  </label>
                  Select Multiple Files at once
                </label>

                <ErrorMessage
                  errors={errors}
                  name="project-file"
                  render={() => (
                    <p
                      className="text-[12px] text-red-500  pt-[0.3rem]  pl-[0.5rem]"
                      key="file"
                    >
                      Please select the file
                    </p>
                  )}
                />
                <div className="flex gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
                  <span>Uploaded Files:</span>
                  {selectedFiles.length > 0 &&
                    Array.from(selectedFiles).map((file, index) => (
                      <p key={index}>{file.name}</p>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[0.4rem]">
              <label htmlFor="additional-req" className="font-bold">
                Additional Requirements (Optional)
              </label>
              <textarea
                name="additional-info"
                id="additional-req"
                className="w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent min-h-[90px] max-h-[350px]"
                {...register("additional-req", {})}
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

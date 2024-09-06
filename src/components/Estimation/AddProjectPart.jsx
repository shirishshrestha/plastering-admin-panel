import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import { ErrorMessage } from "@hookform/error-message";

const AddProjectPart = ({
  setNewProjectPart,
  setProjectPart,
  projectPart,
  selectedFiles,
  setSelectedFiles,
}) => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const handleProjectPartSubmit = async () => {
    const isValid = await trigger();

    if (isValid) {
      const data = getValues();
      setProjectPart([
        ...projectPart,
        {
          project_part: data.project_part,
          project_part_file: selectedFiles,
        },
      ]);
      setNewProjectPart(false);
      setSelectedFiles([]);
    } else {
      setNewProjectPart(false);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-[0.6rem] mt-[1rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="project_part" className="font-[600] text-[14px]">
          Project Part Name
        </label>
        <Input
          placeholder={"Enter Part Name"}
          type={"text"}
          name={"project_part"}
          register={register}
          errors={errors}
          required={"Please enter the project part name"}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]  ">
        <label className="font-[600] text-[14px]">Upload Files</label>
        <input
          type="file"
          name="project_part_file"
          {...register("project_part_file", {
            onChange: (e) => {
              setSelectedFiles(e.target.files);
            },
            required: "Please upload the project file",
          })}
          id="fileInput"
          className="hidden"
          multiple
        />

        <label
          htmlFor="fileInput"
          className={` border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-primary hover:text-light text-gray-400 translation-all duration-300 ease-in-out text-[14px] ${
            errors["project_part_file"]
              ? "focus:ring-red-500 border-red-500"
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
          name={"project_part_file"}
          render={({ message }) =>
            message && (
              <p className="text-[12px] text-red-500  pl-[0.5rem]" key={"file"}>
                {message}
              </p>
            )
          }
        />
        <div className="flex gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
          <span>Uploaded Files:</span>
          {selectedFiles.length > 0 &&
            Array.from(selectedFiles).map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
        </div>
      </div>
      <div className="flex gap-[0.6rem]">
        <button
          type="button"
          className="bg-primary flex gap-[0.5rem] items-center font-semibold px-[10px] py-[5px] text-light rounded-lg text-[14px]"
          onClick={handleProjectPartSubmit}
        >
          Confirm
        </button>
        <button
          className="bg-delete rounded-lg px-[10px] py-[5px] text-light text-[14px]"
          type="button"
          onClick={() => setNewProjectPart(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProjectPart;

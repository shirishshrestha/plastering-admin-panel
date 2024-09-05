import { useState } from "react";
import { useForm } from "react-hook-form";

const AddProjectPart = ({ setNewProjectPart }) => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="flex flex-col gap-[0.6rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="project_part" className="font-[600]">
          Project Part Name
        </label>
        <input
          type="text"
          name="project_part"
          {...register("project_part", {})}
          className="w-full border-[1px] border-gray-300 rounded-lg p-[0.5rem] focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-[0.4rem] ">
        <label className="font-[600]">Upload Files (Optional)</label>
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
      <div className="flex gap-[0.6rem]">
        <button
          type="button"
          className="bg-primary flex gap-[0.5rem] items-center font-semibold px-[10px] py-[5px] text-light rounded-lg text-[14px]"
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

import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import { ErrorMessage } from "@hookform/error-message";
import { Document, TrashIcon } from "../../assets/icons/SvgIcons";

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
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleProjectPartSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const data = getValues();
      setProjectPart([
        ...projectPart,
        {
          part_name: data.part_name,
          files: selectedFiles,
        },
      ]);
      setNewProjectPart(false);
      setSelectedFiles([]);
    } else {
      setSelectedFiles([]);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-[0.6rem] mt-[1rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <label htmlFor="part_name" className="font-[600] text-[14px]">
          Project Part Name
        </label>
        <Input
          placeholder={"Enter Part Name"}
          type={"text"}
          name={"part_name"}
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
          Select Files
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
        <div className="flex flex-col gap-2 pl-[0.1rem] text-[14px] flex-wrap ">
          <span>Uploaded Files:</span>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {selectedFiles.length > 0 &&
              Array.from(selectedFiles).map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex gap-[0.5rem] items-center text-[14px]"
                >
                  <Document />
                  <p className="font-[500]">{file.name}</p>

                  <button
                    type="button"
                    className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
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

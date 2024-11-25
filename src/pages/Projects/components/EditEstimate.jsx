import { useForm } from "react-hook-form";
import { PopupModal } from "../../../components";
import { useState } from "react";
import { Document, TrashIcon } from "../../../assets/icons/SvgIcons";

export default function EditEstimate({ showModal, handleToggleModal }) {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      estimate_file: [],
    },
  });
  const [selectedEstimationFiles, setSelectedEstimationFiles] = useState([]);

  const handleModalClose = () => {
    handleToggleModal();
    setSelectedEstimationFiles([]);
  };

  const handleEstimateSubmit = (data) => {
    console.log(data);
    console.log(selectedEstimationFiles);
  };

  return (
    <PopupModal
      title="Edit Estimate"
      showModal={showModal}
      handleModalToggle={handleModalClose}
    >
      <form onSubmit={handleSubmit(handleEstimateSubmit)}>
        <div className="flex flex-col gap-[0.8rem]  ">
          <label htmlFor="estimate_file">Select Files</label>
          <input
            type="file"
            name="estimate_file"
            {...register("estimate_file", {
              onChange: (e) => {
                const newFiles = Array.from(e.target.files);
                const filteredFiles = newFiles.filter(
                  (newFile) =>
                    !selectedEstimationFiles.some(
                      (file) =>
                        file.name === newFile.name &&
                        file.lastModified === newFile.lastModified
                    )
                );

                setSelectedEstimationFiles([
                  ...selectedEstimationFiles,
                  ...filteredFiles,
                ]);

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
              {selectedEstimationFiles.length > 0 &&
                Array.from(selectedEstimationFiles).map((file, index) => (
                  <div key={`${file.name}-${file.lastModified}`}>
                    <div className="flex gap-[0.5rem] items-center text-[14px]">
                      <Document />
                      <p className="font-[500]">{file.name}</p>

                      <button
                        type="button"
                        className="flex items-center text-[12px] cursor-pointer font-[500] gap-[0.2rem] hover:underline"
                        onClick={() => {
                          setSelectedEstimationFiles(
                            selectedEstimationFiles.filter(
                              (_, i) => i !== index
                            )
                          );
                        }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="text-[12px]">
                      Size: {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
              type="button"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary rounded-lg px-[30px] py-[10px] text-light w-fit disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!isDirty || selectedEstimationFiles.length === 0}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </PopupModal>
  );
}

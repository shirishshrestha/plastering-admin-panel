import { ArchiveIcon } from "../../assets/icons/SvgIcons";

export const CancelProjectConfirmation = ({
  projectName,
  handleProceedClick = () => {},
  handleCancelToggle,
  cancelLoading,
  cancelInfo,
  cancelReason = false,
  register = () => {},
  errors = "",
  isDirty = false,
  reset,
}) => {
  const handleCancelClick = () => {
    handleCancelToggle();
    reset && reset(); 
  };  

  return (
    <div className="fixed h-full w-full z-40 flex top-0 left-0 items-center justify-center bg-black/40">
      <div className="p-[24px] bg-white w-fit flex flex-col items-center justify-center rounded-[5px]">
        <figure className="p-[18px] bg-viewBackground mb-2 rounded-full">
          <ArchiveIcon color={"#3e84f4"} />
        </figure>

        <h4 className="text-[20px] font-[600] leading-[30px] tracking-[0.5%] capitalize pb-[0.5rem]">
          Cancel <span className="font-bold">{projectName}</span>?{" "}
        </h4>

        <div className="pb-[1rem] flex flex-col gap-1">
          <p className="text-[14px] font-[500] leading-[21px] tracking-[0.5%] text-center">
            Are you sure you want to cancel
            <span className="font-semibold"> {projectName} </span>?
          </p>
          <p className="text-[14px] font-[500] leading-[21px] tracking-[0.5%] text-center">
            {cancelInfo}
          </p>
        </div>
        {cancelReason && (
          <div className="mb-[1rem] w-full">
            <input
              type="text"
              placeholder="Reason for cancellation"
              className={` w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent 
                ${
                  cancelReason && errors["cancelReason"]
                    ? "focus:ring-red-500 border-red-500"
                    : ""
                }
                `}
              {...register("cancelReason", {
                required: "Please enter reason for cancellation",
              })}
            />
            <p className="text-red-500 text-[12px] mt-1">
              {errors.cancelReason && errors.cancelReason.message}
            </p>
          </div>
        )}
        <div className="flex gap-[14px]">
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleCancelClick}
            type="button"
          >
            Close
          </button>
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isDirty && !isDirty}
            onClick={handleProceedClick}
          >
            {cancelLoading ? "Processing" : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

import { ArchiveIcon } from "../../assets/icons/SvgIcons";

export const CancelProjectConfirmation = ({
  projectName,
  handleProceedClick,
  handleCancelToggle,
  cancelLoading,
  cancelInfo,
}) => {
  const handleCancelClick = () => {
    handleCancelToggle();
  };

  return (
    <div className="fixed h-full w-full z-50 flex top-0 left-0 items-center justify-center bg-black/40">
      <div className="p-[24px] bg-white w-fit flex flex-col items-center justify-center rounded-[5px]">
        <figure className="p-[18px] bg-viewBackground mb-2 rounded-full">
          <ArchiveIcon color={"#3e84f4"} />
        </figure>

        <h4 className="text-[20px] font-[600] leading-[30px] tracking-[0.5%] capitalize pb-[0.5rem]">
          Cancel <span className="font-bold">{projectName}</span>?{" "}
        </h4>

        <div className="pb-[1.2rem] flex flex-col gap-1">
          <p className="text-[14px] font-[500] leading-[21px] tracking-[0.5%] text-center">
            Are you sure you want to cancel
            <span className="font-semibold"> {projectName} </span>?
          </p>
          <p className="text-[14px] font-[500] leading-[21px] tracking-[0.5%] text-center">
            {cancelInfo}
          </p>
        </div>

        <div className="flex gap-[14px]">
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleCancelClick}
            type="button"
          >
            Close
          </button>
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleProceedClick}
          >
            {cancelLoading ? "Processing" : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

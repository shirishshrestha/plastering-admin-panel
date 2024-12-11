import { TrashIcon } from "../../assets/icons/SvgIcons";

export const DeleteConfirmation = ({
  deleteName,
  handleProceedClick,
  handleDeleteToggle,
  deleteLoading,
}) => {
  const handleCancelClick = () => {
    handleDeleteToggle();
  };

  return (
    <div className="fixed h-full w-full z-50 flex top-0 left-0 items-center justify-center bg-black/40 ">
      <div className="p-[24px] bg-white w-fit flex flex-col items-center justify-center rounded-[5px]">
        <figure className="p-[18px] bg-deleteBackground mb-2 rounded-full">
          <TrashIcon />
        </figure>

        <h4 className="text-[20px] font-[600] leading-[30px] tracking-[0.5%] capitalize pb-[0.5rem] ">
          Delete <span className="font-bold">{deleteName}</span>?{" "}
        </h4>

        <div className="pb-[1.2rem]">
          <p className="text-[14px] font-[400] leading-[21px]  tracking-[0.5%] text-center  ">
            Are you sure you want to delete{" "}
            <span className="font-semibold"> {deleteName} </span>
            permanently?
          </p>
          <p className="text-[14px] font-[400] leading-[21px]  tracking-[0.5%] text-center  ">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-[14px]">
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleCancelClick}
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleProceedClick}
          >
            {deleteLoading ? "Processing" : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

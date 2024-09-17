export const ConfirmationPopup = ({
  handleAcceptSubmission,
  setSubmissionConfirmationShow,
}) => {
  const handleCancelClick = () => {
    setSubmissionConfirmationShow(false);
  };

  return (
    <div className="fixed h-full w-full z-10 flex top-0 left-0 items-center justify-center bg-black/40 text-primary ">
      <div className="p-[24px] bg-white  flex flex-col items-center justify-center rounded-[5px] w-[35%]">
        <h4 className="text-[20px] font-[600] leading-[30px] tracking-[0.5%] capitalize pb-[0.5rem] ">
          Confirm <span className="font-bold">Action</span>
        </h4>

        <div className="pb-[1.2rem]">
          <p className="text-[14px] font-[500] leading-[21px]  tracking-[0.5%] text-center  ">
            Are you sure you want to proceed with this action?
          </p>
        </div>
        <div className="flex gap-[14px]">
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="bg-secondary rounded-lg px-[30px] py-[10px] text-primary"
            onClick={handleAcceptSubmission}
          >
            Yes, Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

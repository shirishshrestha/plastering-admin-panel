import { Logout } from "../../assets/icons/SvgIcons";

export const LogoutConfirmation = ({
  handleLogoutClick,
  setLogoutConfirationShow,
}) => {
  const handleCancelClick = () => {
    setLogoutConfirationShow(false);
  };

  return (
    <div className="fixed h-full w-full z-50 flex top-0 left-0 items-center justify-center bg-black/40 text-primary ">
      <div className="p-[24px] bg-white w-fit flex flex-col items-center justify-center rounded-[5px]">
        <figure className="pb-[12px]">
          <Logout />
        </figure>

        <h4 className="text-[20px] font-[600] leading-[30px] tracking-[0.5%] capitalize pb-[0.5rem] ">
          Confirm <span className="font-bold">Logout</span>
        </h4>

        <div className="pb-[1.2rem]">
          <p className="text-[14px] font-[500] leading-[21px]  tracking-[0.5%] text-center  ">
            You're about to log out. Do you want to proceed?
          </p>
        </div>
        <div className="flex gap-[14px]">
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light"
            onClick={handleCancelClick}
          >
            Stay Logged In
          </button>
          <button
            className="bg-secondary rounded-lg px-[30px] py-[10px] text-primary"
            onClick={handleLogoutClick}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

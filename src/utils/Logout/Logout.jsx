import { Logout } from "../../assets/icons/SvgIcons";
import useAuth from "../../hooks/useAuth";
import { LogoutConfirmation } from "../../components";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export const LogoutComp = ({ sidebarToggle, showText }) => {
  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogoutPopup = () => {
    setLogoutConfirationShow(true);
  };

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);
    logout(() => {
      navigate("/login");
    });
  };
  return (
    <>
      {logoutConfirationShow && (
        <LogoutConfirmation
          handleLogoutClick={handleLogout}
          setLogoutConfirationShow={setLogoutConfirationShow}
        />
      )}
      <div
        className={`
        flex  items-center p-[0.7rem] ${sidebarToggle ? "w-full" : "w-fit"} `}
        title="Logout"
      >
        <div
          className="flex items-center gap-[0.5rem]  cursor-pointer"
          onClick={handleLogoutPopup}
        >
          <Logout />
          <span
            className={`transition-all duration-300 w-fit ${
              showText ? "block" : "hidden"
            }`}
          >
            Logout
          </span>
        </div>
      </div>
    </>
  );
};

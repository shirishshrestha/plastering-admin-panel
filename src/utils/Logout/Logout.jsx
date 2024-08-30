import { Navigate, useNavigate } from "react-router-dom";
import { Logout } from "../../assets/icons/SvgIcons";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

export const LogoutComp = ({ sidebarToggle, showText }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();

    logout(() => {
      navigate("/login"); 
    });
  };
  return (
    <div
      className={`
      flex  items-center p-[0.7rem] ${sidebarToggle ? "w-full" : "w-fit"} `}
      title="Logout"
    >
      <div
        className="flex items-center gap-[0.5rem]  cursor-pointer"
        onClick={handleLogout}
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
  );
};

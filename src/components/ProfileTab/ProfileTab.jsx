import { Dropdown } from "flowbite-react";
import { HamMenu } from "../../assets/icons/SvgIcons";
import { profile } from "../../assets/images";
import {
  getNameFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { LogoutConfirmation } from "../LogoutConfirmation/LogoutConfirmation";
import { useAvatarGenerator } from "../../hooks/useAvatarGenerator";
import { useCallback } from "react";

const ProfileTab = ({ sidebarToggle, setSidebarToggle }) => {
  const userName = getNameFromLocalStorage();
  const role = getRoleFromLocalStorage();
  const userAvatar = useAvatarGenerator();

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogoutPopup = () => {
    setLogoutConfirationShow(true);
  };

  const handleLogout = useCallback(() => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);

    logout(() => {
      navigate("/login");
    });
  }, [navigate, setAuth, setLogoutConfirationShow, logout]);

  return (
    <section className="w-full py-[1rem] ">
      {logoutConfirationShow && (
        <LogoutConfirmation
          handleLogoutClick={handleLogout}
          setLogoutConfirationShow={setLogoutConfirationShow}
        />
      )}
      <div className="w-full bg-[#fff] shadow-lg rounded-lg p-[1.2rem] flex justify-between items-center">
        <div className="flex gap-[1.5rem]">
          <button
            onClick={() => setSidebarToggle(!sidebarToggle)}
            title={sidebarToggle ? "Minimize Sidebar" : "Expand Sidebar"}
          >
            <HamMenu />
          </button>
        </div>
        <div>
          <Dropdown
            label=""
            renderTrigger={() => (
              <figure className="flex gap-[0.7rem] cursor-pointer">
                <div
                  alt="profile"
                  className="rounded-[100%] h-[40px] w-[40px] flex justify-center items-center bg-primary text-light font-semibold"
                >
                  {userAvatar()}
                </div>

                <figcaption>
                  <p className=" font-semibold text-[14px] capitalize">
                    {userName}
                  </p>
                  <p className="font-[500] text-[12px] capitalize">{role}</p>
                </figcaption>
              </figure>
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold">{userName}</span>
            </Dropdown.Header>
            <Link to="/profile" className="font-[500]">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={handleLogoutPopup} className="font-[500]">
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </section>
  );
};

export default ProfileTab;

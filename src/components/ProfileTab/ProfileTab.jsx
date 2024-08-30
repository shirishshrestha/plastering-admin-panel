import { NavLink } from "react-router-dom";
import { HamMenu } from "../../assets/icons/SvgIcons";
import { profile } from "../../assets/images";
import {
  getNameFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../utils/Storage/StorageUtils";

const ProfileTab = ({ sidebarToggle, setSidebarToggle }) => {
  const userName = getNameFromLocalStorage();
  const role = getRoleFromLocalStorage();
  return (
    <section className="w-full py-[1rem] ">
      <div className="w-full bg-[#fff] shadow-lg rounded-lg p-[1.2rem] flex justify-between items-center">
        <div className="flex gap-[1.5rem]">
          <button onClick={() => setSidebarToggle(!sidebarToggle)}>
            <HamMenu />
          </button>
          <ul>
            <NavLink to="/projects">Projects</NavLink>
          </ul>
        </div>
        <div>
          <figure className="flex gap-[0.7rem] cursor-pointer">
            <img
              src={profile}
              alt="profile"
              className="rounded-[100%] h-[40px] object-cover"
            />

            <figcaption>
              <p className=" font-semibold text-[14px] capitalize">
                {userName}
              </p>
              <p className="font-[500] text-[12px] capitalize">{role}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ProfileTab;

import { useEffect, useState } from "react";
import { logo } from "../../assets/images";
import {
  ChevronRight,
  DashboardSvg,
  Logout,
  ProjectsSvg,
} from "../../assets/icons/SvgIcons";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarToggle, setSidebarToggle }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (sidebarToggle) {
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [sidebarToggle]);
  return (
    <section
      className={`min-w-[240px] max-h-[100vh] sticky top-0  transition-all ease-in-out duration-300 ${
        sidebarToggle ? "" : "!min-w-[120px]"
      } `}
    >
      <div className=" bg-primary text-light font-semibold w-full h-full flex flex-col items-center py-[1rem] px-[1rem] relative z-20">
        <figure>
          <img
            src={logo}
            alt="logo"
            className={`  transition-all ease-in-out duration-300  ${
              sidebarToggle ? "h-[80px]" : "h-[60px]"
            }`}
          />
        </figure>
        {/* <div
          onClick={() => setSidebarToggle(!sidebarToggle)}
          className="absolute bg-primary cursor-pointer right-[-1.5rem] top-[2.5rem] px-[5px] py-[16px] rounded-r-lg flex items-center justify-center z-10"
        >
          <button
            className={`rotate-180  transition-all ease-in-out duration-300 ${
              sidebarToggle ? "" : "!rotate-0"
            }`}
          >
            <ChevronRight />
          </button>
        </div> */}
        <nav className="mt-[1.5rem] h-full overflow-y-scroll w-full flex flex-col items-center gap-[1rem] sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "bg-light text-primary sidebar-menu" : ""
              } flex items-center gap-[0.5rem] rounded-lg p-[0.7rem] ${
                sidebarToggle ? "w-full" : "w-fit"
              } `
            }
            title="Dashboard"
          >
            <DashboardSvg />
            <span
              className={`transition-all duration-300 w-fit ${
                showText ? "block" : "hidden"
              }`}
            >
              Dashboard
            </span>
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${
                isActive ? "bg-light text-primary sidebar-menu " : ""
              } flex gap-[0.5rem] items-center rounded-lg p-[0.7rem] ${
                sidebarToggle ? "w-full" : "w-fit"
              } `
            }
            title="Projects"
          >
            <ProjectsSvg />
            <span
              className={`transition-all duration-300 w-fit ${
                showText ? "block" : "hidden"
              }`}
            >
              Projects
            </span>
          </NavLink>
          <div
            className={`
              cursor-pointer flex gap-[0.5rem] items-center p-[0.7rem] ${
                sidebarToggle ? "w-full" : "w-fit"
              } `}
            title="Logout"
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

          <div className="">
            <h2 className="mb-[1rem]">Go to login (demo)</h2>
            <NavLink
              to="/login"
              className="text-primary bg-light px-[30px] py-[10px]  "
            >
              Login
            </NavLink>
          </div>
        </nav>
      </div>
    </section>
  );
}

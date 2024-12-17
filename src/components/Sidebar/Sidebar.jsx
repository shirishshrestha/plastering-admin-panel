import { useEffect, useState } from "react";
import { logo } from "../../assets/images";
import {
  Business,
  DashboardSvg,
  ProjectsSvg,
  Users,
} from "../../assets/icons/SvgIcons";
import { NavLink } from "react-router-dom";
import { getRoleFromLocalStorage } from "../../utils/Storage/StorageUtils";

export default function Sidebar({ sidebarToggle }) {
  const [showText, setShowText] = useState(false);

  const role = getRoleFromLocalStorage();

  useEffect(() => {
    if (sidebarToggle) {
      const timer = setTimeout(() => setShowText(true), 200);
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

          {role === "admin" && (
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-light text-primary sidebar-menu" : ""
                } flex items-center gap-[0.5rem] rounded-lg p-[0.7rem] ${
                  sidebarToggle ? "w-full" : "w-fit"
                } `
              }
              title="Clients"
            >
              <Users />
              <span
                className={`transition-all duration-300 w-fit ${
                  showText ? "block" : "hidden"
                }`}
              >
                Clients
              </span>
            </NavLink>
          )}

          {role === "estimator" ? (
            <NavLink
              to="/assignedProjects"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-light text-primary sidebar-menu " : ""
                } flex gap-[0.5rem] items-center rounded-lg p-[0.7rem] ${
                  sidebarToggle ? "w-full" : "w-fit"
                } `
              }
              title={role === "admin" ? "Project Books" : "Projects"}
            >
              <ProjectsSvg />
              <span
                className={`transition-all duration-300 w-fit ${
                  showText ? "block" : "hidden"
                }`}
              >
                Assigned Projects
              </span>
            </NavLink>
          ) : (
            <NavLink
              to={role === "admin" ? "/projectbooks" : "/clientProjects"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-light text-primary sidebar-menu " : ""
                } flex gap-[0.5rem] items-center rounded-lg p-[0.7rem] ${
                  sidebarToggle ? "w-full" : "w-fit"
                } `
              }
              title={role === "admin" ? "Project Books" : "Projects"}
            >
              <ProjectsSvg />
              <span
                className={`transition-all duration-300 w-fit ${
                  showText ? "block" : "hidden"
                }`}
              >
                {role === "admin" ? " Project Books" : "Projects"}
              </span>
            </NavLink>
          )}

          {role === "admin" && (
            <NavLink
              to="/business"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-light text-primary sidebar-menu" : ""
                } flex items-center gap-[0.5rem] rounded-lg p-[0.7rem] ${
                  sidebarToggle ? "w-full" : "w-fit"
                } `
              }
              title="Business Directory"
            >
              <Business />
              <span
                className={`transition-all duration-300 w-fit ${
                  showText ? "block" : "hidden"
                }`}
              >
                Business Directory
              </span>
            </NavLink>
          )}
        </nav>
      </div>
    </section>
  );
}

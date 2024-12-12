import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import {
  EditIcon,
  EyeIcon,
  PlusIcon,
  ProjectsSvg,
} from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  EmptyData,
  Loader,
  LogoutConfirmation,
  Pagination,
} from "../../components";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getProjectsStatus,
  getUserProjects,
} from "../../api/Projects/ProjectsApiSlice";

import { getIdFromLocalStorage } from "../../utils/Storage/StorageUtils";
import useAuth from "../../hooks/useAuth";
import { useCallback, useState } from "react";
import useLogout from "../../hooks/useLogout";

const tableHead = [
  "Project Name",
  "Add. Requirements",
  "Project Location",
  "Required by Date",
  "Status",
  "Action",
];

export const ClientProjects = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user_id = getIdFromLocalStorage();

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const { logout } = useLogout();
  const handleLogout = useCallback(() => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);

    logout(() => {
      navigate("/login");
    });
  }, [navigate, setAuth, setLogoutConfirationShow, logout]);

  const {
    isPending,
    error,
    data: ProjectData,
  } = useQuery({
    queryKey: ["userProjects", pageNumber],
    queryFn: () => getUserProjects(user_id, pageNumber),
    enabled: location.pathname === "/projectbooks",
    staleTime: 6000,
  });

  const { isPending: recentProjectsPending, data: RecentProjectData } =
    useQuery({
      queryKey: ["userRecentProjects"],
      queryFn: () => getUserProjects(user_id, 1),
      keepPreviousData: true,
      enabled: location.pathname === "/projectbooks",
      staleTime: 6000,
    });

  const {
    isPending: projectStatusPending,
    error: projectStatusError,
    data: ProjectStatusData,
  } = useQuery({
    queryKey: ["projectStatus"],
    queryFn: () => getProjectsStatus(user_id),
    staleTime: 6000,
    enabled: location.pathname === "/projectbooks",
  });

  const doughnutData = [
    {
      type: "Pending",
      value: ProjectStatusData?.pending_projects || 0,
    },
    {
      type: "Running",
      value: ProjectStatusData?.running_projects || 0,
    },
    {
      type: "Completed",
      value: ProjectStatusData?.completed_projects || 0,
    },
  ];

  const doughnutDatasets = [
    {
      data: doughnutData.map((item) => item.value),
      backgroundColor: [
        "rgb(255, 206, 86)",
        "rgb(75, 192, 192)",
        "rgb(255, 99, 132)",
      ],
      borderColor: [
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
      ],
    },
  ];

  const handleViewProject = (id) => {
    navigate(`/projects/viewProject/${id}`);
  };

  return (
    <>
      {location.pathname === "/projectbooks" ? (
        <section>
          {isPending && <Loader />}
          {projectStatusPending && <Loader />}
          {logoutConfirationShow && (
            <LogoutConfirmation
              handleLogoutClick={handleLogout}
              setLogoutConfirationShow={setLogoutConfirationShow}
            />
          )}
          <div className="grid grid-cols-2">
            <div>
              <div className=" mx-auto  bg-white shadow-lg rounded-lg">
                <h2 className="font-bold text-[1.4rem] text-center mb-[1rem] text-primary">
                  Project Status
                </h2>
                <div className="w-full flex justify-evenly">
                  <div className="max-w-[240px] pb-[1rem]">
                    {ProjectStatusData?.total_projects > 0 ? (
                      <DoughnutChart
                        dealData={doughnutData}
                        datasets={doughnutDatasets}
                        legendPosition="bottom"
                      />
                    ) : (
                      <h4 className="font-semibold text-[1rem]">
                        No projects added
                      </h4>
                    )}
                  </div>
                  <div className="p-[2rem] flex flex-col gap-[1rem] ">
                    {doughnutData.map((item, index) => (
                      <p
                        key={index}
                        className={`flex gap-[0.7rem] items-center py-[0.1rem] px-[0.5rem] rounded-lg  ${
                          item.type === "Pending" ? "bg-[#ffce56]  " : ""
                        } ${item.type === "Completed" ? "bg-[#ff6384]" : ""}
                       ${item.type === "Running" ? "bg-[#4bc0c0]" : ""}`}
                      >
                        <span className="font-bold text-[1.4rem]">
                          {item.value || 0}
                        </span>
                        {item.type}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden h-full flex flex-col items-center">
              <h2 className="font-bold text-[1.4rem] text-center mb-[1rem]">
                Recent Projects
              </h2>
              <SwiperComponent
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {RecentProjectData?.data.length >= 1 ? (
                  RecentProjectData?.data.map((project) => (
                    <SwiperSlide key={project.id}>
                      <div className="flex flex-col p-4">
                        <div className="flex justify-between">
                          <div>
                            <ProjectsSvg />
                          </div>
                          <div className="flex flex-col items-end">
                            <h2 className="text-lg font-semibold text-end ">
                              {project.name
                                ? project.name.length > 25
                                  ? `${project.name.slice(0, 25)}...`
                                  : project.name
                                : "-"}
                            </h2>
                            <p className="text-sm font-[500] text-end">
                              {/* {project.user.name} */}
                            </p>
                            <div
                              className={`flex justify-center capitalize py-[0.1rem] px-[0.5rem] rounded-lg items-center gap-2 w-fit mt-[0.3rem]  ${
                                project.status === "pending"
                                  ? "bg-yellow-600  "
                                  : ""
                              } ${
                                project.status === "completed"
                                  ? "bg-green-600"
                                  : ""
                              }
                                 ${
                                   project.status === "running"
                                     ? "bg-blue-600"
                                     : ""
                                 }`}
                            >
                              <p className="text-sm font-[500] text-center">
                                {project.status}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm font-[500] text-end mt-[0.6rem]">
                          {project.address}
                        </p>
                        <p className="text-sm font-[500] text-end mt-[0.6rem]">
                          {project.additional_requirements
                            ? project.additional_requirements
                                .split(" ")
                                .slice(0, 7)
                                .join(" ")
                            : ""}
                          {project.additional_requirements ? "..." : "-"}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="flex flex-col p-4">
                      <p className="text-[1.2rem]">No recent projects</p>
                    </div>
                  </SwiperSlide>
                )}
              </SwiperComponent>
            </div>
          </div>
          <div className="pt-[2rem] pb-[1rem]">
            <div className="flex items-center pb-[0.5rem] justify-between">
              <h2 className="font-bold text-[1.4rem] text-start">
                List of Projects
              </h2>
              <Link to="/projectbooks/addProject">
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Project{" "}
                  <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden capitalize">
              <thead className="bg-primary text-white  ">
                <tr>
                  {tableHead.map((item, index) => (
                    <th
                      key={index}
                      className="py-[1rem] font-semibold text-start first:pl-[0.5rem]"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {isPending ? (
                  [...Array(4)].map((_, index) => (
                    <tr key={index} className="h-[1.5rem]">
                      {[...Array(6)].map((_, index) => (
                        <td
                          key={index}
                          className="py-[1.5rem] first:pl-[0.5rem]"
                        >
                          <span className="h-[8px] w-[80%]  rounded-sm bg-secondary block"></span>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : ProjectData?.data.length > 0 ? (
                  ProjectData?.data.map((item) => (
                    <tr key={item.id} className=" last:border-none  ">
                      <td className="py-[1rem] pl-[0.5rem]">
                        {item.name
                          ? item.name.length > 15
                            ? `${item.name.slice(0, 15)}...`
                            : item.name
                          : "-"}
                      </td>

                      <td className="py-[1rem]">
                        {item.additional_requirements
                          ? item.additional_requirements.length > 15
                            ? `${item.additional_requirements.slice(0, 15)}...`
                            : item.additional_requirements
                          : "-"}
                      </td>
                      <td className="py-[1rem]">
                        {item.address.length > 15
                          ? `${item.address.slice(0, 15)}...`
                          : item.address}
                      </td>
                      <td className="py-[1rem]">{item.start_date}</td>

                      <td className="py-[1rem] ">{item.status}</td>
                      <td>
                        <div className="flex gap-[0.7rem]">
                          <button
                            className="p-[5px] rounded-md bg-viewBackground"
                            onClick={() => handleViewProject(item.id)}
                          >
                            <EyeIcon strokeColor={"#3e84f4"} />
                          </button>
                          <button
                            className="p-[5px] rounded-md bg-gray-200/60 cursor-not-allowed  "
                            disabled
                          >
                            <EditIcon color="#9b9c9f" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyData />
                )}
              </tbody>
            </table>
          </div>
          {ProjectData?.total_pages > 1 && (
            <div className="mb-[1rem] flex items-center justify-end">
              {/* <Pagination
               
              /> */}
            </div>
          )}
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

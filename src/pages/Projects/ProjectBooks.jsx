import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { ProjectsSvg } from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  EmptyData,
  Loader,
  LogoutConfirmation,
  Pagination,
  CustomToastContainer,
} from "../../components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getTotalProjectsStatus,
} from "../../api/Projects/ProjectsApiSlice";
import { DeleteConfirmation } from "../../components/DeleteConfirmationBox/DeleteConfirmationBox";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import useScrollRestoration from "../../hooks/useScrollRestoration";

const tableHead = [
  "PB. Id",
  "Client Name",
  "Project Book",
  "Project Location",
  "Project Created",
  "Status",
  "Actions",
];

const ProjectBookData = [
  {
    id: 1,
    client_name: "John Doe",
    project_book: "John's Project Book",
    project_location: "New York",
    project_created: "12/12/2021",
    status: "Pending",
  },
  {
    id: 2,
    client_name: "Michael Brown",
    project_book: "Michael's Home Improvements",
    project_location: "Chicago",
    project_created: "08/22/2022",
    status: "Completed",
  },
  {
    id: 3,
    client_name: "Emily Davis",
    project_book: "Emily's Office Design",
    project_location: "San Francisco",
    project_created: "04/15/2024",
    status: "Pending",
  },
];

const doughnutBackgroundColor = [
  "rgb(255, 206, 86)",
  "rgb(75, 192, 192)",
  "rgb(255, 99, 132)",
];

const doughnutBorderColor = [
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(255, 99, 132, 1)",
];

export const ProjectBooks = () => {
  useScrollRestoration();

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [projectName, setProjectName] = useState("");
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const { isPending: recentProjectsPending, data: RecentProjectData } =
    useQuery({
      queryKey: ["recentProjects"],
      queryFn: () => getProjects(1, ""),
      enabled: location.pathname === "/projectbooks",
      staleTime: 6000,
    });

  const {
    isPending: projectStatusPending,
    error: projectStatusError,
    data: TotalProjectStatusData,
  } = useQuery({
    queryKey: ["totalProjectStatus"],
    queryFn: () => getTotalProjectsStatus(),
    staleTime: 6000,
    enabled: location.pathname === "/projectbooks",
  });

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);
    logout(() => {
      navigate("/login");
    });
  };

  const doughnutData = [
    {
      type: "Pending",
      value: TotalProjectStatusData?.pending_projects,
    },
    {
      type: "Running",
      value: TotalProjectStatusData?.running_projects,
    },
    {
      type: "Completed",
      value: TotalProjectStatusData?.completed_projects,
    },
  ];

  const doughnutDatasets = [
    {
      data: doughnutData.map((item) => item.value),
      backgroundColor: doughnutBackgroundColor,
      borderColor: doughnutBorderColor,
    },
  ];

  return (
    <>
      {location.pathname === "/projectbooks" ? (
        <section>
          {deleteConfirationShow && (
            <DeleteConfirmation
              deleteName={projectName}
              setDeleteConfirationShow={setDeleteConfirationShow}
              handleProceedClick={handleProceedClick}
              deleteLoading={deletePending}
            />
          )}
          {logoutConfirationShow && (
            <LogoutConfirmation
              handleLogoutClick={handleLogout}
              setLogoutConfirationShow={setLogoutConfirationShow}
            />
          )}
          {(recentProjectsPending || projectStatusPending) && <Loader />}

          <div className="grid grid-cols-2">
            <div>
              <div className=" mx-auto  bg-white shadow-lg rounded-lg">
                <h2 className="font-bold text-[1.4rem] text-center mb-[1rem] text-primary">
                  Project Status
                </h2>
                <div className="w-full flex justify-evenly">
                  <div className="max-w-[240px] pb-[1rem]">
                    <DoughnutChart
                      dealData={doughnutData}
                      datasets={doughnutDatasets}
                      legendPosition="bottom"
                    />
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
                          {item.value}
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
                {RecentProjectData?.data.length < 1 ? (
                  <SwiperSlide>
                    <div className="flex flex-col p-4">
                      <p className="text-[1.2rem]">No recent projects</p>
                    </div>
                  </SwiperSlide>
                ) : (
                  RecentProjectData?.data.slice(0, 5).map((project) => (
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
                            {/* <p className="text-sm font-[500] text-end">
                              {project.user.name}
                            </p> */}
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
                            ? project.additional_requirements.length > 25
                              ? `${project.additional_requirements.slice(
                                  0,
                                  25
                                )}...`
                              : project.additional_requirements
                            : "-"}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </SwiperComponent>
            </div>
          </div>
          <div className="pt-[2rem] pb-[1rem]">
            <div className="flex items-center pb-[0.5rem] justify-between">
              <h2 className="font-bold text-[1.4rem] text-start">
                List of Project Books
              </h2>
              {/* <div className="flex gap-[1rem]">
                <SearchInput
                  defaultValue={""}
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  placeholder={"Search by id or status"}
                />
              </div> */}
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden capitalize">
              <thead className="bg-primary text-white  ">
                {tableHead.map((item, index) => (
                  <th
                    key={index}
                    className="py-[1rem] font-semibold text-start first:pl-[0.5rem]"
                  >
                    {item}
                  </th>
                ))}
              </thead>
              <tbody>
                {ProjectBookData?.map((projectBook) => (
                  <tr>
                    <td className="py-[1rem] pl-[0.5rem]">{projectBook.id}</td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {projectBook.client_name}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {projectBook.project_book}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {projectBook.project_location}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {projectBook.project_created}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {projectBook.status}
                    </td>
                    <td>
                      <button
                        className="bg-accent flex gap-[0.5rem] text-[0.9rem] font-semibold px-[20px] py-[5px] text-light rounded-lg "
                        onClick={() => navigate(`projects`, { replace: false })}
                      >
                        View Projects
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CustomToastContainer />
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

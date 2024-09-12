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
  TrashIcon,
} from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProject,
  getProjects,
} from "../../api/Projects/ProjectsApiSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { DeleteConfirmation } from "../../components/DeleteConfirmationBox/DeleteConfirmationBox";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { queryClient } from "../../utils/Query/Query";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import EmptyData from "../../components/EmptyData/EmptyData";
import useScrollRestoration from "../../hooks/useScrollRestoration";

export const Projects = () => {
  useScrollRestoration();

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [pageNumber, setPageNumber] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const [recentProjects, setRecentProjects] = useState([]);

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const {
    isPending,
    error,
    data: ProjectData,
  } = useQuery({
    queryKey: ["projects", pageNumber],
    queryFn: () => getProjects(pageNumber),
    keepPreviousData: true,
    enabled: location.pathname === "/projects",
    staleTime: 6000,
  });

  useEffect(() => {
    if (pageNumber === 1) {
      setRecentProjects(ProjectData?.data);
    }
  }, [ProjectData, pageNumber]);

  const nextClick = () => {
    setPageNumber((prev) => prev + 1);
  };

  const prevClick = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
  };

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
      value:
        ProjectData?.data.length > 0
          ? ProjectData?.data.filter((project) => project.status === "pending")
              .length
          : 0,
    },
    {
      type: "Running",
      value:
        ProjectData?.data.length > 0
          ? ProjectData?.data.filter((project) => project.status === "running")
              .length
          : 0,
    },
    {
      type: "Completed",
      value:
        ProjectData?.data.length > 0
          ? ProjectData?.data.filter(
              (project) => project.status === "completed"
            ).length
          : 0,
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

  const tableHead = [
    "Project Name",
    "Client Name",
    "Project Location",
    "Required By Date",
    "Status",
    "Action",
  ];

  const { mutate: DeleteProject, isPending: deletePending } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      notifySuccess("Project deleted successfully");
      setDeleteConfirationShow(false);
    },
    onError: (error) => {
      notifyError("Failed to delete project, please try again");
      console.log(error);
    },
  });

  const handleViewProject = (id) => {
    navigate(`/projects/viewProject/${id}`);
  };

  const handleProceedClick = () => {
    DeleteProject();
  };

  return (
    <>
      {location.pathname === "/projects" ? (
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
          {isPending && (
            <div className="h-full w-full bg-primary fixed z-10 top-0 left-0 flex items-center justify-center">
              <DotLottieReact
                autoplay
                loop
                src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          )}
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
                {recentProjects?.length < 1 ? (
                  <SwiperSlide>
                    <div className="flex flex-col p-4">
                      <p className="text-[1.2rem]">No recent projects</p>
                    </div>
                  </SwiperSlide>
                ) : (
                  recentProjects?.slice(0, 5).map((project) => (
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
                              {project.user.name}
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
                List of Projects
              </h2>
              <Link to="/projects/addProject">
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Project{" "}
                  <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
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
              <tbody className="">
                {isPending ? (
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="h-[1.5rem]">
                      {/* Render 5 cells to match the table columns */}
                      {[...Array(5)].map((_, index) => (
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
                        {item.user.name.length > 15
                          ? `${item.user.name.slice(0, 15)}...`
                          : item.user.name}
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
                            className="p-[5px] rounded-md bg-editBackground"
                            onClick={() => {
                              navigate(`/projects/editProject/${item.id}`);
                            }}
                          >
                            <EditIcon color="#8c62ff" />
                          </button>
                          <button
                            className="p-[5px] rounded-md bg-deleteBackground"
                            onClick={() => {
                              setDeleteConfirationShow(true);
                              setProjectName(item.name);
                              setProjectId(item.id);
                            }}
                          >
                            <TrashIcon />
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
          <div className="mb-[1rem] flex items-center justify-end">
            <Pagination
              nextClick={nextClick}
              prevClick={prevClick}
              lastPage={ProjectData?.last_page}
              pageNumber={pageNumber}
            />
          </div>
          <CustomToastContainer />
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

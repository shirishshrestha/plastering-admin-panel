import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { EditIcon, PlusIcon, ProjectsSvg } from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  EmptyData,
  FilterDrawer,
  Loader,
  Pagination,
  SearchInput,
} from "../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getIdFromLocalStorage } from "../../utils/Storage/StorageUtils";
import useAuth from "../../hooks/useAuth";
import { useMemo } from "react";
import { useGetUserTotalProjects } from "../Projects/hooks/query/useGetUserTotalProjects";
import { useGetUserProjectStatus } from "../Dashboard/hooks/query/useGetUserProjectStatus";
import { Tooltip } from "flowbite-react";
import { useGetClientArchivedProjects } from "./hooks/query/useGetClientArchivedProjects";

const tableHead = [
  "P. ID",
  "Project Name",
  "Project Location",
  "Project Type",
  "Add. Requirements",
  "Required by Date",
  "Status",
  "Total Jobs",
  "Action",
];

export const ArchivedClientProjects = () => {
  const navigate = useNavigate();

  const user_id = getIdFromLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const projectType = useMemo(
    () => searchParams.get("project_type") || "",
    [searchParams]
  );

  const requiredByDate = useMemo(
    () => searchParams.get("date") || "",
    [searchParams]
  );

  const { openDrawer } = useAuth();

  const { data: RecentProjectData, isPending: RecentProjectsPending } =
    useGetUserTotalProjects(
      "userRecentProjects",
      "/clientProjects",
      user_id,
      1
    );

  const { data: ProjectData, isPending: ProjectPending } =
    useGetClientArchivedProjects(
      "clientArchivedProjects",
      "/clientProjects/archivedClientProjects",
      currentPage,
      searchItem,
      projectType,
      requiredByDate
    );

  const { data: ProjectStatusData, isPending: projectStatusPending } =
    useGetUserProjectStatus("userProjectStatus");

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: ProjectData?.projects?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, ProjectData]
  );

  const doughnutData = [
    {
      type: "Pending",
      value: ProjectStatusData?.pending_projects || 0,
    },
    {
      type: "Completed",
      value: ProjectStatusData?.completed_projects || 0,
    },
    {
      type: "Cancelled",
      value: ProjectStatusData?.cancelled_projects || 0,
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

  return (
    <>
      <section>
        {(ProjectPending || RecentProjectsPending || projectStatusPending) && (
          <Loader />
        )}

        <FilterDrawer
          setSearchParams={setSearchParams}
          dateName={"required by date"}
        >
          <FilterDrawer.ProjectType />
          <FilterDrawer.RegisteredDate />
        </FilterDrawer>
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
                      } ${item.type === "Cancelled" ? "bg-[#ff6384]" : ""}
                       ${item.type === "Completed" ? "bg-[#4bc0c0]" : ""}`}
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
              {RecentProjectData?.projects?.data?.length > 0 ? (
                RecentProjectData?.projects?.data?.map((project) => (
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
            <Link to={`/clientProjects/addProject/${user_id}`}>
              <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                Add Project <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
              </button>
            </Link>
          </div>
          <div className="flex justify-between mb-[1rem] items-center">
            <div className="flex gap-[1rem]">
              <button
                className="px-4 py-2 bg-white/80  font-[600]  rounded-lg shadow-inner"
                onClick={() => navigate(`/clientProjects`)}
              >
                All Projects
              </button>
              <button
                className="px-4 py-2  bg-white/80 font-[600]  rounded-lg shadow-inner"
                onClick={() => navigate(`/clientProjects/activeClientProjects`)}
              >
                Active Projects
              </button>
              <button className="px-4 py-2 text-light bg-secondary font-[600]  rounded-lg shadow-inner">
                Archived Projects
              </button>
            </div>
            <div className="flex gap-[1rem] items-end">
              <SearchInput
                setSearchParams={setSearchParams}
                placeholder={"Search by project name"}
              />
              <button
                className="bg-highlight/10 rounded-lg text-highlight text-[14px] py-[0.3rem] px-[0.8rem] border border-highlight focus:outline-none h-fit"
                onClick={openDrawer}
              >
                Filter
              </button>
            </div>
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
              {ProjectData?.projects?.data.length > 0 ? (
                ProjectData?.projects?.data.map((item) => (
                  <tr key={item.id} className=" last:border-none  ">
                    <td className="py-[1rem] pl-[0.5rem]">{item.id}</td>
                    <td className="py-[1rem]">
                      {item.name ? (
                        item.name.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.name}
                          >
                            {`${item.name.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.name
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">
                      {item.address ? (
                        item.address.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.address}
                          >
                            {`${item.address.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.address
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{item.project_type}</td>
                    <td className="py-[1rem]">
                      {item.additional_requirements ? (
                        item.additional_requirements.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.additional_requirements}
                          >
                            {`${item.additional_requirements.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.additional_requirements
                        )
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="py-[1rem]">
                      {item.created_at.split("T")[0]}
                    </td>
                    <td className="py-[1rem]">{item.status}</td>
                    <td className="py-[1rem] pl-[1rem]">{item.jobs.length}</td>
                    <td>
                      <div className="flex gap-[0.7rem]">
                        <button
                          className="bg-accent flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                          onClick={() =>
                            navigate(`/clientProjects/jobBook/${item.id}`)
                          }
                        >
                          View Jobs
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-editBackground"
                          onClick={() =>
                            navigate(`/clientProjects/editProject/${item.id}`)
                          }
                        >
                          <EditIcon color="#8c62ff" />
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
        {ProjectData?.projects?.last_page > 1 && (
          <div className="mb-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
      </section>
    </>
  );
};

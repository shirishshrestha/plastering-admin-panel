import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { PlusIcon, ProjectsSvg } from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  EmptyData,
  Loader,
  LogoutConfirmation,
  Pagination,
  CustomToastContainer,
  FilterDrawer,
  SearchInput,
} from "../../components";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { DeleteConfirmation } from "../../components/DeleteConfirmationBox/DeleteConfirmationBox";
import { useCallback, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useGetProjectBooks } from "./hooks/query/useGetProjectBooks";
import { useGetProjectBookStatus } from "./hooks/query/useGetProjectBookStatus";

const tableHead = ["Client", "Total Projects", "Status", "Actions"];

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

/**
 * ProjectBooks component displays the list of project books and their status.
 * It handles pagination, search, logout, and viewing individual project details.
 *
 * @returns {JSX.Element} The ProjectBooks component.
 */
export const ProjectBooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [projectName, setProjectName] = useState("");
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoized current page number, search item, status, date based on search parameters
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const createdDate = useMemo(
    () => searchParams.get("date") || "",
    [searchParams]
  );

  const status = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  const {
    setLogoutConfirationShow,
    logoutConfirationShow,
    setAuth,
    openDrawer,
  } = useAuth();

  const handleLogout = useCallback(() => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);
    logout(() => {
      navigate("/login");
    });
  }, [setAuth, setLogoutConfirationShow, logout, navigate]);

  // Queries to fetch project book data and related status data
  /**
   * Fetches project books based on search parameters.
   * @type {Object}
   */
  const { data: ProjectBooks, isPending: ProjectBooksPending } =
    useGetProjectBooks(
      "projectBooks",
      "/projectbooks",
      createdDate,
      status,
      currentPage,
      searchItem
    );

  const { data: RecentProjectBooks, isPending: recentProjectsBookPending } =
    useGetProjectBooks("recentProjectBooks", "/projectbooks", "", "", 1, "");

  const { data: TotalProjectStatusData, isPending: projectStatusPending } =
    useGetProjectBookStatus("totalProjectBookStatus", "/projectbooks");

  /**
   * Navigates to the projects page for a specific user.
   *
   * @param {string} user_id - The ID of the user whose projects to view.
   * @returns {void}
   */
  const handleViewProjects = useCallback(
    (user_id) => {
      navigate(`projects/${user_id}`);
    },
    [navigate]
  );

  const doughnutData = useMemo(() => {
    return [
      { type: "Pending", value: TotalProjectStatusData?.pending },
      { type: "Completed", value: TotalProjectStatusData?.completed },
      { type: "Cancelled", value: TotalProjectStatusData?.cancelled },
    ];
  }, [TotalProjectStatusData]);

  const doughnutDatasets = [
    {
      data: doughnutData.map((item) => item.value),
      backgroundColor: doughnutBackgroundColor,
      borderColor: doughnutBorderColor,
    },
  ];

  /**
   * Pagination properties for controlling pagination behavior.
   *
   */
  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: ProjectBooks?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, ProjectBooks]
  );

  /**
   * Updates the page number in the search params and triggers a re-render.
   *
   * @param {number} newPageNumber - The new page number to set in the URL.
   */
  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

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

          {(projectStatusPending ||
            ProjectBooksPending ||
            recentProjectsBookPending) && <Loader />}

          <FilterDrawer
            setSearchParams={setSearchParams}
            dateName={"created date"}
          >
            <FilterDrawer.Status
              options={[
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ]}
            />
          </FilterDrawer>

          <div className="grid grid-cols-2">
            <div>
              <div className=" mx-auto  bg-white shadow-lg rounded-lg">
                <h2 className="font-bold text-[1.4rem] text-center mb-[1rem] text-primary">
                  Project Books Status
                </h2>
                <div className="w-full flex justify-evenly">
                  <div className="max-w-[240px] pb-[1rem]">
                    {TotalProjectStatusData?.total < 1 ? (
                      <h4 className="font-semibold text-center mt-2">
                        No project data is available at the moment. Please check
                        back later.
                      </h4>
                    ) : (
                      <>
                        <DoughnutChart
                          dealData={doughnutData}
                          datasets={doughnutDatasets}
                          legendPosition="bottom"
                        />
                      </>
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
                Recent Project Books
              </h2>
              <SwiperComponent
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {RecentProjectBooks?.data?.length < 1 ? (
                  <SwiperSlide>
                    <div className="flex flex-col p-4">
                      <p className="text-[1.2rem]">No recent project books</p>
                    </div>
                  </SwiperSlide>
                ) : (
                  RecentProjectBooks?.data.slice(0, 5).map((project) => (
                    <SwiperSlide key={project.id}>
                      <div className="flex flex-col p-4">
                        <div className="flex justify-between">
                          <div>
                            <ProjectsSvg />
                          </div>
                          <div className="flex flex-col items-end">
                            <h2 className="text-lg font-semibold text-end ">
                              {project.title
                                ? project.title.length > 35
                                  ? `${project.title.slice(0, 35)}...`
                                  : project.title
                                : "-"}
                            </h2>
                            <div
                              className={`flex justify-center capitalize py-[0.1rem] px-[0.5rem] rounded-lg items-center gap-2 w-fit mt-[0.3rem]  ${
                                project.status === "pending"
                                  ? "bg-yellow-400  "
                                  : ""
                              } ${
                                project.status === "completed"
                                  ? "bg-green-600"
                                  : ""
                              }
                                ${
                                  project.status === "cancelled"
                                    ? "bg-red-600"
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
                          {project.projects.length} total projects
                        </p>
                        <p className="text-sm font-[500] text-end mt-[0.6rem]">
                          {project.created_at.split("T")[0]}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </SwiperComponent>
            </div>
          </div>
          <div className="pt-[2rem] pb-[1rem]">
            <div className="flex items-center pb-[1rem] justify-between">
              <h2 className="font-bold text-[1.4rem] text-start">
                Client Project Books
              </h2>
              <div className="flex gap-[1rem] items-end">
                <div className="flex gap-[1rem]">
                  <Link to={`/projectbooks/addNewProject`}>
                    <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                      Add New Project{" "}
                      <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                    </button>
                  </Link>
                </div>
                <SearchInput
                  setSearchParams={setSearchParams}
                  placeholder={"Search by project book name"}
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
              <tbody>
                {ProjectBooks?.data.length < 1 ? (
                  <EmptyData />
                ) : (
                  <>
                    {ProjectBooks?.data.map((projectBook) => (
                      <tr key={projectBook.id}>
                        <td className="py-[1rem] pl-[0.5rem]">
                          {projectBook.title}
                        </td>

                        <td className="py-[1rem] pl-[0.5rem]">
                          {projectBook.projects.length}
                        </td>

                        <td className="py-[1rem] pl-[0.5rem]">
                          {projectBook.status}
                        </td>
                        <td>
                          <button
                            className="bg-accent flex gap-[0.5rem] text-[14px] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                            onClick={() =>
                              handleViewProjects(projectBook.user_id)
                            }
                          >
                            View Projects
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            {ProjectBooks?.data.last_page > 1 && (
              <div className="mt-[1rem]">
                <Pagination {...paginationProps} />
              </div>
            )}
          </div>

          <CustomToastContainer />
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

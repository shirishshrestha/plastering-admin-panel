import { Link } from "react-router-dom";
import {
  Calendar,
  CompletedProjects,
  TotalProjects,
} from "../../assets/icons/SvgIcons";
import { DoughnutChart, LogoutConfirmation } from "../../components";
import { clientDashboard, curve, spiral, square } from "../../assets/images";
import {
  getIdFromLocalStorage,
  getNameFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/Projects/ProjectsApiSlice";
import EmptyData from "../../components/EmptyData/EmptyData";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useAuth from "../../hooks/useAuth";

export const ClientDashboard = () => {
  const userName = getNameFromLocalStorage();
  const user_id = getIdFromLocalStorage();

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);

    logout(() => {
      navigate("/login");
    });
  };

  const {
    isPending: projectPending,
    error,
    data: ProjectData,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    staleTime: 6000,
  });

  const performanceData = [
    { quarter: "Plan", value: 3 },
    { quarter: "Procure", value: 4 },
    { quarter: "Execute", value: 6 },
    { quarter: "Inspect", value: 2 },
  ];

  const barDatasets = [
    {
      label: "Time Taken (in weeks)",
      data: performanceData.map((item) => item.value),
      backgroundColor: "#182C3A",
    },
  ];

  const doughnutData = [
    {
      type: "Pending",
      value:
        ProjectData?.filter((project) => project.user_id === user_id).filter(
          (project) => project.status === "pending"
        ).length > 0
          ? ProjectData?.filter(
              (project) => project.user_id === user_id
            ).filter((project) => project.status === "pending").length
          : 0,
    },
    {
      type: "Running",
      value:
        ProjectData?.filter((project) => project.user_id === user_id).filter(
          (project) => project.status === "running"
        ).length > 0
          ? ProjectData?.filter(
              (project) => project.user_id === user_id
            ).filter((project) => project.status === "running").length
          : 0,
    },
    {
      type: "Completed",
      value:
        ProjectData?.filter((project) => project.user_id === user_id).filter(
          (project) => project.status === "completed"
        ).length > 0
          ? ProjectData?.filter(
              (project) => project.user_id === user_id
            ).filter((project) => project.status === "completed").length
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

  const tableHead = ["Project Name", "Address", "Start Date", "Status"];

  // dummy table data
  const tableData = [
    {
      projectName: "Residential Plastering",
      startDate: "2024-01-15",
      status: "Completed",
    },
    {
      projectName: "Commercial Office Plastering",
      startDate: "2024-03-01",
      status: "In Progress",
    },
    {
      projectName: "Retail Store Renovation",
      startDate: "2024-02-20",
      status: "Pending",
    },
    {
      projectName: "Warehouse Plastering",
      startDate: "2024-04-01",
      status: "Scheduled",
    },
    {
      projectName: "Luxury Villa Plastering",
      startDate: "2024-01-05",
      status: "Completed",
    },
  ];

  return (
    <section className="pt-[1rem]">
      {projectPending && (
        <div className="h-full w-full bg-primary fixed z-20 top-0 left-0 flex items-center justify-center">
          <DotLottieReact
            autoplay
            loop
            src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
      )}

      {logoutConfirationShow && (
        <LogoutConfirmation
          handleLogoutClick={handleLogout}
          setLogoutConfirationShow={setLogoutConfirationShow}
        />
      )}
      <div className="grid grid-cols-[1.3fr,0.7fr] gap-[1rem] w-full h-full">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg py-[1rem] px-[2rem] relative overflow-hidden">
            <div className="flex items-center gap-[2rem] justify-evenly ">
              <div className="relative z-10">
                <h3 className="font-bold text-[2rem] leading-[150%]">
                  Welcome Back!
                </h3>
                <h4 className="capitalize">{userName}</h4>
              </div>
              <figure className="w-[150px] relative z-10">
                <img
                  src={clientDashboard}
                  alt="dashboard"
                  className="object-cover"
                />
              </figure>
              <img
                src={square}
                alt="square"
                className="absolute left-[-5%] bottom-[80%]"
              />
              <img
                src={square}
                alt="square"
                className="absolute left-[-12%] top-[80%]"
              />
              <img
                src={curve}
                alt="curve"
                className="absolute rotate-90 right-[-10%] top-[40%]"
              />
              <img
                src={curve}
                alt="curve"
                className="absolute rotate-90 right-[40%] top-[55%]"
              />

              <img
                src={spiral}
                alt="spiral"
                className="absolute  right-[-1%] top-[-8%] h-[40px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-[0.82fr,1fr,0.9fr] gap-[0.5rem] justify-center mt-[1.5rem] text-[14px]">
            <div className="px-[1rem] py-[1.4rem] bg-primary w-full rounded-lg shadow-lg text-light">
              <div className="flex flex-col gap-[0.8rem] items-end">
                <div className="p-[0.4rem] w-fit text-light bg-white/30 rounded-lg backdrop-blur-lg ">
                  <TotalProjects />
                </div>
                <p className="font-semibold capitalize text-[1rem] ">
                  Total Projects -{" "}
                  {ProjectData?.filter((project) => project.user_id === user_id)
                    .length > 0
                    ? ProjectData?.filter(
                        (project) => project.user_id === user_id
                      ).length
                    : "0"}
                </p>
              </div>
            </div>
            <div className="px-[1rem] py-[1.4rem] bg-[#fff] w-full rounded-lg  text-primary shadow-lg">
              <div className="flex flex-col gap-[0.8rem] items-end">
                <div className="p-[0.4rem] w-fit  text-light bg-primary rounded-lg backdrop-blur-lg ">
                  <CompletedProjects />
                </div>
                <p className="font-semibold capitalize text-[1rem] ">
                  Completed projects -{" "}
                  {ProjectData?.filter(
                    (project) => project.user_id === user_id
                  ).filter((project) => project.status === "completed").length >
                  0
                    ? ProjectData?.filter(
                        (project) => project.user_id === user_id
                      ).filter((project) => project.status === "completed")
                        .length
                    : "0"}
                </p>
              </div>
            </div>
            <div className="px-[1rem] py-[1.4rem] bg-[#fff] w-full rounded-lg shadow-lg text-primary">
              <div className="flex flex-col gap-[0.8rem] items-end">
                <div className="p-[0.4rem] w-fit text-light bg-primary rounded-lg backdrop-blur-lg ">
                  <Calendar />
                </div>
                <p className="font-semibold capitalize text-[1rem]">
                  Running Projects -{" "}
                  {ProjectData?.filter(
                    (project) => project.user_id === user_id
                  ).filter((project) => project.status === "running").length > 0
                    ? ProjectData?.filter(
                        (project) => project.user_id === user_id
                      ).filter((project) => project.status === "running").length
                    : "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className=" h-fit p-[1rem] bg-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start"> Project Milestone</h4>
            <div className=" pb-[1.2rem] text-[12px] font-[500] pt-[0.2rem]">
              <p>Per Project</p>
            </div>
            <div className="max-w-[370px]">
              <BarChart
                yBool={true}
                barData={performanceData}
                datasets={barDatasets}
                legendBool={false}
                // borderColors="rgba(24, 44, 58, 0.668)"
              />
            </div>
          </div> */}
          <div className="h-fit p-[1rem] bg-primary text-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start text-[18px]">Project Status</h4>

            <div className="max-w-[340px] mt-[0.5rem]">
              <DoughnutChart
                dealData={doughnutData}
                datasets={doughnutDatasets}
                legendPosition={"bottom"}
                legendTextColor={"#fff"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[1rem]">
        <h2 className="font-bold text-[1.4rem]">Recent Projects</h2>
        <div className="overflow-x-scroll table__container  mt-[0.4rem]">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
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
            <tbody className="capitalize">
              {projectPending ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="h-[1.5rem]">
                    {[...Array(4)].map((_, index) => (
                      <td key={index} className="py-[1.5rem] first:pl-[0.5rem]">
                        <span className="h-[8px] w-[80%]  rounded-sm bg-secondary block"></span>
                      </td>
                    ))}
                  </tr>
                ))
              ) : ProjectData?.filter((item) => user_id === item.user_id)
                  .length > 0 ? (
                ProjectData?.filter((item) => user_id === item.user_id)
                  .slice(0, 4)
                  .map((item) => (
                    <tr key={item.id} className=" last:border-none  ">
                      <td className="py-[1rem] pl-[0.5rem]">{item.name}</td>
                      <td className="py-[1rem]">{item.address}</td>
                      <td className="py-[1rem]">{item.start_date}</td>

                      <td className="py-[1rem] ">{item.status}</td>
                    </tr>
                  ))
              ) : (
                <EmptyData />
              )}
            </tbody>
          </table>
          <div className="mt-[1rem] ">
            <Link to="/projects">
              <button className="bg-primary font-semibold px-[30px] py-[10px] text-light rounded-lg hover:bg-secondary transition-all ease-in-out duration-200 hover:text-primary ">
                See More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

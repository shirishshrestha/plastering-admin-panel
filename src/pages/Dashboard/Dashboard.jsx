import { Link } from "react-router-dom";
import {
  Calendar,
  CompletedProjects,
  TotalProjects,
} from "../../assets/icons/SvgIcons";
import {
  BarChart,
  DoughnutChart,
  LineChart,
  Loader,
  LogoutConfirmation,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getTotalProjectsStatus,
} from "../../api/Projects/ProjectsApiSlice";
import EmptyData from "../../components/EmptyData/EmptyData";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import { clientDashboard, curve, spiral, square } from "../../assets/images";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

export const Dashboard = () => {
  useScrollRestoration();

  const { logout } = useLogout();

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
    queryFn: () => getProjects(1, ""),
  });

  const {
    isPending: projectStatusPending,
    error: projectStatusError,
    data: TotalProjectStatusData,
  } = useQuery({
    queryKey: ["totalProjectStatus"],
    queryFn: () => getTotalProjectsStatus(),
    staleTime: 6000,
  });

  const performanceData = [
    { quarter: "Q1", value: 1200 },
    { quarter: "Q2", value: 2200 },
    { quarter: "Q3", value: 1800 },
    { quarter: "Q4", value: 2000 },
  ];

  const lineData = [
    { month: "Jan", plaster: 1200, sand: 800 },
    { month: "Feb", plaster: 1500, sand: 1000 },
    { month: "Mar", plaster: 1400, sand: 950 },
    { month: "Apr", plaster: 1600, sand: 1100 },
    { month: "May", plaster: 1700, sand: 1200 },
    { month: "Jun", plaster: 1800, sand: 1300 },
    { month: "Jul", plaster: 1900, sand: 1350 },
    { month: "Aug", plaster: 2100, sand: 1400 },
    { month: "Sep", plaster: 2200, sand: 1450 },
    { month: "Oct", plaster: 2300, sand: 1500 },
    { month: "Nov", plaster: 2400, sand: 1550 },
    { month: "Dec", plaster: 2500, sand: 1600 },
  ];

  const lineDatasets = [
    {
      label: "Plaster Usage (kg)",
      data: lineData.map((item) => item.plaster),
      borderColor: "rgba(54, 162, 235, 1)", // Blue
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
    {
      label: "Sand Usage (kg)",
      data: lineData.map((item) => item.sand),
      borderColor: "rgba(255, 159, 64, 1)", // Orange
      pointBackgroundColor: "rgba(255, 159, 64, 1)",
    },
  ];

  const barDatasets = [
    {
      label: "Team Performance",
      data: performanceData.map((item) => item.value),
      backgroundColor: "#182C3A",
    },
  ];

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
  ];

  return (
    <section className="pt-[1rem]">
      {logoutConfirationShow && (
        <LogoutConfirmation
          handleLogoutClick={handleLogout}
          setLogoutConfirationShow={setLogoutConfirationShow}
        />
      )}
      {projectPending && <Loader />}
      {projectStatusPending && <Loader />}
      <div className="grid grid-cols-[1.3fr,0.7fr] gap-[1.2rem] w-full h-full">
        <div className="w-full h-full flex flex-col gap-[1rem] justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg py-[1rem] px-[2rem] relative overflow-hidden">
            <div className="flex items-center gap-[2rem] justify-between ">
              <div className="relative z-10">
                <h3 className="font-bold text-[1.8rem] text-center leading-[150%]">
                  Welcome to the Admin Dashboard
                </h3>
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
          <div className="grid grid-cols-3 gap-[0.8rem] justify-center">
            <div className="p-[1rem] bg-primary w-full h-[167px] rounded-lg shadow-lg text-light">
              <div className="flex gap-[0.8rem] items-center">
                <div className="p-[0.5rem]  text-light bg-white/30 rounded-lg backdrop-blur-lg ">
                  <TotalProjects />
                </div>
                <p className="font-semibold capitalize">Total Projects</p>
              </div>
              <div className="pt-[1.2rem] flex items-end flex-col ">
                <p className="text-[2rem] font-bold">
                  {TotalProjectStatusData?.total_projects}
                </p>
                <p className="text-[12px]">
                  All running and completed projects
                </p>
              </div>
            </div>
            <div className="p-[1rem] bg-[#fff] w-full h-[167px] rounded-lg  text-primary shadow-lg">
              <div className="flex gap-[0.8rem] items-center">
                <div className="p-[0.5rem]  text-light bg-primary rounded-lg backdrop-blur-lg ">
                  <CompletedProjects />
                </div>
                <p className="font-semibold capitalize">Completed projects</p>
              </div>
              <div className="pt-[1.2rem] flex items-end flex-col ">
                <p className="text-[2rem] font-bold">
                  {TotalProjectStatusData?.completed_projects}
                </p>
                <p className="text-[12px]">
                  <span className="text-secondary font-[700]">+12%</span>{" "}
                  Completion Rate this month
                </p>
              </div>
            </div>
            <div className="p-[1rem] bg-[#fff] w-full h-[167px] rounded-lg shadow-lg text-primary">
              <div className="flex gap-[0.8rem] items-center">
                <div className="p-[0.5rem]  text-light bg-primary rounded-lg backdrop-blur-lg ">
                  <Calendar />
                </div>
                <p className="font-semibold capitalize">Running Projects</p>
              </div>
              <div className="pt-[1.2rem] flex items-end flex-col ">
                <p className="text-[2rem] font-bold">
                  {TotalProjectStatusData?.running_projects}
                </p>
                <p className="text-[12px]">
                  <span className="text-secondary font-[700]">+8% </span>{" "}
                  Running projects increases
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center items-center p-[1rem] mt-[1.5rem] bg-white w-full  rounded-lg shadow-lg">
            <div className="mb-[1.8rem] text-center">
              <h4 className="font-bold text-[1.2rem] ">Material Usage</h4>
              <p className="text-[12px]">Last 1 year</p>
            </div>
            <LineChart lineData={lineData} datasets={lineDatasets} />
          </div> */}
        </div>
        <div>
          {/* <div className=" h-fit p-[1rem] bg-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start">Team Performance</h4>
            <div className=" pb-[1.2rem] text-[12px] font-[500] pt-[0.2rem]">
              <p>Last 1 year</p>
            </div>
            <div className="max-w-[370px]">
              <BarChart
                barData={performanceData}
                datasets={barDatasets}
                legendBool={false}
                // borderColors="rgba(24, 44, 58, 0.668)"
              />
            </div>
          </div> */}
          <div className="h-fit  p-[1rem] bg-primary text-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start pb-[1.2rem]">Project Status</h4>

            <div className="max-w-[340px] ">
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
        <div className="overflow-x-scroll table__container  mt-[1rem]">
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
            <tbody className="">
              {projectPending ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="h-[1.5rem]">
                    {[...Array(5)].map((_, index) => (
                      <td key={index} className="py-[1.5rem] first:pl-[0.5rem]">
                        <span className="h-[8px] w-[80%]  rounded-sm bg-secondary block"></span>
                      </td>
                    ))}
                  </tr>
                ))
              ) : ProjectData?.data.length < 1 ? (
                <EmptyData />
              ) : (
                ProjectData?.data.slice(0, 4).map((item) => (
                  <tr key={item.id} className=" last:border-none  ">
                    <td className="py-[1rem] pl-[0.5rem]">
                      {item.name
                        ? item.name.length > 20
                          ? `${item.name.slice(0, 20)}...`
                          : item.name
                        : "-"}
                    </td>
                    <td className="py-[1rem]">{item.user.name}</td>
                    <td className="py-[1rem]">
                      {item.address.length > 20
                        ? `${item.address.slice(0, 20)}...`
                        : item.address}
                    </td>
                    <td className="py-[1rem]">{item.start_date}</td>

                    <td className="py-[1rem] ">{item.status}</td>
                  </tr>
                ))
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

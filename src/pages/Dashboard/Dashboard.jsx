import { Link } from "react-router-dom";
import {
  Calendar,
  CompletedProjects,
  TotalProjects,
} from "../../assets/icons/SvgIcons";
import { BarChart, DoughnutChart, LineChart } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/Projects/ProjectsApiSlice";
import EmptyData from "../../components/EmptyData/EmptyData";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Dashboard = () => {
  const {
    isPending: projectPending,
    error,
    data: ProjectData,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const performanceData = [
    { quarter: "Q1", value: 1200 },
    { quarter: "Q2", value: 2200 },
    { quarter: "Q3", value: 1800 },
    { quarter: "Q4", value: 2000 },
  ];

  // const salesData = [
  //   { quarter: "Goal", value: 40 },
  //   { quarter: "Pending Forcast", value: 15 },
  //   { quarter: "Revenue", value: 18 },
  // ];

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
      value:
        ProjectData?.length > 0
          ? ProjectData?.filter((project) => project.status === "pending")
              .length
          : 0,
    },
    {
      type: "Running",
      value:
        ProjectData?.length > 0
          ? ProjectData?.filter((project) => project.status === "running")
              .length
          : 0,
    },
    {
      type: "Completed",
      value:
        ProjectData?.length > 0
          ? ProjectData?.filter((project) => project.status === "completed")
              .length
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
    "Address",
    "Start Date",
    "Status",
  ];

  // dummy table data
  const tableData = [
    {
      projectName: "Residential Plastering",
      clientName: "John Doe",
      startDate: "2024-01-15",
      endDate: "2024-02-10",
      status: "Completed",
    },
    {
      projectName: "Commercial Office Plastering",
      clientName: "ACME Corp",
      startDate: "2024-03-01",
      endDate: "2024-04-15",
      status: "In Progress",
    },
    {
      projectName: "Retail Store Renovation",
      clientName: "Jane Smith",
      startDate: "2024-02-20",

      status: "Pending",
    },
    {
      projectName: "Warehouse Plastering",
      clientName: "Logistics Co",
      startDate: "2024-04-01",

      status: "Scheduled",
    },
    {
      projectName: "Luxury Villa Plastering",
      clientName: "Mr. Brown",
      startDate: "2024-01-05",
      endDate: "2024-01-25",
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
      <div className="grid grid-cols-[1.3fr,0.7fr] gap-[1.2rem] w-full h-full">
        <div className="w-full h-full">
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
                  {" "}
                  {ProjectData?.length > 0 ? ProjectData?.length : "0"}
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
                  {ProjectData?.length > 0
                    ? ProjectData?.filter(
                        (project) => project.status === "completed"
                      ).length
                    : "0"}
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
                  {ProjectData?.length > 0
                    ? ProjectData?.filter(
                        (project) => project.status === "running"
                      ).length
                    : "0"}
                </p>
                <p className="text-[12px]">
                  <span className="text-secondary font-[700]">+8% </span>{" "}
                  Running projects increases
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-[1rem] mt-[1.5rem] bg-white w-full  rounded-lg shadow-lg">
            <div className="mb-[1.8rem] text-center">
              <h4 className="font-bold text-[1.2rem] ">Material Usage</h4>
              <p className="text-[12px]">Last 1 year</p>
            </div>
            <LineChart lineData={lineData} datasets={lineDatasets} />
          </div>
        </div>
        <div>
          <div className=" h-fit p-[1rem] bg-white flex flex-col justify-center items-center shadow-lg rounded-lg">
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
          </div>
          <div className="h-fit mt-[1.0rem] p-[1rem] bg-primary text-white flex flex-col justify-center items-center shadow-lg rounded-lg">
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
              ) : ProjectData?.length < 1 ? (
                <EmptyData />
              ) : (
                ProjectData?.slice(0, 4).map((item) => (
                  <tr key={item.id} className=" last:border-none  ">
                    <td className="py-[1rem] first:pl-[0.5rem]">{item.name}</td>
                    <td className="py-[1rem]">{item.user.name}</td>
                    <td className="py-[1rem]">{item.address}</td>
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

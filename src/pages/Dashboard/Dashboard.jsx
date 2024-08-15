import { Link } from "react-router-dom";
import {
  Calendar,
  CompletedProjects,
  TotalProjects,
} from "../../assets/icons/SvgIcons";
import { BarChart, DoughnutChart, LineChart } from "../../components";

export const Dashboard = () => {
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
    { month: "Jan", revenue: 12000, expense: 4000 },
    { month: "Feb", revenue: 15000, expense: 8500 },
    { month: "Mar", revenue: 17000, expense: 9000 },
    { month: "Apr", revenue: 16000, expense: 9500 },
    { month: "May", revenue: 18000, expense: 12000 },
    { month: "Jun", revenue: 20000, expense: 16000 },
    { month: "Jul", revenue: 21000, expense: 14000 },
    { month: "Aug", revenue: 22000, expense: 13000 },
    { month: "Sep", revenue: 23000, expense: 14000 },
    { month: "Oct", revenue: 20000, expense: 15000 },
    { month: "Nov", revenue: 20000, expense: 16000 },
    { month: "Dec", revenue: 21000, expense: 17000 },
  ];

  const LineFunction = (value) => {
    value = value + "K";
    return value;
  };

  const lineDatasets = [
    {
      label: "Revenue",
      data: lineData.map((item) => item.revenue / 100),
      borderColor: "rgba(75, 192, 192, 1)",

      pointBackgroundColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Expenses",
      data: lineData.map((item) => item.expense / 100),
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
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
    { type: "Pending", value: 30 },
    { type: "Won", value: 50 },
    { type: "Loss", value: 20 },
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
    "Start Date",
    "End Date",
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
      <div className="grid grid-cols-[1.3fr,0.7fr] gap-3 w-full h-full">
        <div className="w-full h-full">
          <div className="grid grid-cols-3 gap-[0.5rem] justify-center">
            <div className="p-[1rem] bg-primary w-full h-[167px] rounded-lg shadow-lg text-light">
              <div className="flex gap-[0.8rem] items-center">
                <div className="p-[0.5rem]  text-light bg-white/30 rounded-lg backdrop-blur-lg ">
                  <TotalProjects />
                </div>
                <p className="font-semibold capitalize">Total Projects</p>
              </div>
              <div className="pt-[1.2rem] flex items-end flex-col ">
                <p className="text-[2rem] font-bold">10,400</p>
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
                <p className="text-[2rem] font-bold">9,020</p>
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
                <p className="text-[2rem] font-bold">1,380</p>
                <p className="text-[12px]">
                  <span className="text-secondary font-[700]">+8% </span>{" "}
                  Running projects increases
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-[1rem] mt-[1.5rem] bg-white w-full  rounded-lg shadow-lg">
            <div className="mb-[1.8rem] text-center">
              <h4 className="font-bold text-[1.2rem] ">Balance Overview</h4>
              <p className="text-[12px]">Last 1 year</p>
            </div>
            <LineChart
              lineData={lineData}
              LineFunction={LineFunction}
              datasets={lineDatasets}
            />
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
            <h4 className="font-bold text-start">Deal Type</h4>
            <div className=" pb-[1.2rem] text-[12px] font-[500] pt-[0.2rem]">
              <p>Monthly</p>
            </div>
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
              {tableData.map((item, index) => (
                <tr key={index} className=" last:border-none  ">
                  <td className="py-[1rem] pl-[0.5rem]">{item.projectName}</td>
                  <td className="py-[1rem]">{item.clientName}</td>
                  <td className="py-[1rem]">{item.startDate}</td>
                  <td className="py-[1rem]">
                    {item.endDate ? item.endDate : "-"}
                  </td>
                  <td className="py-[1rem] ">{item.status}</td>
                </tr>
              ))}
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

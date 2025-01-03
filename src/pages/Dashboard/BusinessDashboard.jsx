import { Link, useNavigate } from "react-router-dom";
import { Calendar, TotalProjects } from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  EmptyData,
  LogoLoader,
} from "../../components";
import { logo } from "../../assets/images";
import {
  getIdFromLocalStorage,
  getNameFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { useQuery } from "@tanstack/react-query";
import {
  getProjectsStatus,
  getUserProjects,
} from "../../api/Projects/ProjectsApiSlice";

const tableHead = [
  "Project Name",
  "Project Location",
  "Required By Date",
  "Status",
];

export const BusinessDashboard = () => {
  const userName = getNameFromLocalStorage();
  const user_id = getIdFromLocalStorage();
  const navigate = useNavigate();

  const {
    isPending: projectPending,
    error: projectError,
    data: ProjectData,
  } = useQuery({
    queryKey: ["userProjects"],
    queryFn: () => getUserProjects(user_id, 1),
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

  return (
    <section className="pt-[1rem]">
      {(projectPending || projectStatusPending) && <LogoLoader />}
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
              <figure className="w-[140px] relative z-10">
                <img src={logo} alt="dashboard" className="object-cover" />
              </figure>
            </div>
          </div>
          <div className="grid grid-cols-[1fr,1fr] gap-[0.5rem] justify-center mt-[1.5rem] text-[14px]">
            <div className="px-[1rem] py-[1.4rem] bg-primary w-full rounded-lg shadow-lg text-light">
              <div className="flex flex-col gap-[0.8rem] items-end">
                <div className="p-[0.4rem] w-fit text-light bg-white/30 rounded-lg backdrop-blur-lg ">
                  <TotalProjects />
                </div>
                <p className="font-semibold capitalize text-[1rem] ">
                  Assigned Projects -{" "}
                  {ProjectStatusData?.pending_projects || "0"}
                </p>
              </div>
            </div>

            <div className="px-[1rem] py-[1.4rem] bg-[#fff] w-full rounded-lg shadow-lg text-primary">
              <div className="flex flex-col gap-[0.8rem] items-end">
                <div className="p-[0.4rem] w-fit text-light bg-primary rounded-lg backdrop-blur-lg ">
                  <Calendar />
                </div>
                <p className="font-semibold capitalize text-[1rem]">
                  Submitted Projects -{" "}
                  {ProjectStatusData?.running_projects || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-full p-[1rem] bg-primary text-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start text-[18px]">Project Status</h4>

            <div className="max-w-[340px] mt-[0.5rem] ">
              {ProjectStatusData?.total_projects > 0 ? (
                <DoughnutChart
                  dealData={doughnutData}
                  datasets={doughnutDatasets}
                  legendPosition={"bottom"}
                  legendTextColor={"#fff"}
                />
              ) : (
                <h4>No data available</h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[1rem]">
        <h2 className="font-bold text-[1.4rem]">Recently Assigned Projects</h2>
        <div className="overflow-x-scroll table__container  mt-[0.4rem]">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
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
              ) : ProjectData?.data.filter((item) => user_id === item.user_id)
                  .length > 0 ? (
                ProjectData?.data
                  .filter((item) => user_id === item.user_id)
                  .slice(0, 4)
                  .map((item) => (
                    <tr key={item.id} className=" last:border-none  ">
                      <td className="py-[1rem] pl-[0.5rem]">
                        {item.name
                          ? item.name.length > 20
                            ? `${item.name.slice(0, 20)}...`
                            : item.name
                          : "-"}
                      </td>
                      <td className="py-[1rem]">
                        {item.address.length > 20
                          ? `${item.address.slice(0, 20)}...`
                          : item.address}
                      </td>
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

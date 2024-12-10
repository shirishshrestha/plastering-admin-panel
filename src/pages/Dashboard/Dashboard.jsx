import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  CompletedProjects,
  TotalProjects,
} from "../../assets/icons/SvgIcons";
import {
  DoughnutChart,
  LogoLoader,
  LogoutConfirmation,
} from "../../components";
import { curve, logo, spiral, square } from "../../assets/images";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import { useCallback, useMemo } from "react";
import { useGetTotalProjectStatus } from "../Projects/hooks/query/useGetTotalProjectStatus";
import { useGetProjects } from "../Projects/hooks/query/useGetProjects";
import { Tooltip } from "flowbite-react";

const tableHead = [
  "Project Book",
  "Project Name",
  "Project Location",
  "Project Type",
  "Start Date",
  "Status",
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

  const { setLogoutConfirationShow, logoutConfirationShow, setAuth } =
    useAuth();

  const { data: TotalProjectStatusData, isPending: projectStatusPending } =
    useGetTotalProjectStatus("dashboardProjectStatus", location.pathname);
  const { data: ProjectData, isPending: projectPending } = useGetProjects(
    "dashboardProjects",
    location.pathname,
    1,
    ""
  );

  const handleLogout = useCallback(() => {
    setAuth({});
    localStorage.clear();
    setLogoutConfirationShow(false);

    logout(() => {
      navigate("/login");
    });
  }, [navigate, setAuth, setLogoutConfirationShow, logout]);

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
      {logoutConfirationShow && (
        <LogoutConfirmation
          handleLogoutClick={handleLogout}
          setLogoutConfirationShow={setLogoutConfirationShow}
        />
      )}
      {(projectPending || projectStatusPending) && <LogoLoader />}
      <div className="grid grid-cols-[1.3fr,0.7fr] gap-[1.2rem] w-full h-full">
        <div className="w-full h-full flex flex-col gap-[1rem] justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg py-[1rem] px-[2rem] relative overflow-hidden">
            <div className="flex items-center gap-[2rem] justify-between ">
              <div className="relative z-10">
                <h3 className="font-bold text-[1.8rem] text-center leading-[150%]">
                  Welcome to the Admin Dashboard
                </h3>
              </div>
              <figure className="w-[140px] relative z-10">
                <img src={logo} alt="dashboard" className="object-cover" />
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
                  {TotalProjectStatusData?.total}
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
                  {TotalProjectStatusData?.completed}
                </p>
                <p className="text-[12px]">Projects successfully completed</p>
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
                  {TotalProjectStatusData?.pending}
                </p>
                <p className="text-[12px]">Ongoing projects</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-full  p-[1rem] bg-primary text-white flex flex-col justify-center items-center shadow-lg rounded-lg">
            <h4 className="font-bold text-start pb-[1.2rem]">Project Status</h4>

            <div className="max-w-[340px] ">
              {TotalProjectStatusData?.total_projects < 1 ? (
                <h4>No data available</h4>
              ) : (
                <DoughnutChart
                  dealData={doughnutData}
                  datasets={doughnutDatasets}
                  legendPosition={"bottom"}
                  legendTextColor={"#fff"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[1rem]">
        <h2 className="font-bold text-[1.4rem]">Recent Projects</h2>
        <div className="overflow-x-scroll table__container  mt-[1rem]">
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
            <tbody className="">
              {ProjectData?.slice(0, 4).map((item) => (
                <tr key={item.id} className=" last:border-none  ">
                  <td className="py-[1rem] pl-[0.5rem]">
                    {item.project_book.title ? (
                      item.project_book.title.length > 25 ? (
                        <Tooltip
                          content={item.project_book.title}
                        >{`${item.project_book.title.slice(
                          0,
                          25
                        )}...`}</Tooltip>
                      ) : (
                        item.project_book.title
                      )
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-[1rem] pl-[0.5rem]">
                    {item.name ? (
                      item.name.length > 25 ? (
                        <Tooltip content={item.name}>{`${item.name.slice(
                          0,
                          25
                        )}...`}</Tooltip>
                      ) : (
                        item.name
                      )
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-[1rem]">
                    {item.address.length > 30 ? (
                      <Tooltip content={item.address}>{`${item.address.slice(
                        0,
                        30
                      )}...`}</Tooltip>
                    ) : (
                      item.address
                    )}
                  </td>
                  <td className="py-[1rem]">{item.project_type}</td>
                  <td className="py-[1rem]">{item.created_at.split("T")[0]}</td>

                  <td className="py-[1rem] ">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-[1rem] ">
            <Link to="/projectbooks">
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

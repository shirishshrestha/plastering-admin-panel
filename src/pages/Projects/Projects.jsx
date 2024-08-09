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
import { DoughnutChart, Pagination } from "../../components";

export const Projects = () => {
  const doughnutData = [
    { type: "Pending", value: 10 },
    { type: "Scheduled", value: 50 },
    { type: "Completed", value: 40 },
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
  const recentProjects = [
    {
      projectName: "Residential Plastering",
      clientName: "John Doe",
      status: "completed",
      description:
        "Smooth plaster finish applied to a two-story home. The client was highly satisfied with the final results.",
    },
    {
      projectName: "Commercial Office Plastering",
      clientName: "ACME Corp",
      status: "pending",
      description:
        "Acoustic plaster ceilings and durable finishes were installed. The team is focused on meeting the tight deadline.",
    },
    {
      projectName: "Retail Store Renovation",
      clientName: "Jane Smith",
      status: "scheduled",
      description:
        "Decorative plaster will be applied to the store's feature walls. The project is scheduled to start soon.",
    },
    {
      projectName: "Warehouse Plastering",
      clientName: "Logistics Co",
      status: "completed",
      description:
        "Durable plaster will be applied to the warehouse walls and ceilings. This will ensure longevity and resistance to wear.",
    },
    {
      projectName: "Luxury Villa Plastering",
      clientName: "Mr. Brown",
      status: "pending",
      description:
        "High-end Venetian plaster finishes were used throughout the villa. The client praised the elegant and refined results.",
    },
  ];

  const tableHead = [
    "Project Name",
    "Client Name",
    "Start Date",
    "End Date",
    "Status",
    "Action",
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
    <section>
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
                    className={`flex gap-[0.7rem] items-center py-[0.1rem] px-[0.5rem] rounded-lg  ${
                      item.type === "Pending" ? "bg-[#ffce56]  " : ""
                    } ${item.type === "Completed" ? "bg-[#ff6384]" : ""}
                       ${item.type === "Scheduled" ? "bg-[#4bc0c0]" : ""}`}
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
            {recentProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col p-4">
                  <div className="flex justify-between">
                    <div>
                      <ProjectsSvg />
                    </div>
                    <div className="flex flex-col items-end">
                      <h2 className="text-lg font-semibold text-end ">
                        {project.projectName}
                      </h2>
                      <p className="text-sm font-[500] text-end">
                        {project.clientName}
                      </p>
                      <div
                        className={`flex justify-center capitalize py-[0.1rem] px-[0.5rem] rounded-lg items-center gap-2 w-fit mt-[0.3rem]  ${
                          project.status === "pending" ? "bg-yellow-600  " : ""
                        } ${
                          project.status === "completed" ? "bg-green-600" : ""
                        }
                           ${
                             project.status === "scheduled" ? "bg-blue-600" : ""
                           }`}
                      >
                        <p className="text-sm font-[500] text-center">
                          {project.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-[500] text-end mt-[0.6rem]">
                    {project.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </div>
      <div className="pt-[2rem] pb-[1rem]">
        <div className="flex items-center pb-[0.5rem] justify-between">
          <h2 className="font-bold text-[1.4rem] text-start">
            List of Projects
          </h2>
          <button className="bg-primary flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
            Add New Project <PlusIcon svgColor={"#f0fbff"} />
          </button>
        </div>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primary text-white  ">
            {tableHead.map((item) => (
              <th className="py-[1rem] font-semibold text-start first:pl-[0.5rem]">
                {item}
              </th>
            ))}
          </thead>
          <tbody className="">
            {tableData.map((item) => (
              <tr className=" last:border-none  ">
                <td className="py-[1rem] pl-[0.5rem]">{item.projectName}</td>
                <td className="py-[1rem]">{item.clientName}</td>
                <td className="py-[1rem]">{item.startDate}</td>
                <td className="py-[1rem]">
                  {item.endDate ? item.endDate : "-"}
                </td>
                <td className="py-[1rem] ">{item.status}</td>
                <td>
                  <div className="flex gap-[0.7rem]">
                    <button className="p-[5px] rounded-md bg-viewBackground">
                      <EyeIcon />
                    </button>
                    <button className="p-[5px] rounded-md bg-editBackground">
                      <EditIcon />
                    </button>
                    <button className="p-[5px] rounded-md bg-deleteBackground">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-[1rem] flex items-center justify-end">
        <Pagination />
      </div>
    </section>
  );
};

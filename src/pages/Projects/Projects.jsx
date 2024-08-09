import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { ProjectsSvg } from "../../assets/icons/SvgIcons";
import { DoughnutChart } from "../../components";

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
    </section>
  );
};

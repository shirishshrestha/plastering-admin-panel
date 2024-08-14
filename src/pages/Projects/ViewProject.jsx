import { useParams } from "react-router-dom";
import { Document, Download, Folder } from "../../assets/icons/SvgIcons";

const ViewProject = () => {
  const { id } = useParams();

  const files = [
    {
      fileName: "Plastering.pdf",
      id: 1,
    },
    {
      fileName: "Electrical.pdf",
      id: 2,
    },
    {
      fileName: "cement.pdf",
      id: 3,
    },
  ];

  const projectDetails = {
    assignedEstimator: "John Doe",
    dateSubmitted: "2024-08-15",
    dateStarted: "2024-08-16",
    lastModified: "2024-08-18",
    dateCompleted: "2024-08-20",
    duration: "72 hours",
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      <h2 className="font-bold text-[1.2rem]">
        Project Name -{" "}
        <span className="font-semibold text-[14px]">Address</span>
      </h2>
      <div className="mt-[1rem] flex flex-col gap-[1rem] text-[14px]">
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.1rem] text-[1rem]">
            Provided Additional Requirements:
          </p>
          <div
            className="list-disc font-[500] focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none"
            contentEditable
            spellCheck="false"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            quibusdam quidem doloremque quas quo praesentium corrupti, dolore
            voluptatum quod obcaecati distinctio vel sit! Similique architecto
            dolor nulla cum accusamus quam?
          </div>
        </div>
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.5rem] text-[1rem]">
            Uploaded Files:
          </p>
          <div className="flex justify-evenly items-center flex-wrap">
            {files.map((file) => (
              <div key={file.id} className="flex gap-[0.5rem] items-center">
                <Document />
                <p className="font-[500]">{file.fileName}</p>
                <button
                  type="button"
                  className="flex items-center text-[12px] font-[500] gap-[0.2rem] pl-[0.5rem]"
                >
                  <Download /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem] hover:text-light hover:bg-primary hover:border-primary cursor-pointer transition-all ease-in-out duration-300 font-[500] text-[1rem] text-center ">
          Estimator Uploaded Files
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start gap-[0.5rem] w-[70%]">
              <button className="button w-full justify-center">
                Accept Submission
              </button>
              <button className="button w-full justify-center">
                Download Project
              </button>
              <button className="button w-full justify-center">
                Request Cancellation
              </button>
              <button className="button w-full justify-center">
                Request Revision
              </button>
              <button className="button w-full justify-center">
                Send Email
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="p-[1rem] border-[2px] border-gray-300 w-[60%] h-fit rounded-lg ">
              <table className="text-start w-full">
                <tr>
                  <th className="text-start py-[5px] ">Assigned Estimator: </th>
                  <td className="font-[500]">
                    {projectDetails.assignedEstimator}
                  </td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Submitted Date: </th>
                  <td className="font-[500]">{projectDetails.dateSubmitted}</td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Started Date: </th>
                  <td className="font-[500]">{projectDetails.dateStarted}</td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Last Modified: </th>
                  <td className="font-[500]">{projectDetails.lastModified}</td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Completed Date: </th>
                  <td className="font-[500]">{projectDetails.dateCompleted}</td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Duration:</th>
                  <td className="font-[500]">{projectDetails.duration}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProject;

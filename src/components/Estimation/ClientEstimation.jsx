import { Document, Download } from "../../assets/icons/SvgIcons";

const ClientEstimation = ({ setClientFlag }) => {
  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-primary/80">
      <div className="w-[60%] bg-light rounded-lg shadow-lg relative p-[2rem] max-h-[75%] overflow-y-scroll admin__estimator ">
        <h2 className="text-center font-bold text-[1.2rem] border-[1.5px] border-primary rounded-lg py-[0.5rem]">
          Uploaded Estimation Details
        </h2>
        <div className="mt-[1rem] flex flex-col gap-[1rem] text-[14px]">
          <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
            <p className="font-semibold mb-[0.1rem] text-[1rem]">
              Estimation Notes:
            </p>
            <div
              className="list-disc font-[500] focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none"
              // contentEditable
              spellCheck="false"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              similique aut laudantium nihil necessitatibus, pariatur id
              accusamus ducimus iure, veritatis nisi nam at amet iusto
              reprehenderit temporibus fugiat voluptas nobis.
            </div>
          </div>
          <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
            <p className="font-semibold mb-[0.5rem] text-[1rem]">
              Project Parts:
            </p>
            <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
              {/* {projectPart?.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-[1px] border-gray-300 rounded-lg p-[0.5rem]"
                  >
                    <div>
                      <p className="font-[600]">{part.project_part}</p>
                      <div className="flex justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {Array.from(part.project_part_file).map(
                          (file, fileIndex) => (
                            <div className="flex gap-[0.5rem] items-center">
                              <Document />
                              <p key={fileIndex} className="font-[500]">
                                {file.name}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="bg-deleteBackground rounded-lg px-[5px] py-[5px] text-light"
                      onClick={() =>
                        setProjectPart(
                          projectPart.filter((partDelete, i) => i !== index)
                        )
                      }
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))} */}
              <div className="flex gap-[1rem] flex-col">
                <div>
                  <p className="font-[600] mb-[0.5rem]">Project Part 1</p>
                  <div className="flex  items-center flex-wrap gap-x-7 gap-y-2">
                    <div className="flex gap-[0.5rem] items-center">
                      <Document />
                      <p className="font-[500]">File Name 1</p>

                      <button
                        type="button"
                        className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                      >
                        <Download />
                        Download
                      </button>
                    </div>
                    <div className="flex gap-[0.5rem] items-center">
                      <Document />
                      <p className="font-[500]">File Name 2</p>

                      <button
                        type="button"
                        className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                      >
                        <Download />
                        Download
                      </button>
                    </div>
                    <div className="flex gap-[0.5rem] items-center">
                      <Document />
                      <p className="font-[500]">File Name 3</p>

                      <button
                        type="button"
                        className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                      >
                        <Download />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-[600] mb-[0.5rem]">Project Part 2</p>
                  <div className="flex items-center flex-wrap gap-x-7 gap-y-2">
                    <div className="flex gap-[0.5rem] items-center">
                      <Document />
                      <p className="font-[500]">File Name 1</p>

                      <button
                        type="button"
                        className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                      >
                        <Download />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end items-center mt-[1rem]">
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
            type="button"
            onClick={() => setClientFlag(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientEstimation;

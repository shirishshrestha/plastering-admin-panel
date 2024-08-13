import { toast } from "react-toastify";

const Msg = ({ Message, title }) => (
  <div className="toastBody">
    <h4 className="font-semibold ">{title}</h4>
    <p className="font-[500] text-[14px]">{Message}</p>
  </div>
);
const Success = "Success";
const Error = "Error";
const deleted = "Deleted";

export function notifySuccess(successMessage) {
  toast.success(<Msg Message={successMessage} title={Success} />, {
    position: "bottom-right",
    className: "success-bar",
  });
}

export function notifyDelete(deleteMessage) {
  toast.success(<Msg Message={deleteMessage} title={deleted} />, {
    position: "bottom-right",
    className: "success-bar",
  });
}

export function notifyError(errorMessage) {
  toast.error(<Msg Message={errorMessage} title={Error} />, {
    position: "bottom-right",
    className: "error-bar",
  });
}

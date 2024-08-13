import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * CustomToastContainer component responsible for rendering a customized toast container.
 * @returns {JSX.Element} JSX element representing the CustomToastContainer component.
 */
const CustomToastContainer = () => {
  return (
    <ReactToastContainer
      position="bottom-right"
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      stacked
    />
  );
};

export default CustomToastContainer;

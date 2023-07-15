import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (text, type) => {
  toast[type](
    `${text}`,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );
};

export default Toast;

import APIClient from "../api";
import { POST_FAILED_MSG, POST_SUCCESS_MSG } from "../util/constant";
import { validateSchema } from "../validations";

const publish = async (data, setErrors, setToast, setProgress, onSuccess) => {
  setProgress(10);
  const err = await validateSchema(data);
  setErrors({});
  if (err.length == 0) {
    const res = await APIClient.postData(data, setProgress);
    if (res) {
      setProgress(100);
      onSuccess();
      setToast({ show: true, type: "success", message: POST_SUCCESS_MSG });
    } else {
      setProgress(100);
      setToast({
        show: true,
        type: "danger",
        message: POST_FAILED_MSG,
      });
    }
  } else {
    setToast({ show: true, type: "danger", message: "Check your entry!" });
    err.forEach((error) => {
      setErrors((old) => ({ ...old, [error.path[0]]: error.message }));
    });
  }
};

const FormController = { publish };

export default FormController;

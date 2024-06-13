import axios, { AxiosError } from "axios";
import { CatchAsyncErrorsType } from "../types/FunctionTypes";
import { userNotExist } from "../reduxToolkit/slices/userSlice";
import { showToast } from "./toast";

export const catchErrorFunction: CatchAsyncErrorsType = (
  error,
  dispatch,
  toast
) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    console.error("Axios Error:", axiosError.message);
    console.error("Axios Response Data:", axiosError.response?.data);

    if (dispatch) {
      dispatch(userNotExist());
    }

    if (toast) {
      showToast(toast, error.response?.data.message, "error");
    }
  } else {
    console.error("Non-Axios Error:", error);
  }
};

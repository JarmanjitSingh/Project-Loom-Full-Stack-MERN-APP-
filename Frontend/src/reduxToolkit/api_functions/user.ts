import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TaskType } from "../../components/TaskModal";
import {
  LoginWithEmailPasswordType,
  LoginWithGoogleType,
  NewGroupType,
  NewProjectDataType,
  NewUserRequestBody,
} from "../../types/RequestBodyTypes";
import { catchErrorFunction } from "../../utils/utils";
import {
  tasklistData,
  tasklistDataNotFound,
  tasklistLoadingTrue,
} from "../slices/tasklistSlice";
import { userExist } from "../slices/userSlice";
import { TasklistFormData } from "../../components/TasklistModal";

const server = import.meta.env.VITE_SERVER;

export const LoginWithGoogleApi = async (
  formData: LoginWithGoogleType,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.post(`${server}/user/login/google`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

export const EmailPasswordLoginApi = async (
  formData: LoginWithEmailPasswordType,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.post(
      `${server}/user/login/password`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    catchErrorFunction(error, undefined, toast);
  }
};

export const LogoutUser = async () => {
  try {
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    catchErrorFunction(error);
  }
};

export const RegisterUserLoginApi = async (
  formData: NewUserRequestBody,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

export const addNewGroup = async (
  formData: NewGroupType,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    const { data } = await axios.post(`${server}/group/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    GetMyProfile(dispatch);
    return data;
  } catch (error) {
    catchErrorFunction(error);
  }
};

export const GetMyProfile = async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const { data } = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });

    console.log("data", data);
    dispatch(userExist(data.user));
  } catch (error) {
    catchErrorFunction(error, dispatch);
  }
};

export const CreateNewProject = async (
  formData: NewProjectDataType,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    const { data } = await axios.post(`${server}/project/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    GetMyProfile(dispatch);
    return data;
  } catch (error) {
    catchErrorFunction(error);
  }
};

export const GetProjectTasklists = async (
  projectId: string,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    const { data } = await axios.post(
      `${server}/tasklist/all`,
      { projectId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(tasklistData(data.tasklist));

    return data;
  } catch (error) {
    dispatch(tasklistDataNotFound());

    catchErrorFunction(error);
  }
};

export const createTask = async (
  formData: TaskType,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(tasklistLoadingTrue());
    const { data } = await axios.post(`${server}/task/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

export const createTasklist = async (
  formData: TasklistFormData,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.post(`${server}/tasklist/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

export const forgetPassword = async (
  email: string,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.post(
      `${server}/user/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

export const resetPassword = async (
  password: string,
  token: string,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  try {
    const { data } = await axios.put(
      `${server}/user/resetpassword/${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    catchErrorFunction(error, null, toast);
  }
};

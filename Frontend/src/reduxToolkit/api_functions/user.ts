import axios, { AxiosError } from "axios";

const server = import.meta.env.VITE_SERVER;

type LoginWithGoogleType = {
  email: string;
  googleUID: string;
};

type LoginWithEmailPasswordType = {
  email: string;
  password: string;
};

type NewUserRequestBody = {
  name?: string;
  email: string;
  photoURL?: string;
  googleUID?: string;
  password?: string;
};

export const LoginWithGoogleApi = async (formData: LoginWithGoogleType) => {
  try {
    const { data } = await axios.post(`${server}/user/login/google`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.message);
      console.error("Axios Response Data:", axiosError.response?.data);
    } else {
      console.error("Non-Axios Error:", error);
    }
    console.log("loginWithGoogleError", error?.response?.data?.message);
  }
};

export const EmailPasswordLoginApi = async (
  formData: LoginWithEmailPasswordType
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
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.message);
      console.error("Axios Response Data:", axiosError.response?.data);
    } else {
      console.error("Non-Axios Error:", error);
    }
  }
};

export const LogoutUser = async () => {
  try {
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.message);
      console.error("Axios Response Data:", axiosError.response?.data);
    } else {
      console.error("Non-Axios Error:", error);
    }
  }
};

export const RegisterUserLoginApi = async (formData: NewUserRequestBody) => {
  try {
    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.message);
      console.error("Axios Response Data:", axiosError.response?.data);
    } else {
      console.error("Non-Axios Error:", error);
    }
  }
};

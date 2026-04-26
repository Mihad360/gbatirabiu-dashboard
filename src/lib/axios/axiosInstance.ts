import { TResponse } from "@/types/common.types";
import { getFromLocalStorage } from "@/utils/token/localstorage";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getFromLocalStorage("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      // or: `Bearer ${accessToken}` if backend expects it
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  function (response) {
    const responseObject: TResponse = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    // console.log(response);
    return responseObject;
  },
  async function (error) {
    console.log(error);
    // const config = error?.config;
    const responseError = {
      statusCode: error.response?.status,
      message: error.response?.data?.message || "Something went wrong",
      errorMessages: error.response?.data?.message,
    };

    return Promise.reject({
      response: {
        status: error.response?.status,
        data: responseError,
      },
    });
  }
);

export { axiosInstance };

import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: ,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log({ error });
    if (error?.response?.data) {
      throw error?.response?.data;
    }
    throw error;
  }
);

export default axiosClient;

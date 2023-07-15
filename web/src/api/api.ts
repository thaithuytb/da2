import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create(
    {
        baseURL: process.env.SERVER_URL_API || 'http://192.168.0.105:5005/api/v1',
        headers: {
            "Content-Type": "application/json",
        },
          paramsSerializer: (params) => queryString.stringify(params),
    }
)

axiosClient.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
        console.log({error})
      if(error?.response?.data) {
        throw error?.response?.data
      }
      throw error;
    }
  );

export default axiosClient  
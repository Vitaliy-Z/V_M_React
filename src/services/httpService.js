import axios from "axios";
import { toast } from "react-toastify";
import { updateObjToArr } from "../utils/helperFunctions";
import { apiEndpoint, isFireBase } from "./config.json";

const httpClient = axios.create({
  baseURL: apiEndpoint
});

httpClient.interceptors.request.use(
  config => {
    if (isFireBase) {
      config.url =
        (/\/$/gi.test(config.url) ? config.url.slice(0, -1) : config.url) +
        ".json";
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  res => {
    if (isFireBase) {
      res.data = res.data ? updateObjToArr(res.data) : [];
    }
    return res;
  },
  error => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Somthing was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: httpClient.get,
  post: httpClient.post,
  put: httpClient.put,
  delete: httpClient.delete
};
export default httpService;

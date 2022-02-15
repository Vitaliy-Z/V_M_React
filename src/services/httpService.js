import axios from "axios";
import { toast } from "react-toastify";
import { updateObjToArr } from "../utils/helperFunctions";
import { apiEndpoint, isFireBase } from "./config.json";

axios.defaults.baseURL = apiEndpoint;

axios.interceptors.request.use(
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
axios.interceptors.response.use(
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default httpService;

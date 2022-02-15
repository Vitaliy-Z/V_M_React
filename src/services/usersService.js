import httpService from "./httpService";
import { userEndpoint } from "./config.json";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  }
};

export default userService;

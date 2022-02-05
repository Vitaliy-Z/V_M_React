import httpService from "./httpService";
import { professionEndpoint } from "./config.json";

const professionsService = {
  get: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return data?.content;
  }
};

export default professionsService;

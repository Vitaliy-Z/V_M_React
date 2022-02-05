import httpService from "./httpService";
import { qualityEndpoint } from "./config.json";

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data?.content;
  }
};

export default qualityService;

import axios from "axios";

const appkey = "xiefenga_1610684528812";

// const instance = axios.create({
//   baseURL: "https://mallapi.duyiedu.com/"
// });

const instance = axios.create();

instance.interceptors.request.use(config => {
  if (!config.url.startsWith("/passport")) {
    return {
      ...config,
      params: {
        ...config.params,
        appkey
      }
    };
  }
  return config;
});

instance.interceptors.response.use(resp => {
  return resp.data;
});

export default instance;

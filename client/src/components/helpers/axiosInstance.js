import axios from "axios";
import { urlApi } from "./Helpers";
//redux

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: urlApi(),
});

const refToken = async () => {
  return await axios.get(urlApi() + "/token/refreshToken", {
    withCredentials: true,
  });
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = await refToken();
  console.log(token);
  config.params = config.params || {};
  // config.params["auth"] = "Auth_Code";
  config.headers.Authorization = `Bearer ${token.data.token}`;

  return config;
});

export default axiosInstance;

import axios from "axios";
import apiConfig from "./apiConfig";

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "content-type": "application/json",
  },
});
const instance2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

const get = async (path: string, param = {}) => {
  const res = await instance.get(path, {
    params: { api_key: apiConfig.apiKey, ...param },
  });
  return res.data;
};

const postUser = async (path: string, data: object, config: any = {}) => {
  const res = await instance2.post(path, data, config);
  return res.data;
};

export { get, postUser };

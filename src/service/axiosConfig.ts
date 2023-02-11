import axios from "axios";
import apiConfig from "./apiConfig";

const distance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "content-type": "application/json",
  },
});
export const distance2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

const get = async (path: string, param = {}) => {
  const res = await distance.get(path, {
    params: { api_key: apiConfig.apiKey, ...param },
  });
  return res.data;
};
const getUser = async (path: string, config: any = {}) => {
  const res = await distance2.get(
    `${process.env.REACT_APP_API_URL}/${path}`,
    config
  );
  return res.data;
};
const postUser = async (path: string, data: object, config: any = {}) => {
  const res = await distance2.post(
    `${process.env.REACT_APP_API_URL}/${path}`,
    data,
    config
  );
  return res.data;
};

export { get, getUser, postUser };
export default distance;

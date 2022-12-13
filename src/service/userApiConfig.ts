import { postUser, getUser } from "./axiosConfig";

const userApi = {
  getUserData: async (path: string, data = {}) => {
    return getUser(path);
  },
  postLogin: async (path: string, data: object = {}) => {
    return postUser(path, data, { withCredentials: true });
  },
  getHistory: async (path: string, data: object = {}) => {
    return postUser(path, data);
  },

  postHistory: async (path: string, data: object = {}) => {
    return postUser(path, data);
  },
  deleteHistory: async (path: string, data = {}) => {
    return postUser(path, data);
  },
  getBookmark: async (path: string, data: object = {}) => {
    return postUser(path, data);
  },

  postBookmark: async (path: string, data = {}) => {
    return postUser(path, data);
  },
  deleteBookmark: async (path: string, data = {}) => {
    return postUser(path, data);
  },
  getComment: async (path: string, data: object = {}) => {
    return postUser(path, data);
  },

  postComment: async (path: string, data = {}) => {
    return postUser(path, data);
  },
  deleteComment: async (path: string, data = {}) => {
    return postUser(path, data);
  },
  saveReaction: async (path: string, data = {}) => {
    return postUser(path, data);
  },
};
export default userApi;

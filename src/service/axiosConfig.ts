import axios from "axios";
import apiConfig from "./apiConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import jwt_decode from "jwt-decode";
const distance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "content-type": "application/json",
  },
});
const distance2 = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "content-type": "application/json",
  },
});
export const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;

  if (currentUser) return currentUser.getIdToken();
  // Not logged in
  // const hasRememberedAccount = localStorage.getItem("user");
  // if (!hasRememberedAccount) return null;
  // Logged in but current user is not fetched --> wait (10s)
  else {
    return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
        reject(null);
        console.log("Reject timeout");
      }, 10000);

      const unregisterAuthObserver = firebase
        .auth()
        .onAuthStateChanged(async (user) => {
          if (!user) {
            resolve(null);
          } else {
            console.log(user);

            const token = await user.getIdToken();
            resolve(token);
          }

          unregisterAuthObserver();
          clearTimeout(waitTimer);
        });
    });
  }
};
export const getUserToken = async (user: any) => {
  try {
    let date = new Date();
    if (user) {
      let decodeToken: any = jwt_decode(user?.accessToken);

      if (decodeToken) {
        return user?.accessToken;
      }
      if (decodeToken.exp < date.getTime() / 1000) {
        const res = await distance2.post("/refreshtoken");
        console.log(res);
        return res.data.accessToken;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
const get = async (path: string, param = {}) => {
  const res = await distance.get(path, {
    params: { api_key: apiConfig.apiKey, ...param },
  });

  return res.data;
};
const getUser = async (path: any, config: any = {}) => {
  const res = await distance2.get(`/${path}`, config);
  return res.data;
};
const postUser = async (path: any, data: any, config: any = {}) => {
  const res = await distance2.post(`/${path}`, data, config);
  return res.data;
};

export { get, getUser, postUser };
export default distance;

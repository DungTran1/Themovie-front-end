import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import userApi from "../service/userApiConfig";

const FireBaseUser = async () => {
  const currentUser: any = firebase.auth().currentUser;
  await userApi.postLogin("login", {
    name: currentUser.displayName,
    password: "email",
    photoUrl: currentUser.photoURL,
  });
  return {
    id: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    photoUrl: currentUser.photoURL,
  };
};
interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  accessToken: string;
}
export const getLoginUser: any = createAsyncThunk(
  "getUserLogin/api",
  async (payload: User) => {
    return {
      id: payload._id,
      name: payload.name,
      email: payload.email,
      photoUrl: payload.photoUrl || "",
      accessToken: payload.accessToken,
    };
  }
);
export const getLoginFireBaseUser: any = createAsyncThunk(
  "getUser/Api",
  async (payload, thunkApi) => {
    return FireBaseUser();
  }
);
export const logOut: any = createAsyncThunk("logOut/Api", async () => {
  return;
});

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { current: null, loading: false, error: "" },
  reducers: {},
  extraReducers: {
    [getLoginFireBaseUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getLoginUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [logOut.fulfilled]: (state, action) => {
      state.current = null;
    },
  },
});
const { reducer } = currentUserSlice;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import "firebase/compat/auth";
import { User } from "../shared/types";

interface Auth {
  current: User | null;
}
const initialState: Auth = {
  current: null,
};
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    getLoginUser: (state, action) => {
      state.current = {
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: false,
        uid: action.payload.uid,
        photoURL: action.payload.photoURL || "",
        accessToken: action.payload.accessToken,
      };
    },
    logOut: (state) => {
      state.current = null;
    },
    changeDisplayName: (state, action) => {
      (state.current as User).displayName = action.payload;
    },
    changeEmailName: (state, action) => {
      (state.current as User).email = action.payload;
    },
    uploadProfile: (state, action) => {
      (state.current as User).photoURL = action.payload;
    },
  },
});
const { reducer, actions } = currentUserSlice;
export const {
  getLoginUser,
  logOut,
  uploadProfile,
  changeDisplayName,
  changeEmailName,
} = actions;

export default reducer;

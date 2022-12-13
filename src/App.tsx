import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { publicRoutes } from "./routers/index";
import DefaultLayout from "./Layout/DefaultLayout";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { useDispatch, useSelector } from "react-redux";
import { getLoginFireBaseUser } from "./reducer/currentUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import distance, {
  getFirebaseToken,
  getUserToken,
} from "./service/axiosConfig";

import { RootState } from "./app/index";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyA6fq-Z_ojYnnKLsUaI0PMpCVUtpLfiI7w",
  authDomain: "the-movie-83586.firebaseapp.com",
  databaseURL: "https://the-movie-83586-default-rtdb.firebaseio.com",
  projectId: "the-movie-83586",
  storageBucket: "the-movie-83586.appspot.com",
  messagingSenderId: "318157713215",
  appId: "1:318157713215:web:f1f3d856d529a57ba42d8a",
  measurementId: "G-3HTZ3DJSZT",
  // ...
};
firebase.initializeApp(config);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("not logged");
          if (!localStorage.getItem("user")) localStorage.removeItem("user");

          return;
        } else {
          localStorage.setItem("user", "success");
          const result = dispatch(getLoginFireBaseUser());
          const unwrap = unwrapResult(result);
          console.log("unwrap", unwrap);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useSelector(
    (state: RootState) => state.currentUserReducer.current
  );

  distance.interceptors.request.use(async (config: any) => {
    let userToken: string = (await getFirebaseToken()) as string;
    if (!userToken) {
      userToken = await getUserToken(user);
    }
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  });
  return (
    <Router>
      <Routes>
        {publicRoutes.map((itm, idx) => {
          let Element = itm.component;
          let Layout = DefaultLayout;
          if (itm.layout === null) {
            Layout = Fragment;
          } else if (itm.layout) {
            Layout = itm["layout"];
          }
          return (
            <Route
              key={idx}
              path={itm.path}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;

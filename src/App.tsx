import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import "firebase/compat/auth";

import { getLoginUser } from "./reducer/currentUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import { auth } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./store/hooks";
import AuthProtect from "./components/Common/AuthProtect";
import Profile from "./pages/Profile/Profile";
import Bookmark from "./pages/Bookmark/Bookmark";
import Search from "./pages/Search/Search";
import Discover from "./pages/Discover/Discover";
import MovieWatch from "./pages/Movie/MovieWatch";
import TVInfo from "./pages/TV/TVInfo";
import Home from "./pages/Home";
import MovieInfo from "./pages/Movie/MovieInfo";
import TVWatch from "./pages/TV/TVWatch";
import Login from "./pages/Login";
import History from "./pages/History/History";
import NotFound from "./pages/NotFound/NotFound";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
  const dispatch = useAppDispatch();
  console.log(process.env);
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("not logged");
        return;
      } else {
        const result = dispatch(getLoginUser(user));
        const unwrap = unwrapResult(result);
        console.log("unwrap", unwrap);
        // }
      }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="movie/:id"
          element={
            <DefaultLayout>
              <MovieInfo />
            </DefaultLayout>
          }
        />
        <Route
          path="tv/:id"
          element={
            <DefaultLayout>
              <TVInfo />
            </DefaultLayout>
          }
        />
        <Route
          path="movie/:id/watch"
          element={
            <DefaultLayout>
              <MovieWatch />
            </DefaultLayout>
          }
        />
        <Route
          path="tv/:id/watch"
          element={
            <DefaultLayout>
              <TVWatch />
            </DefaultLayout>
          }
        />
        <Route
          path="discover"
          element={
            <DefaultLayout>
              <Discover />
            </DefaultLayout>
          }
        />
        <Route
          path="search"
          element={
            <DefaultLayout>
              <Search />
            </DefaultLayout>
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="bookmark"
          element={
            <DefaultLayout>
              <AuthProtect>
                <Bookmark />
              </AuthProtect>
            </DefaultLayout>
          }
        />
        <Route
          path="history"
          element={
            <DefaultLayout>
              <AuthProtect>
                <History />
              </AuthProtect>
            </DefaultLayout>
          }
        />
        <Route
          path="profile"
          element={
            <DefaultLayout>
              <AuthProtect>
                <Profile />
              </AuthProtect>
            </DefaultLayout>
          }
        />
        <Route
          path="*"
          element={
            <DefaultLayout>
              <NotFound />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

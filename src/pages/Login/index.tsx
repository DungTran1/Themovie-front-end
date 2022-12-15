import { useState } from "react";
import { useForm } from "react-hook-form";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import SignUp from "./SignUp";
import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import userApi from "../../service/userApiConfig";

import { useDispatch, useSelector } from "react-redux";
import { getLoginUser } from "../../reducer/currentUserSlice";

import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../app/index";
const cx = classnames.bind(styles);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  //
};

interface IFormInput {
  name: string;
  password: string;
  email: string;
  example: string;
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.currentUserReducer.current
  );
  console.log(user);
  const [changeTab, setChangeTab] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    try {
      const post = await userApi.postLogin("/login", {
        name: data.name,
        password: data.password,
      });
      const win: Window = window;
      if (post) {
        console.log(post);
        dispatch(getLoginUser(post));
        navigate("/");
      } else win.alert(post);
    } catch (error) {
      console.log(error);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  return (
    <>
      {(user && <Navigate to="/" />) || (
        <div className={cx("wrapper")}>
          <div className={cx("container")}>
            <div className={cx("content")}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
              <div className={cx("changeForm-btn")}>
                <button onClick={() => setChangeTab(!changeTab)}>
                  SIGN IN
                </button>
                <button onClick={() => setChangeTab(!changeTab)}>
                  SIGN UP
                </button>
              </div>
              {(changeTab && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>First Name</label>
                  <input
                    {...register("name", {
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.name?.type === "required" && (
                    <p>This field is required</p>
                  )}
                  {errors?.name?.type === "maxLength" && (
                    <p>First name cannot exceed 20 characters</p>
                  )}
                  {errors?.name?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                  <input
                    // type="password"
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  {errors?.password?.type === "minLength" && (
                    <p>{errors.password.message}</p>
                  )}

                  <input type="submit" />
                </form>
              )) || <SignUp />}
            </div>
          </div>
          <div className={cx("overlay")}></div>
        </div>
      )}
    </>
  );
}

export default Login;

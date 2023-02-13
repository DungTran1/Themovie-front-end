import { useForm, SubmitHandler } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../shared/firebase";
import { getRandomAvatar, toastMessage } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../service/axiosConfig";
import { getLoginUser } from "../../reducer/currentUserSlice";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";

const cx = classnames.bind(styles);
interface IFormInput {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

function SignUp({ setChangeTab }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      setIsLoading(true);
      if (
        !data.email.trim() ||
        !data.password.trim() ||
        !data.firstname.trim() ||
        !data.lastname.trim()
      ) {
        return toastMessage("error", "You must enter all information! ");
      }
      const user = (
        await createUserWithEmailAndPassword(auth, data.email, data.password)
      ).user;
      if (user) {
        updateProfile(user, {
          photoURL: getRandomAvatar(),
          displayName: `${data.firstname} ${data.lastname}`,
        })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        signInWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            postUser("auth/signup", {
              uid: userCredential.user.uid,
              photoURL: getRandomAvatar(),
              displayName: `${data.firstname} ${data.lastname}`,
            }).then((e) => dispatch(getLoginUser(userCredential.user)));
          })
          .then(() => navigate(-1))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error: any) {}
  };
  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("fullname")}>
          <div className={cx("firstname")}>
            <input
              placeholder="First Name"
              {...register("firstname", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <CgProfile size={30} />
          </div>
          {errors?.firstname?.type === "required" && (
            <p>This field is required</p>
          )}
          {errors?.firstname?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.firstname?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <div className={cx("lastname")}>
            <input
              placeholder="Last Name"
              {...register("lastname", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <CgProfile size={30} />
          </div>
          {errors?.lastname?.type === "required" && (
            <p>This field is required</p>
          )}
          {errors?.lastname?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.lastname?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
        </div>
        <div className={cx("email")}>
          <input
            placeholder="Email"
            {...register("email", {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <AiOutlineMail size={20} />
        </div>
        {errors.email && <p>Email is invalid</p>}
        <div className={cx("password")}>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          <RiLockPasswordLine size={20} />
        </div>
        {errors?.password?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}

        <div className={cx("submit")}>
          <input type="submit" value="REGISTER" />
        </div>
      </form>
      <div className={cx("change-tab__form")}>
        <span>Already a member?</span>
        <button onClick={() => setChangeTab((prev: any) => !prev)}>
          SIGN IN
        </button>
      </div>
    </>
  );
}

export default SignUp;

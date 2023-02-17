import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppSelector } from "../../store/hooks";
import { convertErrorCodeToMessage, toastMessage } from "../../shared/utils";
import { auth } from "../../shared/firebase";

import { signInWithProvider } from "../../components/Auth/SignInWithProvider";
import ModalNotification from "./ModalNotification";
import Loading from "../../components/Loading/Loading";

import classnames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classnames.bind(styles);

interface IFormInput {
  email: string;
  password: string;
}
const SignIn = ({ setChangeTab }: any) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.current);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    if (!data.email.trim() || !data.password.trim()) {
      return toastMessage("error", "You must enter all information! ");
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => navigate(-1))
      .catch((error) => {
        console.log(error);
        setError(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {currentUser && (
        <ModalNotification type="success" message={"Sign in successfully"} />
      )}
      {isLoading && <Loading />}
      {error && (
        <ModalNotification type="error" message={error} setError={setError} />
      )}
      <div className={cx("firebaseProvider")}>
        <button
          onClick={() => {
            return signInWithProvider(new GoogleAuthProvider(), "google");
          }}
        >
          <FcGoogle size={30} className="text-primary" />
        </button>
        <button
          onClick={() =>
            signInWithProvider(new FacebookAuthProvider(), "facebook")
          }
        >
          <FaFacebookF size={30} className="text-primary" color="#3498db" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
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
        {errors?.password?.type === "minLength" && (
          <p>{errors.password.message}</p>
        )}
        <div className={cx("submit")}>
          <input type="submit" value="SIGN IN" />
        </div>
      </form>
      <div className={cx("change-tab__form")}>
        <span>Not a member?</span>
        <button onClick={() => setChangeTab((prev: any) => !prev)}>
          SIGN UP
        </button>
      </div>
    </>
  );
};

export default SignIn;

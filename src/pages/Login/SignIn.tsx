import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { signInWithProvider } from "../../components/Auth/SignInWithProvider";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppSelector } from "../../store/hooks";
import { convertErrorCodeToMessage } from "../../shared/utils";
import { auth } from "../../shared/firebase";
import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import ModalNotification from "./ModalNotification";
import Loading from "../../components/Loading/Loading";

const cx = classnames.bind(styles);

interface IFormInput {
  email: string;
  password: string;
}
const SignIn = ({ setChangeTab }: any) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.current);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    if (!data.email.trim() || !data.password.trim()) return;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {})
      .catch((error) => {
        console.log(error);
        setError(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsLoading(false));
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
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
        {errors.email && <p>wrong email form</p>}
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

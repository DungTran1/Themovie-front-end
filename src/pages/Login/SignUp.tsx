import { useForm, SubmitHandler } from "react-hook-form";
import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import { distance2 } from "../../service/axiosConfig";
import { getLoginUser } from "../../reducer/currentUserSlice";
import { useDispatch } from "react-redux";

const cx = classnames.bind(styles);
interface IFormInput {
  name: string;
  password: string;
  email: string;
  example: string;
}

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    const post = await distance2.post("/login/signup", {
      name: data.name,
      password: data.password,
      email: data.email,
    });
    const win: Window = window;
    if (post.data.path === "/") {
      dispatch(getLoginUser(post.data.user));
      win.location = "/";
    } else win.alert(`${post.data.path}`);
  }; // your form submit function which will invoke after successful validation
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        {...register("name", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors?.name?.type === "required" && <p>This field is required</p>}
      {errors?.name?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )}
      {errors?.name?.type === "pattern" && <p>Alphabetical characters only</p>}
      <label>Password</label>
      <input {...register("password", { pattern: /^[A-Za-z]+$/i })} />
      {errors?.password?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label>email</label>
      <input
        {...register("email", {
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors.email && <p>wrong email form</p>}
      <input type="submit" />
    </form>
  );
}

export default SignUp;

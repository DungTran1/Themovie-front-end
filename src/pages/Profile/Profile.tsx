import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/index";
import { Button } from "@mui/material";
const cx = classnames.bind(styles);
const Profile = () => {
  const user = useSelector(
    (state: RootState) => state.currentUserReducer.current
  ) as any;
  return (
    <div className={cx("profile")}>
      <h1>Account Setting</h1>
      <div className={cx("information")}>
        <div className={cx("user__info")}>
          <h4>User Information</h4>
          <p>
            Here you can edit public information about yourself. If you signed
            in with Google or Facebook, you can't change your email and
            password.
          </p>
          <div className={cx("email")}>
            <h4>Email</h4>
            <div>
              <p>lsskt@gmail.com</p>
              <AiOutlineEdit size={25} />
            </div>
          </div>
          <div className={cx("name")}>
            <h4>Name</h4>
            <div>
              <p>Tran Tuan Dung</p>
              <AiOutlineEdit size={25} />
            </div>
          </div>
          <div className={cx("verified")}>
            <h4>Your account is verified</h4>
          </div>
          <div className={cx("change__password")}>
            <h4>Change Password</h4>
            <div>
              <input placeholder="New Password" />
              <button>Update</button>
            </div>
          </div>
          <div className={cx("delete__btn")}>
            <button>Delete Account</button>
          </div>
        </div>
        <div className={cx("profile__photo")}>
          <h4>Profile photo</h4>
          <div>
           <div> <img src={user.photoUrl} alt="" /></div>
            <button>
              <HiOutlineUpload />
              <span>Upload new photo </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

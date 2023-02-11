import { useState } from "react";
import axios from "axios";
import { HiOutlineUpload } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { uploadProfile } from "../../reducer/currentUserSlice";
import { postUser } from "../../service/axiosConfig";
import classnames from "classnames/bind";
import styles from "../../scss/ModuleScss/Profile.module.scss";
import { useAppSelector } from "../../store/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { updateProfile } from "firebase/auth";
import { auth } from "../../shared/firebase";
const cx = classnames.bind(styles);
const ProfileImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const user = useAppSelector((state) => state.auth.current);
  const changeProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const form = new FormData();
      // @ts-ignore
      form.append("image", e.target.files[0]);
      const result = await axios({
        method: "post",
        url: `https://api.imgbb.com/1/upload?key=822bac84fb847823f7696d4c53568f63`,
        data: form,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const photoUrl = result.data.data.display_url;
      if (currentUser) {
        updateProfile(currentUser, {
          photoURL: photoUrl,
        })
          .then(() => {
            dispatch(uploadProfile(photoUrl));
            console.log("success");
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(!user && <Navigate to="/" replace={true} />) || (
        <>
          {isLoading && <Loading />}
          <h4>Profile photo</h4>
          <div>
            <div>
              <img src={user?.photoURL} alt="" />
            </div>
            <label htmlFor="upload-img">
              <HiOutlineUpload color="rgb(81 121 255)" />
              <span>Upload new photo </span>
            </label>
            <input
              id="upload-img"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={changeProfileImage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProfileImage;

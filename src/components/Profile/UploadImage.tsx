import { useState } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";

import { updateProfile } from "firebase/auth";

import { auth } from "../../shared/firebase";

import { useAppSelector } from "../../store/hooks";

import { HiOutlineUpload } from "react-icons/hi";

import { uploadProfile } from "../../reducer/currentUserSlice";

import Loading from "../Loading/Loading";
import { postUser } from "../../service/axiosConfig";

const ProfileImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
      if (result) {
        const photoUrl = result.data.data.display_url;
        if (currentUser) {
          updateProfile(currentUser, {
            photoURL: photoUrl,
          })
            .then(() => {
              postUser("/comment/uploadProfileComment", {
                uid: currentUser.uid,
                photoURL: photoUrl,
              }).then(() => {
                dispatch(uploadProfile(photoUrl));
                setIsLoading(false);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          hidden
          id="upload-img"
          type="file"
          accept="image/*"
          onChange={changeProfileImage}
        />
      </div>
    </>
  );
};

export default ProfileImage;

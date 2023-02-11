import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";

import { auth } from "../../shared/firebase";
import { toast } from "react-toastify";

import { convertErrorCodeToMessage } from "../../shared/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postUser } from "../../service/axiosConfig";

import ProfileImage from "../../components/Profile/UploadImage";
import Name from "../../components/Profile/Name";
import EmailVerification from "../../components/Profile/EmailVerification";
import Password from "../../components/Profile/Password";
import Delete from "../../components/Profile/Delete";
import Email from "../../components/Profile/Email";
import ConfirmPassword from "../../components/Profile/ConfirmPassword";

import classnames from "classnames/bind";
import styles from "../../scss/ModuleScss/Profile.module.scss";
import { getLoginUser, logOut } from "../../reducer/currentUserSlice";
import { useNavigate } from "react-router-dom";
const cx = classnames.bind(styles);
const Profile = () => {
  const navigate = useNavigate();
  const isTabletMobile = useMediaQuery({ query: "(max-width:64em)" });
  const firebaseUser = auth.currentUser;
  const currentUser = useAppSelector((state) => state.auth.current);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowPromptReAuthFor, setIsShowPromptReAuthFor] = useState<
    string | undefined
  >();
  const [isRetypedPassword, setIsRetypedPassword] = useState(false);
  useEffect(() => {
    const clickOutside = (e: any) => {
      setIsRetypedPassword(false);
    };
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  }, []);
  const dispatch = useAppDispatch();
  const oldPasswordValueRef = useRef<HTMLInputElement>(null!);
  const newPasswordValueRef = useRef<HTMLInputElement>(null!);
  const emailValueRef = useRef<HTMLInputElement>(null!);
  const displayNameValueRef = useRef<HTMLInputElement>(null!);
  const reAuthentication = async (type: string) => {
    const oldPassword = oldPasswordValueRef.current.value;
    if (!oldPassword.trim().length) {
      toast.error("You gotta type something", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const credential = EmailAuthProvider.credential(
      // @ts-ignore
      currentUser.email,
      oldPassword
    );

    reauthenticateWithCredential(
      // @ts-ignore
      firebaseUser,
      credential
    )
      .then(() => {
        if (type === "password") {
          changePassword();
        } else if (type === "email") {
          changeEmail();
        } else if (type === "delete") {
          deleteAccount();
        } else if (type === "name") {
          changeName();
        }
      })
      .catch((error) => {
        toast.error(convertErrorCodeToMessage(error.code), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const changeEmail = () => {
    const emailValue = emailValueRef.current.value;

    if (!emailValue.trim().length) {
      toast.error("You gotta type something", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // @ts-ignore
    updateEmail(firebaseUser, emailValue)
      .then(async (credential) => {
        toast.success("Change email successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(getLoginUser({ ...currentUser, email: emailValue }));
      })
      .catch((error: any) => {
        toast.error(convertErrorCodeToMessage(error.code), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setIsRetypedPassword(false);
        setIsUpdatingEmail(false);
      });
  };
  const changeName = async () => {
    const newDisplayName = displayNameValueRef.current.value;

    if (!newDisplayName.trim().length) {
      toast.error("You gotta type something", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const res = await postUser("personal/displayNameChange", {
      uid: firebaseUser?.uid,
      displayName: newDisplayName,
    });
    if (res.changed) {
      toast.success("Change name successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(
        getLoginUser({ ...currentUser, displayName: res.changed.displayName })
      );
      setIsRetypedPassword(false);
      setIsUpdatingName(false);
    } else {
      toast.error("something wrong!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const changePassword = () => {
    const newPassword = newPasswordValueRef.current.value;
    if (!newPassword.trim().length) {
      toast.error("You gotta type something", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // @ts-ignore
    updatePassword(firebaseUser, newPassword)
      .then(async () => {
        toast.success("Change password successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        newPasswordValueRef.current.value = "";
      })
      .catch((error: any) => {
        toast.error(convertErrorCodeToMessage(error.code), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setIsRetypedPassword(false);
        setIsUpdatedPassword(false);
      });
  };

  const deleteAccount = () => {
    // @ts-ignore
    deleteUser(firebaseUser).then(async () => {
      const res = await postUser("personal/deleteAccount", {
        uid: currentUser?.uid,
      });
      if (res) {
        toast.success("Delete successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(logOut());
        navigate("/");
      }
    });
  };

  return (
    <div className={cx("profile")}>
      <h1>ACCOUNT SETTINGS</h1>
      <div className={`${cx("information")} row`}>
        <div className={`${cx("user__info")} l-8 md-12 sm-12`}>
          <h4>User Information</h4>
          <p>Here you can edit public information about yourself.</p>
          <p>
            If you signed in with Google or Facebook, you can't change your
            email and password.
          </p>
          {isTabletMobile && (
            <div className={cx("profile__photo")}>
              <ProfileImage />
            </div>
          )}
          <Email
            isUpdatingEmail={isUpdatingEmail}
            setIsUpdatingEmail={setIsUpdatingEmail}
            setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
            setIsRetypedPassword={setIsRetypedPassword}
            emailValueRef={emailValueRef}
          />
          <Name
            displayNameValueRef={displayNameValueRef}
            isUpdatingName={isUpdatingName}
            setIsUpdatingName={setIsUpdatingName}
            setIsRetypedPassword={setIsRetypedPassword}
            setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
          />
          <EmailVerification />
          <Password
            isUpdatedPassword={isUpdatedPassword}
            setIsUpdatedPassword={setIsUpdatedPassword}
            setIsRetypedPassword={setIsRetypedPassword}
            setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
            newPasswordValueRef={newPasswordValueRef}
          />
          <Delete
            isDeleted={isDeleted}
            setIsDeleted={setIsDeleted}
            setIsRetypedPassword={setIsRetypedPassword}
            setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
          />
        </div>
        {!isTabletMobile && (
          <div className={`${cx("profile__photo")} l-4 md-12 sm-12`}>
            <ProfileImage />
          </div>
        )}
      </div>
      {isRetypedPassword && (
        <ConfirmPassword
          isShowPromptReAuthFor={isShowPromptReAuthFor}
          oldPasswordValueRef={oldPasswordValueRef}
          reAuthentication={reAuthentication}
        />
      )}
    </div>
  );
};

export default Profile;

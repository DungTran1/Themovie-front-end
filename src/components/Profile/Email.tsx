import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import classnames from "classnames/bind";
import styles from "./ProfileComp.module.scss";
const cx = classnames.bind(styles);
interface EmailProps {
  isUpdatingEmail: any;
  setIsUpdatingEmail: any;
  setIsRetypedPassword: any;
  setIsShowPromptReAuthFor: any;
  emailValueRef: any;
}
const Email: React.FC<EmailProps> = ({
  isUpdatingEmail,
  setIsUpdatingEmail,
  setIsRetypedPassword,
  setIsShowPromptReAuthFor,
  emailValueRef,
}) => {
  const currentUser = useAppSelector((state) => state.auth.current);

  return (
    <div className={cx("email")}>
      <h4>Email</h4>
      {!isUpdatingEmail && (
        <div>
          <p>{currentUser?.email}</p>
          <button onClick={() => setIsUpdatingEmail(true)}>
            <AiOutlineEdit size={25} />
          </button>
        </div>
      )}
      {isUpdatingEmail && (
        <>
          <form className="">
            <input
              type="email"
              ref={emailValueRef}
              defaultValue={currentUser?.email || ""}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsUpdatingEmail(false);
              }}
              className=""
            />
            <button
              className=""
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log(emailValueRef.current.value.trim().length);
                if (!emailValueRef.current.value.trim().length) {
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
                setIsRetypedPassword(true);
                setIsShowPromptReAuthFor("email");
              }}
            >
              <BiSend size={25} />
            </button>
          </form>
          <p className="">Press Esc to cancel</p>
        </>
      )}
      {}
    </div>
  );
};

export default React.memo(Email);

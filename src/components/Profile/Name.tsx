import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import classnames from "classnames/bind";
import styles from "./ProfileComp.module.scss";
const cx = classnames.bind(styles);
interface NameProps {
  setIsShowPromptReAuthFor: any;
  setIsRetypedPassword: any;
  isUpdatingName: any;
  setIsUpdatingName: any;
  displayNameValueRef: any;
}
const Name: React.FC<NameProps> = ({
  setIsShowPromptReAuthFor,
  setIsRetypedPassword,
  isUpdatingName,
  setIsUpdatingName,
  displayNameValueRef,
}) => {
  const currentUser = useAppSelector((state) => state.auth.current);

  return (
    <div className={cx("name")}>
      <h4>Name</h4>
      {!isUpdatingName && (
        <div>
          <p>{currentUser?.displayName}</p>

          <button onClick={() => setIsUpdatingName(true)}>
            <AiOutlineEdit size={25} />
          </button>
        </div>
      )}
      {isUpdatingName && (
        <>
          <form className="">
            <input
              type="text"
              ref={displayNameValueRef}
              defaultValue={currentUser?.displayName || ""}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsUpdatingName(false);
              }}
              className=""
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!displayNameValueRef.current.value.trim().length) {
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
                setIsShowPromptReAuthFor("name");
              }}
              className=""
            >
              <BiSend size={25} />
            </button>
          </form>
          <p className="text-sm mt-1">Press Esc to cancel</p>
        </>
      )}
    </div>
  );
};

export default Name;

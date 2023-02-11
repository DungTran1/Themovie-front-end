import { useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { IoSendSharp } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { postUser } from "../../service/axiosConfig";
import { UserComment } from "../../shared/types";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";
import { useAppSelector } from "../../store/hooks";

const cx = classnames.bind(styles);
interface CommentEditContentProps {
  comment: UserComment;
  refetch: any;
}
const CommentEditContent: React.FC<CommentEditContentProps> = ({
  comment,
  refetch,
}) => {
  const user = useAppSelector((state) => state.auth.current);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef() as any;
  const handleEditComment = async (e: any) => {
    const res = await postUser("comment/edit", {
      _id: comment._id,
      content: ref.current.innerText,
    });
    if (res) {
      refetch();
      setIsEditing(false);
    }
  };
  const handleRemoveComent = async () => {
    const res = await postUser("comment/remove", { _id: comment._id });
    if (res) {
      refetch();
    }
  };
  return (
    <>
      {(!isEditing && (
        <>
          <h5>{comment?.displayName}</h5>
          <p>{comment?.content}</p>
        </>
      )) || (
        <div className={cx("edit__content")}>
          <div>
            <div
              suppressContentEditableWarning={true}
              contentEditable
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsEditing(false);
                }
              }}
              ref={ref}
            ></div>
            <span onClick={handleEditComment}>
              <IoSendSharp color="#4fa1ff" size={25} />
            </span>
          </div>
          <p>Esc to remove</p>
        </div>
      )}
      {user?.uid === comment.uid && (
        <div className={cx("hide")}>
          <Tippy
            offset={[0, 0]}
            placement="right"
            interactive
            trigger="click"
            render={(attrs) => {
              return (
                <ul>
                  <li onClick={() => setIsEditing(true)}>Sửa</li>
                  <li onClick={handleRemoveComent}>Xóa</li>
                </ul>
              );
            }}
          >
            <button>
              <FiMoreHorizontal />
            </button>
          </Tippy>
        </div>
      )}
    </>
  );
};

export default CommentEditContent;

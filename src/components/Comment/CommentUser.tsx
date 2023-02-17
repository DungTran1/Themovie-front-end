import React, { useRef, useState } from "react";

import { User, UserComment } from "../../shared/types";
import { postUser } from "../../service/axiosConfig";

import { MdSend } from "react-icons/md";

import CommentContent from "./CommentContent";
import Reply from "./Reply";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";

const cx = classnames.bind(styles);

interface CommentUserProp {
  commentOption?: string;
  data?: UserComment[];
  refetch?: any;
  movieId: number;
  comment: UserComment[];
  className: string;
  numberOfComments: number;
  user: User | null;
}
const CommentUser: React.FC<CommentUserProp> = ({
  commentOption,
  data,
  refetch,
  movieId,
  user,
  comment,
  className,
  numberOfComments,
}) => {
  const inputRef: any = useRef([]);
  const sortComment = comment.sort((a, b) => {
    const createdA = new Date(a.createdAt).getTime();
    const createdB = new Date(b.createdAt).getTime();
    if (commentOption === "popular") {
      return b.reaction.length - a.reaction.length;
    }
    return createdB - createdA;
  });

  const [reply, setReply] = useState();
  const handleSendComment = async (id: any) => {
    const content = inputRef.current[id].value;
    const res: { comment: UserComment } = await postUser(
      "comment/add/" + movieId,
      {
        uid: user?.uid,
        content: content,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        comments: id,
      }
    );

    if (res) {
      refetch();
    }
    inputRef.current[id].value = "";
    inputRef.current[id].focus();
  };
  const handleReact = async (commentId: any, type: any) => {
    const res = await postUser("comment/reaction/" + movieId, {
      uid: user?.uid,
      commentId,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      type,
    });
    if (res) {
      refetch();
    }
  };
  const ShowReply = (id: any, type: any) => {
    if (reply === id) {
      setReply(undefined);
    } else setReply(id);

    inputRef.current[id].focus();
  };

  return (
    <>
      {sortComment.slice(0, numberOfComments)?.map((cmt: UserComment) => {
        return (
          <React.Fragment key={cmt?._id}>
            <div
              className={cx({
                [className]: className,
              })}
            >
              <div className={cx("avatar")}>
                <img
                  src={
                    cmt?.photoURL || require("../../assets/blank-avatar.jpg")
                  }
                  referrerPolicy="no-referrer"
                  alt=""
                />
              </div>
              <div className={cx("comment__content")}>
                <CommentContent
                  comment={cmt}
                  refetch={refetch}
                  handleReact={handleReact}
                  ShowReply={ShowReply}
                  className={className}
                  user={user}
                />
              </div>
            </div>

            <div
              className={cx("comment__user__part")}
              style={{
                display: reply === cmt?._id ? "block" : "none",
              }}
            >
              <div className={cx("user__comments")}>
                <form>
                  <img
                    src={user?.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <input
                    placeholder="Write your comment"
                    ref={(el) => (inputRef.current[cmt?._id] = el)}
                    name={cmt?.comments}
                    id={cmt._id}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      handleSendComment(cmt?._id);
                    }}
                  >
                    <MdSend />
                  </button>
                </form>
              </div>
            </div>

            <Reply
              commentOption={commentOption}
              refetch={refetch}
              movieId={movieId}
              user={user}
              comment={data?.filter((item) => item.comments === cmt?._id)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CommentUser;

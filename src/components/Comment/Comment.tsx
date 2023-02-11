import { useEffect, useRef, useState } from "react";

import { IoSendSharp } from "react-icons/io5";
import { useAppSelector } from "../../store/hooks";

import CommentUser from "./CommentUser";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";
import { useQuery } from "@tanstack/react-query";
import { UserComment } from "../../shared/types";
import { Link } from "react-router-dom";
import { postUser } from "../../service/axiosConfig";

const cx = classnames.bind(styles);

interface CommentProp {
  id: number;
}

const Comment: React.FC<CommentProp> = ({ id: movieId }) => {
  const user = useAppSelector((state) => state.auth.current);
  const inputRef: any = useRef([]);
  const [commentOption, setCommentOption] = useState("lastest");
  const { data, refetch, isFetching } = useQuery<{ comment: UserComment[] }>(
    ["comment"],
    () => postUser("comment", { movieId: movieId }),
    {
      refetchInterval: 1000 * 60,
      staleTime: 1000 * 60,
    }
  );
  const [numberOfComments, setNumberOfComments] = useState<number>(5);

  const parentComment = data?.comment.filter((e) => !e.comments);
  const handleSendComment = async (id: any) => {
    const content = inputRef.current[id].value;
    const res = await postUser("comment/add/" + movieId, {
      uid: user?.uid,
      content: content,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      comments: null,
    });
    if (res) {
      refetch();
    }
    inputRef.current[id].value = "";
    inputRef.current[id].focus();
  };
  const loadMoreParent = async () => {
    if (parentComment) {
      setNumberOfComments((prev) => {
        if (parentComment.length < prev + 5)
          return parentComment.length as number;
        if (parentComment.length > prev + 5) return prev + 5;
        return prev;
      });
    }
  };
  return (
    <>
      <div className={cx("comment__part")}>
        <div>
          <h4>Comments</h4>
          <div className={cx("sort")}>
            <div
              className={cx("lastest", {
                currentCommentOption: commentOption === "lastest",
              })}
              onClick={() => setCommentOption("lastest")}
            >
              Lastest
            </div>
            <div
              className={cx("popular", {
                currentCommentOption: commentOption === "popular",
              })}
              onClick={() => setCommentOption("popular")}
            >
              Popular
            </div>
          </div>
        </div>
        {(user && (
          <div className={[cx("comment__user__part"), cx("curUser")].join(" ")}>
            <div className={cx("user__comments")}>
              <form>
                <img
                  src={
                    user?.photoURL ||
                    "https://www.sim.edu.vn/en/wp-content/uploads/2019/07/blank-avatar.jpg"
                  }
                  alt=""
                />
                <input
                  placeholder="Write your comment"
                  ref={(el) =>
                    (inputRef.current[user?.uid || Math.random()] = el)
                  }
                />

                <button
                  type="button"
                  onClick={() => handleSendComment(user?.uid)}
                >
                  <IoSendSharp />
                </button>
              </form>
            </div>
          </div>
        )) || (
          <div className={cx("not__loginin__note")}>
            <Link to={"/login"}>
              <i>Sign in to comment?</i>
            </Link>
          </div>
        )}
        <div className={cx("wrapper")}>
          <div className={cx("comment")}>
            {data && parentComment && (
              <CommentUser
                commentOption={commentOption}
                movieId={movieId}
                user={user}
                refetch={refetch}
                numberOfComments={numberOfComments}
                comment={parentComment}
                data={data.comment}
                className="parent"
              />
            )}
          </div>
        </div>
        {parentComment &&
          parentComment.length > 5 &&
          parentComment.length > numberOfComments && (
            <div className={cx("loadMore")}>
              <button
                onClick={loadMoreParent}
              >{`(${numberOfComments}/${parentComment?.length}) comments`}</button>
            </div>
          )}
      </div>
    </>
  );
};

export default Comment;

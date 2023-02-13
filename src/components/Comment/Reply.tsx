import { useState } from "react";
import { UserComment } from "../../shared/types";
import CommentUser from "./CommentUser";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";
import React from "react";

const cx = classnames.bind(styles);
interface ReplyProps {
  commentOption: string | undefined;
  refetch: any;
  comment: UserComment[] | undefined;
  movieId: number;
  user: any;
}
const Reply: React.FC<ReplyProps> = ({
  refetch,
  comment,
  movieId,
  user,
  commentOption,
}) => {
  const [numberOfComments, setNumberOfComments] = useState(5);
  const loadMoreComment = async () => {
    if (comment) {
      setNumberOfComments((prev) => {
        if (comment.length < prev + 5) return comment.length as number;
        if (comment.length > prev + 5) return prev + 5;
        return prev;
      });
    }
  };
  return (
    <>
      {comment && comment.length !== 0 && (
        <CommentUser
          commentOption={commentOption}
          refetch={refetch}
          numberOfComments={numberOfComments}
          movieId={movieId}
          user={user}
          comment={comment}
          className="child"
        />
      )}
      {comment && comment.length > 5 && comment.length > numberOfComments && (
        <div className={cx("loadMore")}>
          <button
            onClick={loadMoreComment}
          >{`(${numberOfComments}/${comment?.length}) comments`}</button>
        </div>
      )}
    </>
  );
};

export default React.memo(Reply);

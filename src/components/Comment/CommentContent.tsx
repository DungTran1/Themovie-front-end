import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { AiFillHeart, AiTwotoneLike, AiOutlineClose } from "react-icons/ai";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaAngry, FaSadTear, FaSurprise } from "react-icons/fa";
import { User, UserComment } from "../../shared/types";

import Overlay from "../Common/Overlay";
import { calculateTimePassed } from "../../shared/utils";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";
import CommentEditContent from "./CommentEditContent";

const cx = classnames.bind(styles);
interface CommentContentProp {
  refetch: any;
  comment: UserComment;
  handleReact: (commentId: any, type: any) => Promise<void>;
  ShowReply: (id: any, type: any) => void;
  className: string;
  user: User | null;
}
const CommentContent: React.FC<CommentContentProp> = ({
  comment,
  refetch,
  handleReact,
  ShowReply,
  className,
  user,
}) => {
  const [isShowReaction, setIsShowReaction] = useState(false);
  const [detailReaction, setDetailReaction] = useState("all");

  const newDate = new Date(comment?.createdAt);
  const createdTime = calculateTimePassed(newDate.getTime());
  const reacted = comment.reaction.find((e: any) => e.uid === user?.uid);
  const colorReacted =
    (reacted?.type === "heart" && "#ff4545") ||
    (reacted?.type === "like" && "#1d88e5") ||
    (reacted?.type === "haha" && "rgb(240 243 69)") ||
    (reacted?.type === "angry" && "#8930b7") ||
    (reacted?.type === "sad" && "#30b78b") ||
    (reacted?.type === "surprise" && "#db842b") ||
    "";
  let count = {
    like: {
      quantum: 0,
      icon: (
        <AiTwotoneLike size={25} color="1d88e5" className={cx("likeIcon")} />
      ),
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
    heart: {
      quantum: 0,
      icon: (
        <AiFillHeart size={25} color="#ff4545" className={cx("heartIcon")} />
      ),
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
    haha: {
      quantum: 0,
      icon: (
        <BsEmojiLaughingFill
          size={25}
          color="#ffff4c"
          className={cx("hahaIcon")}
        />
      ),
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
    angry: {
      quantum: 0,
      icon: <FaAngry size={25} color="#8930b7" className={cx("angryIcon")} />,
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
    sad: {
      quantum: 0,
      icon: <FaSadTear size={25} color="#30b78b" className={cx("sadIcon")} />,
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
    surprise: {
      quantum: 0,
      icon: (
        <FaSurprise size={25} color="#db842b" className={cx("surpriseIcon")} />
      ),
      userReacted: [] as Array<{ displayName: string; photoURL: string }>,
    },
  };
  const filReaction = (react: any, element: any) => {
    react.quantum = react.quantum + 1;
    react.userReacted = [
      ...react.userReacted,
      { displayName: element.displayName, photoURL: element.photoURL },
    ];
  };
  comment?.reaction.forEach((element) => {
    switch (element.type) {
      case "like":
        filReaction(count.like, element);
        break;
      case "haha":
        filReaction(count.haha, element);
        break;
      case "heart":
        filReaction(count.heart, element);
        break;
      case "angry":
        filReaction(count.angry, element);
        break;
      case "sad":
        filReaction(count.sad, element);
        break;
      case "surprise":
        filReaction(count.surprise, element);
        break;
    }
  });

  return (
    <>
      <div className={cx("content")}>
        <div className={cx("info")}>
          <CommentEditContent comment={comment} refetch={refetch} />

          <div
            className={cx("most__icon")}
            onClick={() => setIsShowReaction(true)}
          >
            {count &&
              Object.entries(count).map((item: any, index) => {
                if (item[1].quantum) {
                  return <div key={index}>{item[1].icon}</div>;
                }
              })}
            <div className={cx("all__icon")}>
              {count &&
                Object.entries(count).map((item, index) => {
                  if (item[1].quantum) {
                    return (
                      <div key={index}>
                        {item[1].icon}
                        <span>{item[1].quantum}</span>
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          {isShowReaction && (
            <div className={cx("show__reaction")}>
              <ul className={cx("list__reacted")}>
                <li
                  onClick={() => setDetailReaction("all")}
                  className={cx({ onReacted: detailReaction === "all" })}
                >
                  All
                </li>
                {Object.entries(count).map((item, index) => {
                  if (item[1].quantum) {
                    return (
                      <li
                        key={index}
                        onClick={() => setDetailReaction(item[0])}
                        className={cx({
                          onReacted: item[0] === detailReaction,
                        })}
                      >
                        <span>{item[1].icon}</span>
                        <span>{item[1].quantum}</span>
                      </li>
                    );
                  }
                })}
              </ul>
              <ul className={cx("list__user__reacted")}>
                {Object.entries(count).map((item) => {
                  if (item[1].quantum) {
                    if (detailReaction === "all") {
                      return item[1].userReacted.map((i) => (
                        <li>
                          <img src={i.photoURL} alt="" />
                          <p>{i.displayName}</p>
                        </li>
                      ));
                    } else {
                      if (item[0] === detailReaction) {
                        return item[1].userReacted.map((i) => (
                          <li>
                            <img src={i.photoURL} alt="" />
                            <p>{i.displayName}</p>
                          </li>
                        ));
                      }
                    }
                  }
                })}
              </ul>
              <div
                className={cx("close")}
                onClick={() => setIsShowReaction(false)}
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
          )}
        </div>
      </div>
      {isShowReaction && <Overlay />}
      <div className={cx("feature")}>
        <Tippy
          offset={[0, 0]}
          placement="top"
          interactive
          allowHTML
          hideOnClick={true}
          duration={[500, 500]}
          render={(attrs) => {
            return (
              <div className={cx("reaction")} tabIndex={-1} {...attrs}>
                {Object.entries(count).map((i, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleReact(comment?._id, i[0])}
                    >
                      {i[1].icon}
                    </div>
                  );
                })}
              </div>
            );
          }}
        >
          <div style={{ color: colorReacted }}>
            {(user && reacted && (
              <p onClick={() => handleReact(comment?._id, reacted.type)}>
                {reacted.type.charAt(0).toUpperCase() + reacted.type.slice(1)}
              </p>
            )) ||
              (user && <p>Reaction</p>)}
          </div>
        </Tippy>
        {className !== "child" && user && (
          <div onClick={() => ShowReply(comment?._id, className)}>Reply</div>
        )}
        <div>{createdTime}</div>
      </div>
    </>
  );
};

export default CommentContent;

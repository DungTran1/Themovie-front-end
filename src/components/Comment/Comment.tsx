import { useEffect, useRef, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Tippy from "@tippyjs/react/headless";

import userApi from "../../service/userApiConfig";
import SendIcon from "@mui/icons-material/Send";

import classnames from "classnames/bind";
import styles from "./Comment.module.scss";

const cx = classnames.bind(styles);

function Comment({ user, id: movieId }: any) {
  const inputRef: any = useRef([]);
  const inputCurUserRef: any = useRef(null);
  const [reply, setReply] = useState<object[]>([]);
  const [parentComment, setParentComment] = useState<any[]>([]);
  const [childComment, setChildComment] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  //const userId = currentUser.uid;
  useEffect(() => {
    const fetch = async () => {
      const res = await userApi.getComment("comment", { movieId: movieId });
      console.log(res);
      const filter = res.comment.filter((item: any) => !item.reply);
      setTotal(filter.length);
      setParentComment((prev) => {
        const slice = filter.slice(0, 5);
        console.log(filter, slice);
        return slice;
      });
      setChildComment((prev) => {
        const filter = res.comment?.filter((item: any) => item.reply);
        const slice = filter.slice(0, 5);
        return slice;
      });
    };
    fetch();
  }, []);
  const handleReply = (id: any, type: any) => {
    // console.log(id);
    if (reply.some((item: any) => item === id)) {
      setReply((prev) => {
        const newReply = [...prev];
        const Reply = newReply.findIndex((item: any) => item === id);
        newReply.splice(Reply, 1);
        return [...newReply];
      });
    } else {
      setReply((prev) => [...prev, id]);
    }
    const tagName =
      parentComment.find((item: any) => item._id === id) ||
      childComment.find((item: any) => item._id === id);
    console.log(tagName, `@${tagName.name}`);
    if (type === "child") {
      inputRef.current[id].value = `@${tagName.name} `;
    }
    inputRef.current[id].focus();
  };
  console.log(parentComment, childComment);
  const handleChildSendComment = async (id: any) => {
    // e.preventDefault();
    const content = inputRef.current[id].value;
    const commentUserId = inputRef.current[id].id;
    const res = await userApi.postComment("comment/" + movieId, {
      userId: user.id,
      content: content,
      reply: commentUserId,
    });

    setChildComment((prev) => {
      const pushComment = [...prev];
      pushComment.unshift(res.comment);
      return [...pushComment];
    });
    // setTotal((prev) => prev + 1);
    setReply([]);
    inputRef.current[id].value = "";
    inputRef.current[id].focus();
  };
  const handleReact = async (commentId: any, reactionType: any) => {
    await userApi.saveReaction("comment/reaction/" + movieId, {
      userId: user.id,
      commentId,
      reactionType,
    });
    // setComment((prev) => [...prev]);
  };
  const convertTime = (createdAt: any) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    const time = new Date(createdAt);
    const commentTime = new Date().getTime() - time.getTime();
    let createdTime: any;
    if (commentTime <= second * 59) {
      createdTime = `vừa mới`;
    } else if (commentTime <= minute * 59) {
      createdTime = `${Math.floor(commentTime / minute)} phút trước`;
    } else if (commentTime <= hour * 23) {
      createdTime = `${Math.floor(commentTime / hour)} giờ trước`;
    } else if (commentTime <= day * 30) {
      createdTime = `${Math.floor(commentTime / day)} ngày trước`;
    } else if (commentTime <= month * 12) {
      createdTime = `${Math.floor(commentTime / month)} tháng trước`;
    } else if (commentTime >= year) {
      createdTime = `${Math.floor(commentTime / year)} năm trước`;
    }
    return createdTime;
  };
  const renderComment = (item: any, className: any, idRep: any) => {
    const createdTime = convertTime(item.createdAt);
    const count = {} as any;
    item.reaction.forEach((element: { reactionType: string }) => {
      count[element.reactionType] = (count[element.reactionType] || 0) + 1;
    });

    count["haha"] = {
      quantum: count["haha"],
      icon: <SentimentVerySatisfiedIcon className={cx("sentimentIcon")} />,
    };
    count["like"] = {
      quantum: count["like"],
      icon: <ThumbUpIcon className={cx("thumpUpIcon")} />,
    };
    count["heart"] = {
      quantum: count["heart"],
      icon: <FavoriteIcon className={cx("favoriteIcon")} />,
    };

    // console.log(count, Object.entries(count));
    return (
      <>
        <div className={cx({ [className]: className })} key={item._id}>
          <div className={cx("avatar")}>
            <img
              src={
                user?.photoUrl ||
                item?.photoUrl ||
                "https://www.sim.edu.vn/en/wp-content/uploads/2019/07/blank-avatar.jpg"
              }
              alt=""
            />
          </div>
          <div className={cx("comment__content")}>
            <div className={cx("content")}>
              <div className={cx("info")}>
                <h3>{item?.name}</h3>
                <p>{item?.content}</p>
                <div className={cx("most__icon")}>
                  {Object.entries(count).map((item: any) => {
                    if (item[1].quantum) {
                      return item[1].icon;
                    }
                  })}
                  <div className={cx("all__icon")}>
                    {Object.entries(count).map((item: any, index) => {
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
              </div>
              <div className={cx("hide")}>
                <Tippy
                  placement="right"
                  interactive
                  trigger="click"
                  render={(attrs) => {
                    return (
                      <ul>
                        <li>Sửa</li>
                        <li>Xóa</li>
                      </ul>
                    );
                  }}
                >
                  <MoreHorizOutlinedIcon />
                </Tippy>
              </div>
            </div>
            <div className={cx("feature")}>
              <Tippy
                placement="top"
                interactive
                allowHTML
                duration={[100, 500]}
                render={(attrs) => {
                  return (
                    <div className={cx("reaction")} tabIndex={-1} {...attrs}>
                      <div onClick={() => handleReact(item._id, "heart")}>
                        <FavoriteIcon className={cx("favoriteIcon")} />
                      </div>
                      <div onClick={() => handleReact(item._id, "like")}>
                        <ThumbUpIcon className={cx("thumpUpIcon")} />
                      </div>
                      <div onClick={() => handleReact(item._id, "haha")}>
                        <SentimentVerySatisfiedIcon
                          className={cx("sentimentIcon")}
                        />
                      </div>
                    </div>
                  );
                }}
              >
                <div>Reaction</div>
              </Tippy>
              <div onClick={() => handleReply(item._id, className)}>Reply</div>
              <div>{createdTime}</div>
            </div>
          </div>
        </div>
        {
          <div
            className={cx("comment__user__part")}
            style={{
              display: reply.some((id: any) => id === item._id)
                ? "block"
                : "none",
            }}
          >
            <div className={cx("user__comments")}>
              <form>
                <img
                  src={
                    user?.photoUrl ||
                    item?.photoUrl ||
                    "https://www.sim.edu.vn/en/wp-content/uploads/2019/07/blank-avatar.jpg"
                  }
                  alt=""
                />
                <input
                  placeholder="Write your comment"
                  ref={(el) => (inputRef.current[item._id] = el)}
                  id={idRep}
                />

                <button
                  type="button"
                  onClick={(e) => handleChildSendComment(item._id)}
                >
                  <SendIcon />
                </button>
              </form>
            </div>
          </div>
        }
      </>
    );
  };
  const loadMoreParent = async () => {
    const res = await userApi.getComment("comment", { movieId: movieId });
    setParentComment((prev) => {
      const filter = res.comment.filter((item: any) => !item.reply);
      const slice = filter.slice(
        parentComment.length,
        parentComment.length + 5
      );
      return [...prev, ...slice];
    });
  };
  const handleSendComment = async (e: any) => {
    e.preventDefault();
    const content = inputCurUserRef.current.value;
    console.log(content);
    const res = await userApi.postComment("comment/" + movieId, {
      userId: user.id,
      content: content,
      reply: "",
    });
    setParentComment((prev) => {
      const pushComment = [...prev];
      pushComment.unshift(res.comment);
      return [...pushComment];
    });
    setTotal((prev) => prev + 1);
    inputCurUserRef.current.value = "";
    inputCurUserRef.current.focus();
  };
  const loadMoreChild = () => {};
  return (
    <>
      <div className={[cx("comment__user__part"), cx("curUser")].join(" ")}>
        <div className={cx("user__comments")}>
          <form>
            <img
              src={
                user?.photoUrl ||
                "https://www.sim.edu.vn/en/wp-content/uploads/2019/07/blank-avatar.jpg"
              }
              alt=""
            />
            <input
              placeholder="Write your comment"
              ref={inputCurUserRef}
              name="comment"
            />

            <button type="button" onClick={handleSendComment}>
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("")}>
          {parentComment.map((item: any, index: any) => {
            return (
              <>
                {renderComment(item, "parent", item._id)}
                {childComment.map((child: any) => {
                  if (child.reply === item._id) {
                    // console.log(child);
                    return renderComment(child, "children", item._id);
                  }
                })}
              </>
            );
          })}
        </div>
      </div>
      {parentComment.length !== total && (
        <div className={cx("loadMore")}>
          <button
            onClick={loadMoreParent}
          >{`(${parentComment.length}/${total}) comments`}</button>
        </div>
      )}
    </>
  );
}

export default Comment;

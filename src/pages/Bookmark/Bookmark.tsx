import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MediaChange from "../../components/MediaChange/MediaChange";

import { useState } from "react";

import { Grid } from "@mui/material";
import FilmItem from "../../components/FilmItem/FilmItem";
import { ThreeCircles } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import classnames from "classnames/bind";
import styles from "../../components/Explore/Explore.module.scss";

import userApi from "../../service/userApiConfig";
import tmdbApi from "../../service/tmdbApiConfig";
const cx = classnames.bind(styles);

function Bookmark() {
  const user = useSelector((state: any) => state.currentUserReducer.current);
  const [bookmark, setBookmark] = useState<number[]>([]);
  const [watched, setWatched] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(true);
  const [edit, setEdit] = useState<any>(false);
  const [check, setCheck] = useState<any[]>([]);
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await userApi.getBookmark("Bookmark", {
        userId: user.id,
        media,
      });

      if (JSON.stringify(res) !== "{}") {
        Promise.all(
          res.movieIds.map(async (movie: any) => {
            const res = await tmdbApi.getDetail(movie.media, movie.movieId);
            return res;
          })
        )
          .then((res) => {
            setLoading(false);
            setWatched(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setBookmark(res.movieIds);
    };
    fetch();
  }, [media]);
  const handleChecked = (e: any) => {
    const id = Number(e.target.value);
    if (check.includes(id) && Number.isInteger(id)) {
      setCheck((prev) => {
        const newCheck = [...prev];
        const check = newCheck.findIndex((item) => item === id);
        newCheck.splice(check, 1);
        return [...newCheck];
      });
    } else {
      setCheck((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    if (check.length === bookmark.length) {
      setCheck([]);
    } else {
      const newBookmark = bookmark.map((item: any) => item?.movieId);
      setCheck([...newBookmark]);
    }
  };
  const handleClear = async () => {
    const newWatch = watched.filter((watch: any) => {
      return !check.includes(watch.id);
    });

    setWatched([...newWatch]);
    // setDeleted([...check]);
    await userApi.deleteBookmark("Bookmark/delete/movie", {
      movieIds: check,
      userId: user.id,
    });
    setCheck([]);
  };

  return (
    <>
      <div className={cx("movie__list")}>
        <div className={cx("header")}>
          <div className={cx("title")}>MY FAVORITE</div>
        </div>
        <div>
          <MediaChange Media={[media, setMedia]} />
          <div className={cx("edit")}>
            {!edit && (
              <div onClick={() => setEdit(true)}>
                <BorderColorOutlinedIcon />
                <span>Edit</span>
              </div>
            )}
            {edit && (
              <>
                <div onClick={handleSelectAll}>
                  <DoneAllOutlinedIcon />
                  <span>Select All</span>
                </div>
                <div onClick={handleClear}>
                  <DeleteOutlinedIcon />
                  <span>Clear</span>
                </div>
                <div
                  onClick={() => {
                    setEdit(false);
                    setCheck([]);
                  }}
                >
                  <CancelOutlinedIcon />
                  <span>Cancel</span>
                </div>
              </>
            )}
          </div>
        </div>

        <InfiniteScroll
          dataLength={20}
          loader={
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
              wrapperClass={cx("progress-bar-wrapper")}
            />
          }
          scrollThreshold={1}
          className={cx("load__scroll")}
          style={{ overflow: "unset" }}
          next={function () {
            throw new Error("Function not implemented.");
          }}
          hasMore={false}
        >
          <div>
            {watched.map((itm, idx) => {
              return (
                <div key={idx}>
                  <FilmItem loading={loading} itemPage={itm} />
                  {edit && (
                    <input
                      checked={check.includes(itm.id)}
                      type="checkbox"
                      value={itm.id}
                      onChange={handleChecked}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Bookmark;

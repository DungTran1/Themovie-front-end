import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// import tmdbApi from "../../api/tmdbApiConfig";
import apiConfig from "../../service/apiConfig";
import { singleUrl } from "../../config/routes";

import MenuRight from "../MenuRight";
import Search from "../SearchBox/SearchBox";
import MovieSuggestion from "../MovieSuggestion/MovieSuggestion";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { RootState } from "../../app/index";
import NotFound from "../NotFound/NotFound";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import Loading from "../Loading/Loading";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";
import userApi from "../../service/userApiConfig";

import classnames from "classnames/bind";
import styles from "./FilmDetail.module.scss";
import TabInfo from "./TabInfo";
const cx = classnames.bind(styles);

const FilmDetail: React.FC<FilmInfo> = ({
  similar,
  videos,
  detail,
  ...others
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width:420px)" });
  const user: { id: string } = useSelector(
    (state: RootState) => state.currentUserReducer.current
  ) as any;
  // const originPath: string = pathname.slice(1, pathname.lastIndexOf("/"));
  const backdrop: any = apiConfig.originalImage(detail?.backdrop_path);
  const notify = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.error("You must to Sign in !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        closeButton: true,
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        await userApi.postHistory("history/" + detail?.id, {
          id: user.id,
          media: detail?.media_type,
        });
      }
    };
    fetch();
  }, []);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    const noti = notify(e);
    if (noti) {
      const fetch = async () => {
        const res = await userApi.postHistory("bookmark/" + detail?.id, {
          id: user.id,
          media: detail?.media_type,
        });
        toast.success(res, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          closeButton: true,
        });
      };
      fetch();
    }
  };
  // if (isLoading) {
  //   return <isLoading />;
  // }
  return (
    <>
      <div className={cx("movie")}>
        <div
          className={cx("backdrop__image")}
          style={{
            backgroundImage: `url("${backdrop}")`,
          }}
        >
          <div className={cx("overlay")}></div>
          <div className={cx("function__btn")}>
            <button className={cx("favorite")} onClick={handleBookmarkClick}>
              <FavoriteIcon />
            </button>
            <button className={cx("sharing")}>
              <ShareIcon />
            </button>
            <button className={cx("more")}>
              <MoreHorizIcon />
            </button>
          </div>
          <div className={cx("heading")}>
            <img src={apiConfig.w500Image(detail?.poster_path)} alt="" />

            {!isMobile && (
              <div className={cx("title")}>
                <h3>
                  {(detail as DetailMovie)?.title || (detail as DetailTV)?.name}
                </h3>
                <div className={cx("genres")}>
                  {JSON.stringify(detail) !== "{}" &&
                    detail?.genres.map((item: any, index: any) => (
                      <button key={item.id || index}>{item.name}</button>
                    ))}
                </div>
              </div>
            )}
            <Link to={singleUrl.watch}>
              <button className={cx("watch__btn")}>
                <PlayCircleIcon />
                <span>Watch</span>
              </button>
            </Link>
          </div>
        </div>
        {isMobile && (
          <div className={cx("title", { isMobile: isMobile })}>
            <h3>
              {(detail as DetailMovie)?.title || (detail as DetailTV)?.name}
            </h3>
            <div className={cx("genres")}>
              {JSON.stringify(detail) !== "{}" &&
                detail?.genres.map((item: any, index: any) => (
                  <button key={item.id || index}>{item.name}</button>
                ))}
            </div>
          </div>
        )}
        <div className={cx("info")}>
          {!isMobile && (
            <div className={cx("rating__col")}>
              <div>
                <div>
                  <h3>RATING</h3>
                  <CircularProgressbar
                    value={detail?.vote_average || 0}
                    maxValue={10}
                    text={`${detail?.vote_average || 0}`}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      textColor: "#ffff",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>

                <div>
                  <div>RUNTIME</div>
                  <div>
                    {(detail as DetailMovie)?.runtime ||
                      (detail as DetailTV)?.episode_run_time[0] ||
                      ""}
                  </div>
                </div>
              </div>
            </div>
          )}
          <TabInfo detail={detail} {...others} />
          {isMobile && (
            <div className={cx("isMobile__rating")}>
              <div>
                <p>Rating</p>
                <p>{detail?.vote_average}</p>
              </div>
              <div>
                <p>Ep length</p>
                <p>
                  {(detail as DetailMovie)?.runtime ||
                    (detail as DetailTV)?.episode_run_time[0]}{" "}
                  min
                </p>
              </div>
            </div>
          )}
          {!isMobile && (
            <div className={cx("media")}>
              <h3>Media</h3>
              {videos &&
                videos.slice(0, 2).map((video, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title="a"
                        />
                      </div>
                      <div>{video.name}</div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <MenuRight>
        <div className={cx("menu")}>
          <div style={{ width: "25rem" }}>
            <Search />
          </div>
          <MovieSuggestion type="similar" />
        </div>
      </MenuRight>
    </>
  );
};

export default FilmDetail;

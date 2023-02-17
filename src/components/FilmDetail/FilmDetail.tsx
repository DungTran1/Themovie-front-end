import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillPlayCircle, AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";

import apiConfig from "../../service/apiConfig";

import Search from "../SearchBox/SearchBox";
import FilmSuggestion from "../FilmSuggestion/FilmSuggestion";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useMediaQuery } from "react-responsive";

import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";

import classnames from "classnames/bind";
import styles from "./FilmDetail.module.scss";
import TabInfo from "./TabInfo";
import { useAppSelector } from "../../store/hooks";
import { postUser } from "../../service/axiosConfig";
import { useQuery } from "@tanstack/react-query";
const cx = classnames.bind(styles);

const FilmDetail: React.FC<FilmInfo> = ({
  similar,
  videos,
  detail,
  ...others
}) => {
  const isMobile = useMediaQuery({ query: "(max-width:46.25em)" });
  const user = useAppSelector((state) => state.auth.current);
  const { data, refetch } = useQuery(["checkbookmark", detail?.id], () =>
    postUser("bookmark/check/" + detail?.id, { uid: user?.uid })
  );
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
  const fetch = async () => {
    if (user && detail?.media_type) {
      await postUser("history/" + detail?.id, {
        uid: user.uid,
        media: detail?.media_type,
      });
    }
  };
  fetch();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    const noti = notify(e);
    if (noti) {
      const fetch = async () => {
        const res = await postUser("bookmark/" + detail?.id, {
          uid: user?.uid,
          media: detail?.media_type,
        });
        if (res) {
          refetch();
          toast.success(res, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            closeButton: true,
          });
        }
      };
      fetch();
    }
  };

  return (
    <div className="grid">
      <div className="row">
        <div className={`${cx("film")} l-9 md-12 sm-12`}>
          <div className={cx("backdrop__image")}>
            <img src={backdrop} alt="" />
            {!backdrop && <div style={{ minHeight: "400px" }}></div>}
            <div className={cx("overlay")}></div>
            <div className={cx("function__btn")}>
              <button
                className={cx("favorite", { isbookmark: data })}
                onClick={handleBookmarkClick}
              >
                <MdOutlineFavoriteBorder
                  size={25}
                  color={data ? "#f73636" : "#fff"}
                />
              </button>
              <button className={cx("sharing")}>
                <AiOutlineShareAlt size={25} color="#fff" />
              </button>
              <button className={cx("more")}>
                <FiMoreHorizontal size={25} color="#fff" />
              </button>
            </div>
            <div className={cx("heading")}>
              <img src={apiConfig.w500Image(detail?.poster_path)} alt="" />

              {!isMobile && (
                <div className={cx("title")}>
                  <h3>
                    {(detail as DetailMovie)?.title ||
                      (detail as DetailTV)?.name}
                  </h3>
                  <div className={cx("genres")}>
                    {JSON.stringify(detail) !== "{}" &&
                      detail?.genres.map((item: any, index: any) => (
                        <button key={item.id || index}>{item.name}</button>
                      ))}
                  </div>
                </div>
              )}
              <Link to="watch">
                <button className={cx("watch__btn")}>
                  <AiFillPlayCircle />
                  <span>Watch</span>
                </button>
              </Link>
            </div>
          </div>

          {isMobile && (
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
          <div className={cx("info")}>
            {!isMobile && (
              <div className={`${cx("rating__col")} l-2 md-2 sm-12`}>
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
                        ((detail as DetailTV)?.episode_run_time &&
                          (detail as DetailTV)?.episode_run_time[0]) ||
                        ""}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <TabInfo detail={detail} {...others} />
            {isMobile && (
              <div className={`${cx("isMobile__rating")} l-5 md-5 sm-12`}>
                <div>
                  <p>Rating</p>
                  <p>{detail?.vote_average}</p>
                </div>
                <div>
                  <p>Ep length</p>
                  <p>
                    {(detail as DetailMovie)?.runtime ||
                      ((detail as DetailTV)?.episode_run_time &&
                        (detail as DetailTV)?.episode_run_time[0])}
                    min
                  </p>
                </div>
              </div>
            )}
            {!isMobile && (
              <div className={`${cx("media")} l-5 md-5 sm-12`}>
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
        <div className={`${cx("menu")} l-3 md-12 sm-12`}>
          <div className="md-0">
            <Search />
          </div>
          <FilmSuggestion
            type="similar"
            films={similar?.filter((item) => item.id !== detail?.id)}
            limitNumber={4}
            isLoading={!similar}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;

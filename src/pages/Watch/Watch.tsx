import MenuRight from "../../components/MenuRight";
import MovieSuggestion from "../../components/MovieSuggestion/MovieSuggestion";
import Search from "../../components/SearchBox/SearchBox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
// import { getWatchHistory } from "../../reducer/currentUserSlice";

import StarIcon from "@mui/icons-material/Star";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import tmdbApi from "../../service/tmdbApiConfig";

import styles from "./Watch.module.scss";
import classnames from "classnames/bind";
import Comment from "../../components/Comment/Comment";

const cx = classnames.bind(styles);

function Watch() {
  const [videoId, setVideoId] = useState<any>();
  const [movie, setMovie] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useSearchParams();
  const { pathname }: any = useLocation();
  const { id }: any = useParams();
  const originPath = pathname.includes("tv") ? "tv" : "movie";
  const episode = params.get("episode");
  const season = params.get("season");

  const user = useSelector((state: any) => state.currentUserReducer.current);
  useEffect(() => {
    const fetch = async () => {
      const movie = await tmdbApi.getDetail(originPath, id);

      setMovie(movie);
      if (originPath === "tv") {
        setVideoId(
          `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season || 1}&e=${
            episode || 1
          }`
        );
      } else {
        setVideoId(`https://www.2embed.to/embed/tmdb/movie?id=${id}`);
      }
    };
    fetch();
  }, [season, episode, originPath]);
  console.log(videoId);

  return (
    <>
      <div className={cx("watch")}>
        <div className={cx("video")}>
          <iframe
            id="ve-iframe"
            src={videoId}
            width="100%"
            height="100%"
            // allowFullScreen="allowfullscreen"
            frameBorder="0"
            title="movie"
          ></iframe>
        </div>
        <div className={cx("info-comment")}>
          <h2>{movie.original_title}</h2>
          <div>
            <div className={cx("rating")}>
              <StarIcon />
              <span>{movie.vote_average || ""}</span>
            </div>
            <div className={cx("calendar")}>
              <CalendarTodayIcon />
              <span>{movie.release_date || ""}</span>
            </div>
          </div>
          <div className={cx("genres")}>
            {movie.length !== 0 &&
              movie.genres.map((item: any) => (
                <button key={item.id}>{item.name}</button>
              ))}
          </div>
          <div className={cx("overview")}>
            <h4>Overview:</h4>
            <p>{movie.overview}</p>
          </div>
          <div className={cx("comment__part")}>
            <div>
              <h4>Comments</h4>
              <div className={cx("sort")}>
                <div className={cx("lastest")}>Lastest</div>
                <div className={cx("popular")}>Popular</div>
              </div>
            </div>
            <Comment user={user} id={id} />
          </div>
        </div>
      </div>
      <MenuRight>
        <div>
          <Search />
          <MovieSuggestion type="recommendations" />
        </div>
      </MenuRight>
    </>
  );
}

export default Watch;

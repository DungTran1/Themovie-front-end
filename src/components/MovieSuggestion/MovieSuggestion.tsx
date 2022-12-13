import React, { useEffect, useState } from "react";

import apiConfig from "../../service/apiConfig";
import tmdbApi from "../../service/tmdbApiConfig";

import { Link, useLocation, useParams } from "react-router-dom";
import { singleUrl } from "../../config/routes";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import TVShow from "../TVShow/TVShow";

import styles from "./MovieSuggestion.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  name: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  seasons: Array<{
    id: number;
    episode_count: number;
    season_number: number;
  }>;
}

function MenuType({ type }: { type: string }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const originPath = pathname.includes("tv");
  const path = originPath ? "tv" : "movie";
  const [movie, setMovie] = useState<Array<Movie> | Movie>([]) as any;

  useEffect(() => {
    const fetch = async () => {
      if (path === "tv" && pathname.includes("watch")) {
        const res = await tmdbApi.getDetail("tv", Number(id));
        setMovie(res);
      } else {
        if (type === "trending") {
          const res = await tmdbApi.getMovieList("movie", type, "day");
          const res2 = await tmdbApi.getMovieList("tv", type, "day");
          setMovie([...res.results.slice(0, 2), ...res2.results.slice(0, 2)]);
        } else if (type === "similar") {
          const res = await tmdbApi.getSimilar(path, Number(id));
          setMovie(res.results.slice(0, 4));
        } else {
          const res = await tmdbApi.getRecommendation(path, Number(id));
          setMovie(res.results.slice(0, 4));
        }
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={cx("menu")}>
        <div className={cx("type")}>
          <h3>{type}</h3>
          <MoreVertIcon />
        </div>
        {(!originPath &&
          movie.map((item: Movie) => {
            return (
              <Link
                key={item.id}
                to={singleUrl[path] + "/" + item.id}
                className={cx("wrapper")}
              >
                <div className={cx("img")}>
                  <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                <div className={cx("info")}>
                  <h3>{item.original_title || item.name}</h3>
                  <h4>{item.release_date || item.first_air_date}</h4>
                  <button>{item.vote_average}</button>
                </div>
              </Link>
            );
          })) || <TVShow movies={movie} />}
      </div>
      <Link to={singleUrl.explore}>
        <div className={cx("seeing__more")}>See More</div>
      </Link>
    </>
  );
}
export default MenuType;

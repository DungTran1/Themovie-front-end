import React, { useEffect, useState } from "react";
import apiConfig from "../../service/apiConfig";
import tmdbApi from "../../service/tmdbApiConfig";
import StarIcon from "@mui/icons-material/Star";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Link } from "react-router-dom";

import classnames from "classnames/bind";
import styles from "./Swiper.module.scss";
const cx = classnames.bind(styles);
interface Movie {
  id: number;
  vote_average: number;
  original_title: string;
  original_name: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  backdrop_path: string;
  genre_ids: Array<number>;
}
function SwiperComp({ media = "movie" }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await tmdbApi.getMovieList(media, "popular");
      setMovies(res.results.slice(0, 4));
    };
    fetch();
    return () => console.log("unmout");
  }, [media]);
  useEffect(() => {
    const fetch = async () => {
      const res = await tmdbApi.getGenres(media);
      setGenres(res.genres);
    };
    fetch();
  }, [media]);
  return (
    <Swiper
      className={cx("swiper")}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {movies.map((movie) => {
        const movieGenres = movie.genre_ids.map((genre) => {
          return genres.find((item) => item.id === genre);
        });

        return (
          <SwiperSlide
            key={movie.id}
            className={cx("slide__wrapper")}
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movie.backdrop_path
              )})`,
            }}
          >
            <Link to={"moviedetail/" + movie.id}>
              <div>
                <div className={cx("vote__average")}>
                  {movie.vote_average}
                  <StarIcon />
                </div>
                <div className={cx("info")}>
                  <div className={cx("title__original")}>
                    {movie.original_title || movie.original_name}
                  </div>
                  <div className={cx("Release__date")}>
                    Release date: {movie.release_date || movie.first_air_date}
                  </div>
                  <div className={cx("genres")}>
                    {movieGenres.map((item, index) => {
                      return (
                        <button key={(item && item.id) || index}>
                          {item && item.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className={cx("overview")}>{movie.overview}</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperComp;

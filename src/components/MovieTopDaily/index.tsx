import { useState, useEffect } from "react";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../../service/tmdbApiConfig";

import MovieCard from "../FilmItem/FilmItem";
import classnames from "classnames/bind";
import styles from "../../pages/Home/Home.module.scss";
const cx = classnames.bind(styles);
interface Props {
  type: string;
  media: string;
  title: string;
}
function MovieType({ title, type, media }: Props) {
  const [movieTypes, setMovieTypes] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await tmdbApi.getMovieList(media, type, "week");
      setMovieTypes(res.results);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  return (
    <>
      <div
        className={cx("list__type", {
          top__rated: type === "top_rated",
          treding: type === "treding",
        })}
      >
        <div className={cx("type")}>
          <h2>{title}</h2>
        </div>
        <div>
          <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={1}
            slidesPerView={1.5}
            breakpoints={{
              420: {
                spaceBetween: 10,
                slidesPerView: 3.5,
              },
            }}
          >
            {movieTypes.map((itm, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <MovieCard itemPage={itm} loading={false} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default MovieType;

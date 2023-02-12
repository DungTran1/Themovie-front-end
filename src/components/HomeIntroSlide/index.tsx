import apiConfig from "../../service/apiConfig";
import { AiFillStar } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Link } from "react-router-dom";
import { Item } from "../../shared/types";
import { useQuery } from "@tanstack/react-query";

import { getRecommendGenres2 } from "../../service/Search";
import Loading from "../Loading/Loading";

import classnames from "classnames/bind";
import styles from "./Swiper.module.scss";
import { Navigation } from "swiper";
const cx = classnames.bind(styles);
interface HomeIntroSlideProps {
  film: Item[] | undefined;
  media: string;
}
const HomeIntroSlide: React.FC<HomeIntroSlideProps> = ({ film, media }) => {
  const { data, isLoading, error, isError } = useQuery(
    ["home-intro", media],
    getRecommendGenres2
  );
  if (isError) return <div>Error</div>;
  return (
    <div className={cx("home__intro")}>
      <Swiper
        modules={[Navigation]}
        navigation
        className={cx("swiper")}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          return;
        }}
      >
        {isLoading && <Loading />}
        {film &&
          film.map((film) => {
            const filmGenres = film.genre_ids.map((genre) => {
              const genres =
                media === "movie" ? data?.movieGenres : data?.tvGenres;
              if (genres) {
                return genres?.find((item) => item.id === genre);
              }
              // eslint-disable-next-line array-callback-return
              return;
            });

            return (
              <SwiperSlide key={film.id}>
                <Link to={media + "/" + film.id}>
                  <div className={cx("slide__wrapper")}>
                    <img
                      src={apiConfig.originalImage(film.backdrop_path)}
                      alt=""
                    />
                    <div className={cx("info__wrapper")}>
                      <div className={cx("vote__average")}>
                        {film.vote_average.toFixed(1)}
                        <AiFillStar />
                      </div>
                      <div className={cx("info")}>
                        <div className={cx("title__original")}>
                          {film.original_title || film.original_name}
                        </div>
                      </div>
                    </div>
                    <div className={cx("data__genres__oveview__wrapper")}>
                      <div className={cx("Release__date")}>
                        Release date: {film.release_date || film.first_air_date}
                      </div>
                      <div className={cx("genres")}>
                        {filmGenres.map((item, index) => {
                          return (
                            <button key={(item && item.id) || index}>
                              {item && item.name}
                            </button>
                          );
                        })}
                      </div>
                      <div className={cx("overview")}>{film.overview}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default HomeIntroSlide;

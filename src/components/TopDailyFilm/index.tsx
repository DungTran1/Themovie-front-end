import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Item } from "../../shared/types";
import FilmItem from "../FilmItem/FilmItem";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import classnames from "classnames/bind";
import styles from "../../pages/Home/Home.module.scss";

const cx = classnames.bind(styles);
interface TopDailyFilmProps {
  data: [string, Item[]];
  isLoading: boolean;
}
const TopDailyFilm: React.FC<TopDailyFilmProps> = ({ data, isLoading }) => {
  return (
    <>
      <div
        className={cx("list__type", {
          top__rated: data[0] === "Top Rated",
          treding: data[0] === "Treding",
        })}
      >
        <div className={cx("type")}>
          {(isLoading && <Skeleton width={50} />) || <h2>{data[0]}</h2>}
        </div>
        <div>
          <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={2}
            slidesPerView={1.75}
            breakpoints={{
              480: {
                slidesPerView: 2.5,
              },
              740: {
                slidesPerView: 3.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1180: {
                slidesPerView: 3.5,
              },
            }}
          >
            {data[1]?.map((itm, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <FilmItem itemPage={itm} isLoading={isLoading} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopDailyFilm;

import { Fragment, useState } from "react";

import SwiperComp from "../../components/Swiper";
import TopDailyFilm from "../../components/TopDailyFilm";
import MediaChange from "../../components/MediaChange/MediaChange";
import RightBarHome from "./RightBarHome";
import { useAppSelector } from "../../store/hooks";

import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { HomeFilms } from "../../shared/types";
import { getHomeFilms } from "../../service/Home";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const cx = classnames.bind(styles);

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.auth.current);
  const [media, setMedia] = useState(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const { data, isLoading, error } = useQuery<HomeFilms>(
    ["movieDaily", media],
    () => getHomeFilms(media)
  );
  return (
    <>
      <div className={cx("home")}>
        <div className="row">
          <div className="l-9 sm-12 md-12">
            <div className={cx("media__change")}>
              <MediaChange media={media} setMedia={setMedia} />
              <div className={cx("user")}>
                <div>{(user && user?.displayName) || "Anonymous"}</div>
                <div className={cx("logo__user")}>
                  <img
                    src={
                      user?.photoURL || require("../../assets/blank-avatar.jpg")
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <SwiperComp film={data && data["Trending"]} media={media} />

            {data &&
              Object.entries(data as HomeFilms)?.map((item, index) => {
                return (
                  <TopDailyFilm isLoading={isLoading} key={index} data={item} />
                );
              })}
          </div>
          <RightBarHome media={media} />
        </div>
      </div>
    </>
  );
};

export default Home;

import { Fragment, useState } from "react";

import SwiperComp from "../../components/Swiper";
import MovieTopDaily from "../../components/MovieTopDaily";
import MediaChange from "../../components/MediaChange/MediaChange";
import MenuRight from "../../components/MenuRight";
import MenuItem from "./MenuItem";

import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/index";

const cx = classnames.bind(styles);

const Home: React.FC = () => {
  const [media, setMedia] = useState(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });

  const user = useSelector(
    (state: RootState) => state.currentUserReducer.current
  );

  // }, []);
  return (
    <>
      <div className={cx("home")}>
        <div className={cx("media__change")}>
          <MediaChange Media={[media, setMedia]} />
          <div className={cx("user")}>
            <div>{(user && user["name"]) || "Anonymous"}</div>
            <div className={cx("logo__user")}>
              <img
                src={
                  (user && user["photoUrl"]) ||
                  "https://www.sim.edu.vn/en/wp-content/uploads/2019/07/blank-avatar.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <SwiperComp media={media} />
        <div className={cx("movie__type")}>
          <div className={cx("list")}>
            {[
              { title: "Trending", type: "trending", media: media },
              {
                title: "Top Rated",
                type: "top_rated",
                media: media,
              },
              {
                title: media === "movie" ? "Up Coming" : "On The Air",
                type: media === "movie" ? "upcoming" : "on_the_air",
                media: media,
              },
            ].map((item, index) => {
              return (
                <Fragment key={index}>
                  <MovieTopDaily
                    title={item.title}
                    type={item.type}
                    media={media}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <MenuRight>
        <MenuItem />
      </MenuRight>
    </>
  );
};

export default Home;

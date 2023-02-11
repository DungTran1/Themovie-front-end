import { useState } from "react";
import FilmList from "../../components/Explore/FilmList";
import MenuFilter from "./MenuFilter";
import classNames from "classnames/bind";
import styles from "./Explore.module.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import MediaChange from "../../components/MediaChange/MediaChange";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);
const Explore = () => {
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const isMobile = useMediaQuery({ query: "(max-width: 740px)" });
  return (
    <div className={cx("explore")}>
      <div className={cx("header")}>
        <div className={cx("title")}>FIND FILMS THAT BEST FIT YOU</div>
        {!isMobile && (
          <div style={{ width: "25rem" }}>
            <SearchBox />
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="row">
          <div className="l-9">
            <FilmList media={media} setMedia={setMedia} />
          </div>
          <div className="l-3 pos-rel">
            <MenuFilter media={media} />
          </div>
        </div>
      )}
      {isMobile && (
        <>
          <SearchBox />
          <MenuFilter media={media} />
          <MediaChange media={media} setMedia={setMedia} />
          <FilmList media={media} setMedia={setMedia} />
        </>
      )}
    </div>
  );
};

export default Explore;

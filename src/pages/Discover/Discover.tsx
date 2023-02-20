import { useState } from "react";
import FilmList from "../../components/Discover/FilmList";
import MenuFilter from "./MenuFilter";
import classNames from "classnames/bind";
import styles from "./Discover.module.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import MediaChange from "../../components/MediaChange/MediaChange";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);
const Discover = () => {
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const isMobile = useMediaQuery({ query: "(max-width: 46.25em)" });
  return (
    <div className={cx("discover")}>
      <div className={cx("header")}>
        <div className={cx("title")}>FIND FILMS THAT BEST FIT YOU</div>
        {!isMobile && (
          <div className={cx("searchBox")}>
            <SearchBox />
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="row">
          <div className="l-9">
            <FilmList media={media} />
          </div>
          <div className="l-3 pos-rel">
            <MenuFilter media={media} />
          </div>
        </div>
      )}
      {isMobile && (
        <>
          <MenuFilter media={media} />
          <MediaChange media={media} setMedia={setMedia} />
          <FilmList media={media} />
        </>
      )}
    </div>
  );
};

export default Discover;

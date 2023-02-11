import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import FilmItem from "../FilmItem/FilmItem";
import MediaChange from "../MediaChange/MediaChange";

import { ThreeCircles } from "react-loader-spinner";
import { getExploreFilm } from "../../service/Explore";
import { ItemsPage } from "../../shared/types";

import classnames from "classnames/bind";
import styles from "./Explore.module.scss";
const cx = classnames.bind(styles);
interface FilmListProps {
  media: string;
  setMedia: React.Dispatch<React.SetStateAction<string>>;
}
const FilmList: React.FC<FilmListProps> = ({ media, setMedia }) => {
  const [param] = useSearchParams();
  const config = {
    sort_by: param.get("sort_by"),
    with_genres: param.get("genres"),
    "with_runtime.gte": param.get("minRunTime") || 0,
    "with_runtime.lte": param.get("maxRunTime") || 200,
    "primary_release_date.gte": param.get("from"),
    "primary_release_date.lte": param.get("to"),
    "air_date.gte": param.get("from"),
    "air_date.lte": param.get("to"),
  };
  const {
    data: movies,
    error: errorMovies,
    isLoading,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-movie", config, media],
    ({ pageParam = 1 }) => {
      return getExploreFilm(media, pageParam, config);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
    }
  );

  return (
    <>
      {(!errorMovies && (
        <InfiniteScroll
          dataLength={movies?.pages.length || 0}
          next={() => fetchNextPageMovie()}
          hasMore={hasNextPageMovie as boolean}
          loader={
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
              wrapperClass={cx("progress-bar-wrapper")}
            />
          }
          scrollThreshold={1}
          className={cx("load__scroll")}
          style={{ overflow: "unset" }}
        >
          <div className={[cx("film__list"), "row"].join(" ")}>
            {movies?.pages.map((page) => {
              return page.results.map((itm) => {
                return (
                  <FilmItem
                    key={itm.id}
                    isLoading={isLoading}
                    itemPage={itm}
                    className="col l-3 md-4 sm-6"
                  />
                );
              });
            })}
          </div>
        </InfiniteScroll>
      )) || <div>Error</div>}
    </>
  );
};

export default FilmList;

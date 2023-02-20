import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import FilmItem from "../FilmItem/FilmItem";

import { ThreeCircles } from "react-loader-spinner";
import { getDiscoverFilm } from "../../service/Discover";
import { ItemsPage } from "../../shared/types";

import classnames from "classnames/bind";
import styles from "./Discover.module.scss";
import Loading from "../Loading/Loading";
const cx = classnames.bind(styles);

interface FilmListProps {
  media: string;
}
const FilmList: React.FC<FilmListProps> = ({ media }) => {
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
    data: films,
    error: errorMovies,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-movie", config, media],
    ({ pageParam = 1 }) => {
      return getDiscoverFilm(media, pageParam, config);
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
      {(!errorMovies && films && (
        <InfiniteScroll
          dataLength={films?.pages.length || 0}
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
            {films?.pages.map((page) => {
              return page.results.map((itm) => {
                return (
                  <FilmItem
                    key={itm.id}
                    itemPage={itm}
                    className="col l-3 md-4 sm-6"
                  />
                );
              });
            })}
          </div>
        </InfiniteScroll>
      )) || <Loading />}
    </>
  );
};

export default FilmList;

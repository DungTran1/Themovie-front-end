import { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { Grid } from "@mui/material";

import FilmItem from "../FilmItem/FilmItem";
import NotFound from "../NotFound/NotFound";
import MediaChange from "../MediaChange/MediaChange";
import Search from "../SearchBox/SearchBox";

import { ThreeCircles } from "react-loader-spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getExploreMovie, getExploreTV } from "../../service/tmdbApi/Explore";
import { ItemsPage } from "../../shared/types";

import classnames from "classnames/bind";
import styles from "./Explore.module.scss";
import { useSearchParams } from "react-router-dom";
const cx = classnames.bind(styles);

function FilmList() {
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const [param] = useSearchParams();
  const {
    data: movies,
    error: errorMovies,
    isLoading,
    isLoadingError,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    [
      "explore-result-movie",
      {
        sort_by: param.get("sort_by"),
        with_genres: param.get("genres"),
        "with_runtime.gte": param.get("runtime"),
        "primary_release_date.gte": param.get("from"),
        "primary_release_date.lte": param.get("to"),
        "air_date.gte": param.get("from"),
        "air_date.lte": param.get("to"),
        media,
      },
    ],
    ({ pageParam = 1, queryKey }) => {
      console.log(queryKey);
      if (media === "movie") {
        return getExploreMovie(pageParam, {
          sort_by: param.get("sort_by"),
          with_genres: param.get("genres"),
          "with_runtime.gte": param.get("runtime"),
          "primary_release_date.gte": param.get("from"),
          "primary_release_date.lte": param.get("to"),
          "air_date.gte": param.get("from"),
          "air_date.lte": param.get("to"),
        });
      } else {
        return getExploreTV(pageParam, {
          sort_by: param.get("sort_by"),
          with_genres: param.get("genres"),
          "with_runtime.gte": param.get("runtime"),
          "primary_release_date.gte": param.get("from"),
          "primary_release_date.lte": param.get("to"),
          "air_date.gte": param.get("from"),
          "air_date.lte": param.get("to"),
        });
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
    }
  );

  return (
    <>
      <Grid className={cx("movie__list")} marginTop="50px">
        <div className={cx("header")}>
          <div className={cx("title")}>FIND FILMS THAT BEST FIT YOU</div>
          <div style={{ width: "25rem" }}>
            <Search />
          </div>
        </div>
        <MediaChange Media={[media, setMedia]} />

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
            <Grid container spacing={2}>
              {movies?.pages.map((page) => {
                return page.results.map((itm) => {
                  return (
                    <Grid item key={itm.id} lg={3}>
                      <FilmItem loading={isLoading} itemPage={itm} />
                    </Grid>
                  );
                });
              })}
            </Grid>
          </InfiniteScroll>
        )) || <div>Error</div>}
      </Grid>
    </>
  );
}

export default FilmList;

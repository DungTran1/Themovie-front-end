import React from "react";

import SearchBox from "../../components/SearchBox/SearchBox";
import { getRecommendGenres2 } from "../../service/tmdbApi/Search";
import { useQuery } from "@tanstack/react-query";
import { getRecommendGenres2Type } from "../../shared/types";
import TrendingNow from "./TrendingNow";

import classnames from "classnames/bind";
import styles from "./RightBarHome.module.scss";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

const getRandomGenres = (genres: { id: number; name: string }[]) => {
  const myChoiceGenresIndex = [5, 2, 13, 14, 6, 7, 4];

  return myChoiceGenresIndex.map((arrIndex) => genres[arrIndex]);
};
interface RecommendGenresProps {
  media: string;
}
const MenuItem: React.FC<RecommendGenresProps> = ({ media }) => {
  const { isLoading, data, isError, error } = useQuery<
    getRecommendGenres2Type,
    Error
  >(["genres"], getRecommendGenres2);

  if (isError) return <div>ERROR: {error.message}</div>;
  if (isLoading) return <div>is loading...</div>;
  const randomGenres = getRandomGenres(
    media === "movie" ? data.movieGenres : data.tvGenres
  );

  return (
    <div className={`${cx("menu")} l-3 sm-12 md-12 `}>
      <div>
        <div className="md-0 sm-0">
          <SearchBox />
        </div>
        <div className={cx("genres")}>
          {randomGenres?.map((item, index) => (
            <Link key={index} to={`/discover?genres=${item.id}`}>
              {item?.name}
            </Link>
          ))}
        </div>
        <TrendingNow />
      </div>
    </div>
  );
};

export default MenuItem;

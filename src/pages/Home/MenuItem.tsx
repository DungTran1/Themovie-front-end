import React, { useEffect, useState } from "react";

import tmdbApi from "../../service/tmdbApiConfig";

import Search from "../../components/SearchBox/SearchBox";

import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import MovieSuggestion from "../../components/MovieSuggestion/MovieSuggestion";
const cx = classnames.bind(styles);
interface Genre {
  [x: string]: string;
}
function MenuItem() {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  useEffect(() => {
    const fetch = async () => {
      const res1 = await tmdbApi.getGenres("movie");
      const res2 = await tmdbApi.getGenres("tv");
      setGenres([...res1.genres.slice(0, 3), ...res2.genres.slice(0, 3)]);
    };
    fetch();
  }, []);
  return (
    <div className={cx("menu")}>
      <Search />
      <div className={cx("genres")}>
        {genres.map((item, index) => (
          <button key={index}>{item?.name}</button>
        ))}
      </div>
      <MovieSuggestion type="trending" />
    </div>
  );
}

export default MenuItem;

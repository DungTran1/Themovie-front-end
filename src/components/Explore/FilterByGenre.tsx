import { useState, useEffect } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import { useSearchParams } from "react-router-dom";

import classnames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import tmdbApi from "../../service/tmdbApiConfig";
const cx = classnames.bind(styles);
const FilterByGenre = () => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<number[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await tmdbApi.getGenres("movie");
      setGenres(res.genres);
    };
    fetch();
  }, []);
  useEffect(() => {
    if (filters.length === 0) {
      params.delete("genres");
      setParams(params);
    } else {
      params.set("genres", filters.join(","));
      setParams(params);
    }
  }, [filters]);
  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilters((prev) => {
      if (
        prev.some(
          (itm) => itm === Number((e.target as HTMLButtonElement).value)
        )
      ) {
        const newArr = prev;
        newArr.splice(
          prev.findIndex(
            (itm) => itm === Number((e.target as HTMLButtonElement).value)
          ),
          1
        );
        return [...newArr];
      } else {
        return [...prev, Number((e.target as HTMLButtonElement).value)];
      }
    });
  };

  return (
    <ScrollContainer hideScrollbars={false} className={cx("genres")}>
      <h4>Genres</h4>
      {genres.map((itm, idx) => (
        <button
          className={cx({
            btn: true,
            active: filters.some((filter) => itm.id === filter),
          })}
          value={itm.id}
          onClick={handleFilter}
          key={idx}
        >
          {itm.name}
        </button>
      ))}
    </ScrollContainer>
  );
};

export default FilterByGenre;

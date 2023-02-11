import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import classnames from "classnames/bind";
import styles from "./MenuFilter.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getRecommendGenres2 } from "../../service/tmdbApi/Search";
const cx = classnames.bind(styles);
interface FilterByGenreProps {
  media: string;
}
const FilterByGenre: React.FC<FilterByGenreProps> = ({ media }) => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<number[]>([]);
  const { data } = useQuery(["genresfilter", media], getRecommendGenres2);
  const genres = media === "movie" ? data?.movieGenres : data?.tvGenres;

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
    <div className={cx("genres")}>
      <h4>Genres</h4>
      {genres?.map((itm, idx) => (
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
    </div>
  );
};

export default FilterByGenre;

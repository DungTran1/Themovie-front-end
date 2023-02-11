import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getTrendingNow } from "../../service/tmdbApi/Home";
import { Item } from "../../shared/types";
import FilmSuggestion from "../../components/FilmSuggestion/FilmSuggestion";

const TrendingNow: FC = () => {
  const { isLoading, data, isError, error } = useQuery<Item[], Error>(
    ["trending"],
    getTrendingNow
  );

  if (isError) return <div>ERROR: ${error.message}</div>;
  // if (isLoading) return <div>Loading...</div>;
  return (
    <FilmSuggestion
      className="mt-7"
      type="Trending"
      limitNumber={2}
      films={data}
      isLoading={isLoading}
    />
  );
};

export default TrendingNow;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { FilmInfo } from "../../shared/types";
import { getMovieFullDetail } from "../../service/tmdbApi/Movie";
import Loading from "../../components/Loading/Loading";

const MovieInfo = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery<FilmInfo>(
    ["movieDetail", id],
    () => getMovieFullDetail(Number(id))
  );

  if (isError) return <div>Error</div>;
  if (isLoading) {
    return <Loading />;
  }
  return <FilmDetail {...data} />;
};

export default MovieInfo;

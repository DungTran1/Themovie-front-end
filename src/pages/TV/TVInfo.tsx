import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getTVFullDetail } from "../../service/tmdbApi/TV";
import { FilmInfo } from "../../shared/types";
import Loading from "../../components/Loading/Loading";

const TVInfo: FC = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useQuery<FilmInfo>(
    ["tvDetail", id],
    () => getTVFullDetail(Number(id as string))
  );
  if (isError) return <div>Error</div>;
  if (isLoading) {
    return <Loading />;
  }
  return <FilmDetail {...data} />;
};

export default TVInfo;

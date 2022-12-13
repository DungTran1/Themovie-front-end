import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getTVFullDetail } from "../../service/tmdbApi/TV";
import { FilmInfo } from "../../shared/types";

const TVInfo: FC = () => {
  const { id } = useParams();

  const { data, isError, error } = useQuery<FilmInfo>(["tvDetail", id], () =>
    getTVFullDetail(Number(id as string))
  );

  return <FilmDetail {...data} />;
};

export default TVInfo;

import { FilmInfo } from "../../shared/types";
import { get, getUser } from "../axiosConfig";
import tmdbApi from "../tmdbApiConfig";

export const getHistory = async (res: any): Promise<FilmInfo[]> => {
  let history: any;
  if (JSON.stringify(res) !== "{}") {
    history = Promise.all(
      res.movieIds.map(async (movie: any) => {
        const res: FilmInfo = await tmdbApi.getDetail(
          movie.media,
          movie.movieId
        );
        return res;
      })
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return history;
};

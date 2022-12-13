import { get } from "../axiosConfig";
import {
  FilmInfo,
  getWatchReturnedType,
  Item,
  Reviews,
  Video,
} from "../../shared/types";
export const getMovieFullDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    get(`/movie/${id}`),
    get(`/movie/${id}/credits`),
    get(`/movie/${id}/reviews`),
    get(`/movie/${id}/similar`),
    get(`/movie/${id}/videos`),
  ]);

  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current, media_type: "movie" };
        break;

      case 1:
        final.credits = current.cast.slice(0, 8);
        break;

      case 2:
        final.reviews = current.results.filter(
          (item: Reviews) => item.author !== "MSB"
        );
        break;

      case 3:
        final.similar = current.results.map((item: Item) => ({
          ...item,
          media_type: "movie",
        }));
        break;

      case 4:
        final.videos = current.results
          .filter((item: Video) => item.site === "YouTube")
          .reduce((acc: any, current: Video) => {
            if (current.type === "Trailer") return [current, ...acc];
            else return [...acc, current];
          }, [] as Video[]);
        break;
    }

    return final;
  }, {} as FilmInfo);

  return movieInfo;
};
export const getWatchMovie = async (
  id: number
): Promise<getWatchReturnedType> => {
  const res = await Promise.all([
    get(`/movie/${id}`),
    get(`/movie/${id}/recommendations`),
  ]);

  return {
    detail: res[0],
    recommendations: res[1].results.filter((item: Item) => item.poster_path),
  };
};

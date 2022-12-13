import { get } from "../axiosConfig";
import {
  DetailSeason,
  FilmInfo,
  getWatchReturnedType,
  Item,
  Reviews,
  Video,
} from "../../shared/types";

export const getTVFullDetail = async (id: number): Promise<FilmInfo> => {
  const response = await Promise.all([
    get(`/tv/${id}`),
    get(`/tv/${id}/credits`),
    get(`/tv/${id}/reviews`),
    get(`/tv/${id}/similar`),
    get(`/tv/${id}/videos`),
  ]);

  const tvInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current, media_type: "tv" };
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
          media_type: "tv",
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

  return tvInfo;
};

export const getWatchTV = async (id: number): Promise<getWatchReturnedType> => {
  const res = await Promise.all([
    get(`/tv/${id}`),
    get(`/tv/${id}/recommendations`),
  ]);

  const data = {
    detail: res[0],
    recommendations: res[1].results,
  };

  const detailSeasons = (
    await Promise.all(
      data.detail.seasons.map((season: DetailSeason) =>
        get(`/tv/${id}/season/${season.season_number}`)
      )
    )
  ).map((res) => res.data);

  return { ...data, detailSeasons };
};

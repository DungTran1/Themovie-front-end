import { getRecommendGenres2Type, Item, ItemsPage } from "../shared/types";
import { get } from "./axiosConfig";

export const getSearchKeyword = async (query: string): Promise<string[]> => {
  return (
    await get("/search/keyword", {
      query,
    })
  ).results
    .map((item: any) => item.name)
    .filter((_: any, index: number) => index < 5);
};
export const getSearchResult: (
  typeSearch: string,
  query: string,
  page: number
) => Promise<ItemsPage> = async (typeSearch, query, page) => {
  const data = (await get(`/search/${typeSearch}`, {
    query,
    page,
  })) as any;

  const results = data.results
    .map((item: Item) => ({
      ...item,
      ...(typeSearch !== "multi" && { media_type: typeSearch }),
    }))
    .filter((item: Item) => item.poster_path || item.profile_path);

  return {
    ...data,
    results,
  };
};
export const getRecommendGenres2 =
  async (): Promise<getRecommendGenres2Type> => {
    const movieGenres = ((await get("/genre/movie/list")) as any).genres;
    const tvGenres = ((await get("/genre/tv/list")) as any).genres;
    return {
      movieGenres,
      tvGenres,
    };
  };

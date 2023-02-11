import { get } from "./axiosConfig";
import { HomeFilms, Item } from "../shared/types";
export const getHomeFilms = async (media: string): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: `/trending/${media}/day`,
    Popular: `/${media}/popular`,
    "Top Rated": `/${media}/top_rated`,
    Hot: `/trending/${media}/day?page=2`,
    Upcoming: media === "movie" ? "/movie/upcoming" : "/tv/on_the_air",
  };
  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => get(endpoint[1]))
  );
  const data = responses.reduce((final, cur, curIdx) => {
    final[Object.entries(endpoints)[curIdx][0]] = cur.results.map(
      (item: Item) => ({ ...item, media_type: media })
    );
    return final;
  }, {} as { [key: string]: Item[] });
  return data;
};

export const getTrendingNow = async (): Promise<Item[]> => {
  return (await get("/trending/all/day?page=2")).results;
};

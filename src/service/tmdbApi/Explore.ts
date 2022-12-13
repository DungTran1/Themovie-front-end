import { get } from "../axiosConfig";

import { ConfigType, Item, ItemsPage } from "../../shared/types";

export const getExploreMovie: (
  page: number,
  config?: ConfigType
) => Promise<ItemsPage> = async (page, config = {}) => {
  console.log(page);
  const data = await get("/discover/movie", {
    ...config,
    page,
  });

  const adjustedItems = data.results
    .filter((item: Item) => item.poster_path)
    .map((item: any) => ({
      ...item,
      media_type: "movie",
    }));

  return {
    ...data,
    results: adjustedItems,
  };
};

export const getExploreTV: (
  page: number,
  config?: ConfigType
) => Promise<ItemsPage> = async (page, config = {}) => {
  const data = await get("/discover/tv", {
    ...config,
    page,
  });

  const adjustedItems = data.results
    .filter((item: Item) => item.poster_path)
    .map((item: any) => ({
      ...item,
      media_type: "tv",
    }));

  return {
    ...data,
    results: adjustedItems,
  };
};

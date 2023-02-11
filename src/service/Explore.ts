import { get } from "./axiosConfig";

import { ConfigType, Item, ItemsPage } from "../shared/types";

export const getExploreFilm: (
  media: string,
  page: number,
  config?: ConfigType
) => Promise<ItemsPage> = async (media, page, config = {}) => {
  const data = await get("/discover/" + media, {
    ...config,
    page,
  });

  const adjustedItems = data.results
    .filter((item: Item) => item.poster_path)
    .map((item: any) => ({
      ...item,
      media_type: media,
    }));

  return {
    ...data,
    results: adjustedItems,
  };
};

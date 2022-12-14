import { get } from "../axiosConfig";
import { Item } from "../../shared/types";
export const getHomeFilms = async (
  media: string,
  type: string,
  time_window: string
): Promise<Item[]> => {
  if (type === "trending") {
    const res = await get(`/trending/${media}/${time_window}`);
    const newRes = res.results?.map((item: Item) => {
      return { ...item, media_type: media };
    });
    return newRes;
  } else {
    const res = await get(`/${media}/${type}`);
    const newRes = res.results?.map((item: Item) => {
      return { ...item, media_type: media };
    });
    return newRes;
  }
};

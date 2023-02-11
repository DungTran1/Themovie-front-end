import { Item, User } from "../../shared/types";
import { get, postUser } from "../axiosConfig";

export const getPersonal = async (
  name: string,
  user: User | null,
  media: string
): Promise<Item[]> => {
  let history: any;
  const res = await postUser(name, {
    uid: user?.uid,
    media,
  });
  if (JSON.stringify(res) !== "{}") {
    history = Promise.all(
      res.movieIds.map(async (movie: any) => {
        const res: Item = await get(`${movie.media}/${movie.movieId}`);
        return { ...res, media_type: media };
      })
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {});
  }
  return history;
};

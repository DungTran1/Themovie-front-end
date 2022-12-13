import { get } from "./axiosConfig";
interface MovieTypes {
  upcoming: string;
  popular: string;
  top_rated: string;
  trending: string;
  on_the_air: string;
}
interface MediaTypes {
  movie: string;
  tv: string;
}
const mediaTypes: MediaTypes = {
  movie: "movie",
  tv: "tv",
};

const movieTypes: MovieTypes = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
  trending: "trending",
  on_the_air: "on_the_air",
};
const time_window = {
  day: "day",
  week: "week",
};
const tmdbApi = {
  getMovieList: async (
    media: string,
    type: string,
    timeWindow = "week",
    params = {}
  ) => {
    let url =
      mediaTypes[media as keyof typeof mediaTypes] +
      "/" +
      movieTypes[type as keyof typeof movieTypes];
    if (type === "trending") {
      url =
        movieTypes[type] +
        "/" +
        mediaTypes[media as keyof typeof mediaTypes] +
        "/" +
        time_window[timeWindow as keyof typeof time_window];
    }

    return get(url, params);
  },
  getTVSeason: (id: number, season_num: number) => {
    const url = mediaTypes["tv"] + "/" + id + "/season/" + season_num;
    return get(url);
  },
  getSimilar: (media: string, id: number) => {
    const url =
      mediaTypes[media as keyof typeof mediaTypes] + "/" + id + "/similar";
    return get(url);
  },
  getRecommendation: (media: string, id: number) => {
    const url =
      mediaTypes[media as keyof typeof mediaTypes] +
      "/" +
      id +
      "/recommendations";
    return get(url);
  },
  getDiscover: async (media: string, params = {}) => {
    let url = "discover/" + mediaTypes[media as keyof typeof mediaTypes];

    return get(url, params);
  },
  getReview: (media: string, id: number) => {
    const url =
      mediaTypes[media as keyof typeof mediaTypes] + "/" + id + "/reviews";
    return get(url);
  },
  getGenres: (media: string) => {
    const url =
      "genre/" + mediaTypes[media as keyof typeof mediaTypes] + "/list";
    return get(url);
  },

  getVideos: (media: string, movieId: number) => {
    const url =
      mediaTypes[media as keyof typeof mediaTypes] + "/" + movieId + "/videos";
    return get(url);
  },
  getEpisodes: (
    tv_id: number,
    season_number: number,
    episode_number: number
  ) => {
    const url = `/tv/${tv_id}/season/${season_number}/episode/${episode_number}`;
    return get(url);
  },
  search: (type: string, params: object) => {
    const url = "movie" + movieTypes[type as keyof typeof movieTypes];
    return get(url, params);
  },
  getCredit: (media: string, id: number, params: object) => {
    const url =
      mediaTypes[media as keyof typeof mediaTypes] + "/" + id + "/credits";
    return get(url, params);
  },
  getDetail: (media: string, id: number) => {
    const url = mediaTypes[media as keyof typeof mediaTypes] + "/" + id;
    return get(url);
  },
};
export default tmdbApi;

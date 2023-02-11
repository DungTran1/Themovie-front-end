import { useQuery } from "@tanstack/react-query";

import { useParams, useSearchParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { getWatchTV } from "../../service/TV";
import { getWatchReturnedType } from "../../shared/types";

const TVWatch: React.FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchTV", id],
    () => getWatchTV(Number(id as string))
  );

  const [queryParams] = useSearchParams();

  const seasonId = queryParams.get("season") || 1;
  const episodeId = queryParams.get("episode") || 1;
  // if (error) return <div>ERROR: {error.message}</div>;
  //   if (error) return <Error />;

  // if (!data) return <div>Loading...</div>;

  const currentSeason = data?.detailSeasons?.find(
    (season) => season?.season_number === Number(seasonId)
  );

  const currentEpisode = currentSeason?.episodes.find(
    (episode) => episode?.episode_number === Number(episodeId)
  );

  console.log(data, seasonId, episodeId, currentSeason, currentEpisode);
  // I check data is truthy because I want to show 404 only when invalid episode or season are accessed, NOT when data is fetching
  // if (!currentEpisode && data) return <div>ERROR: 404</div>;
  //   if (!currentEpisode && data) return <Error />;

  return (
    <FilmWatch
      {...data}
      media_type="tv"
      seasonId={Number(seasonId)}
      episodeId={Number(episodeId)}
      currentEpisode={currentEpisode}
    />
  );
};

export default TVWatch;

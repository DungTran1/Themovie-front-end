import React, { useState } from "react";

import apiConfig from "../../service/apiConfig";
import {
  DetailSeason,
  Episode,
  getWatchReturnedType,
} from "../../shared/types";

import styles from "./SeasonSelection.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const cx = classnames.bind(styles);
interface SeasonSelectionProps {
  detailSeasons?: DetailSeason[];
  seasonId?: number;
  episodeId?: number;
}

interface SeasonProps {
  season: DetailSeason;
  seasonId?: number;
  episodeId?: number;
}

const SeasonSelection: React.FC<SeasonSelectionProps> = ({
  detailSeasons,
  seasonId,
  episodeId,
}) => {
  return (
    <ul className={cx("season__selection")}>
      {detailSeasons &&
        (detailSeasons as DetailSeason[]).map((season, index) => {
          return (
            <Season
              key={index}
              season={season}
              seasonId={seasonId}
              episodeId={episodeId}
            />
          );
        })}
    </ul>
  );
};
const Season: React.FC<SeasonProps> = ({ season, seasonId, episodeId }) => {
  const [seasonExpanded, setSeasonExpanded] = useState<number | undefined>(
    seasonId
  );
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:64em)" });
  return (
    <li>
      <div
        className={cx("season__wrapper", {
          onWatch: season.season_number === seasonId,
        })}
        onClick={() =>
          setSeasonExpanded(
            seasonExpanded !== season.season_number
              ? season.season_number
              : undefined
          )
        }
      >
        <div className={cx("img")}>
          <img src={apiConfig.w500Image(season?.poster_path)} alt="" />
        </div>
        <div className={cx("info")}>
          <h3>{season?.name}</h3>
          <h4>Episode: {season?.episodes.length}</h4>
        </div>
      </div>
      <ul className={cx("episode__wrapper")}>
        {seasonExpanded === season?.season_number &&
          season.episodes.map((episode) => {
            return (
              <li
                key={episode?.id}
                className={cx({
                  onWatch:
                    episode.episode_number === episodeId &&
                    season.season_number === seasonId,
                })}
              >
                <Link
                  to={{
                    pathname: "",
                    search: `?season=${season.season_number}&episode=${episode.episode_number}`,
                  }}
                >
                  <div>{episode.episode_number}</div>
                  <div className={cx("poster")}>
                    <div className={cx("img")}>
                      <img
                        src={apiConfig.w500Image(episode?.still_path)}
                        alt=""
                      />
                    </div>
                    {!isTabletOrMobile && (
                      <div className={cx("overview")}>
                        <p>{episode?.overview}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </li>
  );
};
export default SeasonSelection;

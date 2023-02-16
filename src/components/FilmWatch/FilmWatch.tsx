import FilmSuggestion from "../FilmSuggestion/FilmSuggestion";
import SearchBox from "../SearchBox/SearchBox";

import { AiFillStar, AiOutlineCalendar } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";

import Comment from "../Comment/Comment";
import {
  DetailMovie,
  DetailTV,
  Episode,
  getWatchReturnedType,
} from "../../shared/types";
import SeasonSelection from "./SeasonSelection";
import { embedMovie, embedTV } from "../../shared/utils";

import styles from "./FilmWatch.module.scss";
import classnames from "classnames/bind";
import { useMediaQuery } from "react-responsive";
const cx = classnames.bind(styles);

interface FilmWatchProps {
  media_type: "movie" | "tv";
  seasonId?: number;
  episodeId?: number;
  currentEpisode?: Episode;
}
const FilmWatch: React.FC<FilmWatchProps & getWatchReturnedType> = ({
  detail,
  recommendations,
  detailSeasons,
  media_type,
  seasonId,
  episodeId,
  currentEpisode,
}) => {
  const { id }: any = useParams();
  const isMobileOrTablet = useMediaQuery({ query: "(max-width:64em)" });
  return (
    <div className="grid">
      <div className="row">
        <div className={`${cx("watch")} l-9 md-12 sm-12`}>
          <div className={cx("video")}>
            {detail && (
              <iframe
                id="ve-iframe"
                src={
                  media_type === "movie"
                    ? embedMovie(detail.id)
                    : embedTV(
                        detail.id,
                        seasonId as number,
                        episodeId as number
                      )
                }
                width="100%"
                height="100%"
                // allowFullScreen="allowfullscreen"
                frameBorder="0"
                title="movie"
              ></iframe>
            )}
          </div>
          <div className={cx("info-comment")}>
            <h2>
              {(detail as DetailMovie)?.original_title ||
                (detail as DetailTV)?.name}
            </h2>
            <div>
              <div className={cx("rating")}>
                <AiFillStar />
                <span>
                  {detail?.vote_average ||
                    (currentEpisode as Episode)?.vote_average ||
                    ""}
                </span>
              </div>
              <div className={cx("calendar")}>
                <AiOutlineCalendar />
                <span>
                  {(detail as DetailMovie)?.release_date ||
                    (currentEpisode as Episode)?.air_date ||
                    ""}
                </span>
              </div>
            </div>
            <div className={cx("genres")}>
              {detail?.genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/discover?genres=${String(genre.id)}`}
                >
                  <button key={genre.id}>{genre.name}</button>
                </Link>
              ))}
            </div>
            <div className={cx("overview")}>
              <h4>Overview:</h4>
              <p>
                {(currentEpisode as Episode)?.overview ||
                  (detail as DetailMovie)?.overview}
              </p>
            </div>
            <Comment movieId={id} />
          </div>
        </div>
        <div className={`${cx("rightbar__film")} l-3 md-12 sm-12`}>
          <div className={cx("rightbar__stick")}>
            {!isMobileOrTablet && (
              <div>
                <SearchBox />
              </div>
            )}
            {media_type === "movie" && (
              <FilmSuggestion
                films={recommendations?.filter(
                  (item) => item.id !== detail?.id
                )}
                limitNumber={4}
                isLoading={!recommendations}
                type="recommendations"
              />
            )}
            {media_type === "tv" && (
              <SeasonSelection
                detailSeasons={detailSeasons}
                seasonId={seasonId}
                episodeId={episodeId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmWatch;

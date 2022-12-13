import React, { useState, useEffect } from "react";

import ScrollContainer from "react-indiana-drag-scroll";
import { useSearchParams } from "react-router-dom";
import tmdbApi from "../../service/tmdbApiConfig";

import styles from "./TVShow.module.scss";
import classnames from "classnames/bind";
import apiConfig from "../../service/apiConfig";
const cx = classnames.bind(styles);
interface Props {
  id: number;
  poster_path: string;
  original_title: string;
  name: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  seasons: Array<{
    id: number;
    episode_count: number;
    season_number: number;
  }>;
}

function TVShow({ movies: season }: { movies: Props }) {
  const [tvShow, setTvShow] = useState<
    {
      id: number;
      poster_path: string;
      name: string;
      episode_count: number;
      original_title: string;
      episodes: Array<{
        id: number;
        season_number: number;
        episode_number: number;
        still_path: string;
        overview: string;
      }>;
    }[]
  >([]);
  const [modal, setModal] = useState<Array<number>>([]);
  const [params, setParams] = useSearchParams();

  console.log(season);
  useEffect(() => {
    const fetch = async () => {
      if (season.seasons.length !== 0) {
        // const tv = await
        Promise.all(
          season.seasons.map(async (item) => {
            const res = await tmdbApi.getTVSeason(
              season.id,
              item.season_number
            );

            return [{ ...res, episode_count: item.episode_count }];
          })
        ).then((res) => {
          return setTvShow(res[0]);
        });
      }
    };
    fetch();
  }, [season]);
  useEffect(() => {}, [params.get("season"), params.get("episode")]);
  console.log(modal);
  const handleModal = (e: React.MouseEvent) => {
    console.log(e.target);
    const id = Number((e.target as HTMLDivElement).id);
    console.log(id);
    if (modal.includes(id)) {
      setModal((prev) => {
        const modal = [...prev];
        modal.splice(
          modal.findIndex((item) => item === id),
          1
        );
        return modal;
      });
    } else {
      setModal((prev) => {
        return [...prev, id];
      });
    }
  };

  const handleClickEpisode = (e: React.MouseEvent) => {
    const episode = (e.target as HTMLDivElement).id;
    console.log(episode);
    if (params.get("episode")) {
      params.set("season", episode[0]);
      params.set("episode", episode[1]);
      setParams(params);
    } else {
      params.append("season", episode[0]);
      params.append("episode", episode[1]);

      setParams(params);
    }
    window.scrollTo(0, 0);
  };
  console.log(tvShow);
  return (
    <ScrollContainer
      horizontal={false}
      style={{ maxHeight: "600px", marginTop: "20px" }}
      hideScrollbars={false}
    >
      {tvShow.length > 0 &&
        tvShow.map((season, index) => {
          return (
            <div key={index} className={cx("wrapper")}>
              <div className={cx("season__wrapper")}>
                <div
                  className={cx("overlay")}
                  onClick={handleModal}
                  id={season.id.toString()}
                ></div>
                <div className={cx("img")}>
                  <img src={apiConfig.w500Image(season.poster_path)} alt="" />
                </div>
                <div className={cx("info")}>
                  <h3>{season.original_title || season.name}</h3>
                  <h4>Episode: {season.episode_count}</h4>
                </div>
              </div>
              {modal.includes(season.id) &&
                season.episodes.map((episode) => {
                  console.log(episode.season_number);
                  return (
                    <div key={episode.id} className={cx("episode__wrapper")}>
                      <div
                        className={cx("overlay")}
                        onClick={handleClickEpisode}
                        id={[
                          episode.season_number,
                          episode.episode_number,
                        ].join(",")}
                      ></div>
                      <div>{episode.episode_number}</div>
                      <div className={cx("poster")}>
                        <div className={cx("img")}>
                          <img
                            src={apiConfig.w500Image(episode.still_path)}
                            alt=""
                          />
                        </div>
                        <div className={cx("overview")}>
                          <p>{episode.overview}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </ScrollContainer>
  );
}

export default TVShow;
